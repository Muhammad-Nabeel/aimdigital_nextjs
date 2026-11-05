import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, pageNumber } from "@/lib/blog";
import { taxonomySlug } from "@/content/blog/schema";
import { BlogArchive } from "@/components/blog/archive";
type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};
async function data({ params, searchParams }: Props) {
  const { category } = await params;
  const allPosts = await getPosts();
  const posts = allPosts.filter(
    (post) => taxonomySlug(post.category) === category,
  );
  const page = pageNumber((await searchParams).page);
  if (!posts.length || !page) notFound();
  return {
    allPosts,
    posts,
    page,
    label: posts[0].category,
    base: `/blog/category/${category}`,
  };
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { label, base, page } = await data(props);
  return {
    title: `${label} guides${page > 1 ? ` — page ${page}` : ""}`,
    description: `Explore AIM Digital articles about ${label.toLowerCase()}.`,
    alternates: { canonical: page === 1 ? base : `${base}?page=${page}` },
  };
}
export default async function CategoryPage(props: Props) {
  const archive = await data(props);
  return (
    <BlogArchive {...archive} title={`${archive.label}: answers and guides.`} />
  );
}
