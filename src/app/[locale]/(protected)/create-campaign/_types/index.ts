export type SaveStatus = "saving" | "saved" | null;

export type DurationMode = "fixed" | "random";

// export interface DurationValue {
//   mode: DurationMode;
//   fixedSec: number;
//   randomFrom: number;
//   randomTo: number;
// }

export interface TooltipInfo {
  title: string;
  description: string;
}

// export interface CampaignFormData {
//   campaignName: string;
//   pageViews: number;
//   duration: DurationValue;
//   trafficSource: string;
//   device: string;
//   country: string; // empty = Global
// }

// export type SummaryData = CampaignFormData;