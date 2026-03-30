
"use client"
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown, Loader2 } from "lucide-react";
import {
    Table as ShadTable,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    totalLabel?: string;
    toolbar?: React.ReactNode;
    title?: string;
    subTitle?: string;
    isLoading?: boolean;
    isFetching?: boolean;
    page?: number;
    pageCount?: number;
    total?: number;
    pageSize?: number;
    onNext?: () => void;
    onPrev?: () => void;
}

export function DataTable<T>({
    data,
    columns,
    totalLabel = "rows",
    toolbar,
    title,
    subTitle,
    isLoading = false,
    isFetching = false,
    page,
    pageCount,
    total,
    onNext,
    onPrev,
}: DataTableProps<T>) {

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },                        //  table ko current sort state batao
        onSortingChange: setSorting,               //  jab user click kare toh state update ho
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),    //  current page ka data sort karo
    });

    const hasPagination = onNext !== undefined || onPrev !== undefined;

    return (
        <div>
            {/* Header */}
            {(title || toolbar) && (
                <div className="pb-8 flex flex-col gap-8 md:flex-row justify-between items-center">
                    <div>
                        {title && <h1 className="text-2xl font-bold tracking-normal">{title}</h1>}
                        {subTitle && <p className="text-sm text-muted-foreground mt-1">{subTitle}</p>}
                    </div>
                    {toolbar && <div >{toolbar}</div>}
                </div>
            )}

            {/* Table */}
            <div className="border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <ShadTable>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead
                                            key={header.id}
                                            // ✅ click handler — sortable columns pe hi lagao
                                            onClick={header.column.getCanSort()
                                                ? header.column.getToggleSortingHandler()
                                                : undefined}
                                            className={[
                                                "bg-accent/10 select-none",
                                                // ✅ sortable column pe pointer cursor
                                                header.column.getCanSort() ? "cursor-pointer" : "",
                                                // ✅ active sort column accent color mein
                                                header.column.getIsSorted() ? "text-accent" : "text-primary",
                                            ].join(" ")}
                                        >
                                            <div className="flex items-center gap-1">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {/* ✅ sort icon — sirf sortable columns pe */}
                                                {header.column.getCanSort() && (
                                                    header.column.getIsSorted()
                                                        // sorted hai — arrow dikhao
                                                        ? <span className="text-[11px] text-accent">
                                                            {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                                                        </span>
                                                        // sorted nahi — neutral icon
                                                        : <ArrowUpDown size={12} className="text-muted-foreground" />
                                                )}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="py-12">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Loader2 size={16} className="animate-spin" />
                                            <span className="text-sm">Loading...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="text-center py-12 text-muted-foreground text-sm"
                                    >
                                            No {totalLabel} found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                table.getRowModel().rows.map(row => (
                                    <TableRow
                                        key={row.id}
                                        className={`hover:bg-accent/5 transition-colors ${isFetching ? "opacity-60" : ""}`}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="text-foreground/80">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </ShadTable>
                </div>

                {/* Pagination Footer */}
                {hasPagination && (
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            {total ?? 0} {totalLabel}
                        </span>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={onPrev}
                                disabled={page === 1 || isFetching || isLoading}
                                className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-foreground hover:bg-accent/10 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <span className="text-xs text-muted-foreground tabular-nums">
                                <span className="text-foreground font-medium">{page}</span>
                                <span className="mx-1.5">of</span>
                                <span className="text-foreground font-medium">{pageCount}</span>
                            </span>
                            <button
                                onClick={onNext}
                                disabled={page === pageCount || isFetching || isLoading}
                                className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-foreground hover:bg-accent/10 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}