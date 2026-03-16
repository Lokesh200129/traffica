"use client"
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/[locale]/(protected)/_components/data-table";
import type { CreditTransaction, CreditAction } from "../_lib/mock-data-type";
import { MOCK_CREDITS } from "../_lib/mock-data-type";

const actionStyles: Record<CreditAction, string> = {
    "Campaign Created": "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    "Credit Added": "bg-green-500/10 text-green-500 border border-green-500/20",
    "Refund": "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    "Bonus": "bg-purple-500/10 text-purple-500 border border-purple-500/20",
};
const actionDot: Record<CreditAction, string> = {
    "Campaign Created": "bg-blue-500",
    "Credit Added": "bg-green-500",
    "Refund": "bg-yellow-500",
    "Bonus": "bg-purple-500",
};

function ActionBadge({ action }: { action: CreditAction }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${actionStyles[action]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${actionDot[action]}`} />
            {action}
        </span>
    );
}

const columns: ColumnDef<CreditTransaction>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground text-xs tabular-nums">
                {new Date(getValue() as string).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric",
                })}
            </span>
        ),
    },
    {
        accessorKey: "credits",
        header: "Credits",
        cell: ({ getValue }) => {
            const val = getValue() as number;
            const isPositive = val > 0;
            return (
                <span className={`font-semibold tabular-nums ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? "+" : ""}{val.toLocaleString("en-IN")}
                </span>
            );
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ getValue }) => <ActionBadge action={getValue() as CreditAction} />,
    },
    {
        accessorKey: "campaignName",
        header: "Campaign",
        cell: ({ getValue }) => {
            const name = getValue() as string | undefined;
            if (!name) return <span className="text-muted-foreground/40 text-xs">—</span>;
            return <span className="text-sm text-foreground font-medium">{name}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground text-sm">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "balanceAfter",
        header: "Balance After",
        cell: ({ getValue }) => (
            <span className="text-sm tabular-nums text-foreground">
                ₹{(getValue() as number).toLocaleString("en-IN")}
            </span>
        ),
    },
];

interface CreditsTableProps {
    initialData?: CreditTransaction[];
}

export default function CreditsTable({ initialData = MOCK_CREDITS }: CreditsTableProps) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!search.trim()) return initialData;
        const q = search.toLowerCase();
        return initialData.filter(t =>
            t.description.toLowerCase().includes(q) ||
            t.action.toLowerCase().includes(q) ||
            (t.campaignName?.toLowerCase().includes(q) ?? false) ||
            t.date.includes(q)
        );
    }, [initialData, search]);

    return (
        <DataTable
            data={filtered}
            columns={columns}
            pageSize={8}
            totalLabel="credit entries"
            title="Credit History"
            subTitle="Track how your credits are earned and spent"
            toolbar={
                <div className="relative w-fit">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search credits..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-64"
                    />
                </div>
            }
        />
    );
}