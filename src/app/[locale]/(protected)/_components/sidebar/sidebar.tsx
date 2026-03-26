"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppButton } from "@/components/button";
import GlobalLoader from "@/components/global-loader";
import { useLogout } from "@/hooks/auth/use-logout";
import { REFER_TAB, SIDEBAR_TABS, CREATE_TAB } from "./sidebar-config";
import { SidebarNavItem } from "./sidebar-nav-item";
import { BillingDropdown } from "./billing-dropdown";
import { SidebarBottom } from "./sidebar-bottom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TooltipContainer } from "../../../../../components/tooltip-container";

const Sidebar = () => {
    const pathname = usePathname();
    const { mutate: logout, isPending } = useLogout();
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (isPending) return <GlobalLoader msg="Logging out..." />;
    if (!mounted) return <aside className="w-64 h-full border-r bg-background" />;

    return (
        <aside className={cn(
            "dark h-full bg-background flex flex-col border-r border-border transition-all duration-500",
            "overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
            collapsed ? "w-18 p-2" : "w-64 p-4"
        )}>

            <nav className="flex flex-col gap-3 flex-1">
                {/* {SIDEBAR_TABS.map(tab => {
                    // Yahan check kar rahe hain ki kya user billing section mein hai
                    const isActive = tab.dropdown
                        ? pathname.includes("/billing")
                        : pathname === tab.href;

                    return tab.dropdown ? (
                        collapsed ? (
                            // Inline Button for Billing (Collapsed)
                            <button
                                key={tab.title}
                                onClick={() => setCollapsed(false)}
                                className={cn(
                                    "w-full text-sm h-11 transition-all cursor-pointer flex items-center justify-center px-0",
                                    "text-foreground/80",
                                    isActive
                                        ? "bg-accent/10 border-l-4 border-accent rounded text-primary font-semibold"
                                        : "hover:text-foreground hover:bg-accent/40 rounded-lg border-l-4 border-transparent"
                                )}
                            >
                                <tab.icon size={18} className={isActive ? "text-accent" : ""} />
                            </button>
                        ) : (
                            // Normal Dropdown (Expanded)
                            <BillingDropdown
                                key={tab.title}
                                tab={tab}
                                pathname={pathname}
                                collapsed={collapsed}
                            />
                            )
                    ) : (
                            // Baki normal items
                        <SidebarNavItem
                            key={tab.title}
                            tab={tab}
                            pathname={pathname}
                            collapsed={collapsed}
                        />
                    );
                })} */}

                {SIDEBAR_TABS.map(tab => {
                    const isBillingActive = pathname.includes("/billing");
                    const isActive = tab.dropdown ? isBillingActive : pathname === tab.href;

                    if (tab.dropdown) {
                        return collapsed ? (
                            // 1. Added TooltipContainer for consistency
                            <TooltipContainer key={tab.title} title={tab.title} side="right">
                                <button
                                    onClick={() => setCollapsed(false)}
                                    className={cn(
                                        "w-full text-sm h-11 transition-all cursor-pointer flex items-center justify-center px-0",
                                        "text-foreground/80",
                                        isActive
                                            ? "bg-accent/10 border-l-4 border-accent rounded text-primary font-semibold"
                                            : "hover:text-foreground hover:bg-accent/40 rounded-lg border-l-4 border-transparent"
                                    )}
                                >
                                    <tab.icon size={18} className={isActive ? "text-accent" : ""} />
                                </button>
                            </TooltipContainer>
                        ) : (
                            <BillingDropdown
                                key={tab.title}
                                tab={tab}
                                pathname={pathname}
                                collapsed={collapsed}
                                defaultOpen={true}
                            />
                        );
                    }

                    return (
                        <SidebarNavItem
                            key={tab.title}
                            tab={tab}
                            pathname={pathname}
                            collapsed={collapsed}
                        />
                    );
                })}

                <div className="my-2 border-t border-border" />

                {/* Create Campaign CTA */}
                {collapsed ? (
                    <TooltipContainer title={CREATE_TAB.title} side="right">
                        <Link href={CREATE_TAB.href}>
                            <div className="flex justify-center items-center w-full h-10 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity">
                                <CREATE_TAB.icon size={18} />
                            </div>
                        </Link>
                    </TooltipContainer>
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
                        <TooltipContainer
                            title={REFER_TAB.title}
                            description={REFER_TAB.subtitle}
                            side="right"
                        >
                            <div className="flex justify-center items-center w-full h-10 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
                                <REFER_TAB.icon color="#ff8a33" size={20} />
                            </div>
                        </TooltipContainer>
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

            <SidebarBottom
                onLogout={() => logout()}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(o => !o)}
            />
        </aside>
    );
};

export default Sidebar;