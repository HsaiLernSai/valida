"use client";

import { useState } from "react";
import { suggestedAudiences } from "@/lib/research-defaults";
import type { ResearchStepProps } from "@/lib/types";

export function TargetAudienceStep({ data, updateData }: ResearchStepProps) {
  const [input, setInput] = useState("");
  const addAudience = (rawAudience: string) => {
    const audience = rawAudience.trim();
    if (audience && !data.targetAudience.some((item) => item.toLowerCase() === audience.toLowerCase())) {
      updateData({ targetAudience: [...data.targetAudience, audience] });
    }
    setInput("");
  };
  const removeAudience = (audience: string) => updateData({ targetAudience: data.targetAudience.filter((item) => item !== audience) });

  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Who should participate?</h2>
      <p className="mt-1 text-sm text-slate-500">Add one or more audience tags so the right people recognize themselves.</p>
      <div className="mt-5">
        <label htmlFor="audience-input" className="text-xs font-bold text-slate-700">Target audiences</label>
        <div className="mt-1.5 flex gap-2">
          <input id="audience-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); addAudience(input); } }} placeholder="Add an audience" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/5" />
          <button type="button" onClick={() => addAudience(input)} className="rounded-xl border border-slate-200 bg-surface px-4 text-xs font-bold text-ink transition hover:bg-surface">Add</button>
        </div>
        {data.targetAudience.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">{data.targetAudience.map((audience) => <button type="button" key={audience} onClick={() => removeAudience(audience)} aria-label={`Remove ${audience}`} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-dark">{audience} ×</button>)}</div>
        ) : <p className="mt-2 text-[10px] text-slate-400">Add at least one audience to continue.</p>}
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold text-slate-700">Suggestions</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestedAudiences.map((audience) => {
            const selected = data.targetAudience.includes(audience);
            return <button key={audience} type="button" onClick={() => selected ? removeAudience(audience) : addAudience(audience)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${selected ? "border-brand bg-brand-soft text-brand-dark" : "border-slate-200 bg-surface text-slate-600 hover:border-brand/30"}`}>{selected ? "✓ " : "+ "}{audience}</button>;
          })}
        </div>
      </div>
    </div>
  );
}
