"use client"
import { Home, MessageSquare, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HelpTabs } from "./types/help-widget-types";

const TABS: { id: HelpTabs; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "help", label: "Help", icon: HelpCircle },
];

interface BottomNavProps {
    active: HelpTabs;
    onChange: (_t: HelpTabs) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
    return (
        <div className="flex border-t border-border bg-card">
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "flex-1 flex flex-col items-center gap-1 py-3 transition-colors",
                        active === tab.id
                            ? "text-accent"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <tab.icon
                        size={18}
                        fill={active === tab.id ? "currentColor" : "none"}
                        strokeWidth={1.5}
                    />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
