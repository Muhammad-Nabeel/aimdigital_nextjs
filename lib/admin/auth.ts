import "server-only";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDatabase } from "@/lib/db";
import { hashPassword, hashToken, verifyPassword } from "@/lib/admin/password";

export const sessionCookie = process.env.NODE_ENV === "production" ? "__Host-aim-admin" : "aim-admin";
const sessionSeconds = 8 * 60 * 60;

export async function takeAttempt(bucket: string, limit: number, windowMs = 15 * 60 * 1000) {
  const now = new Date();
  const resetsAt = new Date(now.getTime() + windowMs);
  // One upsert keeps concurrent attempts from racing past the limit.
  const [row] = await getDatabase().$queryRaw<{ attempts: number }[]>`
    INSERT INTO admin_rate_limits (bucket, attempts, resets_at) VALUES (${bucket}, 1, ${resetsAt})
    ON CONFLICT (bucket) DO UPDATE SET
    attempts = CASE WHEN admin_rate_limits.resets_at <= ${now} THEN 1 ELSE admin_rate_limits.attempts + 1 END,
    resets_at = CASE WHEN admin_rate_limits.resets_at <= ${now} THEN ${resetsAt} ELSE admin_rate_limits.resets_at END
    RETURNING attempts`;
  return row.attempts <= limit;
}
export async function hasAdmin() {
  return (await getDatabase().adminUser.count({ where: { id: 1 } })) > 0;
}
export async function setupAdmin(email: string, password: string, token: string) {
  if (!(await takeAttempt("setup", 10))) return false;
  const db = getDatabase();
  const tokenHash = hashToken(token);
  const valid = await db.adminSetup.count({ where: { id: 1, tokenHash, expiresAt: { gt: new Date() } } });
  if (!valid || await hasAdmin()) return false;
  const passwordHash = await hashPassword(password);
  try {
    // The setup key is consumed in the same transaction; id = 1 means a racing second setup fails.
    await db.$transaction(async (tx) => {
      const used = await tx.adminSetup.deleteMany({ where: { id: 1, tokenHash, expiresAt: { gt: new Date() } } });
      if (!used.count) throw new Error("Setup key expired");
      await tx.adminUser.create({ data: { id: 1, email: email.toLowerCase(), passwordHash, createdAt: new Date() } });
    });
    return true;
  } catch {
    return false;
  }
}
export async function checkCredentials(email: string, password: string) {
  if (!(await takeAttempt("login", 20))) return false;
  const admin = await getDatabase().adminUser.findUnique({ where: { id: 1 } });
  if (!admin) return false;
  const passwordCorrect = await verifyPassword(password, admin.passwordHash);
  return passwordCorrect && admin.email === email.toLowerCase();
}
export async function createSession() {
  const token = randomBytes(32).toString("hex");
  const db = getDatabase();
  await db.$transaction([
    db.adminSession.deleteMany({ where: { expiresAt: { lte: new Date() } } }),
    db.adminSession.create({ data: { tokenHash: hashToken(token), expiresAt: new Date(Date.now() + sessionSeconds * 1000) } }),
  ]);
  (await cookies()).set(sessionCookie, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",
    path: "/", maxAge: sessionSeconds,
  });
}
export async function currentAdmin() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const db = getDatabase();
  const [session, admin] = await Promise.all([
    db.adminSession.count({ where: { tokenHash: hashToken(token), expiresAt: { gt: new Date() } } }),
    db.adminUser.findUnique({ where: { id: 1 }, select: { email: true } }),
  ]);
  return session && admin ? { email: admin.email } : null;
}
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(sessionCookie)?.value;
  if (token) {
    await getDatabase().adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  jar.delete(sessionCookie);
}
