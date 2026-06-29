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
        {posts.length === 0 && (
          <div className="rounded-card border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-card">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">V</div>
            <h2 className="mt-3 text-base font-black text-ink">No research requests yet</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">New research will appear here when it is available.</p>
          </div>
        )}
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
