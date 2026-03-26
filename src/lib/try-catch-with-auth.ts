import { tryCatchWrapper } from "./try-catch";
import { getAuthUser } from "@/lib/auth"; // your existing auth function
import { NextRequest, NextResponse } from "next/server";

type AuthHandler = (req: NextRequest, user: NonNullable<Awaited<ReturnType<typeof getAuthUser>>>, ...args: any[]) => Promise<any>;

function withAuth(handler: AuthHandler) {
    return tryCatchWrapper(async (req: NextRequest, ...args: any[]) => {
        const user = await getAuthUser(req);

        if (!user) {
            return new Response(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        return handler(req, user, ...args);
    });
}

export default withAuth;