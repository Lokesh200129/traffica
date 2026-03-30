import AccountSetupCard from "./account-setup";
import HowItWorksCard from "./how-it-work";
import RecentCampaigns from './recent-campaign';

export default  function BottomSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <AccountSetupCard />
            <HowItWorksCard />
            <RecentCampaigns />
        </div> 
    );
}