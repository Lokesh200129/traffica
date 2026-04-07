"use client"
import { Plus } from "lucide-react";
import { AppButton } from "@/components/button";
import Image from "next/image";
import overviewImage from "@/assets/overview_placeholder.webp";
export default function Overview({ onCreateCampaign }: { onCreateCampaign?: () => void }) {
    return (
        <div className="flex flex-col gap-4">
            {/* Heading — outside card */}
            {/* <h1 className="text-2xl font-bold text-foreground">Overview</h1> */}

            {/* Card */}
            <div className="bg-card border border-border rounded-2xl flex flex-col items-center justify-center  p-8 gap-6">
                <Image
                    height={100}
                    width={100}
                    src={overviewImage}
                    alt="No campaigns"
                    className="size-64 object-contain"
                />

                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-xl font-bold text-foreground">
                        You haven't created any campaigns yet
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Launch your first campaign and start driving real traffic to your business
                    </p>
                </div>

                <AppButton
                    href="/create-campaign"
                    title="Create Campaign"
                    icon={Plus}
                    variant="default"
                    size="lg"
                    onClick={onCreateCampaign}
                />
            </div>
        </div>
    );
}