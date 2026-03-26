export interface FCampaign {
  _id: string;
  userId: string;
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
  createdAt: string;
  updatedAt: string;
}

// types/type.ts

export interface CampaignFormData {
  campaignName: string;
  webUrl?: string;
  creditUsed: number;
  pageViews: number;
  duration: FCampaign["duration"];
  trafficSource: string;
  device: string;
  country: string;
}