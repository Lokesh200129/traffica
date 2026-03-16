"use client"
import { useMemo, useState } from "react";
import { Search, FileText } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/[locale]/(protected)/_components/data-table";
import type { BillingTransaction,  TransactionType } from '../_lib/mock-data-type.ts';
import { MOCK_TRANSACTIONS } from "../_lib/mock-data-type";

const typeStyles: Record<TransactionType, string> = {
    Purchase: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    Credit: "bg-green-500/10 text-green-500 border border-green-500/20",
    Debit: "bg-red-500/10 text-red-500 border border-red-500/20",
    Refund: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
};
const typeDot: Record<TransactionType, string> = {
    Purchase: "bg-blue-500",
    Credit: "bg-green-500",
    Debit: "bg-red-500",
    Refund: "bg-yellow-500",
};

function TypeBadge({ type }: { type: TransactionType }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeStyles[type]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${typeDot[type]}`} />
            {type}
        </span>
    );
}

const columns: ColumnDef<BillingTransaction>[] = [
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
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const { amount, type } = row.original;
            const sign = type === "Debit" ? "-" : type === "Credit" || type === "Refund" ? "+" : "";
            const color = type === "Credit" || type === "Refund" ? "text-green-500"
                : type === "Debit" ? "text-red-500"
                    : "text-foreground";
            return <span className={`font-semibold tabular-nums ${color}`}>{sign}₹{amount.toLocaleString("en-IN")}</span>;
        },
    },
    {
        accessorKey: "reference",
        header: "Reference",
        cell: ({ getValue }) => (
            <span className="font-mono text-accent text-xs">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => <TypeBadge type={getValue() as TransactionType} />,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
            <span className="text-muted-foreground text-sm">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "invoiceUrl",
        header: "Invoice",
        enableSorting: false,
        cell: ({ getValue }) => {
            const url = getValue() as string | undefined;
            if (!url) return <span className="text-muted-foreground/40 text-xs">—</span>;
            return (
                <a href={url} className="inline-flex items-center gap-1 text-accent text-xs hover:underline" target="_blank" rel="noopener noreferrer">
                    <FileText size={12} /> Download
                </a>
            );
        },
    },
];

interface PaymentsTableProps {
    initialData?: BillingTransaction[];
}

 function PaymentsTab({ initialData = MOCK_TRANSACTIONS }: PaymentsTableProps) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!search.trim()) return initialData;
        const q = search.toLowerCase();
        return initialData.filter(t =>
            t.description.toLowerCase().includes(q) ||
            t.reference.toLowerCase().includes(q) ||
            t.date.includes(q)
        );
    }, [initialData, search]);

    return (
        <DataTable
            data={filtered}
            columns={columns}
            pageSize={8}
            totalLabel="transactions"
            title="Payment History"
            subTitle="All your payment transactions"
            toolbar={
                <div className="relative w-fit">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent w-64"
                    />
                </div>
            }
        />
    );
}

export default PaymentsTab;