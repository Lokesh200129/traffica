import HeroSection from "./hero-section"
import Overview from './overview';
import BottomSection from "./bottom-section";


function Main() {
    return (
        <div className="space-y-6">
            <HeroSection />
            <Overview />
            <BottomSection />
        </div>
    )
}

export default Main;