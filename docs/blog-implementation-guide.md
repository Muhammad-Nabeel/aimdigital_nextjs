# AIM Digital blog: strategy and implementation guide

This guide covers the purpose of the AIM Digital blog, how it is organised, and what to build to support that. Some of the structure is borrowed from the Easy Trip travel-app blog (`travel-app-main`), adapted for AIM Digital's services. It was written on 3 November 2026.

**Business goal:** win enquiries for **website development**, **SaaS product development** and **digital products** from UK small and mid-sized businesses. Every article should answer a question a buyer asks before hiring someone, then point them to the right service page and to `/quote`.

This project already has a working blog: a libSQL store, an admin editor, Markdown rendering, category and tag archives, related posts, related services, FAQ, key takeaways and JSON-LD. **Do not rebuild it.** Section 4 lists only what is missing.

---

## 1. Content pillars (categories)

Each category is a **topic hub**: an indexable landing page with its own title, description, H1 and intro. Each hub links to the service page it supports, and articles link back to the hub and the service. This is the pillar → cluster → service structure that search engines and AI answer engines reward.

Primary pillars (the core offering):

| Slug | Label | Supports service | Reader intent |
|---|---|---|---|
| `website-development` | Website Development | `ai-website-software-development` | "I need a new or better business website" |
| `saas-development` | SaaS Development | `ai-website-software-development` ⚠️ | "I have a software idea / need a custom web app" |
| `digital-products` | Digital Products | ⚠️ none yet | "I want to build or sell a digital product" |

Supporting pillars (feed the core and existing services):

| Slug | Label | Supports service |
|---|---|---|
| `seo-ai-search` | SEO & AI Search | `seo` |
| `ecommerce` | E-Commerce | `e-commerce-solutions`, `ebay-store-optimisation`, `etsy-store-optimisation` |
| `case-studies` | Case Studies | Whichever service the project used. Publish only real, client-approved projects (see `docs/project-content.md`). |

> ⚠️ **Gap:** `content/services.ts` has no SaaS or digital-product service. Until dedicated service pages exist, `saas-development` points at `ai-website-software-development`, and `digital-products` has no service to convert to. **Add those two service pages before publishing much in those pillars**; otherwise the articles build traffic with nowhere to send it.

### 1.1 Draft hub copy (owner to review before publishing)

These drafts make no claims about results, pricing or clients. Edit them to match the services as actually sold.

```ts
// content/blog/categories.ts
export const blogCategories = {
  "website-development": {
    label: "Website Development",
    title: "Website Development Guides for UK Businesses",
    description:
      "Plain-English guides to planning, building and improving a business website: costs, timelines, platforms, performance and what to ask a developer.",
    heading: "Website development guides",
    intro:
      "What to decide before you build, how to choose between a custom build and a platform, and how to keep a site fast, secure and easy to update.",
    services: ["ai-website-software-development"],
  },
  "saas-development": {
    label: "SaaS Development",
    title: "SaaS & Custom Web App Development Guides",
    description:
      "How to scope, build and launch a SaaS product or custom web application: MVPs, tech stack choices, subscriptions, security and running costs.",
    heading: "SaaS development guides",
    intro:
      "From idea to MVP to paying users: how to scope a first version, choose a stack, handle accounts and billing, and plan for growth without over-building.",
    services: ["ai-website-software-development"],
  },
  "digital-products": {
    label: "Digital Products",
    title: "Digital Product Guides – Build, Launch and Sell",
    description:
      "Guides to creating and selling digital products such as templates, tools, courses and downloads: validation, delivery, pricing and payment setup.",
    heading: "Digital product guides",
    intro:
      "How to turn expertise into a product people pay for: validating demand, building the product, setting up delivery and payments, and launching it.",
    services: [],
  },
  "seo-ai-search": {
    label: "SEO & AI Search",
    title: "SEO and AI Search Guides for Business Websites",
    description:
      "How search engines and AI assistants find, understand and recommend business websites, with practical steps for technical SEO, content and structured data.",
    heading: "SEO and AI search guides",
    intro:
      "Make your website easy for Google and AI assistants to understand and recommend, from technical foundations to content that answers real buyer questions.",
    services: ["seo"],
  },
  ecommerce: {
    label: "E-Commerce",
    title: "E-Commerce Guides – Stores, Marketplaces and Listings",
    description:
      "Practical guides to running an online store and selling on eBay and Etsy: store setup, listings, product data and conversion.",
    heading: "E-commerce guides",
    intro:
      "Set up and grow online sales across your own store and marketplaces, with clear product data, better listings and fewer lost checkouts.",
    services: ["e-commerce-solutions", "ebay-store-optimisation", "etsy-store-optimisation"],
  },
  "case-studies": {
    label: "Case Studies",
    title: "AIM Digital Case Studies – Websites, SaaS and Stores",
    description:
      "How AIM Digital scoped and delivered real client projects: the brief, the approach, the build and what changed afterwards.",
    heading: "Case studies",
    intro:
      "Real projects, explained: what the client needed, the decisions we made and how the work was delivered.",
    services: [],
  },
} satisfies Record<string, BlogCategory>;
```

The `services` field drives a "Related services" block on the hub page, in addition to the per-article `relatedServices` that already exists.

---

## 2. Article types

Write for buyers at different stages. Every type ends with a call to action pointing to the relevant service and `/quote`.

