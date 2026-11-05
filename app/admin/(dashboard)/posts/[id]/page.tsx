import { notFound } from "next/navigation";
import { findPostById } from "@/lib/blog-store";
import { PostEditor } from "@/components/admin/post-editor";
import { editorOptions } from "@/lib/admin/editor-options";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const post = await findPostById((await params).id);
  if (!post) notFound();
  return <PostEditor key={post.id} post={post} {...editorOptions} />;
}
