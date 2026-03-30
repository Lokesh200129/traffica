// import type { ColumnDef } from "@tanstack/react-table";
// import { StatusBadge } from "./status-badge";
// import type { FCampaign } from "../../_types/type";

// export const columns: ColumnDef<FCampaign>[] = [
//     {
//         accessorKey: "campaignName",
//         header: "Campaign Name",
//         cell: ({ getValue }) => (
//             <span >{getValue() as string}</span>
//         ),
//     },
//     {
//         accessorKey: "trafficSource",
//         header: "Traffic Source",
//         cell: ({ getValue }) => (
//             <span >
//                 {getValue() as string}
//             </span>
//         ),
//     },

//     {
//         accessorKey: "device",
//         header: "Device",
//         cell: ({ getValue }) => (
//             <span >{getValue() as string}</span>
//         ),
//     },
//     {
//         accessorKey: "country",
//         header: "Geo Targeting",
//         cell: ({ getValue }) => (
//             <span >{(getValue() as string) || "Global"}</span>
//         ),
//     },
//     {
//         accessorKey: "pageViews",
//         header: "Page Views",
//         cell: ({ getValue }) => {
//             const v = getValue() as number;
//             return (
//                 <span >
//                     {v === 0 ? "—" : v.toLocaleString("en-IN")}
//                 </span>
//             );
//         },
//     },
//     {
//         accessorKey: "duration",
//         header: "Duration",
//         cell: ({ row }) => {
//             const d = row.original.duration;
//             return (
//                 <span >
//                     {d.mode === "fixed"
//                         ? `${d.fixedSec}s`
//                         : `${d.randomFrom}s – ${d.randomTo}s`}
//                 </span>
//             );
//         },
//     },
//     {
//         accessorKey: "createdAt",
//         header: "Created",
//         cell: ({ getValue }) => (
//             <span >
//                 {new Date(getValue() as string).toLocaleDateString("en-IN")}
//             </span>
//         ),
//     },
// ];
import type { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "./status-badge";
import type { FCampaign } from "../../_types/type";
import { ExternalLink } from "lucide-react";

export const columns: ColumnDef<FCampaign>[] = [
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
            <StatusBadge status={getValue() as string} />
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