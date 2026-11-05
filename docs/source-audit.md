# Current website audit — 13 October 2026

Phase 2 update: the owner confirmed WordPress for the existing blog. The importer now targets WXR exports; no actual export or custom theme/component source has been supplied yet. Original audit findings below record what was known during Phase 1.

Source: https://aimdigitallimited.co.uk/ and /about/. Downloaded public HTML and the Elementor home stylesheet; inspected the /contact/ HTML.

## Recovered

- Company name, company number 15780709, UK address and phone match the supplied brief. Registration has not been independently verified against Companies House in this phase.
- Logo: `/wp-content/uploads/2025/07/aimdigitallogo.webp`, retained locally without altering the original file.
- Existing theme colours: blue `#0067FF`, hover blue `#005EE9`, navy `#0F172A`, pale blue `#EFF2FF`. Use the darker blue for accessible light-background actions.
- Existing typography: Inter body and Manrope headings; retained with next/font.
- Facebook and LinkedIn organisation links retained in `config/site.ts`.
- Leadership names and roles retained, with individual photos, biographies and profile URLs pending confirmation.
- Client names: faremakers.com, fastsports.tv, jansport and busybeesdubai. All require explicit permission before logo publication.
- Existing site uses WordPress, Astra, Elementor and LatePoint booking. No Calendly/Cal.com booking URL found. Meeting CTA points to the existing contact page until a replacement is configured.

## Pending confirmation

- Email sending provider cannot be identified from public pages. Resend proposed for Phase 3; no email integration is active.
- Recipient email comes from the supplied brief. No sending credentials copied or requested in Phase 1.
- No reliable business hours or response-time promise found. Both remain null rather than inventing an SLA.
- Current About page contains statistics and award/support claims without supporting evidence; not republished as facts.
- A FastSports testimonial appears publicly but has no independent verification link or evidence of permission. Not republished in this version.
- No approved case-study evidence or metrics recovered. Three explicitly labelled illustrative concepts are used instead.
- Existing blog source format remains unknown. WordPress on the live site does not establish the format of the separate project the owner plans to copy. Ask about that project at the start of Phase 2 before writing an importer.
- Legal review, consent-controlled analytics and the full SEO layer are Phase 4 work. Do not treat this Phase 1 build as ready for public production launch.
