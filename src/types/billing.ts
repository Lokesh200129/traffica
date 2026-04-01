
import mongoose, { Document } from "mongoose";

export interface IBillingDetail extends Document {
    userId: mongoose.Types.ObjectId;
    companyName: string;
    gstin: string;
    billingEmail: string;
    companyAddress: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    sendInvoices: boolean;
}

// Transaction Type

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    orderId: string; // Cashfree order_id
    paymentSessionId?: string;
    cfOrderId?: string; // Cashfree ka internal reference ID
    amount: number; // Dollar amount (e.g. 10.50)
    currency?: string; // "USD"
    creditsAdded: number; // Kitne credits mile (e.g. 10500)
    status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
    paymentMethod?: string; // card, upi, etc.
    rawResponse?: any; // Cashfree ka poora webhook response save karne ke liye
    createdAt: Date;
    updatedAt: Date;
    cfPaymentId?: string; // ✅ actual payment transaction id from Cashfree


}
