import { z } from "zod";
import { clients } from "@/content/testimonials";
import { services } from "@/content/services";

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  clientName: z
    .string()
    .refine(
      (name) => clients.some((client) => client.name === name),
      "Unknown client",
    ),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["client-project", "in-progress", "director-experience"]),
  scope: z.array(z.string().min(1)).min(1),
  attribution: z.string().min(1),
  website: z.url().nullable(),
  services: z.array(
    z
      .string()
      .refine(
        (slug) => services.some((service) => service.slug === slug),
        "Unknown service",
      ),
  ),
});
export type Project = z.infer<typeof projectSchema>;

// Scope and attribution supplied by the owner on 14 October 2026.
// Logos identify clients; no simulated screenshots or results are used.
export const projects = z.array(projectSchema).parse([
  {
    slug: "faremakers-travel-website",
    clientName: "Faremakers.com",
    title: "Travel website, admin panel & payment options",
    category: "Travel & tourism",
    description:
      "Developed a travel website with an administration panel, JazzCash payment integration and a cash-on-delivery option.",
    status: "client-project",
    scope: [
      "Travel website development",
      "Administration panel",
      "JazzCash payment integration",
      "Cash-on-delivery option",
    ],
    attribution: "AIM Digital client project",
    website: "https://faremakers.com",
    services: ["ai-website-software-development"],
  },
  {
    slug: "fastsports-vizrt-graphics-control",
    clientName: "FastSports.tv",
    title: "Director control system for real-time graphics",
    category: "Broadcast technology",
    description:
      "Developed a director control system for real-time Vizrt graphics control at FastSports.tv.",
    status: "client-project",
    scope: [
      "Director control system development",
      "Real-time graphics control",
      "Vizrt integration",
    ],
    attribution: "AIM Digital client project",
    website: "https://fastsports.tv",
    services: ["ai-website-software-development"],
  },
  {
    slug: "samir-and-aly-website-improvements",
    clientName: "Samir & Aly",
    title: "Website performance improvements & bug fixes",
    category: "Website maintenance",
    description:
      "Worked on website performance improvements and resolved bugs for Samir & Aly, focusing on the existing site's technical issues.",
    status: "client-project",
    scope: ["Website performance improvement", "Bug investigation and fixes"],
    attribution: "AIM Digital client project",
    website: "https://samirandaly.com",
    services: [
      "ai-website-software-development",
      "technical-support-it-consulting",
    ],
  },
  {
    slug: "almarah-foundation-erp",
    clientName: "Almarah Foundation UK",
    title: "ERP for donations, smart housing & operations",
    category: "Charity & ERP systems",
    description:
      "Recently onboarded and currently working on an ERP system covering donations, smart housing and wider operational requirements for Almarah Foundation UK.",
    status: "in-progress",
    scope: [
      "ERP system development in progress",
      "Donation management",
      "Smart housing workflows",
      "Wider operational requirements",
    ],
    attribution: "Ongoing AIM Digital client engagement",
    website: "https://almarah.org.uk",
    services: ["ai-website-software-development"],
  },
  {
    slug: "busybees-dubai-director-experience",
    clientName: "BusyBees Dubai",
    title: "Personal project experience in Dubai cleaning services",
    category: "Cleaning services · Dubai",
    description:
      "Our director worked personally on a project for BusyBees Dubai, a cleaning-service business in Dubai.",
    status: "director-experience",
    scope: [
      "Dubai cleaning-service project",
      "Personal involvement by our director",
    ],
    attribution: "Our director's personal project experience",
    website: null,
    services: [],
  },
]);
