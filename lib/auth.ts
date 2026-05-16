import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAdminToken, buildAuthCookie, buildClearCookie } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(parsed.data.password, admin.passwordHash);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signAdminToken(admin.id);
  const cookie = buildAuthCookie(token);

  return NextResponse.json(
    { ok: true, email: admin.email },
    { headers: { "Set-Cookie": cookie } }
  );
}

export async function DELETE() {
  const cookie = buildClearCookie();
  return NextResponse.json(
    { ok: true },
    { headers: { "Set-Cookie": cookie } }
  );
}