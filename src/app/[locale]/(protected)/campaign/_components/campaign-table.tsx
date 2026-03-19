"use client"
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { DataTable } from "../../_components/data-table";
import { columns } from "./columns";
import { DateFilterDropdown } from "./date-filter-dropdown";
import { DATE_FILTER_DEFAULT, type DateFilterState } from "../_lib/data";
import { useGetCampaigns } from "@/hooks/campaign/use-fetch-all-campaigns";

export function CampaignTable() {
    const { data: campaigns } = useGetCampaigns();
    const [nameFilter, setNameFilter] = useState("");
    const [dateFilter, setDateFilter] = useState<DateFilterState>(DATE_FILTER_DEFAULT);

    const filtered = useMemo(() => {
        let data = campaigns?.campaigns || [];

        if (nameFilter.trim()) {
            const q = nameFilter.toLowerCase();
            data = data.filter(d => d.campaignName.toLowerCase().includes(q));
        }

        if (dateFilter.from && dateFilter.to) {
            const from = new Date(dateFilter.from);
            const to = new Date(dateFilter.to);
            to.setHours(23, 59, 59, 999);
            data = data.filter(d => {
                const date = new Date(d.createdAt); // ✅ startDate → createdAt
                return date >= from && date <= to;
            });
        }

        return data;
    }, [campaigns, nameFilter, dateFilter]);

    const hasActiveFilters = nameFilter || dateFilter.preset !== "all";

    return (
        <DataTable
            data={filtered}
            columns={columns as any}
            pageSize={10}
            totalLabel="campaigns"
            title="Campaign Performance"
            subTitle="Detailed insights into your creator traffic and conversion metrics."
            toolbar={
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={nameFilter}
                            onChange={e => setNameFilter(e.target.value)}
                            className="pl-8 pr-8 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-52"
                        />
                        {nameFilter && (
                            <button
                                onClick={() => setNameFilter("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <DateFilterDropdown value={dateFilter} onChange={setDateFilter} />
                        {hasActiveFilters && (
                            <button
                                onClick={() => { setNameFilter(""); setDateFilter(DATE_FILTER_DEFAULT); }}
                                className="text-xs text-accent hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            }
        />
    );
}