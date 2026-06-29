import { PostCard } from "@/components/feed/PostCard";
import { StickyCommunityHeader } from "@/components/layout/StickyCommunityHeader";
import type { ResearchPost } from "@/lib/types";

export function Feed({ posts, completedPostIds }: { posts: ResearchPost[]; completedPostIds: Set<string> }) {
  return (
    <main className="w-full max-w-[690px] pb-24 lg:pb-9">
      <StickyCommunityHeader />
      <section className="mt-2.5 space-y-2.5" aria-label="Community research feed">
        {posts.map((post) => <PostCard key={post.id} post={post} completed={completedPostIds.has(post.id)} />)}
      </section>
    </main>
  );
}
