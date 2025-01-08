import { jwtVerify, JWTPayload } from "jose";
import { env } from "next-runtime-env";

// Get the JWT secret key from the environment variables
export function getJwtSecretKey() {
    const secret = env("JWT_SECRET");

    if (!secret) {
        throw new Error("JWT Secret key is not set");
    }

    const enc: Uint8Array = new TextEncoder().encode(secret);
    return enc;
}

// Verify the JWT token
export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());

        return payload;
    } catch (error) {
        return null;
    }
}
