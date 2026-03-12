"use client"
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SidebarTab } from "./sidebar-config";

interface BillingDropdownProps {
    tab: SidebarTab;
    pathname: string;
}

export function BillingDropdown({ tab, pathname }: BillingDropdownProps) {
    const Icon = tab.icon;

    // ✅ strip locale prefix
    const strippedPathname = pathname.replace(/^\/(en|hi|fr)/, "") || "/";
    const isChildActive = tab.dropdown?.some(d => strippedPathname === d.href) ?? false;
    const [open, setOpen] = useState(isChildActive);

    return (
        <div>
            {/* Trigger — no navigation, toggle only */}
            <Button
                variant="ghost"
                onClick={() => setOpen(o => !o)}
                className={cn(
                    "w-full justify-start gap-3 text-sm h-11 transition-all cursor-pointer",
                    isChildActive
                        ? "text-accent bg-accent/10 border-l-4 border-accent rounded-none"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted border-l-4 border-transparent"
                )}
            >
                <Icon size={18} />
                <span className="flex-1 text-left">{tab.title}</span>
                <ChevronDown
                    size={14}
                    className={cn(
                        "text-muted-foreground transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </Button>

            {/* Dropdown items */}
            {open && (
                <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-border pl-3">
                    {tab.dropdown?.map(item => {
                        const ItemIcon = item.icon;
                        const active = strippedPathname === item.href;
                        return (
                            <Link key={item.title} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-2.5 text-xs h-9 transition-all",
                                        active
                                            ? "text-accent bg-accent/10 border-l-2 border-accent rounded-none"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    <ItemIcon size={14} />
                                    {item.title}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}