
import { apiSuccess } from "@/lib/api-response";
import withAuth from "@/lib/try-catch-with-auth";
import { Transaction } from "@/models/Transaction";
import { Cashfree, CFEnvironment } from "cashfree-pg"; 
import { getUsdToInr } from "@/lib/currency-exchange-rate";

const cashfree = new Cashfree(
	process.env.CASHFREE_ENVIRONMENT === "production"
		? CFEnvironment.PRODUCTION
		: CFEnvironment.SANDBOX,
	process.env.CASHFREE_CLIENT_ID!,
	process.env.CASHFREE_CLIENT_SECRET!
);

export const POST = withAuth(async (req: Request, user) => {
	const body = await req.json();
	const { amount, customerId, customerPhone, customerEmail } = body;

	const orderId = `order_${Date.now()}`; // ✅ generate once

	 const usdToInr = await getUsdToInr();
    const amountInInr = parseFloat((amount * usdToInr).toFixed(2)); 

	await Transaction.create({
		userId: user._id,
		orderId,
		amount,
		status: "PENDING",
		currency: "USD",

	});

	const request = {
		order_amount: amountInInr,
		order_currency: "INR",
		order_id: orderId,
		customer_details: {
			customer_id: customerId || "guest",
			customer_phone: customerPhone || "9999999999",
			customer_email: customerEmail || "",
		},
		order_meta: {
			return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?order_id={order_id}`,
		},
	};

	const response = await cashfree.PGCreateOrder(request);
	
	await Transaction.findOneAndUpdate(
		{ orderId },
		{ paymentSessionId: response.data.payment_session_id }
	);
	return apiSuccess({
		payment_session_id: response.data.payment_session_id,
		order_id: response.data.order_id,
	});
});