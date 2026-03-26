"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/button";

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
    const [active, setActive] = useState<NotificationTab | string>("all");

    return (
        <main className="absolute top-12 right-0 w-[40vw] z-100 bg-card border border-border rounded-2xl shadow-xl p-4 flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex  justify-between items-center gap-2">
                <div className="flex items-center gap-3">
                    {TABS.map(tab => (
                        <AppButton
                            key={tab.key}
                            title={tab.label}
                            onClick={() => setActive(tab.key)}
                            size="sm"
                            variant={active === tab.key ? "default" : "outline"}
                            className={cn(
                                "rounded-lg border border-border transition-all",
                                active === tab.key
                                    ? "bg-accent text-white border-accent hover:bg-accent"
                                    : "bg-transparent text-foreground border-border  hover:text-accent hover:bg-transparent"
                            )}
                        />
                    ))}
                </div>
                {/* View All Button */}
                <AppButton
                    key={"viewAll"}
                    variant="outline"
                    href="/notification"
                    title="View All"
                    size="sm"
                    onClick={() => setActive("viewAll")}

                    className={cn(
                        "rounded-lg border border-border transition-all",
                        active === "viewAll"
                            ? "bg-accent text-white border-accent hover:bg-accent"
                            : "bg-transparent text-foreground border-border  hover:text-accent hover:bg-transparent"
                    )}
                />
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
        </main>
    );
}