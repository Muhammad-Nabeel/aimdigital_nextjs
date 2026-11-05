import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseFrontmatter } from "../lib/frontmatter";
import { services, serviceSchema } from "../content/services";
import { faqs, faqCategories } from "../content/faqs";
import { blogSchema } from "../content/blog/schema";
import { migrateWordPress } from "../scripts/migrate-blog";
import { getPosts, pageNumber } from "../lib/blog";
import { renderMarkdown } from "../lib/mdx";

const post = (
  slug = "existing-post",
  extra = "",
  date = "2024-02-29 09:30:00",
) =>
  `<item><title><![CDATA[Existing & useful post]]></title><link>https://example.com/2024/02/${slug}/</link><wp:post_type>post</wp:post_type><wp:post_name>${slug}</wp:post_name><wp:post_date_gmt>${date}</wp:post_date_gmt><wp:post_date>2024-02-29 09:30:00</wp:post_date><wp:status>publish</wp:status><dc:creator>original-writer</dc:creator><category domain="category">Websites</category><category domain="post_tag">Planning</category><content:encoded><![CDATA[<h1>Original heading</h1><p>Text with {curly braces}.</p><script>alert('unsafe')</script><img src="https://example.com/photo.jpg" />]]></content:encoded>${extra}</item>`;
const wxr = (items: string) =>
  `<?xml version="1.0"?><rss xmlns:wp="http://wordpress.org/export/1.2/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><wp:wxr_version>1.2</wp:wxr_version>${items}</channel></rss>`;
test("service and FAQ content covers the requested scope", () => {
  assert.equal(services.length, 8);
  assert.equal(new Set(services.map((service) => service.slug)).size, 8);
  for (const service of services) {
    const words = service.answer.split(/\s+/).length;
    assert.ok(words >= 40 && words <= 60);
    assert.ok(faqs.some((faq) => faq.category === service.faqCategory));
  }
  assert.ok(faqs.length >= 20);
  for (const category of faqCategories)
    assert.ok(faqs.some((faq) => faq.category === category));
  assert.equal(
    serviceSchema.safeParse({
      ...services[0],
      pricing: { mode: "from", fromGBP: -1 },
    }).success,
    false,
  );
});
test("blog frontmatter, drafts and pagination validation", async () => {
  assert.throws(() =>
    parseFrontmatter("---js\n({title: 'unsafe'})\n---\nText"),
  );
  const posts = await getPosts();
  assert.equal(posts.length, 3);
  assert.ok(posts.every((post) => !post.draft));
  assert.equal(
    blogSchema.safeParse({ ...posts[0], coverAlt: "" }).success,
    false,
  );
  assert.equal(
    blogSchema.safeParse({ ...posts[0], relatedServices: ["unknown"] }).success,
    false,
  );
  assert.equal(
    blogSchema.safeParse({ ...posts[0], updated: "2020-01-01" }).success,
    false,
  );
  assert.equal(pageNumber(undefined), 1);
  for (const invalid of ["0", "-1", "1.5", "1junk", "9007199254740999"])
    assert.equal(pageNumber(invalid), null);
});
test("Markdown headings and unsafe executable MDX", async () => {
  const rendered = await renderMarkdown(
    "## Same heading\n\nA useful answer.\n\n### Same heading\n\n| A | B |\n| --- | --- |\n| One | Two |",
  );
  assert.deepEqual(
    rendered.headings.map((heading) => heading.id),
    ["same-heading", "same-heading-1"],
  );
  await assert.rejects(() =>
    renderMarkdown("export const secret = process.env.SECRET\n\n## Hello"),
  );
  await assert.rejects(() => renderMarkdown("{process.env.SECRET}"));
  await assert.rejects(() => renderMarkdown("<script>alert(1)</script>"));
  await assert.rejects(() => renderMarkdown("# Duplicate H1"));
});
test("WordPress conversion preserves identity, produces drafts and redirect evidence", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "aim-wxr-"));
  try {
    const input = path.join(directory, "source.xml");
    const output = path.join(directory, "out");
    await writeFile(
      input,
      wxr(post() + post() + post("bad-date", "", "2024-02-30 09:30:00")),
    );
    const report = await migrateWordPress(input, output);
    assert.equal(report.imported, 1);
    assert.equal(report.skipped, 2);
    const source = parseFrontmatter(
      await readFile(path.join(output, "existing-post.md"), "utf8"),
    );
    const parsed = blogSchema.parse(source.data);
    assert.equal(parsed.slug, "existing-post");
    assert.equal(parsed.date, "2024-02-29T09:30:00Z");
    assert.equal(parsed.draft, true);
    assert.equal(parsed.category, "Websites");
    assert.deepEqual(parsed.tags, ["Planning"]);
    assert.ok(source.content.includes("## Original heading"));
    assert.ok(!source.content.includes("alert("));
    await renderMarkdown(source.content);
    assert.equal(report.entries[0].sourceAuthor, "original-writer");
    assert.deepEqual(report.entries[0].images, [
      "https://example.com/photo.jpg",
    ]);
    assert.deepEqual(report.redirects, [
      {
        source: "/2024/02/existing-post/",
        destination: "/blog/existing-post",
        statusCode: 301,
      },
    ]);
    assert.ok(
      report.entries[1].issues.some((issue) => issue.includes("Duplicate")),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
test("WordPress rejects DTDs and invalid exports", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "aim-unsafe-wxr-"));
  try {
    const input = path.join(directory, "source.xml");
    await writeFile(
      input,
      '<!DOCTYPE rss [<!ENTITY x "unsafe">]>' + wxr(post()),
    );
    await assert.rejects(
      () => migrateWordPress(input, path.join(directory, "out")),
      /entity declarations/,
    );
    await writeFile(input, "<rss><channel></channel></rss>");
    await assert.rejects(() =>
      migrateWordPress(input, path.join(directory, "out")),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
test("existing post files are preserved", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "aim-existing-wxr-"));
  try {
    const input = path.join(directory, "source.xml");
    await writeFile(input, wxr(post()));
    await writeFile(
      path.join(directory, "existing-post.md"),
      "Keep this content",
    );
    const report = await migrateWordPress(input, directory);
    assert.equal(report.imported, 0);
    assert.equal(
      await readFile(path.join(directory, "existing-post.md"), "utf8"),
      "Keep this content",
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
test("query permalinks are reported separately and reports are never overwritten", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "aim-query-wxr-"));
  try {
    const input = path.join(directory, "source.xml");
    const output = path.join(directory, "out");
    await writeFile(
      input,
      wxr(post("query-post").replace("/2024/02/query-post/", "/?p=123")),
    );
    const report = await migrateWordPress(input, output);
    assert.equal(report.imported, 1);
    assert.deepEqual(report.redirects, []);
    assert.deepEqual(report.queryRedirects, [
      {
        originalUrl: "https://example.com/?p=123",
        destination: "/blog/query-post",
      },
    ]);
    await assert.rejects(
      () => migrateWordPress(input, output),
      /fresh staging directory/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
