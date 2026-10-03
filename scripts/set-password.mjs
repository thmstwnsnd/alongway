// Dev only: set a new password for an existing account.
// Usage: node scripts/set-password.mjs you@example.com 'new password'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const [email, password] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error("Usage: node scripts/set-password.mjs you@example.com 'new password (8+ chars)'");
  process.exit(1);
}
const prisma = new PrismaClient();
const result = await prisma.user.updateMany({
  where: { email: email.trim().toLowerCase() },
  data: { passwordHash: await bcrypt.hash(password, 12) },
});
console.log(result.count ? "Password updated." : "No account with that email.");
await prisma.$disconnect();
