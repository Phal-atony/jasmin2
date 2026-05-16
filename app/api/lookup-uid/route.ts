import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  gameSlug: z.string().min(1).max(60),
  uid: z.string().min(4).max(30),
  server: z.string().min(1).max(20).optional(),
});

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = "id-game-checker.p.rapidapi.com";

const GAME_CONFIG: Record<
  string,
  { endpoint: string; needsServer: boolean; useRoblox?: boolean }
> = {
  "mobile-legends": { endpoint: "/mobile-legends/{uid}/{zone}", needsServer: true  },
  "free-fire":      { endpoint: "/ff-global/{uid}",             needsServer: false },
  "pubg-mobile":    { endpoint: "/pubgm-global/{uid}",          needsServer: false },
  "ro-blox":        { endpoint: "",                             needsServer: false, useRoblox: true },
};

// Roblox uses free public API — no RapidAPI key needed
async function lookupRoblox(uid: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://users.roblox.com/v1/users/${uid}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json().catch(() => null);
    return data?.name ? String(data.name) : null;
  } catch {
    return null;
  }
}

async function lookupRapidApi(
  endpoint: string,
  uid: string,
  zone?: string
): Promise<string | null> {
  try {
    const path = endpoint
      .replace("{uid}", encodeURIComponent(uid))
      .replace("{zone}", encodeURIComponent(zone ?? ""));

    const url = `https://${RAPIDAPI_HOST}${path}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json().catch(() => null);
    if (!data) return null;

    const name =
      data?.data?.username ||   // id-game-checker format
      data?.data?.name ||
      data?.data?.nickname ||
      data?.name ||
      data?.nickname ||
      data?.username ||
      data?.player_name ||
      data?.playerName ||
      data?.result?.name ||
      null;

    return name ? String(name) : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(`uid-lookup:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { nickname: null, verified: false, error: "Too many requests — try again shortly" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { nickname: null, verified: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { nickname: null, verified: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { gameSlug, uid, server } = parsed.data;
  const cfg = GAME_CONFIG[gameSlug];

  if (!cfg) {
    return NextResponse.json({
      nickname: null,
      verified: false,
      error: "This game does not support ID check yet",
    });
  }

  if (cfg.needsServer && !server) {
    return NextResponse.json(
      { nickname: null, verified: false, error: "Zone ID is required" },
      { status: 400 }
    );
  }

  // Roblox — use free public API
  if (cfg.useRoblox) {
    const nickname = await lookupRoblox(uid.trim());
    return NextResponse.json({ nickname, verified: nickname !== null });
  }

  // Other games — use RapidAPI
  if (!RAPIDAPI_KEY) {
    return NextResponse.json(
      { nickname: null, verified: false, error: "API key not configured" },
      { status: 500 }
    );
  }

  const nickname = await lookupRapidApi(
    cfg.endpoint,
    uid.trim(),
    cfg.needsServer ? server?.trim() : undefined
  );

  return NextResponse.json({
    nickname,
    verified: nickname !== null,
  });
}