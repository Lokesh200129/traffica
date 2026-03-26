import mongoose, { Schema, Document } from "mongoose";
import { IBillingDetail } from "../../type";


const BillingDetailSchema = new Schema<IBillingDetail>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        companyName: {
            type: String,
            default: ""
        },
        gstin: {
            type: String,
            default: ""
        },
        billingEmail: {
            type: String,
            default: ""
        },
        companyAddress: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        postalCode: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        sendInvoices: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export const BillingDetail = mongoose.models.BillingDetail ||
    mongoose.model<IBillingDetail>("BillingDetail", BillingDetailSchema);