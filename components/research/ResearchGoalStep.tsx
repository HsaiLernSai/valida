import { researchGoals } from "@/lib/research-defaults";
import type { ResearchStepProps } from "@/lib/types";

export function ResearchGoalStep({ data, updateData }: ResearchStepProps) {
  return (
    <div>
      <h2 className="text-xl font-extrabold tracking-tight text-ink">What do you want to learn?</h2>
      <p className="mt-1 text-sm text-slate-500">Choose the research goal that best matches your request.</p>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {researchGoals.map((goal) => {
          const selected = data.goal === goal.value;
          return (
            <button key={goal.value} type="button" onClick={() => updateData({ goal: goal.value })} className={`rounded-xl border p-3.5 text-left transition ${selected ? "border-brand bg-brand-soft ring-2 ring-brand/10" : "border-slate-200 bg-surface hover:border-brand/30 hover:bg-surface"}`}>
              <span className={`text-sm font-bold ${selected ? "text-brand-dark" : "text-ink"}`}>{goal.value}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">{goal.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
