# Pricing and client update — 14 October 2026

The owner confirmed a typical rate of £20 per hour for projects, with clear, simple deadlines. `config/site.ts` holds the rate and deadline approach. Home, service pricing and FAQs use that source. No VAT treatment, fixed total, minimum charge or specific turnaround has been assumed.

The owner also confirmed free discovery for every new client. This offer is centralised under `site.pricing.discovery` and appears in pricing, discovery steps, booking CTAs and FAQs. The £20/hour rate applies to agreed project work. No discovery duration, additional free deliverable or eligibility limit beyond being a new client has been invented.

The owner identified these clients: Faremakers.com, FastSports.tv, BusyBees Dubai, Samir & Aly (written as “samirandaly”) and Almarah Foundation UK. This confirms the names for the client list; no project results, testimonials or endorsements were supplied.

## Logo sources

All images are stored locally in `public/clients/` and rendered with next/image. Original image files are retained; the Samir & Aly asset has internal padding accommodated by the display layout. White logo panels keep the original colours readable in both themes.

| Client                | Public source                                                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Faremakers.com        | [Logo already used on the AIM Digital site](https://aimdigitallimited.co.uk/wp-content/uploads/2025/07/faremaker-logo.png)                                                                                                                     |
| FastSports.tv         | [Logo already used on the AIM Digital site](https://aimdigitallimited.co.uk/wp-content/uploads/2025/07/fastsports_logo.png)                                                                                                                    |
| BusyBees Dubai        | [Logo already used on the AIM Digital site](https://aimdigitallimited.co.uk/wp-content/uploads/2025/07/busybees-1.png)                                                                                                                         |
| Samir & Aly           | [Official linked profile](https://linktr.ee/samirandaly), using its [profile logo](https://ugc.production.linktr.ee/6cc70aa1-92a3-436d-8378-a6b64f2e384d_Samir---Ali-Logo-copy--2--05.png). The primary store denied the direct HTML download. |
| Almarah Foundation UK | [Official site's header logo](https://almarah.org.uk/wp-content/uploads/2026/10/header-logo-01-1.png)                                                                                                                                          |

The original brief requires logo display permission to be confirmed. `content/testimonials.ts` tracks `relationshipConfirmed: true` separately from `permissionConfirmed: false` for each client. The logo section retains a permission-pending note until those permissions are confirmed. Asset availability alone is not recorded as permission.
