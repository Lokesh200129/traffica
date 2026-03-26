import { apiSuccess } from "@/lib/api-response";
import { NextRequest } from "next/server";
import { Agency } from "@/models/Agency";
import withAuth from "@/lib/try-catch-with-auth";

const POST = withAuth(async (req: NextRequest, user) => {

    const body = await req.json();
    const { agencyName, country, plan, services, website } = body;

    if (!agencyName || !country || !plan || !services || !website) {
        return apiSuccess("", "All fields are required", 400);
    }

    const agency = await Agency.create({ userId: user._id, agencyName, country, plan, services, website });

    return apiSuccess(agency, "Agency created successfully", 201,);

})

const GET = withAuth(async (req: NextRequest) => {
    const agencies = await Agency.find().sort({ createdAt: -1 });
    return apiSuccess(agencies, "Agencies retrieved successfully", 200);

})

export { POST, GET };