// Prints a one-time key for /admin/setup. The database stores only its hash.
import { existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { hashToken } from "../lib/admin/password";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("Set DATABASE_URL before generating a setup key.");

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
try {
  if (await db.adminUser.count()) {
    console.error("An admin account already exists. Sign in at /admin/login.");
    process.exitCode = 1;
  } else {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const data = { tokenHash: hashToken(token), expiresAt };
    await db.adminSetup.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data });
    console.log(`Setup key (valid for 30 minutes):\n\n${token}\n\nOpen /admin/setup and paste it there.`);
  }
} finally {
  await db.$disconnect();
}
