import {
    LayoutDashboard,
    Megaphone,
    User,
    PlusCircle,
    LogOut,
    Gift,
    Building2,
    Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DropdownItem {
    key: string;
    title: string;
    icon: LucideIcon;
    href: string;
}

export interface SidebarTab {
    title: string;
    icon: LucideIcon;
    href: string;       // optional — dropdown tabs don't navigate
}

export const SIDEBAR_TABS: SidebarTab[] = [
    { title: "Overview", icon: LayoutDashboard, href: "/overview" },
    { title: "Campaign", icon: Megaphone, href: "/campaign" },
    { title: "Billing", icon: Wallet, href: "/billing", },
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Agency", icon: Building2, href: "/agency" },
];

export const CREATE_TAB = {
    title: "Create Campaign",
    icon: PlusCircle,
    href: "/create-campaign",
};

export const REFER_TAB = {
    title: "Refer & Earn",
    subtitle: "Get credits for every referral",
    icon: Gift,
    href: "/refer-and-earn",
};

export const LOGOUT_TAB = {
    title: "Logout",
    icon: LogOut,
};
