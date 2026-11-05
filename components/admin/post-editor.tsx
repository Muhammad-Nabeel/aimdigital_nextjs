"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteBlogAction, saveBlogAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { coverLibrary } from "@/lib/admin/covers";
import type { StoredPost } from "@/lib/blog-store";

type Option = { value: string; label: string };
type Faq = { question: string; answer: string };

const control = "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3";
const label = "block text-sm font-medium";
const hint = "mt-1 text-xs font-normal text-muted-foreground";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
const lines = (value: string) => value.split("\n").map((line) => line.trim()).filter(Boolean);

export function PostEditor({ post, services, authors }: { post?: StoredPost; services: Option[]; authors: Option[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [id, setId] = useState(post?.id);
  const [version, setVersion] = useState(post?.version);
  const [message, setMessage] = useState<{ error?: string; saved?: string }>({});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post));
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [date, setDate] = useState(post?.date.slice(0, 10) ?? new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState(post?.author ?? authors[0]?.value ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? coverLibrary[0]);
  const [coverAlt, setCoverAlt] = useState(post?.coverAlt ?? "");
  const [takeaways, setTakeaways] = useState(post?.keyTakeaways.join("\n") ?? "");
  const [faq, setFaq] = useState<Faq[]>(post?.faq ?? []);
  const [related, setRelated] = useState<string[]>(post?.relatedServices ?? []);
  const [content, setContent] = useState(post?.content ?? "");
  const [draft, setDraft] = useState(post?.draft ?? true);
  const [sample, setSample] = useState(post?.sample ?? false);

  function save(publish: boolean) {
    setMessage({});
    startTransition(async () => {
      const result = await saveBlogAction({
        id, version, title, slug, seoTitle: seoTitle.trim() || undefined, description, date, author, category,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean), coverImage, coverAlt,
        keyTakeaways: lines(takeaways), faq: faq.filter((item) => item.question.trim() || item.answer.trim()),
        relatedServices: related, content, draft: !publish, sample,
      });
      if ("error" in result) return setMessage({ error: result.error });
      setDraft(!publish);
      setVersion(result.version);
      setMessage({ saved: publish ? "Published." : "Draft saved." });
      if (!id) {
        setId(result.id);
        router.replace(`/admin/posts/${result.id}`);
      }
    });
  }

  function remove() {
    if (!id || !version || !window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteBlogAction({ id, version });
      if ("error" in result) return setMessage({ error: result.error });
      router.push("/admin/posts");
    });
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); save(false); }} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/admin/posts" className="text-sm font-medium text-primary">← All articles</Link>
          <span className="text-sm text-muted-foreground">{id ? (draft ? "Draft" : "Published") : "New article"}</span>
        </div>
        <label className={label}>Title<input className={`${control} text-lg font-semibold`} value={title} required maxLength={200}
          onChange={(event) => { setTitle(event.target.value); if (!slugEdited) setSlug(slugify(event.target.value)); }} /></label>
        <label className={label}>URL slug<span className={hint}>{post ? "Locked after the first save so links keep working." : `Article URL: /blog/${slug || "…"}`}</span>
          <input className={control} value={slug} required readOnly={Boolean(post)} pattern="[a-z0-9]+(-[a-z0-9]+)*"
            onChange={(event) => { setSlugEdited(true); setSlug(event.target.value); }} /></label>
        <label className={label}>Summary<span className={hint}>Shown on cards and in search results. Up to 300 characters.</span>
          <textarea className={control} rows={3} value={description} required maxLength={300} onChange={(event) => setDescription(event.target.value)} /></label>
        <label className={label}>Article<span className={hint}>Markdown: ## headings, lists, links and tables. Start with H2; images go in the cover field.</span>
          <textarea className={`${control} min-h-[28rem] font-mono text-sm leading-6`} value={content} onChange={(event) => setContent(event.target.value)} /></label>
        <label className={label}>Key takeaways<span className={hint}>One per line.</span>
          <textarea className={control} rows={4} value={takeaways} onChange={(event) => setTakeaways(event.target.value)} /></label>
        <fieldset className="space-y-4">
          <legend className={label}>FAQ</legend>
          {faq.map((item, index) => (
            <div key={index} className="space-y-2 rounded-2xl border border-border bg-card p-4">
              <input className={control} placeholder="Question" value={item.question} aria-label={`Question ${index + 1}`}
                onChange={(event) => setFaq(faq.map((entry, i) => i === index ? { ...entry, question: event.target.value } : entry))} />
              <textarea className={control} rows={2} placeholder="Answer" value={item.answer} aria-label={`Answer ${index + 1}`}
                onChange={(event) => setFaq(faq.map((entry, i) => i === index ? { ...entry, answer: event.target.value } : entry))} />
              <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setFaq(faq.filter((_, i) => i !== index))}>Remove question</button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => setFaq([...faq, { question: "", answer: "" }])}>Add question</Button>
        </fieldset>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <div className="space-y-3 rounded-3xl border border-border bg-card p-5">
          {message.error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm">{message.error}</p>}
          {message.saved && <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">{message.saved}</p>}
          <Button type="submit" variant="outline" className="w-full" disabled={pending}>{pending ? "Saving…" : draft ? "Save draft" : "Unpublish and save as draft"}</Button>
          <Button type="button" className="w-full" disabled={pending} onClick={() => save(true)}>{draft ? "Publish" : "Update published article"}</Button>
          {id && !draft && <Link href={`/blog/${slug}`} target="_blank" className="block text-center text-sm font-medium text-primary">View on site ↗</Link>}
        </div>
        <div className="space-y-5 rounded-3xl border border-border bg-card p-5">
          <label className={label}>Publication date<input className={control} type="date" value={date} required onChange={(event) => setDate(event.target.value)} /></label>
          <label className={label}>Author<select className={control} value={author} onChange={(event) => setAuthor(event.target.value)}>
            {authors.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <label className={label}>Category<input className={control} value={category} required maxLength={80} placeholder="Website development" onChange={(event) => setCategory(event.target.value)} /></label>
          <label className={label}>Tags<span className={hint}>Comma separated.</span><input className={control} value={tags} onChange={(event) => setTags(event.target.value)} /></label>
          <label className={label}>SEO title<span className={hint}>Optional; defaults to the title.</span><input className={control} value={seoTitle} maxLength={100} onChange={(event) => setSeoTitle(event.target.value)} /></label>
        </div>
        <div className="space-y-4 rounded-3xl border border-border bg-card p-5">
          <p className={label}>Cover image</p>
          <div className="grid grid-cols-2 gap-2">
            {coverLibrary.map((src) => (
              <button key={src} type="button" aria-pressed={coverImage === src} onClick={() => setCoverImage(src)}
                className={`relative aspect-video overflow-hidden rounded-xl border-2 bg-muted ${coverImage === src ? "border-primary" : "border-transparent"}`}>
                <Image src={src} alt="" fill sizes="10rem" className="object-cover" />
              </button>
            ))}
          </div>
          <label className={label}>Image description<span className={hint}>Alt text for screen readers.</span>
            <input className={control} value={coverAlt} required maxLength={300} onChange={(event) => setCoverAlt(event.target.value)} /></label>
        </div>
        <fieldset className="space-y-2 rounded-3xl border border-border bg-card p-5">
          <legend className="sr-only">Related services</legend>
          <p className={label}>Related services</p>
          {services.map((service) => (
            <label key={service.value} className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" checked={related.includes(service.value)}
                onChange={(event) => setRelated(event.target.checked ? [...related, service.value] : related.filter((slug) => slug !== service.value))} />
              {service.label}
            </label>
          ))}
        </fieldset>
        <div className="space-y-3 rounded-3xl border border-border bg-card p-5 text-sm">
          <label className="flex items-start gap-3"><input type="checkbox" className="mt-1" checked={sample} onChange={(event) => setSample(event.target.checked)} />Sample content (cannot be published)</label>
          {id && <button type="button" onClick={remove} disabled={pending} className="font-medium text-red-600 dark:text-red-400">Delete article</button>}
        </div>
      </aside>
    </form>
  );
}
