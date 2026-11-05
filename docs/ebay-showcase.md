# eBay account management and own-store showcase

Owner-supplied details, 14 October 2026: seller `aimdigitaluk`, 1,200 feedback and approximately 2.5 years of eBay experience. Public profile: https://www.ebay.co.uk/usr/aimdigitaluk.

## Implemented

The existing `/services/ebay-store-optimisation` URL is retained, while its title and cards now describe individual and business account management, store setup and listing optimisation. The service includes agreed account administration, listing content, order/stock workflows and buyer communication. Ownership and business decisions stay with the account owner; the account type must suit the selling activity. See [eBay's business-seller policy](https://www.ebay.co.uk/help/policies/selling-policies/selling-practices-policy/business-seller-policy?id=4710) when confirming account requirements.

Home and the services index show a compact own-account proof section. The service page shows a fuller version, with direct profile and feedback links. The two figures come from `config/site.ts` and are explicitly dated/team-reported. They do not imply 1,200 customers, positive reviews, a particular feedback score, a positive-feedback percentage, or an agency service rating. No Review/AggregateRating markup or eBay accreditation claim is added.

The direct UK profile fetch returned 403. Indexed profile/listing snapshots showed differing figures and crawl dates. They establish that a public selling profile exists but do not verify a live count of 1,200. Keep the visitor-facing buttons directed to the actual profile rather than labelling these figures live or independently verified. eBay's [feedback-profile guide](https://www.ebay.co.uk/help/account/account-account-settings/feedback-profile?id=4204) describes its public feedback information. The provided experience figure is approximate; it is not derived automatically from an account join date.

## Strengthen the showcase

1. **Keep live evidence one click away.** The profile shows listings; the feedback tab lets prospective clients inspect the original feedback rather than copied testimonials.
2. **Add a dated public screenshot.** Capture the actual public storefront and feedback summary, keeping the username, metric label and date legible. Save the approved image under `public/brand/` and fill `site.ebay.screenshot` with `src`, `alt`, actual `width`/`height` and `capturedAt`. The service page renders it through next/image. No simulated screenshot is used.
3. **Write an own-store case study.** Explain the starting situation, actual responsibilities, listing improvements, order workflow and lessons learnt. Include real examples and dated before/after evidence where available. Distinguish running our own account from managing client accounts. The live profile alone does not establish client outcomes.
4. **Use exact labels when updating metrics.** Check whether a figure is feedback score, all feedback, recent feedback or items sold before publishing it. Update `feedbackCount` and `reportedAt` together and adjust the displayed label if needed. Do not turn marketplace product feedback into an agency review.

`site.ebay.screenshot` is currently null because no actual screenshot was supplied. Account-management and own-store FAQs are included in the searchable FAQ page and the service's FAQ schema.
