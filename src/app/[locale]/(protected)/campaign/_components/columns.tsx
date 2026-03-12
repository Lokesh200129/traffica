import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { Campaign } from "../_lib/data";

export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: "campaignId",
        header: "Campaign ID",
        cell: ({ getValue }) => (
            <span className="font-mono text-accent text-xs">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "campaignName",
        header: "Campaign Name",
        cell: ({ getValue }) => (
            <span className="text-foreground font-medium">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "webUrl",
        header: "Web URL",
        cell: ({ getValue }) => {
            const url = getValue() as string;
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:underline underline-offset-2 max-w-40 truncate"
                    title={url}
                >
                    <span className="truncate">{url.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink size={11} className="shrink-0" />
                </a>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
        accessorKey: "pageViews",
        header: "Page Views",
        cell: ({ getValue }) => {
            const v = getValue() as number;
            return (
                <span className="text-foreground/70">
                    {v === 0 ? "—" : v.toLocaleString("en-IN")}
                </span>
            );
        },
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() as number}d</span>
        ),
    },
    {
        accessorKey: "trafficSource",
        header: "Traffic Source",
        cell: ({ getValue }) => (
            <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">
                {getValue() as string}
            </span>
        ),
    },
    {
        accessorKey: "device",
        header: "Device",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "geoTargeting",
        header: "Geo Targeting",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue() as string}</span>
        ),
    },
];