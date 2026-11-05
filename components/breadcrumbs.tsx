import Link from "next/link";
import { site } from "@/config/site";
import { JsonLd } from "@/lib/schema/json-ld";
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const crumbs = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap gap-2">
          {crumbs.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === crumbs.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: new URL(item.href, site.url).href,
          })),
        }}
      />
    </>
  );
}
