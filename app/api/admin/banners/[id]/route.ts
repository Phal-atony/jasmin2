import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

import { writeAudit } from "@/lib/audit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional().nullable(),
  imageUrl: z.string().min(1).optional(),
  linkUrl: z.string().optional().nullable(),
  ctaLabel: z.string().optional().nullable(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  const banner = await prisma.heroBanner.update({ where: { id: id }, data: parsed.data });
  await writeAudit({ action: "banner.update", targetType: "banner", targetId: id, details: parsed.data });
  return NextResponse.json(banner);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.heroBanner.delete({ where: { id: id } });
  await writeAudit({ action: "banner.delete", targetType: "banner", targetId: id });
  return NextResponse.json({ ok: true });
}
