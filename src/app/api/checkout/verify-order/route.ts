
import { apiError, apiSuccess } from "@/lib/api-response";
import withAuth from "@/lib/try-catch-with-auth";
import { Transaction } from "@/models/Transaction";
import { CreditHistory } from "@/models/CreditHistory";
import User from "@/models/User";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
    process.env.CASHFREE_ENVIRONMENT === "production"
        ? CFEnvironment.PRODUCTION
        : CFEnvironment.SANDBOX,
    process.env.CASHFREE_CLIENT_ID!,
    process.env.CASHFREE_CLIENT_SECRET!
);

const TOKENS_PER_UNIT = 100;

export const POST = withAuth(async (req: Request, user) => {
    const { orderId } = await req.json();

    // 1. Validate
    if (!orderId) {
        return apiError("Order ID is required", 400);
    }

    // 2. Check if already processed — early exit before calling Cashfree
    const existingTransaction = await Transaction.findOne({
        orderId,
        userId: user._id,
    });

    if (!existingTransaction) {
        return apiError("Transaction not found", 404);
    }

    // Already processed — no need to call Cashfree at all
    if (existingTransaction.status !== "PENDING") {
        return apiSuccess({ status: existingTransaction.status });
    }

    // 3. Fetch order from Cashfree
    const response = await cashfree.PGFetchOrder(orderId);
    const orderData = response.data;
    const orderStatus = orderData.order_status;
    const status = orderStatus === "PAID" ? "SUCCESS" : "FAILED";

    // 4. Fetch payments to get cf_payment_id
    const paymentsResponse = await cashfree.PGOrderFetchPayments(orderId);
    const payments = paymentsResponse.data;
    const successPayment = payments?.find(
        (p: any) => p.payment_status === "SUCCESS"
    );

    // 5. Calculate credits
    const tokensToAdd = status === "SUCCESS"
        ? existingTransaction.amount * TOKENS_PER_UNIT
        : 0;

    // 6. Update transaction — PENDING guard as double safety
    const transaction = await Transaction.findOneAndUpdate(
        { orderId, userId: user._id, status: "PENDING" },
        {
            status,
            cfOrderId: orderData.cf_order_id?.toString(),
            cfPaymentId: successPayment?.cf_payment_id?.toString(),
            paymentMethod: successPayment?.payment_group,
            creditsAdded: tokensToAdd,
            rawResponse: orderData,
        },
        { new: true }
    );

    // Concurrent request already processed it
    if (!transaction) {
        const latest = await Transaction.findOne({ orderId, userId: user._id });
        return apiSuccess({ status: latest?.status ?? "UNKNOWN" });
    }

    // 7. Add credits + save history ONLY on success
    if (status === "SUCCESS") {
        // Get balance before update
        const currentUser = await User.findById(user._id)
            .select("creditBalance.availableCredits");
        const balanceBefore = currentUser.creditBalance.availableCredits;
        const balanceAfter = balanceBefore + tokensToAdd;

        // Update user balance
        await User.findByIdAndUpdate(user._id, {
            $inc: { "creditBalance.availableCredits": tokensToAdd },
            $set: {
                "creditBalance.lastAdded": tokensToAdd,
                "creditBalance.lastUpdatedAt": new Date(),
            },
        });

        // Save credit history
        await CreditHistory.create({
            userId: user._id,
            type: "CREDIT",
            creditsAdded: tokensToAdd,
            balanceBefore,
            balanceAfter,
            description: `Purchased ${tokensToAdd.toLocaleString()} credits for ₹${existingTransaction.amount}`,
            referenceType: "PAYMENT",
            referenceId: orderId,
        });
    }

    return apiSuccess({ status });
});