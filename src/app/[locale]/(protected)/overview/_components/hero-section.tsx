"use client"
import { Plus } from "lucide-react";
import { AppButton } from "@/components/button";
import Image from "next/image";

const STATS = [
    {
        value: "500M+",
        label: "Monthly traffic delivered",
        icons: [
            { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png", alt: "Facebook" },
            { src: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png", alt: "YouTube" },
        ]
    },
    {
        value: "10M+",
        label: "Conversions generated",
        avatars: [
            "https://api.dicebear.com/7.x/notionists/svg?seed=Alan",
            "https://api.dicebear.com/7.x/notionists/svg?seed=Janis",
            "https://api.dicebear.com/7.x/notionists/svg?seed=Mike",
        ],
    },
];

function EmptyCampaignHero({ onCreateCampaign }: { onCreateCampaign?: () => void }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-12 rounded-2xl bg-primary/10">

            {/* Left */}
            <div className="flex flex-col gap-6 max-w-sm">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-foreground leading-tight">
                        Drive real traffic to your business today
                    </h1>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                        Buy high-quality targeted traffic and reach millions of potential customers across top platforms with our arbitrage network
                    </p>
                </div>

                <AppButton
                    href="/create-campaign"
                    title="Create campaign"
                    icon={Plus}
                    size="lg"
                    onClick={onCreateCampaign}
                    className="w-fit"
                />
            </div>

            {/* Right — Stat Cards */}
            <div className="flex flex-col gap-3 pt-10 md:pt-0">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-card rounded-2xl shadow-sm px-5 py-4 flex items-center justify-between gap-8 min-w-[220px]">
                        <div>
                            <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                        </div>

                        {stat.icons && (
                            <div className="flex gap-1.5">
                                {stat.icons.map((icon, j) => (
                                    <img key={j} src={icon.src} alt={icon.alt} className="w-8 h-8 rounded-full object-contain" />
                                ))}
                            </div>
                        )}

                        {stat.avatars && (
                            <div className="flex -space-x-2">
                                {stat.avatars.map((src, j) => (
                                    // <img key={j} src={src} alt="user" className="w-8 h-8 rounded-full border-2 border-white object-cover bg-muted" />
                                    <Image
                                        src={src}
                                        key={j}
                                        alt="user"
                                        width={32}
                                        height={32}
                                        unoptimized
                                        className="w-8 h-8 rounded-full border-2 border-white object-cover bg-muted" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default EmptyCampaignHero;
