import type { Heading } from "@/lib/mdx";
export function TOC({ headings }: { headings: Heading[] }) {
  return (
    <nav
      aria-label="Article contents"
      className="rounded-2xl border border-border bg-muted/50 p-6"
    >
      <h2 className="font-semibold">On this page</h2>
      <ol className="mt-4 space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-primary"
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
