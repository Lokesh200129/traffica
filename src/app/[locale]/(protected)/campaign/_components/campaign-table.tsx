"use client"
import { useEffect, useState } from "react";
import { Search, X, Plus } from "lucide-react";
import { DataTable } from "../../_components/data-table";
import { columns } from "./columns";
import { DateFilterDropdown } from "./date-filter-dropdown";
import { DATE_FILTER_DEFAULT, type DateFilterState } from "../_lib/data";
import { useGetCampaigns } from "@/hooks/campaign/use-fetch-all-campaigns";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/button";
import { useDebounce } from "@/hooks/use-debounce";

export function CampaignTable() {
    const [nameFilter, setNameFilter] = useState("");
    const [dateFilter, setDateFilter] = useState<DateFilterState>(DATE_FILTER_DEFAULT);
    const [page, setPage] = useState(1);

    const debouncedName = useDebounce(nameFilter, 500);
    const { data } = useGetCampaigns({ page, name: debouncedName, dateFilter });

    const campaigns = data?.campaigns || [];
    const pageCount = data?.pagination?.totalPages ?? 1;
    const total = data?.pagination?.total ?? 0;

    useEffect(() => { setPage(1); }, [nameFilter, dateFilter]);

    const hasActiveFilters = nameFilter || dateFilter.preset !== "all";

    return (
        <DataTable
            data={campaigns}
            columns={columns as any}
            totalLabel="campaigns"
            total={total}
            page={page}
            pageCount={pageCount}
            onNext={() => setPage(p => p + 1)}
            onPrev={() => setPage(p => p - 1)}
            title="Campaign Performance"
            subTitle="Detailed insights into your creator traffic and conversion metrics."
            toolbar={
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <AppButton
                        title="Create"
                        href="/create-campaign"
                        icon={Plus}
                        className="rounded-md"
                    />
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Search campaigns..."
                            value={nameFilter}
                            onChange={e => setNameFilter(e.target.value)}
                            className="pl-8"
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