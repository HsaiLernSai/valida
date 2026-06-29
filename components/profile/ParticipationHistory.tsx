"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { posts as mockPosts } from "@/lib/mock-data";
import { getParticipationHistory } from "@/lib/participation-storage";
import { getAvailableResearchPosts } from "@/lib/research-storage";
import type { ParticipationRecord, ResearchPost } from "@/lib/types";

interface HistoryItem {
  record: ParticipationRecord;
  post?: ResearchPost;
}

export function ParticipationHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const allPosts = getAvailableResearchPosts(mockPosts);
    setItems(getParticipationHistory().map((record) => ({ record, post: allPosts.find((post) => post.id === record.postId) })));
    setLoaded(true);
  }, []);

  return (
    <section id="participated" className="scroll-mt-24">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">History</p><h1 className="mt-1 text-2xl font-black tracking-tight text-ink">Participated</h1><p className="mt-1 text-sm text-slate-500">Research you completed with this browser profile.</p></div>
      <div className="mt-5 space-y-3">
        {!loaded && [0, 1, 2].map((item) => <div key={item} className="h-24 animate-pulse rounded-card border border-slate-200 bg-surface/70" aria-hidden="true" />)}
        {!loaded && <p className="sr-only" role="status">Loading participation history</p>}
        {loaded && items.map(({ record, post }) => {
          const completedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(record.completedAt));
          return post ? (
            <a href={`/research/${post.id}`} key={record.postId} className="block">
              <Card className="flex items-center justify-between gap-4 p-4 transition hover:border-brand/25 hover:shadow-soft">
                <div className="min-w-0"><div className="flex items-center gap-2"><span className="text-xs font-extrabold text-brand-dark">✓ Completed</span><span className="text-[10px] text-slate-400">{post.goal}</span></div><h2 className="mt-1 truncate text-sm font-extrabold text-ink">{post.title}</h2><p className="mt-1 text-xs text-slate-500">{post.author}</p></div>
                <div className="shrink-0 text-right"><p className="text-[10px] font-semibold text-slate-400">Completed</p><p className="mt-0.5 text-xs font-bold text-slate-600">{completedDate}</p></div>
              </Card>
            </a>
          ) : (
            <Card key={record.postId} className="p-4"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-extrabold text-brand-dark">✓ Completed</span>{record.postSnapshot && <span className="text-[10px] text-slate-400">{record.postSnapshot.goal}</span>}</div><p className="mt-1 text-sm font-bold text-slate-600">{record.postSnapshot?.title ?? "Research from an expired browser session"}</p>{record.postSnapshot?.author && <p className="mt-1 text-xs text-slate-500">{record.postSnapshot.author}</p>}<p className="mt-2 text-xs text-slate-400">Completed {completedDate} · The original request is no longer available in this tab session.</p></Card>
          );
        })}
        {loaded && items.length === 0 && <Card className="p-8 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">✓</div><p className="mt-3 text-sm font-bold text-ink">No completed research yet</p><p className="mt-1 text-xs leading-5 text-slate-500">Your native form participation will appear here.</p><a href="/" className="mt-4 inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-bold text-brand transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">Explore research</a></Card>}
      </div>
    </section>
  );
}
