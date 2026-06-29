import type { ResearchStepProps } from "@/lib/types";
import { ResponseMethodStep } from "@/components/research/ResponseMethodStep";

const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/5";

export function BasicInfoStep({ data, updateData }: ResearchStepProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Basic information</h2>
      <p className="mt-1 text-sm text-slate-500">Give participants enough context to decide if they can help.</p>
      <div className="mt-5 space-y-4">
        <label className="block text-xs font-bold text-slate-700">Title
          <input required value={data.title} onChange={(event) => updateData({ title: event.target.value })} placeholder="What are you trying to validate?" className={fieldClass} />
        </label>
        <label className="block text-xs font-bold text-slate-700">Description
          <textarea required rows={4} value={data.description} onChange={(event) => updateData({ description: event.target.value })} placeholder="Explain the context, what you need, and what a useful response looks like." className={`${fieldClass} resize-none`} />
        </label>
        <label className="block max-w-40 text-xs font-bold text-slate-700">Estimated time
          <input value={data.estimatedTime} onChange={(event) => updateData({ estimatedTime: event.target.value })} placeholder="5 min" className={fieldClass} />
        </label>
        <ResponseMethodStep data={data} updateData={updateData} />
      </div>
    </div>
  );
}
