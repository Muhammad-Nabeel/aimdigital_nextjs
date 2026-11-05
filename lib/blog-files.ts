import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parseFrontmatter } from "@/lib/frontmatter";
import { blogSchema, taxonomySlug } from "@/content/blog/schema";

// Files are import sources only. Public pages read the database.
export async function readBlogFiles(directory = path.join(process.cwd(), "content/blog")) {
  const files = (await readdir(directory)).filter((name) => /\.mdx?$/.test(name)).sort();
  const slugs = new Set<string>();
  const taxonomies = new Map<string, string>();
  return Promise.all(files.map(async (file) => {
    const source = parseFrontmatter(await readFile(path.join(directory, file), "utf8"));
    const metadata = blogSchema.parse(source.data);
    if (slugs.has(metadata.slug)) throw new Error(`Duplicate blog slug: ${metadata.slug}`);
    slugs.add(metadata.slug);
    for (const [kind, names] of [["category", [metadata.category]], ["tag", metadata.tags]] as const) {
      for (const name of names) {
        const key = `${kind}:${taxonomySlug(name)}`;
        const previous = taxonomies.get(key);
        if (!taxonomySlug(name) || (previous && previous !== name)) throw new Error(`Ambiguous blog taxonomy: ${name}`);
        taxonomies.set(key, name);
      }
    }
    return { ...metadata, content: source.content };
  }));
}
