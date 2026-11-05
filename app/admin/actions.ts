"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkCredentials, createSession, destroySession, requireAdmin, setupAdmin } from "@/lib/admin/auth";
import { deletePost, findPostById, savePost } from "@/lib/blog-store";

export type AuthState = { error: string };
const credentials = z.object({ email: z.email().max(254).transform((value) => value.toLowerCase()), password: z.string().min(1).max(256) });

export async function loginAction(_state: AuthState, form: FormData): Promise<AuthState> {
  const parsed = credentials.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "Enter a valid email address and password." };
  try {
    if (!(await checkCredentials(parsed.data.email, parsed.data.password))) return { error: "Sign-in failed. Check your details, or wait 15 minutes if you have tried several times." };
    await createSession();
  } catch { return { error: "Sign-in is unavailable. Please check the database connection and try again." }; }
  redirect("/admin/posts");
}

export async function setupAction(_state: AuthState, form: FormData): Promise<AuthState> {
  const parsed = credentials.extend({ password: z.string().min(12).max(256), token: z.string().regex(/^[a-f0-9]{64}$/), confirm: z.string() }).safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "Enter a valid email, setup key and a password with at least 12 characters." };
  if (parsed.data.password !== parsed.data.confirm) return { error: "The passwords do not match." };
  try {
    const created = await setupAdmin(parsed.data.email, parsed.data.password, parsed.data.token);
    if (!created) return { error: "This setup link is invalid, expired or already used. Generate a new key with npm run admin:setup-key." };
    await createSession();
  } catch { return { error: "Account setup failed. Check your database connection and try again." }; }
  redirect("/admin/posts");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function refreshBlog() {
  revalidatePath("/");
  revalidatePath("/blog", "layout");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/admin", "layout");
}

export async function saveBlogAction(input: unknown) {
  await requireAdmin();
  try {
    const id = await savePost(input);
    const saved = await findPostById(id);
    if (!saved) return { error: "The saved article could not be loaded. Refresh the page." };
    refreshBlog();
    return { id, version: saved.version, modifiedAt: saved.modifiedAt };
  } catch (error) {
    if (error instanceof z.ZodError) return { error: error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(" · ") };
    if (error instanceof Error && !/SQL|database|prisma|connect|fetch|credentials|token/i.test(error.message)) return { error: error.message };
    return { error: "The article could not be saved. Your changes are still in the editor. Please try again." };
  }
}

export async function deleteBlogAction(input: unknown) {
  await requireAdmin();
  const parsed = z.object({ id: z.uuid(), version: z.number().int().positive() }).safeParse(input);
  if (!parsed.success) return { error: "Invalid article. Refresh and try again." };
  try {
    await deletePost(parsed.data.id, parsed.data.version);
    refreshBlog();
    return { success: true };
  } catch {
    return { error: "The article changed or could not be deleted. Refresh the list and try again." };
  }
}
