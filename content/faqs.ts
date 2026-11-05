import { z } from "zod";
import { site, standardHourlyRate } from "@/config/site";
export const faqCategories = [
  "General",
  "Pricing",
  "AI Website Development",
  "SEO",
  "eBay",
  "Etsy",
  "Digital Marketing",
  "Support",
] as const;
export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.enum(faqCategories),
  relatedServices: z.array(z.string()).optional(),
});
export type FAQ = z.infer<typeof faqSchema>;
export const faqs = z.array(faqSchema).parse([
  {
    category: "eBay",
    relatedServices: ["ebay-store-optimisation"],
    question: "Do you manage individual and business eBay accounts?",
    answer:
      "Yes. We support individual (private) and business eBay accounts with listings, store organisation, order workflows and buyer communication within an agreed scope. We review your selling activity and account type during discovery. You retain account ownership and control over business decisions.",
  },
  {
    category: "eBay",
    relatedServices: ["ebay-store-optimisation"],
    question: "Can I see your own eBay selling account?",
    answer: `Yes. Our seller username is ${site.ebay.username}. Our team reports ${site.ebay.feedbackCount.toLocaleString("en-GB")} feedback and approximately ${site.ebay.experienceYears} years of hands-on eBay experience as of ${new Date(site.ebay.reportedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" })}. Visit our eBay profile to see current listings and feedback: ${site.ebay.profileUrl}`,
  },
  {
    category: "General",
    relatedServices: ["e-commerce-solutions"],
    question: "Can you help choose between Shopify and WooCommerce?",
    answer:
      "We can review your catalogue, integrations, editing needs and maintenance arrangements. Platform subscriptions, hosting and extensions should be considered alongside development costs before choosing a platform.",
  },
  {
    category: "General",
    relatedServices: ["e-commerce-solutions"],
    question: "Can you move products from an existing online store?",
    answer:
      "We first review the export format, product variations, images and platform compatibility. Catalogue migration, URL preservation and stock synchronisation must be included explicitly in the agreed scope.",
  },
  {
    category: "General",
    relatedServices: ["content-copywriting"],
    question: "What do you need before writing website copy?",
    answer:
      "Share your offer, audience, approved facts, existing content and preferred tone. We use this material to agree an outline and identify missing evidence before writing.",
  },
  {
    category: "General",
    relatedServices: ["content-copywriting"],
    question: "Will you fact-check product and business claims?",
    answer:
      "We review wording against the source material you provide and flag claims that need evidence. You should confirm product details and approve factual statements before publication; specialist claims may require additional review.",
  },
  {
    category: "General",
    question: "What can AIM Digital help my business with?",
    answer:
      "We work across websites, software, search, marketing, e-commerce, content and technical support. Share your business goal so we can discuss which services fit.",
  },
  {
    category: "General",
    question: "Can you improve an existing website or store?",
    answer:
      "Yes. Share the current setup and the problems you want to solve. We can discuss design, content, search or technical improvements within an agreed scope.",
  },
  {
    category: "General",
    question: "Do you work with businesses outside the UK?",
    answer:
      "We can discuss remote projects with businesses in different locations. Delivery arrangements, communication and any location-specific requirements should be agreed before work starts.",
  },
  {
    category: "Pricing",
    question: "Is discovery free for new clients?",
    answer: `Yes. ${site.pricing.discovery.message} ${site.pricing.discovery.description} Our typical rate for agreed project work is ${standardHourlyRate}.`,
  },
  {
    category: "Pricing",
    question: "How much will my project cost?",
    answer: `${site.pricing.discovery.message} Our typical rate for agreed project work is ${standardHourlyRate}. We discuss the scope and estimated hours before paid work begins, with clear, simple deadlines agreed for your project. Share your goals and requirements so we can estimate the work involved.`,
  },
  {
    category: "Pricing",
    question: "Are subscriptions and advertising spend included?",
    answer:
      "Platform subscriptions, hosting, third-party tools and advertising spend should be identified separately in your proposal. Check the agreed scope for what is included.",
  },
  {
    category: "Pricing",
    question: "What happens if the scope changes?",
    answer: `We discuss any change to the scope, estimated hours and delivery dates before agreeing additional work. ${site.pricing.deadlineApproach} Updated arrangements belong in your project agreement.`,
  },
  {
    category: "AI Website Development",
    question: "What does AI-powered development mean?",
    answer:
      "AI tools can assist research, drafting, prototyping and coding. Human developers still need to review requirements, implementation and testing. The tools used and any data restrictions should be agreed for the project.",
  },
  {
    category: "AI Website Development",
    question: "Can you integrate an existing business system?",
    answer:
      "We first review the system, available APIs and access requirements. Integration depends on technical compatibility and third-party terms, so feasibility is assessed before committing to a build.",
  },
  {
    category: "AI Website Development",
    question: "Will my website work on mobile?",
    answer:
      "Responsive layouts and mobile usability are part of the proposed website approach. The target devices, accessibility requirements and testing scope should be agreed before delivery.",
  },
  {
    category: "SEO",
    question: "Can you guarantee search rankings or AI citations?",
    answer:
      "No. Search engines and AI tools select which pages to surface. We focus on useful content, technical foundations and clear information without promising a particular ranking or citation.",
  },
  {
    category: "SEO",
    question: "What does a technical SEO review cover?",
    answer:
      "Depending on scope, it can examine crawl access, indexing, page structure, internal links, performance and metadata. Recommendations are prioritised by the issues found.",
  },
  {
    category: "SEO",
    question: "How quickly will SEO improvements show results?",
    answer:
      "Timing varies with the site, competition and the changes made. Some technical issues can be resolved quickly; wider visibility changes take time and cannot be guaranteed.",
  },
  {
    category: "eBay",
    question: "Can you optimise existing eBay listings?",
    answer:
      "Yes. We can review titles, item specifics, descriptions and shop organisation using accurate product data supplied by you. The listing scope is agreed before work begins.",
  },
  {
    category: "eBay",
    question: "Do you handle eBay account verification?",
    answer:
      "Account ownership and verification remain with you. We can discuss setup guidance, but marketplace approval depends on eBay and the information you provide.",
  },
  {
    category: "eBay",
    question: "What product information should I provide?",
    answer:
      "Provide accurate specifications, variations, pricing, availability, shipping and return information, plus images you have permission to use. We can identify missing information during discovery.",
  },
  {
    category: "Etsy",
    question: "Can you help set up an Etsy shop?",
    answer:
      "We can discuss shop organisation and listing setup. You remain responsible for seller eligibility, account verification and ensuring products meet Etsy requirements.",
  },
  {
    category: "Etsy",
    question: "Will you write Etsy listing descriptions?",
    answer:
      "We can prepare descriptions using your product details and an agreed tone. You review accuracy, materials, variations, delivery information and any product claims before publication.",
  },
  {
    category: "Etsy",
    question: "Can you guarantee Etsy sales?",
    answer:
      "No. Sales depend on demand, pricing, products, fulfilment and marketplace behaviour. Our work focuses on accurate information and clearer product presentation.",
  },
  {
    category: "Digital Marketing",
    question: "Which marketing channels should I start with?",
    answer:
      "Start with your audience, offer and goal. We can discuss the relative suitability of search, social media, email and paid advertising instead of assuming every channel is needed.",
  },
  {
    category: "Digital Marketing",
    question: "Can you help with Google Ads?",
    answer:
      "We can discuss account review, campaign planning and ongoing campaign work. Advertising spend, account access and reporting requirements should be agreed separately.",
  },
  {
    category: "Digital Marketing",
    question: "How will campaign performance be measured?",
    answer:
      "We agree relevant measures and available tracking before work starts. Reporting depends on your consent setup, platforms and data quality; a fixed return is not guaranteed.",
  },
  {
    category: "Support",
    question: "Can you help with business email or domain setup?",
    answer:
      "We can review domain records, mailbox configuration and delivery symptoms. Access should use appropriate permissions and avoid sharing passwords in an initial enquiry.",
  },
  {
    category: "Support",
    question: "Do you offer round-the-clock support?",
    answer:
      "No round-the-clock availability or response-time commitment is published here. Ask about available support arrangements and agree service hours and response terms in writing.",
  },
  {
    category: "Support",
    question: "Can you fix a website bug?",
    answer:
      "Share the symptoms, affected pages and steps to reproduce the problem without including sensitive data. We assess the issue and discuss an investigation or repair scope.",
  },
]);
