export type SaveStatus = "saving" | "saved" | null;

export interface RangeItem {
  id: string;
  value: string;
  percentage: number;
  keyword?: string;
}

export type DurationMode = "fixed" | "random";

export interface DurationValue {
  mode: DurationMode;
  fixedSec: number;
  randomFrom: number;
  randomTo: number;
}

export interface TooltipInfo {
  title: string;
  description: string;
}

export interface CampaignFormData {
  campaignName: string;
  pageViews: number;
  duration: DurationValue;
  trafficSources: RangeItem[];
  devices: RangeItem[];
  country: string; // single country, empty = Global
  geoType: string;
}

export type SummaryData = CampaignFormData;