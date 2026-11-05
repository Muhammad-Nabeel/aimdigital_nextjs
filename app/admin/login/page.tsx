import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { currentAdmin, hasAdmin } from "@/lib/admin/auth";
import { AuthForm } from "@/components/admin/auth-form";

export default async function LoginPage() {
  if (await currentAdmin()) redirect("/admin/posts");
  const configured = await hasAdmin();
  return (
    <section className="mx-auto my-8 max-w-md rounded-3xl border border-border bg-card p-7 sm:p-10">
      <LockKeyhole aria-hidden="true" className="mb-6 size-9 text-primary" />
      <p className="eyebrow">Your publishing workspace</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Welcome back.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in to write articles, manage drafts and publish to your website.</p>
      {configured ? <AuthForm /> : <div className="mt-7 rounded-xl bg-muted p-5 text-sm leading-7"><p>Create the first admin account using a one-time setup link. Run <code>npm run admin:setup</code> in the project terminal, then open the link it prints.</p><Link className="mt-3 inline-block font-semibold text-primary underline" href="/admin/setup">Open account setup</Link></div>}
    </section>
  );
}
