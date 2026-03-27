"use client"
import { Card } from "./ui/card"
import { useGetCampaigns } from "@/hooks/campaign/use-fetch-all-campaigns"

const BADGE_STYLES: Record<string, string> = {
    APPROVED: "bg-green-500/10 text-green-500 border-green-500/20",
    PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
    COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
}
export default function RecentCampaigns() {
    const { data: allCampaigns } = useGetCampaigns()
    const data = allCampaigns?.campaigns?.slice(0, 6) || []
    console.log(data);
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