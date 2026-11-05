import type { FAQ } from "@/content/faqs";
import { JsonLd } from "@/lib/schema/json-ld";
export function FAQSchema({
  items,
}: {
  items: Pick<FAQ, "question" | "answer">[];
}) {
  if (!items.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
