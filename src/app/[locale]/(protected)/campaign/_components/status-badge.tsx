const statusStyles: Record<string, string> = {
    PENDING: "bg-muted text-muted-foreground border border-border",
    RUNNING: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
    COMPLETED: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
};
export function StatusBadge({ status }: { status: string }) {
    if (!status) return <span className="text-muted-foreground text-xs">—</span>;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[status] ?? statusStyles.Draft}`}>
            {status}
        </span>
    );
}
