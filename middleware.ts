import { NextRequest, NextResponse } from "next/server";
import { env } from "next-runtime-env";
import { verifyJwtToken } from "./lib/auth";
const tokenName = "access_token";
const authRoutes = ["/dashboard/*"];

function matchesWildcard(path: string, pattern: string): boolean {
    if (pattern.endsWith("/*")) {
        const basePattern = pattern.slice(0, -2);
        return path.startsWith(basePattern);
    }
    return path === pattern;
}

function redirect(request: NextRequest) {
    request.cookies.delete(tokenName);
    const LOGIN = `/login?redirect=${request.nextUrl.pathname + request.nextUrl.search}`;
    return NextResponse.redirect(new URL(LOGIN, request.url), {
        status: 303,
    });
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url), {
            status: 303,
        });
    }
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
