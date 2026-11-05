import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "./post-card";
import { PAGE_SIZE, type Post } from "@/lib/blog";
import { taxonomySlug } from "@/content/blog/schema";
export function BlogArchive({
  posts,
  allPosts,
  title = "Practical thinking for your next move.",
  base = "/blog",
  page = 1,
  label = "Blog",
}: {
  posts: Post[];
  allPosts: Post[];
  title?: string;
  base?: string;
  page?: number;
  label?: string;
}) {
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  if (page < 1 || page > pages) notFound();
  const visible = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const categories = [...new Set(allPosts.map((post) => post.category))];
  const tags = [...new Set(allPosts.flatMap((post) => post.tags))];
  const pageUrl = (n: number) => (n === 1 ? base : `${base}?page=${n}`);
  return (
    <Section>
      <Breadcrumbs
        items={
          base === "/blog"
            ? [{ label: "Blog", href: "/blog" }]
            : [
                { label: "Blog", href: "/blog" },
                { label, href: base },
              ]
        }
      />
      <p className="eyebrow">Insights & guides</p>
      <h1 className="section-title">{title}</h1>
      <p className="mb-8 mt-5 max-w-2xl text-lg text-muted-foreground">
        Clear guidance on websites, search and selling online.
      </p>
      <nav aria-label="Blog categories" className="mb-4 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="rounded-full border border-border px-4 py-2 text-sm"
        >
          All articles
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${taxonomySlug(category)}`}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary"
          >
            {category}
          </Link>
        ))}
      </nav>
      <nav
        aria-label="Blog tags"
        className="mb-10 flex flex-wrap gap-4 text-sm text-muted-foreground"
      >
        {tags.map((tag) => (
          <Link key={tag} href={`/blog/tag/${taxonomySlug(tag)}`}>
            #{tag}
          </Link>
        ))}
      </nav>
      {posts.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          New articles are on the way. In the meantime,{" "}
          <Link href="/faq" className="text-primary underline">
            browse our FAQ
          </Link>{" "}
          or{" "}
          <Link href="/quote" className="text-primary underline">
            tell us about your project
          </Link>
          .
        </p>
      ) : (
        <p className="mb-5 text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
          {pages > 1 && ` · Page ${page} of ${pages}`}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {pages > 1 && (
        <nav
          aria-label="Article pagination"
          className="mt-10 flex flex-wrap gap-3"
        >
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={pageUrl(n)}
              aria-current={n === page ? "page" : undefined}
              className={`flex size-11 items-center justify-center rounded-full border ${n === page ? "border-action bg-action text-white" : "border-border"}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
    </Section>
  );
}
