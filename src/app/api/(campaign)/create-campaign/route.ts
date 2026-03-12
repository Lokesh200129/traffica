import { NextRequest, NextResponse } from "next/server";
import Campaign from "@/models/Campaign";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
import tryCatchWithAuth from "@/lib/try-catch-with-auth";

const POST = tryCatchWithAuth(async (req: NextRequest, user) => {

    const body = await req.json();

    const trafficSources = body.trafficSources?.map(
        ({ value, percentage, keyword }: { value: string; percentage: number; keyword?: string }) =>
            ({ value, percentage, keyword: keyword ?? "" })
    );

    const devices = body.devices?.map(
        ({ value, percentage }: { value: string; percentage: number }) =>
            ({ value, percentage })
    );

    const campaign = await Campaign.create({
        campaignName: body.campaignName,
        pageViews: body.pageViews,
        duration: body.duration,
        trafficSources,
        devices,
        country: body.country ?? "",
        author: user._id,       // ← from wrapper
    });

    return NextResponse.json({ success: true, data: campaign }, { status: 201 });
});

export { POST };

// export async function GET() {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id)
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const campaigns = await Campaign.find({ author: session.user.id }).sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, data: campaigns }, { status: 200 });
// }