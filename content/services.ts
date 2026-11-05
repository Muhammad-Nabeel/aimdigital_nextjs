import { z } from "zod";
import { site } from "@/config/site";
export const serviceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  description: z.string().min(1),
  answer: z.string().min(1),
  icon: z.enum([
    "code",
    "search",
    "chart",
    "store",
    "sparkles",
    "cart",
    "pen",
    "support",
    "layers",
    "package",
  ]),
  pricing: z.discriminatedUnion("mode", [
    z.object({ mode: z.literal("quote") }),
    z.object({
      mode: z.literal("hourly"),
      hourlyRateGBP: z.number().positive(),
    }),
    z.object({ mode: z.literal("from"), fromGBP: z.number().positive() }),
  ]),
  included: z.array(z.string().min(1)).min(1),
  deliverables: z.array(z.string().min(1)).min(1),
  process: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .min(1),
  faqCategory: z.string(),
  showcase: z.literal("ebay").optional(),
  comparison: z.object({
    question: z.string(),
    rows: z
      .array(z.object({ option: z.string(), description: z.string() }))
      .min(2),
  }),
});
export type Service = z.infer<typeof serviceSchema>;
export const services = z.array(serviceSchema).parse([
  {
    slug: "ai-website-software-development",
    title: "AI-Powered Website & Software Development",
    shortTitle: "Websites & software",
    description:
      "AI-powered development combines experienced developers with tools that assist research, prototyping and implementation.",
    answer:
      "AI-powered development combines experienced developers with tools that assist research, prototyping and implementation. AIM Digital builds business websites and bespoke software around your users, workflows and goals. We agree a scope, review the work together and plan testing and handover, so the resulting product has a clear purpose and a practical route to launch.",
    icon: "code",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Requirements and user journeys",
      "Responsive interface design",
      "Website or application development",
      "Integration planning and testing",
    ],
    deliverables: [
      "Agreed feature specification",
      "Reviewed design and working build",
      "Deployment and handover notes",
    ],
    faqCategory: "AI Website Development",
    comparison: {
      question:
        "What is the difference between a business website and bespoke software?",
      rows: [
        {
          option: "Business website",
          description: "Explains your offer and helps visitors enquire or buy.",
        },
        {
          option: "Bespoke software",
          description: "Supports specific workflows, users and integrations.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS & Custom Web Application Development",
    shortTitle: "SaaS & web apps",
    description:
      "SaaS development turns a recurring business need into a secure web application that customers or staff sign in to and use.",
    answer:
      "SaaS development turns a recurring business need into a secure web application that customers or staff sign in to and use. AIM Digital helps you scope a focused first version, build accounts, permissions and the core workflow, and plan billing, hosting and support, so you can launch, learn from real users and grow the product in stages.",
    icon: "layers",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "MVP scoping and feature prioritisation",
      "User accounts, roles and permissions",
      "Core application workflow and dashboards",
      "Subscription billing and integration planning",
    ],
    deliverables: [
      "Agreed MVP specification",
      "Tested, deployed web application",
      "Hosting, security and handover notes",
    ],
    faqCategory: "AI Website Development",
    comparison: {
      question: "Should you build an MVP or a full product first?",
      rows: [
        {
          option: "MVP",
          description:
            "The smallest useful version, built to test demand with real users.",
        },
        {
          option: "Full product",
          description:
            "A broader feature set, suited once requirements are proven.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "digital-products",
    title: "Digital Product Development",
    shortTitle: "Digital products",
    description:
      "Digital product development helps you turn expertise into something customers can buy and download or access online.",
    answer:
      "Digital product development helps you turn expertise into something customers can buy and download or access online, such as templates, tools, courses or member content. AIM Digital helps you shape the product, build the delivery experience and set up secure payments and access, so customers can buy and use it without manual work from you.",
    icon: "package",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Product shaping and offer planning",
      "Sales page and checkout setup",
      "Secure delivery, downloads or member access",
      "Payment, email and platform integration",
    ],
    deliverables: [
      "Agreed product and delivery plan",
      "Working checkout and delivery flow",
      "Launch checklist and handover notes",
    ],
    faqCategory: "AI Website Development",
    comparison: {
      question: "Should you sell through a marketplace or your own website?",
      rows: [
        {
          option: "Marketplace",
          description:
            "Built-in audience, but platform fees and less control over branding.",
        },
        {
          option: "Your own website",
          description: "Full control of pricing, branding and customer data.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO & AI Search Optimisation",
    shortTitle: "SEO & AI search",
    description:
      "SEO improves how search engines understand your website and how useful its pages are to potential customers.",
    answer:
      "SEO improves how search engines understand your website and how useful its pages are to potential customers. AIM Digital combines technical reviews, on-page improvements, content planning and appropriate off-page activity. AI-search optimisation applies the same clear, evidence-led structure to questions that answer engines may surface, without guaranteeing rankings, traffic or citations.",
    icon: "search",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Technical and crawl review",
      "On-page content and internal linking",
      "Off-page opportunity assessment",
      "AI-search and answer structure review",
    ],
    deliverables: [
      "Prioritised SEO action plan",
      "Page and content recommendations",
      "Agreed reporting framework",
    ],
    faqCategory: "SEO",
    comparison: {
      question: "How do traditional SEO and AI-search optimisation compare?",
      rows: [
        {
          option: "Traditional SEO",
          description: "Makes pages discoverable and useful in search results.",
        },
        {
          option: "AI-search optimisation",
          description:
            "Makes well-sourced answers easier for answer engines to interpret.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital marketing",
    description:
      "Digital marketing connects your offer with the people most likely to need it.",
    answer:
      "Digital marketing connects your offer with the people most likely to need it. AIM Digital helps plan search, social media, email and paid advertising around a defined audience and commercial goal. We agree channels, creative requirements and measurement before launching, then use available evidence to discuss improvements rather than promising a fixed return.",
    icon: "chart",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Audience and channel planning",
      "Google Ads and paid campaign support",
      "Social media content planning",
      "Email campaign planning",
    ],
    deliverables: [
      "Channel and campaign brief",
      "Agreed creative and content assets",
      "Measurement and review plan",
    ],
    faqCategory: "Digital Marketing",
    comparison: {
      question: "When should you use organic marketing or paid campaigns?",
      rows: [
        {
          option: "Organic activity",
          description: "Builds useful content and visibility over time.",
        },
        {
          option: "Paid campaigns",
          description: "Buys distribution within an agreed advertising budget.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "ebay-store-optimisation",
    title: "eBay Account Management, Store Setup & Listing Optimisation",
    shortTitle: "eBay account management",
    description:
      "Management for individual and business eBay accounts, from store setup and listing optimisation to order workflows and buyer communication.",
    answer:
      "AIM Digital manages individual and business eBay accounts with support for store setup, listings, order workflows and buyer communication. We agree responsibilities and access around your account type and selling activity. Our own eBay selling experience informs practical recommendations, while you retain account ownership and control over business decisions.",
    icon: "store",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Individual (private) and business account management within an agreed scope",
      "Store structure and category setup",
      "Product titles and item specifics",
      "Listing descriptions and image guidance",
      "Existing listing review",
      "Order, dispatch and stock workflow support",
      "Buyer messages, returns and case-handling support within agreed permissions",
    ],
    deliverables: [
      "Account review and agreed management responsibilities",
      "Store configuration checklist",
      "Agreed listing content",
      "Order and buyer communication workflow",
      "Recommendations for maintaining listings",
    ],
    faqCategory: "eBay",
    showcase: "ebay",
    comparison: {
      question: "How do individual and business eBay account support differ?",
      rows: [
        {
          option: "Individual (private) account",
          description:
            "Support for personal selling, listings and buyer communication, using the appropriate account type for your activity.",
        },
        {
          option: "Business account",
          description:
            "Support for commercial selling workflows, catalogue organisation, stock, orders and ongoing account administration.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "etsy-store-optimisation",
    title: "Etsy Store Setup, Listing & Optimisation",
    shortTitle: "Etsy stores",
    description:
      "Etsy store optimisation brings your product information, shop presentation and listing language into a coherent buying experience.",
    answer:
      "Etsy store optimisation brings your product information, shop presentation and listing language into a coherent buying experience. AIM Digital helps organise the shop, describe products clearly and review relevant listing fields using your product details. You remain responsible for eligibility, accuracy and marketplace compliance; we do not guarantee placement, orders or a particular level of sales.",
    icon: "sparkles",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Shop organisation and setup support",
      "Product title and description planning",
      "Listing field and keyword review",
      "Product photography guidance",
    ],
    deliverables: [
      "Shop setup checklist",
      "Agreed listing copy",
      "Ongoing listing maintenance guidance",
    ],
    faqCategory: "Etsy",
    comparison: {
      question: "How do shop branding and listing copy work together?",
      rows: [
        {
          option: "Shop branding",
          description:
            "Helps buyers understand the maker and overall product range.",
        },
        {
          option: "Listing copy",
          description: "Answers practical questions about a specific product.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "e-commerce-solutions",
    title: "E-Commerce Solutions",
    shortTitle: "E-commerce",
    description:
      "E-commerce development creates an online store that helps customers browse products, understand their choices and complete a purchase.",
    answer:
      "E-commerce development creates an online store that helps customers browse products, understand their choices and complete a purchase. AIM Digital supports Shopify and WordPress/WooCommerce projects, alongside agreed Amazon seller support. We plan catalogue structure, checkout requirements and integrations around your operations, with platform subscriptions and third-party services identified separately in the proposed scope.",
    icon: "cart",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Shopify store design and development",
      "WordPress and WooCommerce stores",
      "Catalogue and checkout planning",
      "Amazon support scope assessment",
    ],
    deliverables: [
      "Reviewed storefront and product structure",
      "Agreed integrations and testing",
      "Store handover documentation",
    ],
    faqCategory: "General",
    comparison: {
      question: "Which is more suitable: Shopify or WooCommerce?",
      rows: [
        {
          option: "Shopify",
          description:
            "A hosted platform with subscriptions and an app ecosystem.",
        },
        {
          option: "WooCommerce",
          description:
            "A WordPress commerce platform with hosting and maintenance to plan.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "content-copywriting",
    title: "Content & Copywriting",
    shortTitle: "Content & copywriting",
    description:
      "Conversion-focused copywriting explains what your business offers, who it helps and what a reader can do next.",
    answer:
      "Conversion-focused copywriting explains what your business offers, who it helps and what a reader can do next. AIM Digital writes clear website copy, product descriptions and search-friendly articles using an agreed brief and source material. We organise answers around customer questions, review accuracy with you and keep unsupported claims out of the final content.",
    icon: "pen",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Audience and message brief",
      "Website and landing-page copy",
      "Product descriptions",
      "Search-friendly editorial content",
    ],
    deliverables: [
      "Agreed content outline",
      "Reviewed copy drafts",
      "Final copy in an agreed format",
    ],
    faqCategory: "General",
    comparison: {
      question: "How do product copy and editorial content differ?",
      rows: [
        {
          option: "Product copy",
          description:
            "Helps a buyer evaluate a specific offer and take action.",
        },
        {
          option: "Editorial content",
          description:
            "Explains a topic and answers questions before a buying decision.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
  {
    slug: "technical-support-it-consulting",
    title: "Technical Support & IT Consulting",
    shortTitle: "Technical support",
    description:
      "Technical support helps diagnose problems with the systems your business uses online.",
    answer:
      "Technical support helps diagnose problems with the systems your business uses online. AIM Digital assists with business email, domain configuration, spam issues, website bugs and development decisions within an agreed scope. We review symptoms, access requirements and potential changes before proceeding; availability, response times and any ongoing support arrangements must be agreed for your project.",
    icon: "support",
    pricing: {
      mode: "hourly",
      hourlyRateGBP: site.pricing.hourlyRateGBP,
    },
    included: [
      "Business email and domain setup",
      "Spam and delivery troubleshooting",
      "Website bug investigation",
      "IT and development consulting",
    ],
    deliverables: [
      "Diagnosis and prioritised recommendations",
      "Agreed fixes or configuration changes",
      "Handover notes and next steps",
    ],
    faqCategory: "Support",
    comparison: {
      question:
        "When is a one-off fix enough, and when is ongoing support useful?",
      rows: [
        {
          option: "One-off support",
          description: "Addresses a defined issue or configuration task.",
        },
        {
          option: "Ongoing support",
          description:
            "Covers an agreed set of recurring maintenance activities.",
        },
      ],
    },
    process: [
      {
        title: "Discover",
        description: `${site.pricing.discovery.message} Review your goals, existing setup and requirements.`,
      },
      {
        title: "Plan",
        description: "Agree scope, responsibilities, pricing and milestones.",
      },
      {
        title: "Deliver",
        description:
          "Build or implement the agreed work with opportunities to review.",
      },
      {
        title: "Review",
        description:
          "Check the deliverables and discuss handover or further support.",
      },
    ],
  },
]);
