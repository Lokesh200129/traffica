"use client"

interface HowItWorksStep {
    title: string;
    description: string;
}

const HOW_IT_WORKS: HowItWorksStep[] = [
    { title: "Create Campaign", description: "Define your goals, target audience, and budget." },
    { title: "Upload Promotion Assets", description: "Add images or videos for creators to use." },
    { title: "Optimize Ads", description: "We ensure your ads reach the right audience across our network." },
    { title: "Track Performance", description: "Monitor clicks, engagement, and conversions in real time." },
    { title: "Analyse Results & Scale", description: "Evaluate campaign performance and make informed decisions for the future." },
];
function HowItWorksCard() {
    return (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-foreground">How it works?</h2>

            <div className="flex flex-col gap-5">
                {HOW_IT_WORKS.map((step, i) => (
                    <div key={i} className="flex gap-4">
                        <span className="text-sm font-bold text-muted-foreground/50 w-4 shrink-0 mt-0.5">
                            {i + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-bold text-foreground">{step.title}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HowItWorksCard;