import Link from "next/link";
import { listPosts } from "@/lib/blog-store";
import { buttonVariants } from "@/components/ui/button";

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

function status(post: { draft: boolean; date: string }) {
  if (post.draft) return { label: "Draft", className: "bg-muted text-muted-foreground" };
  if (Date.parse(post.date) > Date.now()) return { label: "Scheduled", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300" };
  return { label: "Published", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" };
}

export default async function PostsPage() {
  const posts = await listPosts(true);
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Blog studio</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Articles</h1></div>
        <Link href="/admin/posts/new" className={buttonVariants()}>New article</Link>
      </div>
      {posts.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center"><p className="font-medium">No articles yet.</p><p className="mt-2 text-sm text-muted-foreground">Write your first article; it stays a draft until you publish it.</p></div>
      ) : (
        <ul className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
          {posts.map((post) => {
            const badge = status(post);
            return (
              <li key={post.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
                <div className="min-w-0">
                  <Link href={`/admin/posts/${post.id}`} className="font-medium hover:text-primary">{post.title}</Link>
                  <p className="mt-1 text-sm text-muted-foreground">/blog/{post.slug} · {post.category} · edited {dateFormat.format(new Date(post.modifiedAt))}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>{badge.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
