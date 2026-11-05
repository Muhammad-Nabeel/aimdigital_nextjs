import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog";
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          width={800}
          height={520}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[20/13] w-full object-cover"
        />
      </Link>
      <div className="p-6">
        <p className="eyebrow">{post.category}</p>
        <h3 className="mt-4 text-xl font-semibold">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <p className="mt-5 text-xs text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Europe/London",
            })}
          </time>{" "}
          · {post.minutes} min read{post.sample ? " · Sample article" : ""}
        </p>
      </div>
    </article>
  );
}
