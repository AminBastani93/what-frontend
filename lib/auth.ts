import { jwtVerify, JWTPayload, decodeJwt, SignJWT } from "jose";
import { env } from "next-runtime-env";

export function getJwtSecretKey() {
    const secret = env("JWT_SECRET");

    if (!secret) {
        throw new Error("JWT Secret key is not set");
    }

    const enc: Uint8Array = new TextEncoder().encode(secret);
    return enc;
}

export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());

        return payload;
    } catch (error) {
        return null;
    }
}
