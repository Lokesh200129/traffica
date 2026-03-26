import mongoose, { Schema, Document, Model } from "mongoose";
import { BCampaign } from "../../type";



const DurationSchema = new Schema(
    {
        mode: { type: String, enum: ["fixed", "random"], required: true },
        fixedSec: { type: Number, default: 0 },
        randomFrom: { type: Number, default: 0 },
        randomTo: { type: Number, default: 0 },
    },
    { _id: false }
);

const CampaignSchema = new Schema<BCampaign>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        campaignName: { type: String, required: true, trim: true },
        webUrl: { type: String, required: true, trim: true },
        pageViews: { type: Number, required: true, min: 0 },
        duration: { type: DurationSchema, required: true },
        // geoType: { type: String, enum: ["Global", "Countries"], default: "Global" },
        country: { type: String, default: "" },
        trafficSource: { type: String, required: true },
        device: { type: String, required: true },
        status: { type: String, enum: ["APPROVED", "PENDING", "REJECTED", "COMPLETED"], default: "PENDING" },
        creditUsed: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Campaign: Model<BCampaign> =
    mongoose.models.Campaign ?? mongoose.model<BCampaign>("Campaign", CampaignSchema);

export default Campaign;