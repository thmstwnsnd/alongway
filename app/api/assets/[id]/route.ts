import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { deleteFile, getFile } from "@/lib/storage";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

/** The file's owner, or Alongway staff, can view it. */
async function loadAllowed(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, status: 401 };
  const asset = await prisma.asset.findUnique({ where: { id } });
  if (!asset) return { ok: false as const, status: 404 };
  const isStaff = session.user.role === "ADMIN";
  if (asset.userId !== session.user.id && !isStaff) return { ok: false as const, status: 404 };
  return { ok: true as const, asset, userId: session.user.id };
}

export async function GET(_req: Request, { params }: Ctx) {
  const found = await loadAllowed((await params).id);
  if (!found.ok) return new NextResponse(null, { status: found.status });
  const data = await getFile(found.asset.url).catch(() => null);
  if (!data) return new NextResponse(null, { status: 404 });
  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": found.asset.mimeType,
      "Content-Disposition": `attachment; filename="${found.asset.filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

/** Only the owner can delete a file. */
export async function DELETE(_req: Request, { params }: Ctx) {
  const found = await loadAllowed((await params).id);
  if (!found.ok) return new NextResponse(null, { status: found.status });
  if (found.asset.userId !== found.userId) return new NextResponse(null, { status: 404 });
  await deleteFile(found.asset.url).catch(() => {});
  await prisma.asset.delete({ where: { id: found.asset.id } });
  return new NextResponse(null, { status: 204 });
}
