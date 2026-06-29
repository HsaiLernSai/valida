"use client";

import { useEffect, useState } from "react";
import { ExternalFormPanel } from "@/components/research/ExternalFormPanel";
import { NativeFormRenderer } from "@/components/research/NativeFormRenderer";
import { ResearchMetaPanel } from "@/components/research/ResearchMetaPanel";
import { Card } from "@/components/ui/Card";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { posts as mockPosts } from "@/lib/mock-data";
import { getLocalResponseCount, getParticipation, getParticipationHistory, saveParticipation } from "@/lib/participation-storage";
import { findAvailableResearchPost } from "@/lib/research-storage";
import type { NativeFormAnswers, ParticipationRecord, ResearchPost } from "@/lib/types";

export function ResearchDetail({ researchId }: { researchId: string }) {
  const [post, setPost] = useState<ResearchPost | null>(() => mockPosts.find((item) => item.id === researchId) ?? null);
  const [hydrated, setHydrated] = useState(false);
  const [participation, setParticipation] = useState<ParticipationRecord | null>(null);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const resolvedPost = findAvailableResearchPost(researchId, mockPosts) ?? null;
    setPost(resolvedPost);
    if (resolvedPost) {
      const history = getParticipationHistory();
      const existingParticipation = getParticipation(researchId, history) ?? null;
      setParticipation(existingParticipation);
      setResponseCount(getLocalResponseCount(resolvedPost, history));
    }
    setHydrated(true);
  }, [researchId]);

  const submitResponse = (answers: NativeFormAnswers) => {
    if (!post || participation) return;
    const record = saveParticipation(post.id, answers);
    setParticipation(record);
    setResponseCount(getLocalResponseCount(post));
  };

  if (!hydrated) return <div className="min-h-screen bg-app-gradient px-5 py-16" role="status" aria-label="Loading research"><div className="mx-auto max-w-6xl animate-pulse"><div className="h-12 w-36 rounded-2xl bg-white/80" /><div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]"><div className="space-y-5"><div className="h-72 rounded-card border border-white bg-white/70" /><div className="h-96 rounded-card border border-white bg-white/70" /></div><div className="h-72 rounded-card border border-white bg-white/70" /></div><span className="sr-only">Loading research details</span></div></div>;
  if (!post) return <div className="grid min-h-screen place-items-center bg-app-gradient px-5 text-center"><Card className="max-w-md p-8"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-xl font-black text-slate-400">?</div><h1 className="mt-4 text-2xl font-extrabold text-ink">Research not found</h1><p className="mt-2 text-sm leading-6 text-slate-500">This request may have expired with a previous browser session.</p><a href="/" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand-gradient px-4 text-sm font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">Return to community</a></Card></div>;

  const targetAudiences = Array.isArray(post.targetAudience) ? post.targetAudience : [post.targetAudience];

  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"><ValidaLogo variant="compact" /><a href="/" className="text-xs font-bold text-slate-500 transition hover:text-brand">← Back to community</a></div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-10">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div className="space-y-5">
            <Card as="article" className="p-5 sm:p-7">
              <div className="flex items-center gap-3"><div className={`grid h-10 w-10 place-items-center rounded-full text-xs font-extrabold ${post.avatarStyle}`}>{post.initials}</div><div><p className="text-sm font-bold text-ink">{post.author}</p><p className="text-xs text-slate-500">{post.role} · {post.time}</p></div></div>
              <h1 className="mt-5 text-2xl font-black tracking-[-0.035em] text-ink sm:text-4xl">{post.title}</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{post.description}</p>
              <div className="mt-5"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Target audience</p><div className="mt-2 flex flex-wrap gap-2">{targetAudiences.map((audience) => <span key={audience} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">{audience}</span>)}</div></div>
              <div className="mt-4 flex flex-wrap gap-2">{post.hashtags.map((tag) => <span key={tag} className="text-xs font-bold text-brand">#{tag}</span>)}</div>
            </Card>
            {post.responseMethod === "native" ? (
              <NativeFormRenderer post={post} embedded submitted={Boolean(participation)} initialAnswers={participation?.answers} onSubmit={submitResponse} />
            ) : <ExternalFormPanel externalLink={post.externalLink} />}
          </div>
          <ResearchMetaPanel post={post} responseCount={responseCount} />
        </div>
      </main>
    </div>
  );
}
