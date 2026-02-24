import User from "@/models/User";
import { tryCatchWrapper } from "@/lib/api-handler";
import { ApiResponse } from "@/lib/api-response";
import { NextRequest } from "next/server";

export const GET = tryCatchWrapper(async (req: NextRequest, { params }: { params: { username: string } }
) => {

    const { username } = await params;

    if (!username) {
        return ApiResponse.error("Username is required", 400);
    }

    const user = await User.findOne({ username }).select("-password -__v")

    if (!user) {
        return ApiResponse.error("User not found", 404);
    }

    return ApiResponse.success(user, 200);
});