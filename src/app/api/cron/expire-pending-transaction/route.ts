import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/models/Transaction";
import { CreditHistory } from "@/models/CreditHistory";
import User from "@/models/User";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { connectDB } from "@/lib/db";

const cashfree = new Cashfree(
    process.env.CASHFREE_ENVIRONMENT === "production"
        ? CFEnvironment.PRODUCTION
        : CFEnvironment.SANDBOX,
    process.env.CASHFREE_CLIENT_ID!,
    process.env.CASHFREE_CLIENT_SECRET!
);

const TOKENS_PER_UNIT = 100;

export const GET = async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Fetch all pending transactions older than 1 hour
    const pendingTransactions = await Transaction.find({
        status: "PENDING",
        createdAt: { $lt: oneHourAgo },
    });

    const results = { success: 0, cancelled: 0, failed: 0 };

    for (const txn of pendingTransactions) {
        try {
            const response = await cashfree.PGFetchOrder(txn.orderId);
            const orderStatus = response.data.order_status;

            if (orderStatus === "PAID") {

                const paymentsResponse = await cashfree.PGOrderFetchPayments(txn.orderId);
                const successPayment = paymentsResponse.data?.find(
                    (p: any) => p.payment_status === "SUCCESS"
                );

                const tokensToAdd = txn.amount * TOKENS_PER_UNIT;

                // Update transaction
                await Transaction.findOneAndUpdate(
                    { _id: txn._id, status: "PENDING" },
                    {
                        status: "SUCCESS",
                        cfOrderId: response.data.cf_order_id?.toString(),
                        cfPaymentId: successPayment?.cf_payment_id?.toString(),
                        paymentMethod: successPayment?.payment_group,
                        creditsAdded: tokensToAdd,
                        rawResponse: response.data,
                    }
                );

                // Get current balance
                const currentUser = await User.findById(txn.userId).select("creditBalance.availableCredits");
                const balanceBefore = currentUser.creditBalance.availableCredits;
                const balanceAfter = balanceBefore + tokensToAdd;

                // Add credits to user
                await User.findByIdAndUpdate(txn.userId, {
                    $inc: { "creditBalance.availableCredits": tokensToAdd },
                    $set: {
                        "creditBalance.lastAdded": tokensToAdd,
                        "creditBalance.lastUpdatedAt": new Date(),
                    },
                });

                // Save credit history
                await CreditHistory.create({
                    userId: txn.userId,
                    type: "CREDIT",
                    creditsAdded: tokensToAdd,
                    balanceBefore,
                    balanceAfter,
                    description: `Purchased ${tokensToAdd.toLocaleString()} credits for $${txn.amount.toFixed(2)} (auto-recovered)`,
                    referenceType: "PAYMENT", 
                    referenceId: txn.orderId,
                });

                results.success++;
                console.log(`Recovered: ${txn.orderId}`);

            } else {
                //  Actually failed/expired 
                await Transaction.findByIdAndUpdate(txn._id, {
                    status: "FAILED",
                    rawResponse: response.data,
                });

                results.cancelled++;
                console.log(`CRON MARKED AS FAILED: ${txn.orderId}`);
            }

        } catch (err) {

            console.error(`Failed to process ${txn.orderId}:`, err);
            results.failed++;
        }
    }

    return NextResponse.json({ success: true, results });
};