"use client";

import { PostCard } from "@/components/feed/PostCard";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { StickyCommunityHeader } from "@/components/layout/StickyCommunityHeader";
import { getCompletedPostIds, getLocalResponseCount } from "@/lib/participation-storage";
import type { CommunityEngagement, FeedView, ParticipationRecord, ResearchPost } from "@/lib/types";

export function Feed({ posts, participationHistory, activeTab, onTabChange, engagements, onEngagementChange }: { posts: ResearchPost[]; participationHistory: ParticipationRecord[]; activeTab: FeedView; onTabChange: (tab: FeedView) => void; engagements: CommunityEngagement[]; onEngagementChange: (engagement: CommunityEngagement) => void }) {
  const { t } = useI18n();
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
          <div className="rounded-card border border-dashed border-slate-300 bg-surface px-6 py-12 text-center shadow-card">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">V</div>
            <h2 className="mt-3 text-base font-black text-ink">{t("community.emptyTitle")}</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">{t("community.emptyDescription")}</p>
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