| Type | Example titles | Funnel stage |
|---|---|---|
| **Cost / pricing guide** | "How much does a business website cost in the UK?"; "What does it cost to build a SaaS MVP?" | Decision. Highest commercial intent. |
| **Comparison** | "Custom website vs WordPress vs Shopify"; "Build a SaaS or use no-code?" | Consideration |
| **Process / what to expect** | "How a website project runs, from brief to launch"; "How we scope a SaaS MVP" | Consideration. Builds trust. |
| **Checklist** | "Website launch checklist"; "Digital product launch checklist" | Awareness → lead magnet |
| **Explainer** | "What is a SaaS product?"; "What is structured data and why does it matter?" | Awareness |
| **Case study** | "<Client>: rebuilding a slow website" (only with approval) | Decision. Proof. |

Writing rules (these suit both Google and AI answer engines):

- Answer the title's question in the first two sentences, then expand.
- Use the existing `keyTakeaways` (3–5) and `faq` fields on every article. FAQ entries become `FAQPage` JSON-LD, and AI assistants often quote them.
- Use one H1 (the title) and question-style H2s that match how people search.
- Use UK English and GBP. Use **ranges with stated assumptions** for prices, never invented figures.
- Set `relatedServices` on every post, and link at least once in the body to the service page and the hub.
- No fabricated statistics, testimonials or client names (`docs/project-content.md`).

### Starter content plan (first 12 posts)

| # | Pillar | Title | Type |
|---|---|---|---|
| 1 | Website Development | How much does a business website cost in the UK? | Cost |
| 2 | Website Development | Custom website vs WordPress vs Shopify: which fits your business? | Comparison |
| 3 | Website Development | Website project timeline: what happens from brief to launch | Process |
| 4 | SaaS Development | What does it cost to build a SaaS MVP? | Cost |
| 5 | SaaS Development | How to scope a SaaS MVP without over-building | Process |
| 6 | SaaS Development | Custom web app vs no-code tools: when to switch | Comparison |
| 7 | Digital Products | How to validate a digital product idea before you build it | Checklist |
| 8 | Digital Products | Selling digital products: payments, delivery and VAT basics for UK sellers | Explainer |
| 9 | SEO & AI Search | How to get your website recommended by AI assistants | Explainer |
| 10 | SEO & AI Search | Website launch SEO checklist | Checklist |
| 11 | E-Commerce | Product data that sells: listings for your store, eBay and Etsy | Checklist |
| 12 | Case Studies | First approved client project | Case study |

Publish the cost and comparison posts first; they bring the most enquiries.

---

## 3. Patterns borrowed from the travel-app blog

| Pattern | travel-app source | Use here |
|---|---|---|
| Per-category SEO copy (title, description, H1, intro) | `src/lib/blog-categories.ts` | Section 1.1 |
| Prerender known hubs with `generateStaticParams()` | `src/app/blog/category/[category]/page.tsx` | Category page |
| `CollectionPage` + `BreadcrumbList` + `ItemList` JSON-LD on archives | `src/components/features/blog/blog-index.tsx` | `components/blog/archive.tsx` |
| Single H1: body H1s demoted to H2 | `src/app/blog/[slug]/page.tsx` | Do it in `lib/mdx.tsx` (map `h1` → `h2`) |
| Related posts scored by category (+2) and shared tags (+1 each), then a "More <category> articles →" link | `src/app/blog/[slug]/page.tsx` | Add the hub link under the existing related posts |
| Sitemap lists posts and **only non-empty** hubs, using the newest post date | `src/app/sitemap.ts` | New `app/sitemap.ts` |
| Server-rendered sidebar with client-side search and tag filtering | `src/components/features/blog/blog-search.tsx` | Optional |

Do **not** port:

- raw HTML bodies rendered with `dangerouslySetInnerHTML`
- the Prisma/REST/next-auth stack
- category lists duplicated across files
- the generic author bio

Also, travel-app's `GET /api/blog/[slug]` returns drafts to anyone who knows the slug. Any read endpoint here must filter on published state.

---

## 4. Implementation checklist

**Content model**

1. [ ] Add `content/blog/categories.ts` from section 1.1 (`label`, `title`, `description`, `heading`, `intro`, `services`).
2. [ ] Refine `blogSchema.category` so it must match a key in `blogCategories`, the same way `author` must match `authors`. Required config, no render-time fallback.
3. [ ] Make the admin category field a dropdown sourced from `blogCategories`.
4. [ ] Check that existing sample posts use the new category slugs, or migrate them.

**Pages**

5. [ ] Update `app/blog/category/[category]/page.tsx`:
   - metadata from the category config
   - H1 and intro passed to `BlogArchive`
   - a "Related services" block from `services`
   - `generateStaticParams()`
6. [ ] Add `CollectionPage` + `ItemList` JSON-LD to `BlogArchive` if it is not already there.
7. [ ] In `lib/mdx.tsx`, render Markdown `h1` as `h2`.
8. [ ] On the article page, add a "More <category> articles →" link and a closing call to action to `/quote`, naming the first `relatedServices` entry.

**Discovery**

9. [ ] Create `app/sitemap.ts`:
   - static pages
   - service pages
   - published posts, with `lastModified = modifiedAt` and the cover image
   - non-empty category and tag archives
10. [ ] Create `app/robots.ts` pointing to the sitemap.
11. [ ] In `app/admin/actions.ts`, also revalidate `/sitemap.xml` on save and delete.

**Services gap**

12. [ ] Add `saas-development` and `digital-products` service pages to `content/services.ts`, then point those hubs' `services` at them.

**Verify**

13. [ ] Run `npm run lint`, `npm test` and `npm run build`.
14. [ ] Check `/sitemap.xml` and a hub page's `<head>`, and run one article through the Rich Results Test (`BlogPosting`, `FAQPage`, `BreadcrumbList`).

Before writing code, read the relevant guide in `node_modules/next/dist/docs/`, as `AGENTS.md` requires. This project is on Next.js 16.4.
