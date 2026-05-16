import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signAdminToken, buildAuthCookie, buildClearCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email: parsed.data.email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      admin.passwordHash
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signAdminToken(String(admin.id));
    const cookie = buildAuthCookie(token);

    return NextResponse.json(
      {
        ok: true,
        email: admin.email,
      },
      {
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookie = buildClearCookie();

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
}