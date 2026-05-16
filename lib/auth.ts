import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? (() => { throw new Error("JWT_SECRET is not set!"); })()
);

export interface AdminPayload extends JWTPayload {
  adminId: string;
  role: "ADMIN";
}

// ── Sign a new admin token (call after password check) ───────────────────────
export async function signAdminToken(adminId: string): Promise<string> {
  return new SignJWT({ adminId, role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")   // Token ផុតកំណត់ ក្នុង 8 ម៉ោង
    .sign(SECRET);
}

// ── Verify a token string ─────────────────────────────────────────────────────
export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (payload.role !== "ADMIN") return null;
    return payload as AdminPayload;
  } catch {
    return null;
  }
}

// ── Get the current admin from the request cookie (use in API routes) ─────────
export async function getAdminFromCookie(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

// ── Set the token as an HTTP-only cookie (call after login) ───────────────────
export function buildAuthCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === "production";
  return [
    `admin_token=${token}`,
    "HttpOnly",                          // JS មិនអាចអាន cookie បាន
    "SameSite=Strict",                   // ការពារ CSRF
    isProduction ? "Secure" : "",        // HTTPS only នៅ production
    "Path=/",
    "Max-Age=28800",                     // 8 ម៉ោង (seconds)
  ]
    .filter(Boolean)
    .join("; ");
}

// ── Clear the cookie (call on logout) ────────────────────────────────────────
export function buildClearCookie(): string {
  return "admin_token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0";
}