import { NativeFormBuilder } from "@/components/research/NativeFormBuilder";
import type { ResearchStepProps } from "@/lib/types";

export function ResponseMethodStep({ data, updateData }: ResearchStepProps) {
  return (
    <section className="border-t border-slate-200 pt-4">
      <h3 className="text-sm font-extrabold text-ink">How will people respond?</h3>
      <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
        <button type="button" onClick={() => updateData({ responseMethod: "external" })} className={`rounded-xl border p-3 text-left transition ${data.responseMethod === "external" ? "border-brand bg-brand-soft ring-2 ring-brand/10" : "border-slate-200 bg-surface hover:border-brand/30"}`}>
          <span className="text-sm font-bold text-ink">External Form Link</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">Use an existing form or prototype URL.</span>
        </button>
        <button type="button" onClick={() => updateData({ responseMethod: "native" })} className={`rounded-xl border p-3 text-left transition ${data.responseMethod === "native" ? "border-brand bg-brand-soft ring-2 ring-brand/10" : "border-slate-200 bg-surface hover:border-brand/30"}`}>
          <span className="text-sm font-bold text-ink">Valida Native Form</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">Build a simple form directly in Valida.</span>
        </button>
      </div>
      {data.responseMethod === "external" ? (
        <label className="mt-4 block text-xs font-bold text-slate-700">Google Forms, Microsoft Forms, Typeform, or other link
          <input type="url" value={data.externalLink} onChange={(event) => updateData({ externalLink: event.target.value })} placeholder="https://" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/5" />
          <span className="mt-1.5 block text-[10px] font-normal text-slate-400">External submissions are not verified in this MVP.</span>
        </label>
      ) : (
        <NativeFormBuilder questions={data.formQuestions} onChange={(formQuestions) => updateData({ formQuestions })} />
      )}
    </section>
  );
}
