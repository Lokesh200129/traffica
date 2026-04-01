"use client"
import { Search } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/[locale]/(protected)/_components/data-table";
import { useTransactions } from "@/hooks/payment/use-get-transaction";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Status = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

interface Transaction {
    _id: string;
    orderId: string;
    cfPaymentId?: string;
    amount: number;
    creditsAdded: number;
    status: Status;
    paymentMethod?: string;
    createdAt: string;
}

const statusStyles: Record<Status, string> = {
    SUCCESS: "bg-green-500/10 text-green-500 border border-green-500/20",
    FAILED: "bg-red-500/10 text-red-500 border border-red-500/20",
    PENDING: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    CANCELLED: "bg-gray-500/10 text-gray-500 border border-gray-500/20",
};

const statusDot: Record<Status, string> = {
    SUCCESS: "bg-green-500",
    FAILED: "bg-red-500",
    PENDING: "bg-yellow-500",
    CANCELLED: "bg-gray-500",
};

function StatusBadge({ status }: { status: Status }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status]}`} />
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    );
}

const columns: ColumnDef<Transaction>[] = [
    // {
    //     accessorKey: "createdAt",
    //     header: "Date",
    //     cell: ({ getValue }) => (
    //         <span className="text-muted-foreground text-xs tabular-nums">
    //             {new Date(getValue() as string).toLocaleDateString("en-IN", {
    //                 day: "2-digit", month: "short", year: "numeric",
    //             })}
    //         </span>
    //     ),
    // },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ getValue }) => (
            <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground tabular-nums">
                    {new Date(getValue() as string).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                    })}
                </span>
                <span className="text-[11px] text-foreground tabular-nums">
                    {new Date(getValue() as string).toLocaleTimeString("en-IN", {
                        hour: "2-digit", minute: "2-digit", hour12: false,
                    })}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => (
            <span className="font-semibold tabular-nums text-foreground">
                $ {(getValue() as number).toLocaleString("en-IN")}
            </span>
        ),
    },
    {
        accessorKey: "creditsAdded",
        header: "Credit Added",
        cell: ({ getValue }) => {
            const credits = getValue() as number;
            return credits
                ? <span className="font-semibold text-green-500">+{credits.toLocaleString()}</span>
                : <span className="text-muted-foreground/40 text-xs">—</span>
        },
    },
    {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ getValue }) => (
            <span className="font-mono text-accent text-xs">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "paymentMethod",
        header: "Method",
        cell: ({ getValue }) => {
            const method = getValue() as string | undefined;
            return method
                ? <span className="text-sm text-muted-foreground capitalize">{method.toLowerCase()}</span>
                : <span className="text-muted-foreground/40 text-xs">—</span>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => <StatusBadge status={getValue() as Status} />,
    },
];

export default function PaymentsTab() {
    const [search, setSearch] = useState("");

    const {
        transactions,
        pagination,
        isLoading,
        isFetching,
        page,
        nextPage,
        prevPage,
    } = useTransactions();

    // client-side search on current page only
    const filtered = search.trim()
        ? transactions.filter(t =>
            t.orderId.toLowerCase().includes(search.toLowerCase()) ||
            t.paymentMethod?.toLowerCase().includes(search.toLowerCase())
        )
        : transactions;


    return (
        <DataTable
            data={filtered}
            columns={columns as any}
            totalLabel="transactions"
            title="Payment History"
            subTitle="All your payment transactions"
            isLoading={isLoading}
            isFetching={isFetching}
            page={page}
            pageCount={pagination?.pageCount}
            total={pagination?.total}
            onNext={nextPage}
            onPrev={prevPage}
            toolbar={
                <div className="relative w-64">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                    <Input
                        type="text"
                        placeholder="Search by order ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>
            }
        />
    );
}