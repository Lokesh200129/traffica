import mongoose, {  Document } from "mongoose";


// Campaign type for backend model
export interface TBackendCampaign extends Document {
    userId: mongoose.Types.ObjectId;
    campaignName: string;
    webUrl: string;
    pageViews: number;
    pageSize: number;
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
    status: "APPROVED" | "PENDING" | "REJECTED" | "COMPLETED";
    creditUsed: number;
}

// 
export interface TAgency {
    userId: mongoose.Types.ObjectId;
    agencyName: string;
    country: string;
    plan: string;
    services: string;
    website: string;
    createdAt: Date;
}

export interface TFrontendCampaign {
  _id: string;
  userId: string;
  campaignName: string;
  pageViews: number;
  geoType: "Global" | "Countries";
  country: string;
  trafficSource: string;
  device: string;
  createdAt: string;
  updatedAt: string;
}

// types/type.ts

export interface TCampaignFormData {
  campaignName: string;
  webUrl?: string;
  creditUsed: number;
  pageViews: number;
  trafficSource: string;
  device: string;
  country: string;
}
