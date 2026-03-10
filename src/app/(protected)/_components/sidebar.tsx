"use client"
import {
    LayoutDashboard,
    Megaphone,
    CreditCard,
    User,
    HelpCircle,
    PlusCircle,
    Bell,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Use Link for navigation
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
    const { mutate: logout, isPending } = useLogout()

    const mainTabs = tabs.filter(t => t.title !== "Logout" && t.title !== "Create Campaign");
    const createTab = tabs.find(t => t.title === "Create Campaign");
    const logoutTab = tabs.find(t => t.title === "Logout");

    if (isPending) return <GlobalLoader msg="Logging out..." />

    return (
        <aside className="dark w-64 h-full bg-background text-foreground flex flex-col p-4 border-r border-border">

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-4 flex-1 ">
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
                                        ? "text-accent bg-accent/10 border-l-4 border-accent rounded-none" // Active color
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted border-l-4 border-transparent" // Inactive
                                )}
                            >
                                <Icon size={18} />
                                {tab.title}
                            </Button>
                        </Link>
                    );
                })}

                {/* Separator */}
                <div className="my-2 border-t border-border" />

                {/* Special "Create Campaign" Button */}
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

            {/* Bottom Section (Logout) */}
            <div className="mt-auto pt-4 border-t border-border">
                {
                    logoutTab && <AppButton
                        title={logoutTab.title}
                        onClick={() => logout()}
                        icon={logoutTab.icon}
                        className="bg-background text-accent hover:bg-accent/10"
                    />
                }
            </div>
        </aside>
    );
};

export default Sidebar;