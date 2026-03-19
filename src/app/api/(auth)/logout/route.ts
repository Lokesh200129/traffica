import { tryCatchWrapper } from "@/lib/try-catch";
import { apiSuccess } from "@/lib/api-response";
import { cookies } from "next/headers";

export const POST = tryCatchWrapper(async () => {
    const cookieStore = await cookies();
    cookieStore.set("token", "", { maxAge: 0 });

    return apiSuccess({}, "Logged out successfully", 200);

})