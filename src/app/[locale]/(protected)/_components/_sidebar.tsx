"use client"
import {
    LayoutDashboard,
    Megaphone,
    CreditCard,
    User,
    HelpCircle,
    PlusCircle,
    Bell,
    LogOut,
    Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/button";
import { useLogout } from "@/hooks/auth/use-logout";
import GlobalLoader from "@/components/global-loader";

const tabs = [
    { title: "Overview", icon: LayoutDashboard, href: "/overview" },
    { title: "Campaign", icon: Megaphone, href: "/campaign" },
    { title: "Billing", icon: CreditCard, href: "/billing" },
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Notification", icon: Bell, href: "/notification" },
    { title: "Help", icon: HelpCircle, href: "/help" },
    { title: "Create Campaign", icon: PlusCircle, href: "/create" },
    { title: "Logout", icon: LogOut, href: "/logout" },
];

const Sidebar = () => {
    const pathname = usePathname();
    const { mutate: logout, isPending } = useLogout();

    const mainTabs = tabs.filter(t => t.title !== "Logout" && t.title !== "Create Campaign");
    const createTab = tabs.find(t => t.title === "Create Campaign");
    const logoutTab = tabs.find(t => t.title === "Logout");

    if (isPending) return <GlobalLoader msg="Logging out..." />;

    return (
        <aside className="dark w-64 h-full bg-background text-foreground flex flex-col p-4 border-r border-border">

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-4 flex-1">
                {mainTabs.map((tab) => {
                    const active = pathname === tab.href;
                    const Icon = tab.icon;
                    return (
                        <Link key={tab.title} href={tab.href} className="w-full">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 text-sm transition-all cursor-pointer",
                                    active
                                        ? "text-accent bg-accent/10 border-l-4 border-accent rounded-none"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted border-l-4 border-transparent"
                                )}
                            >
                                <Icon size={18} />
                                {tab.title}
                            </Button>
                        </Link>
                    );
                })}

                <div className="my-2 border-t border-border" />

                {createTab && (
                    <AppButton
                        title={createTab.title}
                        variant="default"
                        icon={createTab.icon}
                        size="lg"
                        href="/create-campaign"
                    />
                )}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pt-4 border-t border-border space-y-2">

                {/* Refer & Earn */}
                <Link href="/refer" className="w-full block">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
                        <span className="text-lg"><Gift color="#ff8a33" size={22} /></span>
                        <div className="text-left">
                            <p className=" font-bold text-accent">Refer & Earn</p>
                            <p className="text-[10px] text-muted-foreground">Get credits for every referral</p>
                        </div>
                    </button>
                </Link>

                {logoutTab && (
                    <AppButton
                        title={logoutTab.title}
                        onClick={() => logout()}
                        icon={logoutTab.icon}
                        className="bg-background text-accent hover:bg-accent/10"
                    />
                )}
            </div>
        </aside>
    );
};

export default Sidebar;