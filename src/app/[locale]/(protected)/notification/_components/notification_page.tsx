"use client"
import { useState } from "react";
import NotificationItem from "./notification_tab";
import { cn } from "@/lib/utils";

type NotificationFilter = "all" | "campaigns" | "account"

const FILTERS: { key: NotificationFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "campaigns", label: "Campaigns" },
    { key: "account", label: "Account" },
]

const NOTIFICATIONS = [
    {
        id: "1",
        title: "Campaign Approved",
        description: "Your 'Summer Sale' campaign has been reviewed and is now live. Start tracking its performance on your dashboard.",
        timestamp: new Date("2026-03-12T14:23:00"),
        isRead: false,
        type: "campaign" as const,
        filter: "campaigns" as const,
    },
    {
        id: "2",
        title: "Campaign Suspended",
        description: "Your campaign 'Nike_AirMax' has been suspended due to policy violations.",
        timestamp: new Date("2026-03-12T11:19:00"),
        isRead: false,
        type: "alert" as const,
        filter: "campaigns" as const,
    },
    {
        id: "3",
        title: "Credits Low",
        description: "Your balance is below $10. Please recharge to keep your campaigns running.",
        timestamp: new Date("2026-03-11T10:00:00"),
        isRead: true,
        type: "billing" as const,
        filter: "account" as const,
    },
    {
        id: "4",
        title: "Payment Successful",
        description: "Your payment of $50 was successful. Credits have been added to your account.",
        timestamp: new Date("2026-03-10T09:00:00"),
        isRead: true,
        type: "billing" as const,
        filter: "account" as const,
    },
    {
        id: "5",
        title: "Referral Reward",
        description: "You earned 5,000 credits from your referral. Keep sharing to earn more!",
        timestamp: new Date("2026-03-09T08:00:00"),
        isRead: true,
        type: "reward" as const,
        filter: "account" as const,
    },
    {
        id: "6",
        title: "Campaign Budget Exhausted",
        description: "The budget for your campaign 'H&M_Insta' has been fully used. Please add more funds to resume activity.",
        timestamp: new Date("2026-03-08T15:10:00"),
        isRead: true,
        type: "alert" as const,
        filter: "campaigns" as const,
    },
    {
        id: "7",
        title: "Campaign Approved",
        description: "Your campaign 'Zara_Winter_Sale' has been reviewed and is now live.",
        timestamp: new Date("2026-03-07T12:00:00"),
        isRead: true,
        type: "campaign" as const,
        filter: "campaigns" as const,
    },
]

// ── This is the component — move to page.tsx when connecting to DB ────────────
export default function NotificationsPage() {
    const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all")

    // ── When connecting to DB, replace this with useNotifications(activeFilter) ──
    const filtered = NOTIFICATIONS.filter(n =>
        activeFilter === "all" ? true : n.filter === activeFilter
    )

    return (
        <div className="w-full max-w-2xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-normal">Notifications</h2>
                <p className="text-sm text-foreground mt-1">
                    Stay up to date with your campaigns and account activity.
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-4">
                {FILTERS.map(f => (
                    <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-medium transition-all",
                            activeFilter === f.key
                                ? "bg-accent text-white shadow-sm"
                                : "bg-muted/60 text-foreground/70 hover:text-foreground hover:bg-muted"
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-2">
                        <span className="text-4xl">🔔</span>
                        <p className="text-sm text-muted-foreground">No notifications yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {filtered.map(n => (
                            <NotificationItem
                                key={n.id}
                                title={n.title}
                                description={n.description}
                                timestamp={n.timestamp}
                                isRead={n.isRead}
                                type={n.type}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Load More — connect to useInfiniteQuery fetchNextPage */}
            <div className="flex justify-center mt-6">
                <button className="px-8 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
                    Load More
                </button>
            </div>

        </div>
    )
}