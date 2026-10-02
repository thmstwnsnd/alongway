import { PrismaClient } from "@prisma/client";

// One shared client. In development Next.js reloads modules often, so the
// client is kept on globalThis to avoid opening a new connection each time.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
