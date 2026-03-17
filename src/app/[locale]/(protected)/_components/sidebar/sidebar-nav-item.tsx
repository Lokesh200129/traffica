import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SidebarTab } from "./sidebar-config";
import { useTranslations } from "next-intl";
import { TooltipContainer } from "@/components/tooltip-container";

interface SidebarNavItemProps {
    tab: SidebarTab;
    pathname: string;
    collapsed?: boolean;
}

export function SidebarNavItem({ tab, pathname, collapsed }: SidebarNavItemProps) {
    const t = useTranslations("sidebar");
    const Icon = tab.icon;

    const strippedPathname = pathname.replace(/^\/(en|hi|fr)/, "") || "/";
    const active = strippedPathname === tab.href;

    const btnClass = cn(
        "w-full text-sm h-11 transition-all cursor-pointer",
        collapsed ? "justify-center px-0" : "justify-start gap-3",
        "text-foreground/80",
        active
            ? "bg-accent/10 border-l-4 border-accent rounded-none text-primary font-semibold"
            : "hover:text-foreground hover:bg-muted border-l-4 border-transparent"
    );

    return (
        <Link href={tab.href!} className="w-full">
            {collapsed ? (
                <TooltipContainer title={t(tab.title)} description="" side="right">
                    <Button variant="ghost" className={btnClass}>
                        <Icon size={18} className={active ? "text-accent" : ""} />
                    </Button>
                </TooltipContainer>
            ) : (
                <Button variant="ghost" className={btnClass}>
                    <Icon size={18} className={active ? "text-accent" : ""} />
                    <span>{t(tab.title)}</span>
                </Button>
            )}
        </Link>
    );
}