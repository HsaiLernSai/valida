import { suggestedAudiences } from "@/lib/research-defaults";
import type { ResearchStepProps } from "@/lib/types";

export function TargetAudienceStep({ data, updateData }: ResearchStepProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Who should participate?</h2>
      <p className="mt-1 text-sm text-slate-500">Be specific enough that the right people recognize themselves.</p>
      <label className="mt-5 block text-xs font-bold text-slate-700">Target audience
        <textarea rows={3} value={data.targetAudience} onChange={(event) => updateData({ targetAudience: event.target.value })} placeholder="Example: Product Managers, Startup Founders, UX Designers" className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/5" />
        <span className="mt-1 block text-[10px] font-normal text-slate-400">Separate multiple audiences with commas.</span>
      </label>
      <div className="mt-4">
        <p className="text-xs font-bold text-slate-700">Suggestions</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestedAudiences.map((audience) => (
            <button key={audience} type="button" onClick={() => updateData({ targetAudience: audience })} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${data.targetAudience === audience ? "border-brand bg-brand-soft text-brand-dark" : "border-slate-200 bg-surface text-slate-600 hover:border-brand/30"}`}>{audience}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
