"use client";
import { useCreditHistory } from "@/hooks/credit/use-get-credit-history";
import { DataTable } from "@/app/[locale]/(protected)/_components/data-table";
import type { ColumnDef } from "@tanstack/react-table";

type CreditHistoryItem = {
    _id: string;
    type: "CREDIT" | "DEBIT";
    creditsAdded: number;
    balanceBefore: number;
    balanceAfter: number;
    description: string;
    referenceType: "PAYMENT" | "CAMPAIGN";
    createdAt: string;
};

const columns: ColumnDef<CreditHistoryItem>[] = [
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ getValue }) => (
            <div className="flex flex-col gap-0.5">
                <span className="text-sm tabular-nums">
                    {new Date(getValue() as string).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                    })}
                </span>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                    {new Date(getValue() as string).toLocaleTimeString("en-IN", {
                        hour: "2-digit", minute: "2-digit", hour12: false,
                    })}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ getValue }) => {
            const type = getValue() as string;
            return (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${type === "CREDIT"
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${type === "CREDIT" ? "bg-green-500" : "bg-red-500"}`} />
                    {type === "CREDIT" ? "Added" : "Debit"}
                </span>
            );
        },
    },
    {
        accessorKey: "creditsAdded",
        header: "Credits",
        cell: ({ row }) => {
            const { type, creditsAdded } = row.original;
            return (
                <span className={`font-semibold tabular-nums ${type === "CREDIT" ? "text-green-500" : "text-red-500"}`}>
                    {type === "CREDIT" ? "+" : "-"}{creditsAdded.toLocaleString()}
                </span>
            );
        },
    },
    {
        accessorKey: "balanceAfter",
        header: "Current Credits",
        cell: ({ getValue }) => (
            <span className="font-medium tabular-nums">
                {(getValue() as number).toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        enableSorting: false,
        cell: ({ getValue }) => (
            <span className="text-sm text-muted-foreground">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "referenceType",
        header: "referenceType",
        cell: ({ getValue }) => {
            const referenceType = getValue() as string;
            return (
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${referenceType === "PAYMENT"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-purple-500/10 text-purple-500"
                    }`}>
                    {referenceType}
                </span>
            );
        },
    },
];

export default function CreditHistoryTab() {
    const {
        history,
        pagination,
        isLoading,
        isFetching,
        page,
        nextPage,
        prevPage,
    } = useCreditHistory();

    return (
        <DataTable
            data={history}
            columns={columns}
            totalLabel="entries"
            title="Credit History"
            subTitle="All your credit transactions"
            isLoading={isLoading}
            isFetching={isFetching}
            page={page}
            pageCount={pagination?.pageCount}
            total={pagination?.total}
            onNext={nextPage}
            onPrev={prevPage}
        />
    );
}