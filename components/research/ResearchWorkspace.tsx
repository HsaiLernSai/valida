"use client";

import { useEffect, useState } from "react";
import { Feed } from "@/components/feed/Feed";
import { AppShell } from "@/components/layout/AppShell";
import { CreateResearchWizard } from "@/components/research/CreateResearchWizard";
import { posts as initialPosts } from "@/lib/mock-data";
import { getParticipationHistory } from "@/lib/participation-storage";
import { addSessionResearchPost, getAvailableResearchPosts } from "@/lib/research-storage";
import { getCommunityEngagements, saveCommunityEngagements } from "@/lib/community-storage";
import type { CommunityEngagement, FeedView, ParticipationRecord, ResearchPost } from "@/lib/types";

export function ResearchWorkspace() {
  const [posts, setPosts] = useState<ResearchPost[]>(initialPosts);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [participationHistory, setParticipationHistory] = useState<ParticipationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<FeedView>("For You");
  const [engagements, setEngagements] = useState<CommunityEngagement[]>([]);

  useEffect(() => {
    setPosts(getAvailableResearchPosts(initialPosts));
    setParticipationHistory(getParticipationHistory());
    setEngagements(getCommunityEngagements());
    if (new URLSearchParams(window.location.search).get("create") === "1") setIsWizardOpen(true);
  }, []);

  const publishResearch = (post: ResearchPost) => {
    setPosts((current) => [post, ...current]);
    addSessionResearchPost(post);
    setIsWizardOpen(false);
  };

  const updateEngagement = (engagement: CommunityEngagement) => {
    setEngagements((current) => {
      const next = [engagement, ...current.filter((item) => item.postId !== engagement.postId)];
      saveCommunityEngagements(next);
      return next;
    });
  };

  return (
    <>
      <AppShell onCreateResearch={() => setIsWizardOpen(true)}>
        <Feed posts={posts} participationHistory={participationHistory} activeTab={activeTab} onTabChange={setActiveTab} engagements={engagements} onEngagementChange={updateEngagement} />
      </AppShell>
      {isWizardOpen && <CreateResearchWizard onClose={() => setIsWizardOpen(false)} onPublish={publishResearch} />}
    </>
  );
}
