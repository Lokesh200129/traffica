export type SaveStatus = "saving" | "saved" | null;
export type GeoType = "Global" | "Countries";

export interface RangeItem {
  id: string;
  value: string;
  percentage: number;
  keyword?: string;
}

export interface UrlConfig {
  entryUrls: string;
  entryCrawl: boolean;
  innerUrls: string;
  innerCrawl: boolean;
}

export type DurationMode = "fixed" | "random";

export interface DurationValue {
  mode: DurationMode;
  /** Fixed interval — single value in seconds */
  fixedSec: number;
  /** Randomised interval — lower bound in seconds */
  randomFrom: number;
  /** Randomised interval — upper bound in seconds */
  randomTo: number;
}

export interface TooltipInfo {
  title: string;
  description: string;
}

/** The complete payload emitted on form submit */
export interface CampaignFormData {
  campaignName: string;
  pageViews: number;
  duration: DurationValue;
  urlConfig: UrlConfig;
  trafficSources: RangeItem[];
  devices: RangeItem[];
  geoType: GeoType;
  countries: string[];
}

/** Alias — sidebar accepts the same shape as the form payload */
export type SummaryData = CampaignFormData;