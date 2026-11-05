# AIM Digital website — Phase 2

Local Next.js App Router website for AIM DIGITAL UK LTD. This checkpoint includes the home page, eight dynamic service pages, a searchable grouped FAQ, a quote enquiry form and a migration-friendly Markdown/MDX blog with three labelled sample articles. Full SEO, consent-controlled analytics and final deployment remain later-phase work.

## Run

Use Node 22+ (Node 24 LTS recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3002. To verify:

Use `npm run dev` while editing. It updates pages and styles together. For a production preview, stop any running `npm start` process before rebuilding, then run `npm start` again. Rebuilding underneath a running production server can leave it referencing removed CSS/JavaScript chunks or an outdated route manifest.

```sh
npm run typecheck
npm run test:content
npm run lint
npm run format:check
npm run build
npm start
```

## Edit

- `config/site.ts`: company identity, contact, socials, booking URL, navigation, free discovery for every new client, typical £20/hour project rate and deadline approach.
- `content/services.ts`: all eight services, icons, answer-first copy, scope, deliverables, process, comparisons and configurable quote/from pricing.
- `config/site.ts` also holds the `aimdigitaluk` profile/feedback links and owner-reported eBay figures. See [the eBay showcase guide](docs/ebay-showcase.md) for dated screenshots and case-study evidence.
- `content/projects.ts`: five owner-supplied real projects, with in-progress and director-experience attribution. See [the project content record](docs/project-content.md).
- `content/testimonials.ts`: seven owner-confirmed clients, logo permission flags, empty verified reviews and TODO statistics. See [logo sources and the pricing update](docs/client-logos.md).
- `content/faqs.ts`: 31 FAQs across eight categories; `/faq` supports search and filtering.
- `content/blog/*.mdx`: sample articles; `schema.ts` defines frontmatter and approved authors.
- `lib/blog.ts`, `lib/frontmatter.ts`, `lib/mdx.tsx`: draft exclusion, schema validation and restricted Markdown rendering.
- `app/globals.css`: light/dark semantic tokens based on the existing branding.

All quote CTAs lead to `/quote`. The form collects name, email, optional company/phone, service, budget, timing and project requirements. `/api/quote` validates submissions and sends plain-text email through Resend to **support@aimdigitallimited.co.uk**; Reply-To uses the client's email. The destination is fixed in `lib/quote.ts`. Success is shown only after Resend accepts the email; delivery to the recipient's inbox must be verified separately. Failed submissions preserve the form details and offer a direct email link.

To enable sending, set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in `.env.local` and your deployment environment. Use a sender address on a [domain verified in Resend](https://resend.com/docs/dashboard/domains/introduction). These credentials are not included in the repository; without them, the form reports that sending failed. Never put secrets into `NEXT_PUBLIC_*` variables. Run `npm run test:quote` for validation and mocked email tests; no real email is sent by tests. The endpoint has a honeypot, same-origin checking, field limits and idempotent retries. Configure host-level rate limiting before public deployment to limit automated submissions.

Meeting CTA uses the current site's contact page; set `NEXT_PUBLIC_BOOKING_URL` to a verified booking URL when available. Analytics and external booking embeds have not been implemented.

See [the source audit](docs/source-audit.md) for recovered details and unresolved evidence, and [the architecture](docs/architecture.md) for implementation decisions and phase scope. Publication of client logos, testimonials, metrics and claims requires verified source data. Legal documents and analytics consent remain Phase 4 work.

Phase 1 build, TypeScript, ESLint and formatting checks passed. See [validation results and the outstanding development-tool advisory](docs/phase-1-validation.md). Production dependency audit reported zero vulnerabilities; browser and Lighthouse testing remain pending.

Phase 2 results and limitations are recorded in [the Phase 2 validation report](docs/phase-2-validation.md), including seven content/importer tests and local HTTP checks.

## Blog and migration

The owner confirmed WordPress. Export posts as WXR XML and follow [the migration guide](docs/blog-migration.md):

```sh
npm run migrate:blog -- /absolute/path/export.xml --out content/blog-import
```

No real export has been supplied yet. Imported posts stay as drafts; review the missing-field report, author attribution, media and generated redirects before publishing. The importer is tested with synthetic fixtures and preserves supported source slugs/dates without overwriting files. Generated redirects are review artifacts; activation is Phase 4 work.

Blog routes: `/blog`, `/blog/[slug]`, `/blog/category/[category]` and `/blog/tag/[tag]`. Archives paginate using `?page=2`; invalid or out-of-range pages return 404. The current page size is two to exercise pagination with three samples. Increase `PAGE_SIZE` in `lib/blog.ts` for your actual catalogue.

Category/tag indexes render on demand because they read pagination query parameters. Articles and service pages prerender at build time. Redeploy after changing local content. Blog bodies support Markdown, GFM tables and automatically linked H2/H3 contents; executable MDX and inline images are rejected. Use validated cover assets through next/image.

## Next checkpoint

Wait for the owner's “continue” before Phase 3: real projects, testimonials, trust pages, About, Contact and Quote forms with email sending.

## Deployment direction

Vercel framework preset: Next.js. Build command: `npm run build`. Use the production domain in `NEXT_PUBLIC_SITE_URL`. Final DNS, redirect mapping, crawl controls, Search Console verification, legal review and performance checklist arrive in Phase 5 after the complete SEO/consent layer. No deployment performed in Phase 1.
