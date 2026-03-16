import {
    LayoutDashboard,
    Megaphone,
    CreditCard,
    User,
    Bell,
    PlusCircle,
    LogOut,
    Gift,
    Building2,
    CreditCard as SavedCardsIcon,
    Wallet,
    Settings,
    History,
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
    href?: string;       // optional — dropdown tabs don't navigate
    dropdown?: DropdownItem[];
}

export const SIDEBAR_TABS: SidebarTab[] = [
    { title: "Overview", icon: LayoutDashboard, href: "/overview" },
    { title: "Campaign", icon: Megaphone, href: "/campaign" },
    {
        title: "Billing",
        icon: CreditCard,
        // no href — dropdown only
        dropdown: [
            { key: "Saved_Cards", title: "Saved Cards", icon: SavedCardsIcon, href: "/billing/saved-cards" },
            { key: "Balance", title: "Balance", icon: Wallet, href: "/billing/balance" },
            { key: "Settings", title: "Settings", icon: Settings, href: "/billing/settings" },
            { key: "History", title: "History", icon: History, href: "/billing/history" },
        ],
    },
    { title: "Profile", icon: User, href: "/profile" },
    { title: "Notification", icon: Bell, href: "/notification" },
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
    href: "/refer",
};

export const LOGOUT_TAB = {
    title: "Logout",
    icon: LogOut,
};
