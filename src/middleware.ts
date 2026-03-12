import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_ROUTES = [
    "/overview",
    "/profile",
    "/notification",
    "/help",
    "/campaign",
    "/billing",
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    const pathWithoutLocale = path.replace(/^\/(en|hi|fr)/, "") || "/";

    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathWithoutLocale.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/signup", request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!_next|_vercel|api|.*\\..*).*)',
    ],
};