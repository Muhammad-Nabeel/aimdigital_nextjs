"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteShell({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const path = usePathname();
  const admin = path === "/admin" || path.startsWith("/admin/");
  return (
    <>
      {!admin && header}
      <main id="main-content">{children}</main>
      {!admin && footer}
    </>
  );
}
