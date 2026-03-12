// ── Types ─────────────────────────────────────────────────────────────────────
export type CampaignStatus = "Active" | "Paused" | "Draft" | "Completed";
export type DatePreset = "all" | "yesterday" | "last_week" | "last_month" | "last_year" | "custom";

export interface Campaign {
    campaignId: string;
    campaignName: string;
    webUrl: string;
    status: CampaignStatus;
    pageViews: number;
    duration: number;
    trafficSource: string;
    device: string;
    geoTargeting: string;
    startDate: string;
}

export interface DateFilterState {
    preset: DatePreset;
    from: string;
    to: string;
}

export const DATE_FILTER_DEFAULT: DateFilterState = {
    preset: "all",
    from: "",
    to: "",
};

export const PRESETS: { value: DatePreset; label: string }[] = [
    { value: "all", label: "All Time" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_week", label: "Last Week" },
    { value: "last_month", label: "Last Month" },
    { value: "last_year", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
];

// ── Mock Data ─────────────────────────────────────────────────────────────────
export const CAMPAIGN_DATA: Campaign[] = [
    { campaignId: "CMP-001", campaignName: "Summer Sale Blast", webUrl: "https://mystore.com/summer-sale", status: "Active", pageViews: 128400, duration: 30, trafficSource: "Google Ads", device: "Mobile", geoTargeting: "India", startDate: "2024-12-20" },
    { campaignId: "CMP-002", campaignName: "Brand Awareness Q2", webUrl: "https://mystore.com/brand", status: "Paused", pageViews: 54200, duration: 14, trafficSource: "Facebook", device: "Desktop", geoTargeting: "USA", startDate: "2024-12-10" },
    { campaignId: "CMP-003", campaignName: "Retargeting - Cart", webUrl: "https://mystore.com/cart", status: "Active", pageViews: 87600, duration: 21, trafficSource: "Instagram", device: "Mobile", geoTargeting: "Europe", startDate: "2025-01-05" },
    { campaignId: "CMP-004", campaignName: "New User Acquisition", webUrl: "https://mystore.com/signup", status: "Draft", pageViews: 0, duration: 7, trafficSource: "Organic", device: "Tablet", geoTargeting: "Global", startDate: "2025-01-15" },
    { campaignId: "CMP-005", campaignName: "Diwali Mega Offer", webUrl: "https://mystore.com/diwali", status: "Completed", pageViews: 310500, duration: 10, trafficSource: "Google Ads", device: "Mobile", geoTargeting: "India", startDate: "2024-11-01" },
    { campaignId: "CMP-006", campaignName: "Product Launch - X1", webUrl: "https://mystore.com/product/x1", status: "Active", pageViews: 43800, duration: 6, trafficSource: "LinkedIn", device: "Desktop", geoTargeting: "USA", startDate: "2025-01-20" },
    { campaignId: "CMP-007", campaignName: "Win-back Campaign", webUrl: "https://mystore.com/winback", status: "Active", pageViews: 19200, duration: 45, trafficSource: "Email", device: "Mobile", geoTargeting: "India", startDate: "2024-12-28" },
    { campaignId: "CMP-008", campaignName: "Flash Sale - 48hr", webUrl: "https://mystore.com/flash-sale", status: "Completed", pageViews: 205000, duration: 2, trafficSource: "Push Notif.", device: "Mobile", geoTargeting: "Global", startDate: "2024-12-15" },
    { campaignId: "CMP-009", campaignName: "Influencer Collab", webUrl: "https://mystore.com/influencer", status: "Paused", pageViews: 67300, duration: 28, trafficSource: "Instagram", device: "Mobile", geoTargeting: "Europe", startDate: "2025-01-08" },
    { campaignId: "CMP-010", campaignName: "Enterprise B2B Push", webUrl: "https://mystore.com/b2b", status: "Draft", pageViews: 0, duration: 9, trafficSource: "LinkedIn", device: "Desktop", geoTargeting: "USA", startDate: "2025-01-25" },
    { campaignId: "CMP-011", campaignName: "Holiday Bonanza", webUrl: "https://mystore.com/holiday", status: "Completed", pageViews: 189000, duration: 15, trafficSource: "Google Ads", device: "Mobile", geoTargeting: "Global", startDate: "2024-12-01" },
    { campaignId: "CMP-012", campaignName: "Spring Collection", webUrl: "https://mystore.com/spring", status: "Draft", pageViews: 0, duration: 30, trafficSource: "Instagram", device: "Mobile", geoTargeting: "Europe", startDate: "2025-02-01" },
    { campaignId: "CMP-013", campaignName: "Tech Summit Promo", webUrl: "https://mystore.com/tech-summit", status: "Active", pageViews: 32100, duration: 10, trafficSource: "LinkedIn", device: "Desktop", geoTargeting: "USA", startDate: "2025-01-18" },
    { campaignId: "CMP-014", campaignName: "Referral Boost", webUrl: "https://mystore.com/referral", status: "Paused", pageViews: 14500, duration: 60, trafficSource: "Email", device: "Mobile", geoTargeting: "India", startDate: "2024-11-20" },
    { campaignId: "CMP-015", campaignName: "Black Friday Push", webUrl: "https://mystore.com/black-friday", status: "Completed", pageViews: 420000, duration: 3, trafficSource: "Push Notif.", device: "Mobile", geoTargeting: "Global", startDate: "2024-11-29" },
];

// ── Date helpers ──────────────────────────────────────────────────────────────
function fmt(d: Date) {
    return d.toISOString().split("T")[0];
}

export function getPresetRange(preset: DatePreset): { from: string; to: string } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (preset === "yesterday") {
        const d = new Date(today); d.setDate(d.getDate() - 1);
        return { from: fmt(d), to: fmt(d) };
    }
    if (preset === "last_week") {
        const to = new Date(today); to.setDate(today.getDate() - 1);
        const from = new Date(today); from.setDate(today.getDate() - 7);
        return { from: fmt(from), to: fmt(to) };
    }
    if (preset === "last_month") {
        const to = new Date(today); to.setDate(today.getDate() - 1);
        const from = new Date(today); from.setMonth(today.getMonth() - 1);
        return { from: fmt(from), to: fmt(to) };
    }
    if (preset === "last_year") {
        const to = new Date(today); to.setDate(today.getDate() - 1);
        const from = new Date(today); from.setFullYear(today.getFullYear() - 1);
        return { from: fmt(from), to: fmt(to) };
    }
    return { from: "", to: "" };
}