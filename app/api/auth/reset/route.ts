import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { MIN_PASSWORD_LENGTH, hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = String(body?.token ?? "");
  const password = String(body?.password ?? "");

  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Use a password of at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired. Please request a new one." },
      { status: 400 },
    );
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash: await hashPassword(password) } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  return NextResponse.json({ ok: true });
}
