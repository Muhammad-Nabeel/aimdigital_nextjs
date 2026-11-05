# Architecture and phase boundaries

This document records the original phased plan. Phase 2 is now implemented; see the README and blog migration guide for current routes and importer behaviour.

Next.js App Router with strict TypeScript, Tailwind v4 and shadcn/ui-style owned components. Root aliases map `@/*` to the repository. The home page and content cards render on the server. Theme switching is the only persistent client preference, managed by next-themes; it does not load analytics.

`config/site.ts` validates company data with Zod and centralises contact links. `content/services.ts` holds all eight services in one validated configuration. Icon selection is driven by this config; components do not contain service copy. Project cards now use five owner-supplied scopes and validated client references, with explicit in-progress and director-experience attribution. Logos require non-empty alt text. Sample blog content remains labelled; metrics, screenshots and testimonials must have supporting source material before publication.

Phase 1 uses working anchors for on-page navigation, mailto links for quotes, and the current contact page for meetings. Dedicated service/blog routes arrive in Phase 2. Forms and email arrive in Phase 3. No future-route links lead visitors to unfinished pages.

Phase 2 uses gray-matter with an explicit patched YAML parser, Zod and @mdx-js/mdx on the server. The renderer restricts input to Markdown/GFM, rejecting imports, expressions, JSX and body H1s. Frontmatter, service references and author IDs are validated; draft posts are excluded. The owner confirmed WordPress, so the importer targets WXR exports and produces drafts, missing-field reports and proposed 301 mappings. No real source export or custom theme/component structure has been supplied; media, shortcodes and embeds require review.

Phase 3 adds real case-study content models, approved testimonials, trust pages and React Hook Form/Zod forms. Use a server handler, Resend, a honeypot and durable shared rate limiting. Keep sender credentials server-side. Do not use an in-memory limiter as the sole Vercel protection.

Phase 4 adds reusable typed JSON-LD, metadata, feeds, crawler files, redirect mappings, consent-controlled analytics and clearly marked legal drafts. SearchAction must describe a real search endpoint. Review/AggregateRating must remain absent until verifiable review data exists. Consent must default to denying optional analytics and support withdrawal.

Phase 5 performs mobile Lighthouse, WCAG checks, Playwright smoke tests and deployment review. A Lighthouse target is not a measured result. Keep a record of actual scores, test environment and remaining limitations.

## Dependencies

Phase 1: Next.js, React, TypeScript, Tailwind/PostCSS, lucide-react, Zod, next-themes, Radix Slot, class-variance-authority, clsx, tailwind-merge, ESLint and Prettier. Installed versions are pinned after resolution with package-lock.json. Add gray-matter and the MDX compiler in Phase 2; React Hook Form, resolvers, Resend and shared rate limiting in Phase 3; Playwright in Phase 5.

## Theme

Company blue and navy come from the existing site. Semantic CSS variables cover background, foreground, card, muted, primary and border. Dark mode uses a brighter blue for text and separate high-contrast button colours. Fonts are optimised by next/font. Native details elements provide mobile navigation and accessible FAQ disclosure without a client accordion bundle. Motion is limited to CSS transitions and disabled by reduced-motion preferences; no animation runtime is needed yet.
