"use client"
import { cn } from "@/lib/utils";

export type BillingTab = "payments" | "credits";

interface BillingToggleProps {
    active: BillingTab;
    onChange: (_tab: BillingTab) => void;
}

const TABS: { key: BillingTab; label: string }[] = [
    { key: "payments", label: "Payments" },
    { key: "credits", label: "Credits" },
];

export function BillingToggle({ active, onChange }: BillingToggleProps) {
    return (
        <div className="inline-flex rounded-2xl border border-accent/20  p-1 gap-1">
            {TABS.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={cn(
                        "px-5 py-2 rounded-xl text-sm font-medium transition-all w-full",
                        active === tab.key
                            ? "bg-accent text-white shadow-sm border border-accent/20"
                            : "text-foreground/60 hover:text-foreground"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}