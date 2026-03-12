import Campaign from "@/models/campaign.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const campaigns = await Campaign.find({ author: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: campaigns }, { status: 200 });
}