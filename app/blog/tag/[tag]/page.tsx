import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, pageNumber } from "@/lib/blog";
import { taxonomySlug } from "@/content/blog/schema";
import { BlogArchive } from "@/components/blog/archive";
type Props = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
};
async function data({ params, searchParams }: Props) {
  const { tag } = await params;
  const allPosts = await getPosts();
  const posts = allPosts.filter((post) =>
    post.tags.some((name) => taxonomySlug(name) === tag),
  );
  const page = pageNumber((await searchParams).page);
  if (!posts.length || !page) notFound();
  const label = posts[0].tags.find((name) => taxonomySlug(name) === tag)!;
  return { allPosts, posts, page, label, base: `/blog/tag/${tag}` };
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { label, base, page } = await data(props);
  return {
    title: `Articles tagged ${label}${page > 1 ? ` — page ${page}` : ""}`,
    description: `Read AIM Digital guidance related to ${label}.`,
    alternates: { canonical: page === 1 ? base : `${base}?page=${page}` },
  };
}
export default async function TagPage(props: Props) {
  const archive = await data(props);
  return <BlogArchive {...archive} title={`Explore ${archive.label}.`} />;
}
