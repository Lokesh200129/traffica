"use client"
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
    type Table,
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import {
    Table as ShadTable,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

// ── Sort Icon ─────────────────────────────────────────────────────────────────
function SortIcon({ direction }: { direction: string | false }) {
    if (!direction) return <ArrowUpDown size={12} className="" />;
    return (
        <span className="text-[11px] text-accent">
            {direction === "asc" ? "↑" : "↓"}
        </span>
    );
}

// ── Pagination ────────────────────────────────────────────────────────────────
function PaginationFooter<T>({
    table,
    totalLabel,
}: {
    table: Table<T>;
    totalLabel: string;
    sortHint?: boolean;
}) {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();
    // const sorting = table.getState().sorting;

    return (
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
                {table.getFilteredRowModel().rows.length} {totalLabel}
            </span>

            <div className="flex items-center gap-6 pr-8 ">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-muted-foreground hover:bg-accent/10 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={14} />
                </button>
                <span className="text-xs text-muted-foreground tabular-nums">
                    <span className="text-foreground font-medium">{currentPage}</span>
                    <span className="mx-1.5">of</span>
                    <span className="text-foreground font-medium">{totalPages}</span>
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-muted-foreground hover:bg-accent/10 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* {sortHint && (
                <span className="text-xs text-muted-foreground/40 hidden sm:block">
                    {sorting.length > 0
                        ? `Sorted by: ${sorting[0].id} (${sorting[0].desc ? "desc" : "asc"})`
                        : "Click column to sort"}
                </span>
            )} */}
        </div>
    );
}

// ── DataTable Props ───────────────────────────────────────────────────────────
interface DataTableProps<T> {
    // ── Data
    data: T[];
    columns: ColumnDef<T>[];
    pageSize?: number;         // default 10
    totalLabel?: string;         // e.g. "campaigns" | "transactions"
    toolbar?: React.ReactNode;
    sortHint?: boolean;
    title?: string;
    subTitle?: string;

    // ── Backend-ready flags (uncomment + pass when API connected)
    // manualFiltering?:  boolean;
    // manualSorting?:    boolean;
    // manualPagination?: boolean;
    // pageCount?:        number;
    // onSortChange?:     (sorting: SortingState) => void;
    // onPageChange?:     (pageIndex: number) => void;
}

// ── Main Component ────────────────────────────────────────────────────────────
export function DataTable<T>({
    data,
    columns,
    pageSize = 10,
    totalLabel = "rows",
    toolbar,
    sortHint = true,
    title,
    subTitle
}: DataTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // ↓ uncomment when backend ready
        // manualFiltering:   manualFiltering,
        // manualSorting:     manualSorting,
        // manualPagination:  manualPagination,
        // pageCount:         pageCount,
        initialState: { pagination: { pageSize, pageIndex: 0 } },
    });

    return (
        <div>
            {/*  toolbar — search, filters, etc */}
            <div className="pb-8 flex justify-between items-center relative z-50">
                <div>
                    <h1 className="text-2xl font-bold tracking-normal">{title}</h1>
                    <p className="text-sm text-muted-foreground mt-1">{subTitle}</p>
                </div>
                {toolbar && <div className="mb-4">{toolbar}</div>}
            </div>

            {/* Table */}
            <div className="border border-border">
                <div className="overflow-x-auto">
                    <ShadTable>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead
                                            key={header.id}
                                            onClick={header.column.getCanSort()
                                                ? header.column.getToggleSortingHandler()
                                                : undefined}
                                            className={[
                                                "bg-accent/10",
                                                header.column.getCanSort() ? "cursor-pointer select-none" : "",
                                                header.column.getIsSorted() ? "text-accent" : "text-muted-foreground",
                                            ].join(" ")}
                                        >
                                            <div className="flex items-center gap-1">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <SortIcon direction={header.column.getIsSorted()} />
                                                )}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="text-center py-12 text-muted-foreground text-sm"
                                    >
                                        No data found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                table.getRowModel().rows.map(row => (
                                    <TableRow
                                        key={row.id}
                                        className="hover:bg-accent/5 transition-colors"
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </ShadTable>
                </div>

                <PaginationFooter
                    table={table}
                    totalLabel={totalLabel}
                    sortHint={sortHint}
                />
            </div>
        </div>
    );
}