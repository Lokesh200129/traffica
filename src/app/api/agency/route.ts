import { apiError, apiSuccess } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { Agency } from "@/models/Agency";
import withAuth from "@/lib/try-catch-with-auth";
import { agencySchema } from "@/lib/validation/agency";
const POST = withAuth(async (req: NextRequest, user) => {

    const body = await req.json();

    const validation = agencySchema.safeParse(body);

    if (!validation.success) {
        const firstError = validation.error.errors[0].message;
        return apiError(firstError, 400);

    }

    const data = validation.data;
    const { agencyName, country, plan, services, website } = data;

    const agency = await Agency.create({ userId: user._id, agencyName, country, plan, services, website });

    return apiSuccess(agency, "Agency created successfully", 201,);

})

const GET = withAuth(async () => {
    const agencies = await Agency.find().sort({ createdAt: -1 });
    return apiSuccess(agencies, "Agencies retrieved successfully", 200);

})

export { POST, GET };