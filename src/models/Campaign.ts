import mongoose, { Schema, Model } from "mongoose";
import { TBackendCampaign } from "@/types/campaign";

const CampaignSchema = new Schema<TBackendCampaign>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        campaignName: { type: String, required: true, trim: true },
        webUrl: { type: String, required: true, trim: true },
        pageViews: { type: Number, required: true, min: 0 },
        country: { type: String, default: "" },
        trafficSource: { type: String, required: true },
        device: { type: String, required: true },
        status: { type: String, enum: ["PENDING", "RUNNING", "COMPLETED"], default: "PENDING" },
        creditUsed: { type: Number, default: 0 },
    },
    { timestamps: true }
);

CampaignSchema.index({ userId: 1, createdAt: -1 });
CampaignSchema.index({ userId: 1, campaignName: 1 });

const Campaign: Model<TBackendCampaign> =
    mongoose.models.Campaign ?? mongoose.model<TBackendCampaign>("Campaign", CampaignSchema);

export default Campaign; 