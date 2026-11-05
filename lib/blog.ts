import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { listPosts, type StoredPost } from "@/lib/blog-store";
export type Post = StoredPost;
export const getPosts = cache(async (): Promise<Post[]> => {
  await connection();
  return listPosts();
});
export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}
export async function relatedPosts(post: Post) {
  return (await getPosts())
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      post: other,
      score:
        (other.category === post.category ? 3 : 0) +
        other.tags.filter((tag) => post.tags.includes(tag)).length +
        other.relatedServices.filter((slug) =>
          post.relatedServices.includes(slug),
        ).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);
}
export const PAGE_SIZE = 9;
export function pageNumber(value: string | undefined) {
  if (value === undefined) return 1;
  return /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value))
    ? Number(value)
    : null;
}
