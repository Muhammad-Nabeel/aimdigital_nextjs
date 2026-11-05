"use client";
import { useState } from "react";
import { FAQAccordion } from "@/components/faq-accordion";
import { faqCategories, type FAQ } from "@/content/faqs";
export function FAQSearch({ items }: { items: FAQ[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const matches = items.filter(
    (faq) =>
      (category === "All" || category === faq.category) &&
      `${faq.question} ${faq.answer}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="mb-10 grid gap-5 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[2fr_1fr]">
        <div>
          <label
            htmlFor="faq-query"
            className="mb-2 block text-sm font-semibold"
          >
            Search questions
          </label>
          <input
            id="faq-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try pricing, website or eBay"
            className="min-h-12 w-full rounded-xl border border-border bg-background px-4"
          />
        </div>
        <div>
          <label
            htmlFor="faq-category"
            className="mb-2 block text-sm font-semibold"
          >
            Category
          </label>
          <select
            id="faq-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-12 w-full rounded-xl border border-border bg-background px-4"
          >
            <option>All</option>
            {faqCategories.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="mb-8 text-sm text-muted-foreground"
      >
        {matches.length} {matches.length === 1 ? "answer" : "answers"} found
      </p>
      {faqCategories.map((name) => {
        const group = matches.filter((faq) => faq.category === name);
        return group.length ? (
          <section key={name} className="mb-10">
            <h2 className="mb-5 text-2xl font-semibold">{name}</h2>
            <FAQAccordion items={group} />
          </section>
        ) : null;
      })}
      {matches.length === 0 && (
        <p className="rounded-2xl bg-muted p-6">
          No matching questions. Try a broader search or choose “All”.
        </p>
      )}
    </>
  );
}
