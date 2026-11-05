import { redirect } from "next/navigation";
import { hasAdmin } from "@/lib/admin/auth";
import { AuthForm } from "@/components/admin/auth-form";

export default async function SetupPage() {
  if (await hasAdmin()) redirect("/admin/login");
  return <section className="mx-auto max-w-md rounded-3xl border border-border bg-card p-7 sm:p-10"><p className="eyebrow">First-time setup</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Make this space yours.</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Choose your admin login. You’ll need the private setup key generated in the project terminal.</p><AuthForm setup /></section>;
}
