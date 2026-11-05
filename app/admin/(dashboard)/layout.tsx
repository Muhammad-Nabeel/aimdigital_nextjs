import { requireAdmin } from "@/lib/admin/auth";
import { logoutAction } from "@/app/admin/actions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <><div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground"><p>Signed in as <span className="font-medium text-foreground">{admin.email}</span></p><form action={logoutAction}><button className="min-h-11 rounded-full border border-border bg-card px-5 font-medium text-foreground">Sign out</button></form></div>{children}</>;
}
