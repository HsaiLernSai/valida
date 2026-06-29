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

  useEffect(() => {
    const allPosts = getAvailableResearchPosts(mockPosts);
    setItems(getParticipationHistory().map((record) => ({ record, post: allPosts.find((post) => post.id === record.postId) })));
  }, []);

  return (
    <section>
      <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">History</p><h1 className="mt-1 text-2xl font-black tracking-tight text-ink">Participated</h1><p className="mt-1 text-sm text-slate-500">Research you completed with this browser profile.</p></div>
      <div className="mt-5 space-y-3">
        {items.map(({ record, post }) => {
          const completedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(record.completedAt));
          return post ? (
            <a href={`/research/${post.id}`} key={record.postId} className="block">
              <Card className="flex items-center justify-between gap-4 p-4 transition hover:border-brand/25 hover:shadow-soft">
                <div className="min-w-0"><div className="flex items-center gap-2"><span className="text-xs font-extrabold text-brand-dark">✓ Completed</span><span className="text-[10px] text-slate-400">{post.goal}</span></div><h2 className="mt-1 truncate text-sm font-extrabold text-ink">{post.title}</h2><p className="mt-1 text-xs text-slate-500">{post.author}</p></div>
                <div className="shrink-0 text-right"><p className="text-[10px] font-semibold text-slate-400">Completed</p><p className="mt-0.5 text-xs font-bold text-slate-600">{completedDate}</p></div>
              </Card>
            </a>
          ) : (
            <Card key={record.postId} className="p-4"><p className="text-sm font-bold text-slate-500">Research unavailable</p><p className="mt-1 text-xs text-slate-400">Completed {completedDate}</p></Card>
          );
        })}
        {items.length === 0 && <Card className="p-8 text-center"><p className="text-sm font-bold text-ink">No completed research yet</p><p className="mt-1 text-xs text-slate-500">Your native form participation will appear here.</p><a href="/" className="mt-4 inline-block text-xs font-bold text-brand">Explore research</a></Card>}
      </div>
    </section>
  );
}
