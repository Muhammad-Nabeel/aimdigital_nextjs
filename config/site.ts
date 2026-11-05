import { z } from "zod";
const ebayUrl = z.url().refine((value) => {
  const url = new URL(value);
  return (
    url.protocol === "https:" && /(^|\.)ebay\.(co\.uk|com)$/.test(url.hostname)
  );
}, "Use an HTTPS eBay UK or US link");
const siteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  url: z.url(),
  email: z.email(),
  phone: z.string(),
  whatsapp: z.url(),
  companyNumber: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    county: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
  socials: z.object({ facebook: z.url(), linkedin: z.url(), clutch: z.url() }),
  // Internal path or an external booking tool URL.
  bookingUrl: z.union([z.url(), z.string().regex(/^\/[a-z0-9/-]*$/)]),
  quoteUrl: z.string(),
  locale: z.literal("en-GB"),
  responsePromise: z.string().nullable(),
  businessHours: z.string().nullable(),
  pricing: z.object({
    hourlyRateGBP: z.number().positive(),
    deadlineApproach: z.string().min(1),
    discovery: z.object({
      message: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
  ebay: z.object({
    username: z.string().min(1),
    profileUrl: ebayUrl,
    feedbackUrl: ebayUrl,
    feedbackCount: z.number().int().nonnegative(),
    experienceYears: z.number().positive(),
    reportedAt: z.iso.date(),
    screenshot: z
      .object({
        src: z
          .string()
          .regex(/^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|jpe?g|webp|avif)$/),
        alt: z.string().min(1),
        width: z.number().positive(),
        height: z.number().positive(),
        capturedAt: z.iso.date(),
      })
      .nullable(),
  }),
});
export const site = siteSchema.parse({
  name: "AIM DIGITAL UK LTD",
  shortName: "AIM Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aimdigitallimited.co.uk",
  email: "info@aimdigitallimited.co.uk",
  phone: "+44 7933 837137",
  whatsapp: "https://wa.me/447933837137",
  companyNumber: "15780709",
  address: {
    street: "61 Bridge Street",
    city: "Kington",
    county: "Herefordshire",
    postcode: "HR5 3DJ",
    country: "United Kingdom",
  },
  socials: {
    facebook:
      "https://www.facebook.com/people/Aim-Digital-UK-Limited/61576869306203/",
    linkedin: "https://www.linkedin.com/company/aim-digital-uk-limited",
    clutch: "https://clutch.co/profile/aim-digital-uk",
  },
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "/contact",
  quoteUrl: "/quote",
  locale: "en-GB",
  responsePromise: null,
  businessHours: null,
  pricing: {
    hourlyRateGBP: 20,
    deadlineApproach: "Clear, simple deadlines agreed before work starts.",
    discovery: {
      message: "Free discovery for every new client.",
      description:
        "Discuss your goals and requirements at no charge. We then agree the project scope, estimated hours and clear deadlines before paid work begins.",
    },
  },
  ebay: {
    username: "aimdigitaluk",
    profileUrl: "https://www.ebay.co.uk/usr/aimdigitaluk",
    feedbackUrl: "https://www.ebay.co.uk/usr/aimdigitaluk?_tab=feedback",
    feedbackCount: 1200,
    experienceYears: 2.5,
    reportedAt: "2026-10-14",
    screenshot: null,
  },
});
export const standardHourlyRate = `${new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 }).format(site.pricing.hourlyRateGBP)}/hour`;
export const addressLine = Object.values(site.address).join(", ");
export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Our work", href: "/work" },
  { label: "Our approach", href: "/#process" },
  { label: "Insights", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
export const legalNavigation = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
];
export const leadership = [
  {
    name: "Muhammad Nabeel",
    role: "AI Automation Engineer",
    focus: "Build & automate",
    bio: "Connecting AI, software and everyday workflows to help your business work smarter.",
    photo: "/team/muhammad-nabeel.jpeg",
    linkedin: null,
  },
  {
    name: "Hafiza Amber Naeem",
    role: "Business Development Executive",
    focus: "Listen & connect",
    bio: "Understanding your goals and helping shape the right next step for your business.",
    photo: null,
    linkedin: null,
  },
  {
    name: "Mishi",
    role: "Solution Architect",
    focus: "Plan & connect the pieces",
    bio: "Turning business requirements into a clear plan for how your systems work together.",
    photo: null,
    linkedin: null,
  },
];
// TODO: confirm business hours, response promise and individual profile links.
