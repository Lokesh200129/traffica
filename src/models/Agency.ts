import mongoose, { Schema } from "mongoose";
import { TAgency } from "@/types/campaign";


const AgencySchema = new Schema<TAgency>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        agencyName: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        plan: {
            type: String,
            required: true
        },
        services: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true,
            trim: true
        },
    },
    { timestamps: true }
);

export const Agency = mongoose.models.Agency || mongoose.model<TAgency>("Agency", AgencySchema);