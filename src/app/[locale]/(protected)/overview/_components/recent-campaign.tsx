"use client"
import { Card } from "./ui/card"
import { useGetCampaigns } from "@/hooks/campaign/use-fetch-all-campaigns"

const BADGE_STYLES: Record<string, string> = {
    PENDING: "bg-muted text-muted-foreground border border-border",
    RUNNING: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
    COMPLETED: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
}
export default function RecentCampaigns() {
    const { data: allCampaigns } = useGetCampaigns()
    const data = allCampaigns?.campaigns?.slice(0, 6) || []
    const steps = data?.map(c => ({
        title: c.campaignName,
        badge: {
            label: c.status.charAt(0) + c.status.slice(1).toLowerCase(),
            className: BADGE_STYLES[c.status] ?? BADGE_STYLES.PENDING
        }
    }))

    return (
        <Card title="Recent Campaigns" steps={steps!} />
    )
} 