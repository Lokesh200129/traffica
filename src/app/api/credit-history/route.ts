// @ts-nocheck
import { apiSuccess } from "@/lib/api-response";
import withAuth from "@/lib/try-catch-with-auth";
import { CreditHistory } from "@/models/CreditHistory";

export const GET = withAuth(async (req: Request, user) => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [history, total] = await Promise.all([
        CreditHistory.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        CreditHistory.countDocuments({ userId: user._id }),
    ]);

    return apiSuccess({
        history,
        pagination: {
            page,
            limit,
            total,
            pageCount: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        },
    });
});