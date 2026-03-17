"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AppButton } from "@/components/button";
import GlobalLoader from "@/components/global-loader";
import { useLogout } from "@/hooks/auth/use-logout";
import { REFER_TAB, SIDEBAR_TABS, CREATE_TAB } from "./sidebar-config";
import { SidebarNavItem } from "./sidebar-nav-item";
import { BillingDropdown } from "./billing-dropdown";
import { SidebarBottom } from "./sidebar-bottom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const pathname = usePathname();
    const { mutate: logout, isPending } = useLogout();
    const [collapsed, setCollapsed] = useState(false);

    if (isPending) return <GlobalLoader msg="Logging out..." />;

    return (
        <aside className={cn(
            " dark h-full bg-background flex flex-col border-r border-border transition-all duration-300",
            "overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none",
            collapsed ? "w-18 p-2" : "w-64 p-4"
        )}>

            {/* ── Collapse toggle ──────────────────────────────────────── */}
            {/* <div className={cn("flex mb-4", collapsed ? "justify-center" : "justify-end")}>
                <button
                    onClick={() => setCollapsed(o => !o)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                    {collapsed
                        ? <PanelLeftOpen size={18} />
                        : <PanelLeftClose size={18} />
                    }
                </button>
            </div> */}

            {/* ── Navigation ───────────────────────────────────────────── */}
            <nav className="flex flex-col gap-3 flex-1">
                {SIDEBAR_TABS.map(tab =>
                    tab.dropdown ? (
                        <BillingDropdown
                            key={tab.title}
                            tab={tab}
                            pathname={pathname}
                            collapsed={collapsed}
                        />
                    ) : (
                        <SidebarNavItem
                            key={tab.title}
                            tab={tab}
                            pathname={pathname}
                            collapsed={collapsed}
                        />
                    )
                )}

                <div className="my-2 border-t border-border" />

                {/* Create Campaign CTA */}
                {collapsed ? (
                    <Link href={CREATE_TAB.href}>
                        <div className="flex justify-center items-center w-full h-10 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity">
                            <CREATE_TAB.icon size={18} />
                        </div>
                    </Link>
                ) : (
                    <AppButton
                        title={CREATE_TAB.title}
                        variant="default"
                        icon={CREATE_TAB.icon}
                        size="lg"
                        href={CREATE_TAB.href}
                    />
                )}

                {/* Refer & Earn */}
                <Link href={REFER_TAB.href} className="w-full block cursor-pointer">
                    {collapsed ? (
                        <div className="flex justify-center items-center w-full h-10 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
                            <REFER_TAB.icon color="#ff8a33" size={20} />
                        </div>
                    ) : (
                        <button className="w-full flex items-center gap-3 px-4 py-1.5 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
                            <REFER_TAB.icon color="#ff8a33" size={22} />
                            <div className="text-left">
                                <p className="font-bold text-accent">{REFER_TAB.title}</p>
                                <p className="text-[10px] text-muted-foreground">{REFER_TAB.subtitle}</p>
                            </div>
                        </button>
                    )}
                </Link>
            </nav>

            {/* ── Bottom — Logout ───────────────────────────────────────── */}
            <SidebarBottom
                onLogout={() => logout()}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(o => !o)}
            />
        </aside>
    );
};

export default Sidebar;