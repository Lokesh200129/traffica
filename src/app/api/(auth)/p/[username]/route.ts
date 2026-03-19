import User from "@/models/User";
import { tryCatchWrapper } from "@/lib/try-catch";
import { apiSuccess, apiError } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const GET = tryCatchWrapper(async (req: NextRequest, { params }: { params: { username: string } }
) => {

    const { username } = await params;

    if (!username) {
        return apiError("Username is required", 400);
    }

    const user = await User.findOne({ username }).select("-password -__v")

    if (!user) {
        return apiError("User not found", 404);
    }

    return apiSuccess(user, "User found", 200);
});