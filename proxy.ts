import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "rithtopup_admin";

// ── Config from .env.local ────────────────────────────────────────────────────
// ADMIN_ALLOWED_IP="203.144.12.55"
// ADMIN_LOGIN_PATH="/your-secret-path"   ← custom login URL
const ALLOWED_IP       = process.env.ADMIN_ALLOWED_IP ?? "";
const ADMIN_LOGIN_PATH = process.env.ADMIN_LOGIN_PATH ?? "/admin/login";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = getClientIP(req);

  // ── 1. IP Whitelist ───────────────────────────────────────────────────────
  if (ALLOWED_IP && ip !== ALLOWED_IP) {
    return new NextResponse("404 Not Found", { status: 404 });
  }

  // ── 2. Skip custom login page & auth API ──────────────────────────────────
  if (pathname === ADMIN_LOGIN_PATH || pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // ── 3. Hide old /admin/login → 404 so no one can guess ───────────────────
  if (pathname === "/admin/login") {
    return new NextResponse("404 Not Found", { status: 404 });
  }

  // ── 4. JWT verification ───────────────────────────────────────────────────
  const token  = req.cookies.get(SESSION_COOKIE)?.value;
  const secret = getSecret();

  if (!token || !secret) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};