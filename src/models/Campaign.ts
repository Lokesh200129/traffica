import mongoose, { Schema, Document, model, models } from "mongoose";
import { randomBytes } from "crypto";

const generateCampaignId = () => `camp_${randomBytes(6).toString("hex")}`;

const RangeItemSchema = new Schema(
    {
        value: { type: String, required: true },
        percentage: { type: Number, required: true, min: 0, max: 100 },
        keyword: { type: String, default: "" },
    },
    { _id: false }
);

const DurationSchema = new Schema(
    {
        mode: { type: String, enum: ["fixed", "random"], required: true },
        fixedSec: { type: Number, default: 0 },
        randomFrom: { type: Number, default: 0 },
        randomTo: { type: Number, default: 0 },
    },
    { _id: false }
);

export interface ICampaign extends Document {
    campaignId: string;
    campaignName: string;
    pageViews: number;
    duration: { mode: string; fixedSec: number; randomFrom: number; randomTo: number };
    trafficSources: { value: string; percentage: number; keyword?: string }[];
    devices: { value: string; percentage: number }[];
    country: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>(
    {
        campaignId: { type: String, unique: true, default: generateCampaignId },
        campaignName: { type: String, required: true, trim: true },
        pageViews: { type: Number, required: true, min: 0 },
        duration: { type: DurationSchema, required: true },
        trafficSources: { type: [RangeItemSchema], default: [] },
        devices: { type: [RangeItemSchema], default: [] },
        country: { type: String, default: "" },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Campaign = models.Campaign || model<ICampaign>("Campaign", CampaignSchema);
export default Campaign;