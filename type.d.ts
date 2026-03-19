import mongoose, { Schema, Document, Model } from "mongoose";

type TUser = {
    _id?: string,
    username?: string,
    name?: string,
    email?: string,
    password?: string,
    bio?: string,
    location?: string,
    profileImage?: string
}

interface BCampaign extends Document {
    userId: mongoose.Types.ObjectId;
    campaignName: string;
    pageViews: number;
    duration: {
        mode: "fixed" | "random";
        fixedSec: number;
        randomFrom: number;
        randomTo: number;
    };
    geoType: "Global" | "Countries";
    country: string;
    trafficSource: string;
    device: string;
    createdAt: Date;
    updatedAt: Date;
}