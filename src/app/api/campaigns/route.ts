import { NextRequest } from "next/server";
import Campaign from "@/models/Campaign";
import withAuth from "@/lib/try-catch-with-auth";
import { apiSuccess, apiError } from "@/lib/api-response";
import User from "@/models/User";
import { CreditHistory } from "@/models/CreditHistory";
import { campaignSchema } from "@/lib/validation/campaign";

export const POST = withAuth(async (req: NextRequest, user) => {
    const body = await req.json();
    const validation = campaignSchema.safeParse(body);

    if (!validation.success) {
        return apiError(validation.error.errors[0].message, 400);
    }

    const { campaignName, pageViews, trafficSource, device, webUrl, creditUsed } = validation.data;
    let { country } = validation.data;
    if (country === "") country = "global";
    // ── Check sufficient credits
    const currentUser = await User.findById(user._id);

    if (!currentUser)
        return apiError("User not found", 404);

    if (currentUser?.creditBalance?.availableCredits < creditUsed)
        return apiError("Insufficient credits", 400);

    // ── Create campaign ───────────────────────────────────────────────────────
    const campaign = await Campaign.create({
        userId: user._id,
        campaignName: campaignName.trim(),
        pageViews,
        webUrl: webUrl.trim(),
        country,
        trafficSource,
        device,
        creditUsed,
        status: "PENDING",
    });

    // ── Deduct credits ────────────────────────────────────────────────────────
    const balanceBefore = currentUser.creditBalance.availableCredits;
    const balanceAfter = balanceBefore - creditUsed;

    await User.findByIdAndUpdate(user._id, {
        $inc: { "creditBalance.availableCredits": -creditUsed },
        $set: { "creditBalance.lastUpdatedAt": new Date() },
    });

    // ── Save credit history ───────────────────────────────────────────────────
    await CreditHistory.create({
        userId: user._id,
        type: "DEBIT",
        creditsAdded: creditUsed,
        balanceBefore,
        balanceAfter,
        description: `Campaign "${campaignName.trim()}" started · ${creditUsed.toLocaleString()} credits deducted`,
        referenceType: "CAMPAIGN",
        referenceId: campaign._id.toString(),
    });

    return apiSuccess(campaign.toObject(), "Campaign created successfully", 201);
});

export const GET = withAuth(async (req: NextRequest, user) => {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const skip = (page - 1) * limit;

    // New filters
    const name = searchParams.get("name");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const filter: Record<string, any> = { userId: user._id };

    // Campaign name filter (case-insensitive partial match)
    if (name) {
        filter.campaignName = { $regex: name, $options: "i" };
    }

    // Date range filter
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) {
            filter.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
            // Include the full end date day
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            filter.createdAt.$lte = end;
        }
    }

    const [campaigns, total] = await Promise.all([
        Campaign.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Campaign.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return apiSuccess({
        campaigns,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    }, "Campaigns fetched successfully");
});