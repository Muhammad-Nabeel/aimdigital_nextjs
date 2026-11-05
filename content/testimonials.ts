import { z } from "zod";
export const clientSchema = z.object({
  name: z.string().min(1),
  website: z.url(),
  relationshipConfirmed: z.literal(true),
  permissionConfirmed: z.boolean(),
  logo: z.object({
    src: z.string().startsWith("/clients/"),
    alt: z.string().min(1),
    width: z.number().positive(),
    height: z.number().positive(),
    padded: z.boolean().default(false),
  }),
});
// Client relationships confirmed by the owner on 14 October 2026.
// Logo republication permission is tracked separately for each client.
export const clients = z.array(clientSchema).parse(
  [
    {
      name: "Faremakers.com",
      website: "https://faremakers.com",
      logo: {
        src: "/clients/faremakers.png",
        alt: "Faremakers.com logo",
        width: 250,
        height: 53,
      },
    },
    {
      name: "FastSports.tv",
      website: "https://fastsports.tv",
      logo: {
        src: "/clients/fastsports.png",
        alt: "FastSports.tv logo",
        width: 300,
        height: 81,
      },
    },
    {
      name: "BusyBees Dubai",
      website: "https://busybeesdubai.com",
      logo: {
        src: "/clients/busybees.png",
        alt: "BusyBees Dubai logo",
        width: 255,
        height: 110,
      },
    },
    {
      name: "Samir & Aly",
      website: "https://samirandaly.com",
      logo: {
        src: "/clients/samir-and-aly.png",
        alt: "Samir & Aly logo",
        width: 1414,
        height: 1414,
        padded: true,
      },
    },
    {
      name: "Almarah Foundation UK",
      website: "https://almarah.org.uk",
      logo: {
        src: "/clients/almarah.png",
        alt: "Almarah Foundation UK logo",
        width: 160,
        height: 57,
      },
    },
  ].map((client) => ({
    ...client,
    relationshipConfirmed: true,
    permissionConfirmed: false,
  })),
);
// Testimonial supplied for publication by the owner on 15 October 2026.
// This is a direct client testimonial, not a Trustpilot review.
export const testimonialSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1).nullable(),
  role: z.string().min(1),
  company: z.string().min(1),
  logo: clientSchema.shape.logo.optional(),
  quote: z.string().min(1),
  verifiedUrl: z.url().nullable(),
});
export const testimonials = z.array(testimonialSchema).parse([
  {
    title: "Amazing Designs and Quality Work!",
    name: null,
    role: "Director",
    company: "Faremakers",
    logo: clients.find((client) => client.name === "Faremakers.com")?.logo,
    quote:
      "AIM DIGITAL UK LTD delivered exactly what we needed — fast, professional, and on point. We're extremely satisfied with their work and look forward to working with them again!",
    verifiedUrl: null,
  },
]);
export const stats = z
  .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
  .parse([
    { label: "Years of experience", value: "2.5" },
    { label: "Clients supported", value: String(clients.length) },
    { label: "Projects delivered", value: "10+" },
  ]);
