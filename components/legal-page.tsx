import type { ReactNode } from "react";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function LegalPage({
  title,
  href,
  updated,
  children,
}: {
  title: string;
  href: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Breadcrumbs items={[{ label: title, href }]} />
      <h1 className="section-title">{title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated {updated}
      </p>
      <div className="mt-10 max-w-3xl space-y-5 leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
        {children}
      </div>
    </Section>
  );
}
