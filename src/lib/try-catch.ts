
import { connectDB } from "@/lib/db";
import parseError from "./parse-error";

export function tryCatchWrapper(handler: Function) {
    return async (req: Request, ...args: any[]) => {
        try {
            await connectDB();
            const response = await handler(req, ...args);
            if (!response) {
                return new Response(
                    JSON.stringify({ error: "Internal Server Error: No response from handler" }),
                    { status: 500, headers: { 'Content-Type': 'application/json' } }
                );
            }
            return response;
        } catch (error) {

            const errorResult = parseError(error);
            return new Response(
                JSON.stringify(errorResult || { error: "An unexpected error occurred" }),
                {
                    status: (errorResult as any)?.status || 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
    };
}