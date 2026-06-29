"use client";

import { useEffect, useState } from "react";
import { Feed } from "@/components/feed/Feed";
import { AppShell } from "@/components/layout/AppShell";
import { CreateResearchWizard } from "@/components/research/CreateResearchWizard";
import { posts as initialPosts } from "@/lib/mock-data";
import { getParticipationHistory } from "@/lib/participation-storage";
import { addSessionResearchPost, getAvailableResearchPosts } from "@/lib/research-storage";
import type { ParticipationRecord, ResearchPost } from "@/lib/types";

export function ResearchWorkspace() {
  const [posts, setPosts] = useState<ResearchPost[]>(initialPosts);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [participationHistory, setParticipationHistory] = useState<ParticipationRecord[]>([]);

  useEffect(() => {
    setPosts(getAvailableResearchPosts(initialPosts));
    setParticipationHistory(getParticipationHistory());
  }, []);

  const publishResearch = (post: ResearchPost) => {
    setPosts((current) => [post, ...current]);
    addSessionResearchPost(post);
    setIsWizardOpen(false);
  };

  return (
    <>
      <AppShell onCreateResearch={() => setIsWizardOpen(true)}>
        <Feed posts={posts} participationHistory={participationHistory} />
      </AppShell>
      {isWizardOpen && <CreateResearchWizard onClose={() => setIsWizardOpen(false)} onPublish={publishResearch} />}
    </>
  );
}
