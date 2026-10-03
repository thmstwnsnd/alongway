import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { ALLOWED_ART_EXTENSIONS, MAX_ART_BYTES, hasAllowedExtension } from "@/data/placements";
import { prisma } from "@/lib/prisma";
import { putFile } from "@/lib/storage";

export const runtime = "nodejs";

/** True when the first bytes look like a PDF, an Illustrator file (PDF-based or PostScript) or an EPS. */
function looksLikeVector(buf: Buffer) {
  const head = buf.subarray(0, 8);
  const text = head.toString("latin1");
  if (text.startsWith("%PDF")) return true;
  if (text.startsWith("%!PS")) return true;
  // EPS with a binary preview header
  return head[0] === 0xc5 && head[1] === 0xd0 && head[2] === 0xd3 && head[3] === 0xc6;
}

/** Upload one artwork or logo file. Signed-in customers only; .ai, .pdf and .eps only. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sign in to upload files." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file received." }, { status: 400 });

  if (!hasAllowedExtension(file.name)) {
    return NextResponse.json(
      { error: `We accept ${ALLOWED_ART_EXTENSIONS.join(", ")} files only. PNG and JPEG are not accepted for production.` },
      { status: 415 },
    );
  }
  if (file.size === 0) return NextResponse.json({ error: "That file is empty." }, { status: 400 });
  if (file.size > MAX_ART_BYTES) return NextResponse.json({ error: "Files can be up to 50 MB." }, { status: 413 });

  const data = Buffer.from(await file.arrayBuffer());
  if (!looksLikeVector(data)) {
    return NextResponse.json({ error: "That doesn't look like a real .ai, .pdf or .eps file. Export it again from your design app." }, { status: 415 });
  }

  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const key = `${session.user.id}/${randomUUID()}${ext}`;
  await putFile(key, data);

  const asset = await prisma.asset.create({
    data: {
      userId: session.user.id,
      url: key,
      filename: file.name.slice(0, 200),
      mimeType: ext === ".pdf" ? "application/pdf" : "application/postscript",
      bytes: file.size,
    },
  });

  return NextResponse.json({ id: asset.id, name: asset.filename, bytes: asset.bytes });
}
