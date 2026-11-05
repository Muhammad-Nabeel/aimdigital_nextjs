import { Plus } from "lucide-react";
import type { z } from "zod";
import type { faqSchema } from "@/content/faqs";
export function FAQAccordion({
  items,
}: {
  items: z.infer<typeof faqSchema>[];
}) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {faq.question}
            <Plus className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
