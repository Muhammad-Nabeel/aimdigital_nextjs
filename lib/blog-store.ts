import "server-only";
import { randomUUID } from "node:crypto";
import { Prisma, type BlogPost } from "@/lib/generated/prisma/client";
import { z } from "zod";
import { blogSchema, type BlogFrontmatter } from "@/content/blog/schema";
import { getDatabase } from "@/lib/db";
import { renderMarkdown } from "@/lib/mdx";

export type StoredPost = BlogFrontmatter & {
  id: string;
  content: string;
  minutes: number;
  version: number;
  createdAt: string;
  modifiedAt: string;
};
export const editorSchema = blogSchema.and(z.object({
  id: z.uuid().optional(),
  version: z.number().int().positive().optional(),
  content: z.string().max(200000),
}));
export type EditorPost = z.infer<typeof editorSchema>;

function fromRow(row: BlogPost): StoredPost {
  const metadata = blogSchema.parse(row.metadata);
  const content = row.content;
  const words = content.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
  return {
    ...metadata, content, id: row.id, version: row.version,
    minutes: Math.max(1, Math.ceil(words / 200)),
    createdAt: row.createdAt.toISOString(), modifiedAt: row.modifiedAt.toISOString(),
  };
}

export async function listPosts(includeDrafts = false): Promise<StoredPost[]> {
  const query: Prisma.BlogPostFindManyArgs = includeDrafts
    ? { orderBy: { modifiedAt: "desc" } }
    : { where: { draft: false, publishedAt: { lte: new Date() } }, orderBy: [{ publishedAt: "desc" }, { slug: "asc" }] };
  const rows = await getDatabase().blogPost.findMany(query);
  return rows.map(fromRow);
}

export async function findPostById(id: string) {
  if (!z.uuid().safeParse(id).success) return null;
  const row = await getDatabase().blogPost.findUnique({ where: { id } });
  return row ? fromRow(row) : null;
}

export async function savePost(input: unknown) {
  const post = editorSchema.parse(input);
  if (!post.draft && !post.content.trim()) throw new Error("Add article content before publishing.");
  if (!post.draft && post.sample) throw new Error("Clear the sample flag before publishing this article.");
  if (!post.draft && Date.parse(post.date) > Date.now()) throw new Error("Choose today or an earlier publication date.");
  // Compile before saving: JSX, imports, scripts, duplicate H1s and inline images are rejected.
  await renderMarkdown(post.content);
  const db = getDatabase();
  const metadata = blogSchema.parse(post);
  const now = new Date();
  metadata.updated = Date.parse(post.date) > Date.now() ? undefined : now.toISOString();
  // Frontmatter validation ensures the modified date is not before publication.
  blogSchema.parse(metadata);
  if (post.id) {
    const existing = await findPostById(post.id);
    if (!existing) throw new Error("This article no longer exists.");
    if (existing.slug !== post.slug) throw new Error("The URL slug cannot change after the first save. Create a new article to use another URL.");
    if (!post.version) throw new Error("Reload this article before saving.");
    const result = await db.blogPost.updateMany({
      where: { id: post.id, version: post.version },
      data: { metadata, content: post.content, draft: post.draft, publishedAt: new Date(post.date), modifiedAt: now, version: { increment: 1 } },
    });
    if (!result.count) throw new Error("This article changed in another tab. Reload it before saving so your changes do not overwrite newer work.");
    return post.id;
  }
  const id = randomUUID();
  try {
    await db.blogPost.create({
      data: { id, slug: post.slug, metadata, content: post.content, draft: post.draft, publishedAt: new Date(post.date), createdAt: now, modifiedAt: now },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") throw new Error("An article already uses this URL slug. Choose another one.");
    throw error;
  }
  return id;
}

export async function deletePost(id: string, version: number) {
  // Postgres rejects malformed UUIDs with a query error, so filter them out first.
  const result = z.uuid().safeParse(id).success
    ? await getDatabase().blogPost.deleteMany({ where: { id, version } })
    : { count: 0 };
  if (!result.count) throw new Error("The article changed or was deleted. Reload the list and try again.");
}
