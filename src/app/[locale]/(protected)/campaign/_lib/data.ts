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

// _lib/data.ts
export type CampaignStatus = "Active" | "Paused" | "Draft" | "Completed";
export type DatePreset = "all" | "yesterday" | "last_week" | "last_month" | "last_year" | "custom";

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
