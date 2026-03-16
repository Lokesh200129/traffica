import AccountSetupCard from "./account-setup";
import HowItWorksCard from "./how-it-work";

export default  function BottomSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AccountSetupCard />
            <HowItWorksCard />
        </div>
    );
}