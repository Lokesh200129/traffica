import { apiSuccess, apiError } from "@/lib/api-response";
import { BillingDetail } from "@/models/BillingDetail";
import { NextRequest } from "next/server";
import withAuth from "@/lib/try-catch-with-auth";
import { connectDB } from "@/lib/db";

export const GET = withAuth(async (req: NextRequest, user) => {

    const details = await BillingDetail.findOne({ userId: user._id }).lean();

    return apiSuccess(details, "Billing details fetched", 200);
});

export const POST = withAuth(async (req: NextRequest, user) => {

    const body = await req.json();
    const details = await BillingDetail.findOneAndUpdate(
        { userId: user._id },
        { $set: { ...body, userId: user._id } },
        { upsert: true, returnDocument: "after" }
    );

    return apiSuccess(details, "Billing details saved", 200);
});