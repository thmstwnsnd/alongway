import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";

import { sendMail } from "@/lib/mail";
import { isValidEmail, normalizeEmail } from "@/lib/password";
import { prisma } from "@/lib/prisma";

const ONE_HOUR = 60 * 60 * 1000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = normalizeEmail(String(body?.email ?? ""));

  if (isValidEmail(email)) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      await prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });
      await prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + ONE_HOUR) },
      });
      const origin = new URL(request.url).origin;
      await sendMail({
        to: email,
        subject: "Reset your Alongway password",
        text: `Use this link to choose a new password. It works once and expires in 1 hour.\n\n${origin}/portal/reset?token=${token}\n\nIf you did not ask for this, you can ignore this email.`,
      });
    }
  }

  // Same answer whether or not the account exists.
  return NextResponse.json({ ok: true });
}
