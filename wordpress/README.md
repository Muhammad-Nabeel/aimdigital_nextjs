# AIM Digital WordPress theme

`aim-digital.zip` is a classic WordPress theme package. Upload it in **Appearance → Themes → Add New → Upload Theme** and activate it. It contains the current agency branding, supplied client logos, team portrait, service summaries, project summaries, home page layout, FAQ, contact page template and responsive blog layouts. New articles are regular WordPress posts, so you can write and publish them from **Posts → Add New** using the block editor.

## One-time setup

1. Install and activate `aim-digital.zip`. Activation creates Home, Services, Our Work, FAQ, Contact & Quote, and Insights pages, assigns the page templates, sets Home and Insights as the front/posts pages, and creates the primary navigation. Existing pages with those slugs are reused.
2. In **Appearance → Customize → AIM Digital contact details**, update phone, email, booking and quote URLs. The starter values are from the current project configuration.
3. Add a contact form plugin if you want enquiries submitted on the contact page; place its shortcode in the page editor. Configure and test email delivery with your host.
4. In **Appearance → Menus**, add or adjust navigation items as needed, including Our approach (`/#process`). Assign a footer menu if desired.
5. Set **Settings → Permalinks** to **Post name**.

The theme does not install plugins. Services, FAQs and portfolio descriptions are provided as theme data in `functions.php`; blog posts and page records are native WordPress content, while media assets are included in the theme. Use a WordPress XML export/import or a migration plugin to move any existing WordPress content/media. The current Next.js sample articles are explicitly editorial samples and should be reviewed before publishing.

## Package contents

- `aim-digital/` — installable theme source
- `aim-digital.zip` — upload-ready theme archive

The theme does not bundle form handling, SEO, caching, analytics or a page builder. WordPress handles permalinks, post categories/tags, RSS and standard post metadata.
