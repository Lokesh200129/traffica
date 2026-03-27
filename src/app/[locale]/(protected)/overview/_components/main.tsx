import HeroSection from "./hero-section"
import BottomSection from "./bottom-section";
import HasCampaignSection from './has-campaigns/main'

function Main() {
    // todo : check if user has campaigns, if not show empty state with create campaign button
    return (
        <div className="space-y-6">
            <HeroSection />
            {/* <Overview /> */}
            <HasCampaignSection />
            <BottomSection />
        </div>
    )
}

export default Main;