const statusStyles: Record<string, string> = {
    Active:    "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    Paused:    "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    Draft:     "bg-muted text-muted-foreground border border-border",
    Completed: "bg-green-500/10 text-green-500 border border-green-500/20",
};

const statusDot: Record<string, string> = {
    Active:    "bg-blue-500 shadow-[0_0_6px_#3b82f6]",
    Paused:    "bg-yellow-500 shadow-[0_0_6px_#f59e0b]",
    Draft:     "bg-muted-foreground",
    Completed: "bg-green-500 shadow-[0_0_6px_#22c55e]",
};

export function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[status] ?? statusStyles.Draft}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status] ?? statusDot.Draft}`} />
            {status}
        </span>
    );
}
