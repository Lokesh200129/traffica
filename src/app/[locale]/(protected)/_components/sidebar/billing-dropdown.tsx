"use client"
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SidebarTab } from "./sidebar-config";
import { useTranslations } from "next-intl";

interface BillingDropdownProps {
    tab: SidebarTab;
    pathname: string;
}

export function BillingDropdown({ tab, pathname }: BillingDropdownProps) {
    const t = useTranslations("sidebar");
    const Icon = tab.icon;
    // console.log(tab)
    const strippedPathname = pathname.replace(/^\/(en|hi|fr)/, "") || "/";
    const isChildActive = tab.dropdown?.some(d => strippedPathname === d.href) ?? false;
    const [open, setOpen] = useState(isChildActive);

    return (
        <div>
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
                <span className="flex-1 text-left">{t("Billing.title")}</span>
                <ChevronDown
                    size={14}
                    className={cn(
                        "text-muted-foreground transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </Button>

            {open && (
                <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-border pl-3">
                    {tab.dropdown?.map(item => {
                        const ItemIcon = item.icon;
                        const active = strippedPathname === item.href;
                        return (
                            <Link key={item.key} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-2.5 text-xs h-9 transition-all cursor-pointer",
                                        active
                                            ? "text-accent bg-accent/10 border-l-2 border-accent rounded-none"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    <ItemIcon size={14} />
                                    {t(`Billing.${item.key}`)}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}