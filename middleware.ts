import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

// Define the token name and the routes that require authentication
const tokenName = "access_token";
const authRoutes = ["/dashboard/*"];

// Check if the path matches a wildcard pattern
function matchesWildcard(path: string, pattern: string): boolean {
    if (pattern.endsWith("/*")) {
        const basePattern = pattern.slice(0, -2);
        return path.startsWith(basePattern);
    }
    return path === pattern;
}

// Check if the request requires authentication
function redirect(request: NextRequest) {
    request.cookies.delete(tokenName);
    const LOGIN = `/login?redirect=${request.nextUrl.pathname + request.nextUrl.search}`;
    return NextResponse.redirect(new URL(LOGIN, request.url), {
        status: 303,
    });
}

// Middleware function
export async function middleware(request: NextRequest) {
    // Check if the request path matches the "/" pattern
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url), {
            status: 303,
        });
    }

    // Check if the request path matches any of the auth routes
    if (request.nextUrl.pathname === "/login") {
        const token = request.cookies.get(tokenName);
        if (token) {
            try {
                const payload = await verifyJwtToken(token.value);
                if (payload) {
                    return NextResponse.redirect(new URL("/dashboard", request.url), {
                        status: 303,
                    });
                } else {
                    return NextResponse.next();
                }
            } catch (error) {
                return NextResponse.next();
            }
        } else {
            return NextResponse.next();
        }
    }
    if (
        authRoutes.some((pattern) => matchesWildcard(request.nextUrl.pathname, pattern))
    ) {
        const token = request.cookies.get(tokenName);

        if (!token) {
            return redirect(request);
        }
        try {
            const payload = await verifyJwtToken(token.value);
            if (!payload) {
                return redirect(request);
            }
        } catch (error) {
            return redirect(request);
        }
    }
}
