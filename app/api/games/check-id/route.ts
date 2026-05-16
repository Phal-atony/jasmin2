import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { z } from "zod";

const schema = z.object({
  slug: z.enum(["mobile-legends", "honor-of-king", "free-fire", "pubg-mobile", "ro-blox"]),
  uid: z.string().min(4).max(20),
  serverId: z.string().regex(/^\d{1,6}$/, "Server/Zone must be digits").optional(),
});

const UPSTREAM: Record<
  z.infer<typeof schema>["slug"],
  { path: string; needsServer: boolean }
> = {
  "mobile-legends": { path: "/nickname/ml",       needsServer: true  },
  "honor-of-king":  { path: "/nickname/hok",      needsServer: true  },
  "free-fire":      { path: "/nickname/freefire",  needsServer: false },
  "pubg-mobile":    { path: "/nickname/pubg",      needsServer: false },
  "ro-blox":        { path: "/nickname/roblox",    needsServer: false },
};

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const { slug, uid, serverId } = parsed.data;
  const cfg = UPSTREAM[slug];

  if (cfg.needsServer && !serverId) {
    return NextResponse.json(
      { success: false, error: "Server/Zone ID is required for this game" },
      { status: 400 }
    );
  }

  // Build URL: /nickname/{game}/{uid} or /nickname/{game}/{uid}/{zone}
  const segments = [encodeURIComponent(uid)];
  if (cfg.needsServer && serverId) segments.push(encodeURIComponent(serverId));
  const upstreamUrl = `https://api.isan.eu.org${cfg.path}/${segments.join("/")}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(upstreamUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data: unknown = await res.json().catch(() => null);
    if (!data || typeof data !== "object") {
      return NextResponse.json({ success: false, error: "Lookup failed" }, { status: 502 });
    }

    const d = data as { success?: boolean; name?: string; message?: string };
    if (!d.success || !d.name) {
      const msg = d.message && d.message.toLowerCase() !== "bad request"
        ? d.message
        : "Player not found — check your ID and zone.";
      return NextResponse.json({ success: false, error: msg }, { status: 404 });
    }

    return NextResponse.json({ success: true, name: d.name, uid, serverId: serverId ?? null });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      { success: false, error: aborted ? "Lookup timed out" : "Network error" },
      { status: 504 }
    );
  }
}