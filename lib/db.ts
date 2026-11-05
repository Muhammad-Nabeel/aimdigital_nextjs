import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

// Reuse one client across dev hot reloads so connections are not exhausted.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function connect() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Set DATABASE_URL to the Prisma Postgres connection string.");
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

export function getDatabase(): PrismaClient {
  globalForPrisma.prisma ??= connect();
  return globalForPrisma.prisma;
}
