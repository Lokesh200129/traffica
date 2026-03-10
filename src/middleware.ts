import { NextResponse } from 'next/server'
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname;

    const isProtectedRoute = path.startsWith('/overview') ||
        path.startsWith('/profile') ||
        path.startsWith('/notification') ||
        path.startsWith('/help') ||
        path.startsWith('/campaign') ||
        path.startsWith('/billing');

    // console.log(token)
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/signup', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/:path*',
}