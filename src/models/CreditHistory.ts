import mongoose, { Schema, Document } from "mongoose";

export interface ICreditHistory extends Document {
    userId: mongoose.Types.ObjectId;
    type: "CREDIT" | "DEBIT";
    creditsAdded: number;        // ✅ amount → creditsAdded
    balanceBefore: number;
    balanceAfter: number;
    description: string;
    referenceId?: string;
    referenceType?: "TRANSACTION" | "CAMPAIGN" | "REFUND" | "MANUAL";
    createdAt: Date;
}

const CreditHistorySchema = new Schema<ICreditHistory>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ["CREDIT", "DEBIT"],
            required: true,
        },
        creditsAdded: {                  // ✅ amount → creditsAdded
            type: Number,
            required: true,
            min: 1,
        },
        balanceBefore: {
            type: Number,
            required: true,
            min: 0,
        },
        balanceAfter: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            required: true,
        },
        referenceId: {
            type: String,
        },
        referenceType: {
            type: String,
            enum: ["PAYMENT", "CAMPAIGN", "REFUND", "MANUAL"],
        },
    },
    { timestamps: true }
);

export const CreditHistory = mongoose.models.CreditHistory
    || mongoose.model<ICreditHistory>("CreditHistory", CreditHistorySchema);