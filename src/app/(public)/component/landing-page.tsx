import { Hero } from '@/components/landing/hero';
import { CountryStrip } from '@/components/landing/country-strip';
import { HowItWorks } from '@/components/landing/how-it-works';
import { AnalyticsPreview } from '@/components/landing/analytics-preview';
import { TrafficSources } from '@/components/landing/traffic-sources';
import { FeaturesScroll } from '@/components/landing/features-scroll';
import { CoverageSection } from '@/components/landing/coverage-section';
import Comparison from '@/components/landing/comparison';
import { SafetyGuarantee } from '@/components/landing/safety-guarantee';
import { TrustSection } from '@/components/landing/trust-section';
import { Reviews } from '@/components/landing/reviews';
import { FAQ } from '@/components/landing/faq';

export default function Home() {
    return (
        
        <div>
            <Hero />
            <FeaturesScroll />
            <CountryStrip />
            <HowItWorks />
            <AnalyticsPreview />
            <TrafficSources />
            <CoverageSection />
            <Comparison />
            <SafetyGuarantee />
            <CountryStrip />
            <TrustSection />
            <Reviews />
            <FAQ />
        </div>
    );
}
