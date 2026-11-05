import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, pageNumber } from "@/lib/blog";
import { BlogArchive } from "@/components/blog/archive";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const page = pageNumber((await searchParams).page);
  if (!page) notFound();
  return {
    title:
      page === 1 ? "Blog and practical digital guides" : `Blog — page ${page}`,
    description:
      "Practical guides to website planning, SEO, AI-search content and e-commerce from AIM Digital.",
    alternates: { canonical: page === 1 ? "/blog" : `/blog?page=${page}` },
  };
}
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = pageNumber((await searchParams).page);
  if (!page) notFound();
  const posts = await getPosts();
  return <BlogArchive posts={posts} allPosts={posts} page={page} />;
}
