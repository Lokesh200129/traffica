import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 1. New Realistic Sample Data
const campaigns = [
    {
        id: 1,
        name: "SummerCollection_2024",
        status: "Approved",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
    },
    {
        id: 2,
        name: "Nike_AirMax_Launch",
        status: "Approved",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    },
    {
        id: 3,
        name: "TechGadgets_Reviews",
        status: "Approved",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
    },
    {
        id: 4,
        name: "Starbucks_MorningBrew",
        status: "Approved",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop",
    },
    {
        id: 5,
        name: "Zara_Winter_Sale",
        status: "Approved",
        image: "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=100&h=100&fit=crop",
    },
];

export default function RecentCampaigns() {
    return (
        <Card className="bg-card w-full border border-border">
            {/* <CardHeader className=""> */}
            <CardTitle className="text-xl font-bold text-slate-900 tracking-tight px-6">
                Recent Campaigns
            </CardTitle>
            {/* </CardHeader> */}
            <CardContent className="pt-0">
                <div className="flex flex-col">
                    {campaigns.map((item, index) => (
                        <div key={item.id} className="w-full">
                            {/* Main Row Container: items-center ensures vertical alignment */}
                            <div className="flex items-center gap-4 py-4">

                                {/* 1. Image Container */}
                                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-border ">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>

                                {/* 2. Content Container: justify-center for vertical text alignment */}
                                <div className="flex flex-col justify-center gap-1.5">
                                    <p className="text-[14px] font-semibold text-slate-800 tracking-tight leading-none">
                                        {item.name}
                                    </p>
                                    <Badge
                                        variant="outline"
                                        className="w-fit bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-semibold px-2.5 py-0.5 hover:bg-emerald-100 transition-colors"
                                    >
                                        {item.status}
                                    </Badge>
                                </div>
                            </div>


                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}