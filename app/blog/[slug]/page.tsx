import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, relatedPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/mdx";
import { getAuthor, taxonomySlug } from "@/content/blog/schema";
import { services } from "@/content/services";
import { site } from "@/config/site";
import { Section } from "@/components/section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TOC } from "@/components/blog/toc";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostCard } from "@/components/blog/post-card";
import { FAQAccordion } from "@/components/faq-accordion";
import { FAQSchema } from "@/components/faq-schema";
import { CTABanner } from "@/components/cta-banner";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}
async function postFrom(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return post;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await postFrom(params);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: post.coverImage, alt: post.coverAlt }],
    },
  };
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await postFrom(params);
  const author = getAuthor(post.author);
  const rendered = await renderMarkdown(post.content);
  const related = await relatedPosts(post);
  return (
    <Section>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <header className="max-w-4xl">
        <Link
          href={`/blog/category/${taxonomySlug(post.category)}`}
          className="eyebrow"
        >
          {post.category}
        </Link>
        <h1 className="section-title">{post.title}</h1>
        <p className="mt-5 text-sm text-muted-foreground">
          By {author.name} ·{" "}
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Europe/London",
            })}
          </time>{" "}
          · {post.minutes} min read
        </p>
        {post.updated && (
          <p className="mt-2 text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime={post.updated}>{post.updated.slice(0, 10)}</time>
          </p>
        )}
        {post.sample && (
          <p className="mt-5 rounded-xl border border-border bg-muted p-4 text-sm">
            Sample article for preview only. Clear the sample flag in the blog
            studio once it has been reviewed.
          </p>
        )}
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <section className="mb-8 rounded-2xl bg-muted p-7">
            <h2 className="text-xl font-semibold">Key takeaways / TL;DR</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-muted-foreground">
              {post.keyTakeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </section>
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            width={800}
            height={520}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="mb-8 w-full rounded-2xl"
          />
          <article className="article-body">{rendered.body}</article>
          {post.faq.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-5 text-2xl font-semibold">
                What else should you know?
              </h2>
              <FAQAccordion
                items={post.faq.map((faq) => ({
                  ...faq,
                  category: "General" as const,
                }))}
              />
              <FAQSchema items={post.faq} />
            </section>
          )}
          <section className="mt-10 rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold">About the author</h2>
            <p className="mt-3 font-semibold">{author.name}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {author.bio}
            </p>
            <a
              href={author.url}
              className="mt-4 inline-block text-primary underline"
            >
              AIM Digital on LinkedIn ↗
            </a>
          </section>
          <nav aria-label="Related services" className="mt-10">
            <h2 className="mb-4 text-2xl font-semibold">
              Put the guidance into practice
            </h2>
            <div className="flex flex-wrap gap-3">
              {services
                .filter((service) =>
                  post.relatedServices.includes(service.slug),
                )
                .map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-full border border-border px-4 py-3 text-sm text-primary"
                  >
                    {service.shortTitle} ↗
                  </Link>
                ))}
            </div>
          </nav>
          <nav
            aria-label="Article tags"
            className="mt-6 flex flex-wrap gap-4 text-sm"
          >
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${taxonomySlug(tag)}`}
                className="text-muted-foreground"
              >
                #{tag}
              </Link>
            ))}
          </nav>
          <ShareButtons
            url={new URL(`/blog/${post.slug}`, site.url).href}
            title={post.title}
          />
        </div>
        <aside className="self-start lg:sticky lg:top-28">
          <TOC headings={rendered.headings} />
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-3xl font-semibold">
            What should you read next?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((entry) => (
              <PostCard key={entry.slug} post={entry} />
            ))}
          </div>
        </section>
      )}
      <CTABanner />
    </Section>
  );
}
