import { z } from "zod";
import { services } from "@/content/services";
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.union([z.iso.date(), z.iso.datetime({ offset: true })]);
export const authors = {
  "aim-digital": {
    name: "AIM Digital editorial team",
    bio: "Practical guidance from AIM Digital on planning websites, improving content and running online stores.",
    url: "https://www.linkedin.com/company/aim-digital-uk-limited",
  },
};
export const blogSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    seoTitle: z.string().trim().max(100).optional(),
    slug,
    description: z.string().min(1).max(300),
    date,
    updated: date.optional(),
    author: z
      .string()
      .refine(
        (value) => Object.hasOwn(authors, value),
        "Unknown author: add an approved author to content/blog/schema.ts",
      ),
    category: z.string().trim().min(1).max(80).refine((value) => Boolean(taxonomySlug(value)), "Use a category containing letters or numbers"),
    tags: z.array(z.string().trim().min(1).max(80).refine((value) => Boolean(taxonomySlug(value)), "Use tags containing letters or numbers")).max(20),
    coverImage: z
      .string()
      .regex(
        /^\/(?:brand\/[a-zA-Z0-9._-]+|media\/blog\/[a-f0-9-]{36})$/,
        "Choose a library image or upload a blog cover",
      ),
    coverAlt: z.string().trim().min(1).max(300),
    faq: z.array(
      z.object({ question: z.string().min(1), answer: z.string().min(1) }),
    ),
    keyTakeaways: z.array(z.string().min(1).max(500)).max(10),
    relatedServices: z.array(
      z
        .string()
        .refine(
          (value) => services.some((service) => service.slug === value),
          "Unknown service slug",
        ),
    ),
    draft: z.boolean(),
    sample: z.boolean().default(false),
  })
  .refine(
    (post) =>
      !post.updated || Date.parse(post.updated) >= Date.parse(post.date),
    {
      path: ["updated"],
      message: "Updated date must not precede publication date",
    },
  );
export type BlogFrontmatter = z.infer<typeof blogSchema>;
export function taxonomySlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function getAuthor(id: string) {
  if (id !== "aim-digital") throw new Error(`Unknown author: ${id}`);
  return authors[id];
}
