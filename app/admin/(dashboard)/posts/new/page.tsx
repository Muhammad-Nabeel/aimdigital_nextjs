import { PostEditor } from "@/components/admin/post-editor";
import { editorOptions } from "@/lib/admin/editor-options";

export default function NewPostPage() {
  return <PostEditor {...editorOptions} />;
}
