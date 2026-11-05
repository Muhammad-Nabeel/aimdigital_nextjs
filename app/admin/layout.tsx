import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog admin",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/admin/posts" className="text-lg font-bold tracking-tight">AIM<span className="text-primary"> DIGITAL</span><span className="ml-3 border-l border-border pl-3 text-sm font-medium text-muted-foreground">Blog studio</span></Link>
          <Link href="/" className="text-sm font-medium text-primary">View website ↗</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}
