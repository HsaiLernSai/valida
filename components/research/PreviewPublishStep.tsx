import { PostCard } from "@/components/feed/PostCard";
import { NativeFormRenderer } from "@/components/research/NativeFormRenderer";
import type { ResearchPost } from "@/lib/types";

export function PreviewPublishStep({ post }: { post: ResearchPost }) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Preview your request</h2>
      <p className="mt-1 text-sm text-slate-500">This is how your research will appear in the community feed.</p>
      <div className="mt-5 max-h-[52vh] overflow-y-auto rounded-2xl bg-slate-100/70 p-2 sm:p-3">
        <PostCard post={post} />
      </div>
      {post.responseMethod === "external" ? (
        post.externalLink && <p className="mt-3 truncate text-xs text-slate-500"><span className="font-bold text-slate-700">External form:</span> {post.externalLink}</p>
      ) : (
        <div className="mt-4"><h3 className="text-sm font-extrabold text-ink">Native form preview</h3><NativeFormRenderer post={post} preview /></div>
      )}
    </div>
  );
}
