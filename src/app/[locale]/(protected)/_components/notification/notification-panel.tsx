"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";

type NotificationTab = "all" | "campaigns" | "account";

const TABS: { key: NotificationTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "campaigns", label: "Campaigns" },
    { key: "account", label: "Account" },
];

interface NotificationPanelProps {
    onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
    const [active, setActive] = useState<NotificationTab>("all");

    return (
        <div className="absolute top-12 right-0 w-[40vw] z-50 bg-card border border-border rounded-2xl shadow-xl p-4 flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-2">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActive(tab.key)}
                        className={cn(
                            "px-4 py-1.5 rounded-lg text-sm font-medium border transition-all",
                            active === tab.key
                                ? "bg-accent text-white border-accent"
                                : "bg-transparent text-foreground border-border hover:border-accent/50 hover:text-accent"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-16 bg-background rounded-xl border border-border gap-3">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2645/2645890.png"
                    alt="No notifications"
                    className="w-16 h-16 object-contain"
                />
                <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-base font-bold text-foreground">No notifications yet</p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        You're all caught up! We'll let you know when something new comes in.
                    </p>
                </div>
            </div>
        </div>
    );
}