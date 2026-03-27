"use client"
import HeroSection from "./hero-section"
import BottomSection from "./bottom-section";
import HasCampaignSection from './has-campaigns/main'
import Overview from './overview';
import { useGetCampaigns } from "@/hooks/campaign/use-fetch-all-campaigns";


function Main() {
    const { data: allCampaigns } = useGetCampaigns();
    
    const campaigns = allCampaigns?.campaigns || [];
    return (
        <div className="space-y-6">
            <HeroSection />
            {campaigns?.length > 0 ? <HasCampaignSection /> : <Overview />}
            <BottomSection />
        </div>
    )
}

export default Main;