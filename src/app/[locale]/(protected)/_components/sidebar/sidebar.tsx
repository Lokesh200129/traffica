"use client"
import { usePathname } from "next/navigation";
import { AppButton } from "@/components/button";
import GlobalLoader from "@/components/global-loader";
import { useLogout } from "@/hooks/auth/use-logout";

import { SIDEBAR_TABS, CREATE_TAB } from "./sidebar-config";
import { SidebarNavItem } from "./sidebar-nav-item";
import { BillingDropdown } from "./billing-dropdown";
import { SidebarBottom } from "./sidebar-bottom";
import { useTranslations } from "next-intl";

const Sidebar = () => {
    const pathname = usePathname();
    const { mutate: logout, isPending } = useLogout();

    if (isPending) return <GlobalLoader msg="Logging out..." />;

    return (
        <aside className="overflow-y-auto dark w-64 h-full bg-background text-foreground flex flex-col p-4 border-r border-border">

            {/* ── Navigation ───────────────────────────────────────────── */}
            <nav className="flex flex-col gap-2 flex-1">
                {SIDEBAR_TABS.map(tab =>
                    // Billing → dropdown, rest → normal link
                    tab.dropdown ? (
                        <BillingDropdown
                            key={tab.title}
                             tab={tab}
                            pathname ={pathname}
                        />
                    ) : (
                        <SidebarNavItem
                            key={tab.title}
                            tab={tab}
                            pathname={pathname}
                        />
                    )
                )}

                <div className="my-2 border-t border-border" />

                {/* Create Campaign CTA */}
                <AppButton
                    title={CREATE_TAB.title}
                    variant="default"
                    icon={CREATE_TAB.icon}
                    size="lg"
                    href={CREATE_TAB.href}
                />
            </nav>

            {/* ── Bottom — Refer & Logout ───────────────────────────── */}
            <SidebarBottom onLogout={() => logout()} />
        </aside>
    );
};

export default Sidebar;