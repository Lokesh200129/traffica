import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SidebarTab } from "./sidebar-config";
import { useTranslations } from "next-intl";

interface SidebarNavItemProps {
    tab: SidebarTab;
    pathname: string;
}

export function SidebarNavItem({ tab, pathname }: SidebarNavItemProps) {
    const t = useTranslations("sidebar");

    const Icon = tab.icon;

    const strippedPathname = pathname.replace(/^\/(en|hi|fr)/, "") || "/";
    const active = strippedPathname === tab.href;

    return (
        <Link href={tab.href!} className="w-full">
            <Button
                variant="ghost"
                className={cn(
                    "w-full justify-start gap-3 text-sm h-11 transition-all cursor-pointer",
                    active
                        ? "text-accent bg-accent/10 border-l-4 border-accent rounded-none"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted border-l-4 border-transparent"
                )}
            >
                <Icon size={18} />
                {t(tab.title)}
            </Button>
        </Link>
    );
}