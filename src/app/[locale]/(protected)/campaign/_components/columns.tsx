
import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "./status-badge";
import type { TFrontendCampaign } from "@/types/campaign";
import { ExternalLink } from "lucide-react";
import { TooltipContainer } from "../../create-campaign/_components/ui/tooltip-container";
export const columns: ColumnDef<TFrontendCampaign>[] = [
    {
        accessorKey: "campaignName",
        header: "Campaign Name",
        cell: ({ getValue }) => (
            <span>{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "webUrl",
        header: "Web URL",
        enableSorting: false,
        cell: ({ getValue }) => {
            const url = getValue() as string;
            if (!url) return <span className="text-muted-foreground text-xs">—</span>;
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent text-xs hover:underline max-w-[160px] truncate"
                >
                    <ExternalLink size={11} />
                    {url.replace(/^https?:\/\//, "")}
                </a>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
            <div className="flex items-center gap-1 relative ">
                <StatusBadge status={getValue() as string} />
                {getValue() as string === "PENDING" && (
                    <TooltipContainer title={getValue() as string}
                        description="Traffic may take up to 12 hours to begin. During this time, visitors are evaluated based on demographics, intent, and interests before being forwarded to your site."
                        position="right"
                    />
                )}
            </div>
        ),
    },
    {
        accessorKey: "trafficSource",
        header: "Traffic Source",
        cell: ({ getValue }) => (
            <span>{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "device",
        header: "Device",
        cell: ({ getValue }) => (
            <span>{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "country",
        header: "Geo Targeting",
        cell: ({ getValue }) => (
            <span>{(getValue() as string) || "Global"}</span>
        ),
    },
    {
        accessorKey: "pageViews",
        header: "Page Views",
        cell: ({ getValue }) => {
            const v = getValue() as number;
            return (
                <span>{v === 0 ? "—" : v.toLocaleString("en-IN")}</span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ getValue }) => (
            <span>
                {new Date(getValue() as string).toLocaleDateString("en-IN")}
            </span>
        ),
    },
];