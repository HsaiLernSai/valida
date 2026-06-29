import { PostCard } from "@/components/feed/PostCard";
import { StickyCommunityHeader } from "@/components/layout/StickyCommunityHeader";
import { getCompletedPostIds, getLocalResponseCount } from "@/lib/participation-storage";
import type { CommunityEngagement, FeedView, ParticipationRecord, ResearchPost } from "@/lib/types";

export function Feed({ posts, participationHistory, activeTab, onTabChange, engagements, onEngagementChange }: { posts: ResearchPost[]; participationHistory: ParticipationRecord[]; activeTab: FeedView; onTabChange: (tab: FeedView) => void; engagements: CommunityEngagement[]; onEngagementChange: (engagement: CommunityEngagement) => void }) {
  const completedPostIds = getCompletedPostIds(participationHistory);
  const followedHashtags = new Set(["UserResearch", "ProductDesign", "UXTesting"]);
  const visiblePosts = activeTab === "Following Hashtags"
    ? posts.filter((post) => post.hashtags.some((hashtag) => followedHashtags.has(hashtag)))
    : activeTab === "Latest"
      ? [...posts].sort((left, right) => Number(right.id.startsWith("local-")) - Number(left.id.startsWith("local-")))
      : posts;

  return (
    <main className="w-full max-w-[690px] pb-24 lg:pb-9">
      <StickyCommunityHeader activeTab={activeTab} onTabChange={onTabChange} />
      <section className="mt-2.5 space-y-2.5" aria-label="Community research feed">
        {visiblePosts.length === 0 && (
          <div className="rounded-card border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-card">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">V</div>
            <h2 className="mt-3 text-base font-black text-ink">No research in this view</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">Try another community tab to discover more requests.</p>
          </div>
        )}
        {visiblePosts.map((post) => (
          <PostCard
            key={post.id}
            post={{ ...post, responseCount: getLocalResponseCount(post, participationHistory) }}
            completed={completedPostIds.has(post.id)}
            engagement={engagements.find((item) => item.postId === post.id)}
            onEngagementChange={onEngagementChange}
          />
        ))}
      </section>
    </main>
  );
}
