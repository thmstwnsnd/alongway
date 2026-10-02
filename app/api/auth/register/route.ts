import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  MIN_PASSWORD_LENGTH,
  hashPassword,
  isValidEmail,
  normalizeEmail,
} from "@/lib/password";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = normalizeEmail(String(body?.email ?? ""));
  const password = String(body?.password ?? "");
  const name = String(body?.name ?? "").trim() || null;
  const marketingOptIn = Boolean(body?.marketingOptIn);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Use a password of at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Try signing in." },
      { status: 409 },
    );
  }

  const user = await prisma.user.create({
    data: { email, name, marketingOptIn, passwordHash: await hashPassword(password) },
    select: { id: true, email: true },
  });

  return NextResponse.json({ ok: true, user }, { status: 201 });
}
