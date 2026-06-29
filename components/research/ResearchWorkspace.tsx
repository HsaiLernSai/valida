"use client";

import { useEffect, useState } from "react";
import { Feed } from "@/components/feed/Feed";
import { AppShell } from "@/components/layout/AppShell";
import { CreateResearchWizard } from "@/components/research/CreateResearchWizard";
import { posts as initialPosts } from "@/lib/mock-data";
import { getParticipationHistory } from "@/lib/participation-storage";
import type { ResearchPost } from "@/lib/types";

export function ResearchWorkspace() {
  const [posts, setPosts] = useState<ResearchPost[]>(initialPosts);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [completedPostIds, setCompletedPostIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const sessionPosts = JSON.parse(sessionStorage.getItem("valida:session-posts") ?? "[]") as ResearchPost[];
    setPosts([...sessionPosts, ...initialPosts.filter((post) => !sessionPosts.some((sessionPost) => sessionPost.id === post.id))]);
    setCompletedPostIds(new Set(getParticipationHistory().map((record) => record.postId)));
  }, []);
  const publishResearch = (post: ResearchPost) => {
    setPosts((current) => [post, ...current]);
    const storedPosts = JSON.parse(sessionStorage.getItem("valida:session-posts") ?? "[]") as ResearchPost[];
    sessionStorage.setItem("valida:session-posts", JSON.stringify([post, ...storedPosts.filter((item) => item.id !== post.id)]));
    setIsWizardOpen(false);
  };

  return (
    <>
      <AppShell onCreateResearch={() => setIsWizardOpen(true)}>
        <Feed posts={posts} completedPostIds={completedPostIds} />
      </AppShell>
      {isWizardOpen && <CreateResearchWizard onClose={() => setIsWizardOpen(false)} onPublish={publishResearch} />}
    </>
  );
}
