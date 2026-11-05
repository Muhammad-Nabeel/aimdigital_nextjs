import { z } from "zod";
import { services } from "@/content/services";

export const quoteEmail = "support@aimdigitallimited.co.uk";
export const quoteServices = [
  ...services.map((service) => service.shortTitle),
  "Something else / I need advice",
];
export const quoteBudgets = [
  "Under £500",
  "£500–£1,000",
  "£1,000–£3,000",
  "£3,000–£5,000",
  "£5,000+",
  "Not sure yet",
] as const;
export const quoteTimelines = [
  "As soon as possible",
  "Within 1 month",
  "Within 3 months",
  "Flexible / just exploring",
] as const;
const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((value) => !/[\r\n]/.test(value));
export const quoteSchema = z.object({
  name: singleLine(100).pipe(z.string().min(1)),
  email: z.string().trim().max(254).pipe(z.email()),
  company: singleLine(150),
  phone: singleLine(40),
  service: z.enum(quoteServices),
  budget: z.enum(quoteBudgets),
  timeline: z.enum(quoteTimelines),
  details: z.string().trim().min(10).max(5000),
  website: z.string().max(200),
  requestId: z.uuid(),
});

export function quoteMessage(quote: z.infer<typeof quoteSchema>) {
  return [
    "New quote request from the AIM Digital website",
    "",
    `Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Company: ${quote.company || "Not provided"}`,
    `Phone: ${quote.phone || "Not provided"}`,
    `Service: ${quote.service}`,
    `Budget: ${quote.budget}`,
    `Timing: ${quote.timeline}`,
    "",
    "What the client needs:",
    quote.details,
  ].join("\n");
}
