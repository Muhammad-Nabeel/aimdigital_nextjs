import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import TurndownService from "turndown";
import { stringifyFrontmatter } from "../lib/frontmatter";
import { z } from "zod";
import { blogSchema } from "../content/blog/schema";

const value = z.union([
  z.string(),
  z.object({ "#text": z.string().optional() }).passthrough(),
]);
const itemSchema = z
  .object({
    title: value.optional(),
    link: z.string().optional(),
    "wp:post_type": z.string().optional(),
    "wp:post_name": z.string().optional(),
    "wp:post_id": z.string().optional(),
    "wp:post_date_gmt": z.string().optional(),
    "wp:post_date": z.string().optional(),
    "wp:post_modified_gmt": z.string().optional(),
    "wp:status": z.string().optional(),
    "dc:creator": value.optional(),
    "content:encoded": value.optional(),
    "excerpt:encoded": value.optional(),
    category: z
      .array(
        z
          .object({
            "@_domain": z.string().optional(),
            "#text": z.string().optional(),
          })
          .passthrough(),
      )
      .optional(),
    "wp:attachment_url": z.string().optional(),
  })
  .passthrough();
const exportSchema = z.object({
  rss: z
    .object({
      channel: z
        .object({
          "wp:wxr_version": z.string(),
          item: z.array(itemSchema).default([]),
        })
        .passthrough(),
    })
    .passthrough(),
});
type ReportEntry = {
  slug: string | null;
  originalUrl: string | null;
  file: string | null;
  status: "imported-draft" | "skipped";
  issues: string[];
  sourceAuthor: string;
  sourceLocalDate?: string;
  images: string[];
};
type Redirect = { source: string; destination: string; statusCode: 301 };
export type MigrationReport = {
  entries: ReportEntry[];
  redirects: Redirect[];
  queryRedirects: { originalUrl: string; destination: string }[];
  imported: number;
  skipped: number;
};
function stringValue(input: z.infer<typeof value> | undefined) {
  return typeof input === "string" ? input : input?.["#text"] || "";
}
function wpDate(input: string | undefined) {
  if (
    !input ||
    !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(input) ||
    input.startsWith("0000")
  )
    return undefined;
  const iso = input.replace(" ", "T") + "Z";
  return Number.isNaN(Date.parse(iso)) ||
    new Date(iso).toISOString().slice(0, 19) !== iso.slice(0, 19)
    ? undefined
    : iso;
}
function safeLink(input: string | undefined) {
  if (!input) return null;
  try {
    const url = new URL(input);
    return ["http:", "https:"].includes(url.protocol) ? url : null;
  } catch {
    return null;
  }
}
export async function migrateWordPress(
  inputFile: string,
  outputDirectory: string,
): Promise<MigrationReport> {
  if ((await stat(inputFile)).size > 50 * 1024 * 1024)
    throw new Error(
      "Export exceeds 50 MB. Export posts in smaller date ranges.",
    );
  const xml = await readFile(inputFile, "utf8");
  if (/<!DOCTYPE|<!ENTITY/i.test(xml))
    throw new Error("XML entity declarations are not supported.");
  const valid = XMLValidator.validate(xml);
  if (valid !== true) throw new Error(`Invalid XML: ${valid.err.msg}`);
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: false,
    trimValues: false,
    isArray: (name) => ["item", "category", "wp:postmeta"].includes(name),
  });
  const parsed: unknown = parser.parse(xml);
  const { rss } = exportSchema.parse(parsed);
  const report: MigrationReport = {
    entries: [],
    redirects: [],
    queryRedirects: [],
    imported: 0,
    skipped: 0,
  };
  const converter = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  converter.remove(["script", "style", "iframe", "object"]);
  converter.addRule("headings", {
    filter: "h1",
    replacement: (content) => `\n\n## ${content}\n\n`,
  });
  converter.addRule("images", {
    filter: "img",
    replacement: (_content, node) => {
      const image = node as HTMLElement;
      const src = image.getAttribute("src") || "";
      const link = safeLink(src);
      return link
        ? `\n\n[TODO: migrate image](${link.href})\n\n`
        : "\n\nTODO: migrate image\n\n";
    },
  });
  await mkdir(outputDirectory, { recursive: true });
  for (const name of ["migration-report.json", "redirects.generated.json"]) {
    try {
      await stat(path.join(outputDirectory, name));
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT")
        continue;
      throw error;
    }
    throw new Error(
      `Output already contains ${name}. Choose a fresh staging directory.`,
    );
  }
  const slugs = new Set<string>();
  const redirectSources = new Map<string, string>();
  const conflictingRedirects = new Set<string>();
  for (const item of rss.channel.item) {
    if (item["wp:post_type"] !== "post") continue;
    const slug = item["wp:post_name"] || null;
    const original = safeLink(item.link);
    const issues: string[] = [];
    const html = stringValue(item["content:encoded"]);
    const title = stringValue(item.title).trim();
    const date = wpDate(item["wp:post_date_gmt"]);
    const updated = wpDate(item["wp:post_modified_gmt"]);
    const images = [
      ...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi),
    ].map((match) => match[1]);
    const entry: ReportEntry = {
      slug,
      originalUrl: original?.href || null,
      file: null,
      status: "skipped",
      issues,
      sourceAuthor: stringValue(item["dc:creator"]),
      sourceLocalDate: item["wp:post_date"],
      images,
    };
    report.entries.push(entry);
    if (
      !slug ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      ["category", "tag"].includes(slug)
    )
      issues.push(
        "Missing or unsupported slug; resolve manually without changing existing URLs.",
      );
    if (slug && slugs.has(slug)) issues.push("Duplicate slug in export.");
    if (slug) slugs.add(slug);
    if (!title) issues.push("Missing title.");
    if (!date)
      issues.push(
        "Missing valid GMT publication date; local source date retained in report.",
      );
    if (!html.trim()) issues.push("Missing post body.");
    if (!original)
      issues.push("Missing original URL: redirect cannot be derived.");
    if (
      issues.some((issue) => /slug|title|GMT publication|post body/.test(issue))
    ) {
      report.skipped++;
      continue;
    }
    const body = converter.turndown(html).replace(/(?<!\\)([{}])/g, "\\$1");
    const excerpt = converter
      .turndown(stringValue(item["excerpt:encoded"]))
      .replace(/\s+/g, " ")
      .trim();
    const terms = item.category || [];
    const category = terms
      .find((term) => term["@_domain"] === "category")
      ?.["#text"]?.trim();
    const tags = terms
      .filter((term) => term["@_domain"] === "post_tag")
      .map((term) => term["#text"]?.trim())
      .filter((tag): tag is string => Boolean(tag));
    if (!excerpt)
      issues.push("description: no excerpt; TODO placeholder supplied.");
    if (!category) issues.push("category: absent; TODO placeholder supplied.");
    if (!tags.length) issues.push("tags: absent; TODO placeholder supplied.");
    issues.push(
      "author: source author retained in report; map to an approved author before publication.",
      "coverImage and coverAlt: replace fallback with the approved local cover.",
      "keyTakeaways, faq and relatedServices: review and fill from source content.",
      "draft: all imported posts remain drafts until editorial review.",
      "answer-first opening: review and write a 40–60 word answer if needed.",
    );
    if (images.length)
      issues.push(
        "Inline images require local migration; original URLs are retained in the report and body.",
      );
    if (/<table\b/i.test(html))
      issues.push("HTML table detected; check the converted layout manually.");
    if (/<iframe\b|\[[a-z][\w-]*(?:\s|\])/i.test(html))
      issues.push(
        "Embed or shortcode detected; recreate or remove after review.",
      );
    const frontmatter = blogSchema.parse({
      title,
      slug,
      date,
      ...(updated && date && Date.parse(updated) >= Date.parse(date)
        ? { updated }
        : {}),
      description:
        excerpt.slice(0, 300) ||
        "TODO: write an accurate description from the original article.",
      author: "aim-digital",
      category: category || "TODO",
      tags: tags.length ? tags : ["TODO"],
      coverImage: "/brand/search-concept.svg",
      coverAlt:
        "TODO: replace illustrative cover with an approved image and description",
      keyTakeaways: [
        "TODO: extract accurate key takeaways from the original article.",
      ],
      faq: [],
      relatedServices: [],
      draft: true,
      sample: false,
    });
    const filename = `${slug}.md`;
    const filenamePath = path.join(outputDirectory, filename);
    try {
      await writeFile(filenamePath, stringifyFrontmatter(body, frontmatter), {
        flag: "wx",
      });
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "EEXIST"
      ) {
        issues.push("File already exists; not overwritten.");
        report.skipped++;
        continue;
      }
      throw error;
    }
    entry.status = "imported-draft";
    entry.file = filename;
    report.imported++;
    const destination = `/blog/${slug}`;
    if (original) {
      if (original.search) {
        report.queryRedirects.push({ originalUrl: original.href, destination });
        issues.push(
          "Query-based original URL requires a query-aware redirect in Phase 4.",
        );
      } else if (original.pathname !== destination) {
        const prior = redirectSources.get(original.pathname);
        if (
          conflictingRedirects.has(original.pathname) ||
          (prior && prior !== destination)
        ) {
          conflictingRedirects.add(original.pathname);
          issues.push("Conflicting redirect source; resolve manually.");
          report.redirects = report.redirects.filter(
            (redirect) => redirect.source !== original.pathname,
          );
        } else {
          redirectSources.set(original.pathname, destination);
          report.redirects.push({
            source: original.pathname,
            destination,
            statusCode: 301,
          });
        }
      }
    }
  }
  const reportName = path.join(outputDirectory, "migration-report.json");
  await writeFile(reportName, JSON.stringify(report, null, 2) + "\n", {
    flag: "wx",
  });
  await writeFile(
    path.join(outputDirectory, "redirects.generated.json"),
    JSON.stringify(report.redirects, null, 2) + "\n",
    { flag: "wx" },
  );
  return report;
}
async function main() {
  const args = process.argv.slice(2);
  const input = args[0];
  const outIndex = args.indexOf("--out");
  const output = outIndex === -1 ? "content/blog-import" : args[outIndex + 1];
  if (
    !input ||
    !output ||
    args.some(
      (arg, index) => index > 0 && arg !== "--out" && index !== outIndex + 1,
    )
  )
    throw new Error(
      "Usage: npm run migrate:blog -- export.xml [--out staging-directory]",
    );
  const report = await migrateWordPress(
    path.resolve(input),
    path.resolve(output),
  );
  console.log(
    `Imported ${report.imported} drafts; skipped ${report.skipped}. Review ${output}/migration-report.json. No existing content was overwritten.`,
  );
  if (report.skipped) process.exitCode = 2;
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
)
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Migration failed.");
    process.exitCode = 1;
  });
