import mongoose, { Schema } from "mongoose";
import { ITransaction } from "@/types/billing";


const TransactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderId: {
            type: String,
            required: true,
            unique: true
        },
        paymentSessionId: {
            type: String
        },
        cfOrderId: {
            type: String
        },
        amount: {
            type: Number,
            min: 1,
            required: true
        },
        currency: {
            type: String,
            required: true,
            default: "USD"
        },
        creditsAdded: {
            type: Number,
            min: 1,
        },
        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
            default: "PENDING",
        },
        paymentMethod: {
            type: String
        },
        rawResponse: {
            type: Schema.Types.Mixed
        },
        cfPaymentId: {
            type: String,  // ✅ actual payment transaction id from Cashfree
        },
      
    },
    { timestamps: true }
);


export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);