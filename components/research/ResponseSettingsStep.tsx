import type { ResearchStepProps } from "@/lib/types";

export function ResponseSettingsStep({ data, updateData }: ResearchStepProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Response settings</h2>
      <p className="mt-1 text-sm text-slate-500">Set capacity and timing independently.</p>
      <fieldset className="mt-5">
        <legend className="text-xs font-bold text-slate-700">Response mode</legend>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          {([{"value":"limited","label":"Limited responses","detail":"Stop at a specific target."},{"value":"unlimited","label":"Unlimited responses","detail":"Keep accepting useful responses."}] as const).map((option) => (
            <button key={option.value} type="button" onClick={() => updateData({ responseMode: option.value })} className={`rounded-xl border p-3 text-left transition ${data.responseMode === option.value ? "border-brand bg-brand-soft" : "border-slate-200 bg-white"}`}><span className="text-sm font-bold text-ink">{option.label}</span><span className="mt-0.5 block text-xs text-slate-500">{option.detail}</span></button>
          ))}
        </div>
      </fieldset>
      {data.responseMode === "limited" && <label className="mt-4 block text-xs font-bold text-slate-700">Response target
        <input type="number" min={1} max={10000} value={data.responseTarget} onChange={(event) => updateData({ responseTarget: Number(event.target.value) })} className="mt-1.5 w-40 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/5" />
      </label>}
      <fieldset className="mt-6">
        <legend className="text-xs font-bold text-slate-700">Time mode</legend>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          {([{"value":"deadline","label":"Has deadline","detail":"Close on a chosen date."},{"value":"no_deadline","label":"No deadline","detail":"Keep the request open-ended."}] as const).map((option) => (
            <button key={option.value} type="button" onClick={() => updateData({ timeMode: option.value })} className={`rounded-xl border p-3 text-left transition ${data.timeMode === option.value ? "border-brand bg-brand-soft" : "border-slate-200 bg-white"}`}><span className="text-sm font-bold text-ink">{option.label}</span><span className="mt-0.5 block text-xs text-slate-500">{option.detail}</span></button>
          ))}
        </div>
      </fieldset>
      {data.timeMode === "deadline" && <label className="mt-4 block text-xs font-bold text-slate-700">Deadline
        <input type="date" value={data.deadline} onChange={(event) => updateData({ deadline: event.target.value })} className="mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/5" />
      </label>}
    </div>
  );
}
