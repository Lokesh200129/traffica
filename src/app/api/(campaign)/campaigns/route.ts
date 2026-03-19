import { NextRequest } from "next/server";
import Campaign from "@/models/Campaign";
import withAuth from "@/lib/try-catch-with-auth";
import { apiSuccess, apiError } from "@/lib/api-response";

// ── POST /api/campaigns ───────────────────────────────────────────────────────
export const POST = withAuth(async (req: NextRequest, user) => {
    const body = await req.json();

    const { campaignName, pageViews, duration, country, trafficSource, device } = body;

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

    // ── Save ──────────────────────────────────────────────────────────────────
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
      
        country: country ?? "",
        trafficSource,
        device,
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