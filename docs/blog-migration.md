# WordPress blog migration

The owner confirmed WordPress in Phase 2. This importer targets a standard WXR XML export, not theme templates or Elementor component source. WordPress exports posts through **Tools → Export → Posts → Download Export File**. See the [official WordPress export documentation](https://wordpress.org/documentation/article/tools-export-screen/).

Keep the export outside the public directory. It can contain author details, drafts and other non-public content. The script only processes items whose `wp:post_type` is `post`; pages, attachments and comments are not copied into the blog.

## Run into a staging directory

```sh
npm run migrate:blog -- /absolute/path/export.xml --out content/blog-import
```

Use a fresh staging directory for each run. The importer does not overwrite existing posts or report files. It rejects XML entity declarations and exports above 50 MB; split large exports by date range in WordPress.

Outputs:

- One Markdown file for each supported post, with validated frontmatter and `draft: true`.
- `migration-report.json`: imported/skipped records, original author and URL, missing fields, inline-image URLs and review notes.
- `redirects.generated.json`: proposed path-based 301 mappings from original URLs to `/blog/[slug]`.

Exit codes: 0 for a completed run with no skipped posts, 2 when some posts require manual recovery, 1 for fatal errors. TODO content still requires review even when the exit code is 0.

## Preservation and review

The importer retains supported lowercase ASCII `wp:post_name` slugs unchanged and preserves valid GMT publication/modification timestamps. Invalid or missing publication dates are reported and skipped rather than replaced with today's date. Local WordPress timestamps are retained in the report for manual recovery. Duplicate, missing, reserved (`category`, `tag`) or unsupported slugs are reported and skipped; recover Unicode/percent-encoded or unusual legacy slugs manually, preserving their URLs through an explicit mapping. The site currently uses one safe path segment per article.

HTML is converted to Markdown. H1 content headings are demoted to H2 because the article template supplies the H1. Scripts and embedded frames are removed. Inline image URLs remain in the report and as migration links in the body; download approved images manually and adapt the content before publishing. Tables, shortcodes and embeds are flagged for visual review. WXR exports do not bundle image files or copy Elementor layouts.

The original author is retained in the report. The generated file uses the approved editorial-team key temporarily and remains a draft. Add the actual author to the typed author registry and update the frontmatter before publication. Do not attribute imported content to the editorial team without review.

Fill or review `description`, `category`, `tags`, `coverImage`, `coverAlt`, `faq`, `keyTakeaways` and `relatedServices`. A placeholder is not evidence. Write a direct 40–60 word answer at the start of the body, then supporting headings at H2/H3. Approved local cover images must be stored under `/public/brand/`; external or inline images are not rendered automatically.

Review each generated redirect before integrating it with `config/redirects.ts` in Phase 4. Query-based WordPress URLs, such as `/?p=123`, are listed separately in the report for query-aware rules; they must not redirect every request to `/`. Conflicting sources are reported rather than installed. No generated rule is deployed automatically. Preserve query parameters and update internal links where appropriate when reviewing actual URLs.

Once approved, copy selected files into `content/blog/` and set `draft: false`. Rebuild the site. Drafts are excluded from public article pages, archives and related-post lists. Do not copy the entire XML or report into `public/`.

## Frontmatter contract

`content/blog/schema.ts` is the source of truth:

| Field                    | Format                                                               |
| ------------------------ | -------------------------------------------------------------------- |
| title, slug, description | Non-empty text; slug is a lowercase hyphenated segment               |
| date, updated            | ISO date or timezone-qualified ISO timestamp; updated is optional    |
| author                   | Registered author key                                                |
| category, tags           | Category text and a non-empty array of tags                          |
| coverImage, coverAlt     | Approved `/brand/` asset path and descriptive alt text               |
| faq                      | Array of question/answer objects; may be empty                       |
| keyTakeaways             | Non-empty array of accurate takeaway statements                      |
| relatedServices          | Array of valid service slugs                                         |
| draft                    | Required boolean                                                     |
| sample                   | Optional boolean, default false; labels the supplied sample articles |

Quoted dates keep YAML from coercing them into Date objects. Standard `---` YAML frontmatter is required. The Markdown/MDX loader rejects imports, JavaScript expressions, JSX and body H1 headings; it supports Markdown and GFM tables, not executable MDX. This keeps imported content from running code on the server. Body H2/H3 headings generate matching table-of-contents links.

The importer has been tested with synthetic WXR fixtures. No real export has been supplied or migrated yet. Back up the original site, reconcile imported/skipped counts and inspect real content before replacing the WordPress site.
