"use client"
import { Card } from "./ui/card";

interface HowItWorksStep {
    title: string;
    description: string;
}

// data 
const HOW_IT_WORKS: HowItWorksStep[] = [
    { title: "Create Campaign", description: "Define your goals, target audience, and budget." },
    { title: "Upload Promotion Assets", description: "Add images or videos for creators to use." },
    { title: "Optimize Ads", description: "We ensure your ads reach the right audience across our network." },
    { title: "Track Performance", description: "Monitor clicks, engagement, and conversions in real time." },
    { title: "Analyse Results & Scale", description: "Evaluate campaign performance and make informed decisions for the future." },
];

function HowItWorksCard() {
    return (

        <Card
            title="How it works?"
            steps={HOW_IT_WORKS}
        />
    );
}

export default HowItWorksCard;