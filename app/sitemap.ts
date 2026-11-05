import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { taxonomySlug } from "@/content/blog/schema";
import { getPosts } from "@/lib/blog";

// Reads published posts per request, so new articles appear without a rebuild.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, site.url).toString();
  const posts = await getPosts();
  const pages = [
    "/",
    "/services",
    "/work",
    "/blog",
    "/faq",
    "/about",
    "/contact",
    "/quote",
    "/privacy",
    "/terms",
  ];
  const categories = [
    ...new Set(posts.map((post) => taxonomySlug(post.category))),
  ];
  return [
    ...pages.map((path) => ({ url: url(path) })),
    ...services.map((service) => ({ url: url(`/services/${service.slug}`) })),
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.updated ?? post.date,
    })),
    ...categories.map((slug) => ({ url: url(`/blog/category/${slug}`) })),
  ];
}
