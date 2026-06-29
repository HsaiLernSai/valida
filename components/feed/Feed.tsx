import { PostCard } from "@/components/feed/PostCard";
import { StickyCommunityHeader } from "@/components/layout/StickyCommunityHeader";
import { getCompletedPostIds, getLocalResponseCount } from "@/lib/participation-storage";
import type { ParticipationRecord, ResearchPost } from "@/lib/types";

export function Feed({ posts, participationHistory }: { posts: ResearchPost[]; participationHistory: ParticipationRecord[] }) {
  const completedPostIds = getCompletedPostIds(participationHistory);

  return (
    <main className="w-full max-w-[690px] pb-24 lg:pb-9">
      <StickyCommunityHeader />
      <section className="mt-2.5 space-y-2.5" aria-label="Community research feed">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={{ ...post, responseCount: getLocalResponseCount(post, participationHistory) }}
            completed={completedPostIds.has(post.id)}
          />
        ))}
      </section>
    </main>
  );
}
