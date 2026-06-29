"use client";

import { useState } from "react";
import { suggestedHashtags } from "@/lib/research-defaults";
import type { ResearchStepProps } from "@/lib/types";

export function HashtagsStep({ data, updateData }: ResearchStepProps) {
  const [input, setInput] = useState("");
  const addHashtag = (rawTag: string) => {
    const tag = rawTag.trim().replace(/^#/, "").replace(/\s+/g, "");
    if (tag && !data.hashtags.includes(tag) && data.hashtags.length < 8) updateData({ hashtags: [...data.hashtags, tag] });
    setInput("");
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Add hashtags</h2>
      <p className="mt-1 text-sm text-slate-500">Help relevant participants discover your request. Add up to eight.</p>
      <div className="mt-5 flex gap-2">
        <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addHashtag(input); } }} placeholder="#YourTopic" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/5" />
        <button type="button" onClick={() => addHashtag(input)} className="rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-ink hover:bg-slate-50">Add</button>
      </div>
      {data.hashtags.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{data.hashtags.map((tag) => <button type="button" key={tag} onClick={() => updateData({ hashtags: data.hashtags.filter((item) => item !== tag) })} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-dark">#{tag} ×</button>)}</div>}
      <div className="mt-5">
        <p className="text-xs font-bold text-slate-700">Suggestions</p>
        <div className="mt-2 flex flex-wrap gap-2">{suggestedHashtags.map((tag) => <button type="button" key={tag} onClick={() => addHashtag(tag)} disabled={data.hashtags.includes(tag)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand/30 disabled:opacity-40">#{tag}</button>)}</div>
      </div>
    </div>
  );
}
