import { NextRequest } from "next/server";
import Campaign from "@/models/Campaign";
import withAuth from "@/lib/try-catch-with-auth";
import { apiSuccess, apiError } from "@/lib/api-response";
import User from "@/models/User";
import { CreditHistory } from "@/models/CreditHistory";


export const POST = withAuth(async (req: NextRequest, user) => {
    const body = await req.json();

    const { campaignName, pageViews, duration, country, trafficSource, device, webUrl, creditUsed } = body;

    // ── Validation ───────────────────────────────────────────────────────────
    if (!campaignName || typeof campaignName !== "string")
        return apiError("campaignName is required");

    if (typeof pageViews !== "number" || pageViews < 0)
        return apiError("pageViews must be a non-negative number");

    if (!duration?.mode || !["fixed", "random"].includes(duration.mode))
        return apiError("duration.mode must be 'fixed' or 'random'");

    if (!trafficSource || typeof trafficSource !== "string")
        return apiError("trafficSource is required");

    if (!device || typeof device !== "string")
        return apiError("device is required");

    if (!webUrl || typeof webUrl !== "string")
        return apiError("webUrl is required");

    if (typeof creditUsed !== "number" || creditUsed < 0)
        return apiError("creditUsed must be a non-negative number");

    // ── Check sufficient credits ──────────────────────────────────────────────
    const currentUser = await User.findById(user._id);
    console.log(currentUser);
    if (!currentUser)
        return apiError("User not found", 404);

    if (currentUser.creditBalance.available < creditUsed)
        return apiError("Insufficient credits", 400);

    // ── Create campaign ───────────────────────────────────────────────────────
    const campaign = await Campaign.create({
        userId: user._id,
        campaignName: campaignName.trim(),
        pageViews,
        duration: {
            mode: duration.mode,
            fixedSec: duration.fixedSec ?? 0,
            randomFrom: duration.randomFrom ?? 0,
            randomTo: duration.randomTo ?? 0,
        },
        webUrl: webUrl.trim(),
        country: country ?? "",
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

// ── GET /api/campaigns ────────────────────────────────────────────────────────
export const GET = withAuth(async (req: NextRequest, user) => {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const skip = (page - 1) * limit;

    const filter = { userId: user._id };

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