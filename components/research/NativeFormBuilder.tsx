"use client";

import { Button } from "@/components/ui/Button";
import type { NativeFormQuestion, NativeFormQuestionType } from "@/lib/types";

const questionTypes: { value: NativeFormQuestionType; label: string; description: string; symbol: string }[] = [
  { value: "short_text", label: "Short answer", description: "A single-line response", symbol: "Aa" },
  { value: "paragraph", label: "Paragraph", description: "A detailed written response", symbol: "¶" },
  { value: "multiple_choice", label: "Multiple choice", description: "Select one option", symbol: "◉" },
  { value: "checkbox", label: "Checkboxes", description: "Select multiple options", symbol: "☑" },
];

const questionTypeLabels = Object.fromEntries(questionTypes.map((type) => [type.value, type.label])) as Record<NativeFormQuestionType, string>;

const createQuestion = (type: NativeFormQuestionType): NativeFormQuestion => ({
  id: globalThis.crypto?.randomUUID?.() ?? `question-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type,
  label: "",
  required: false,
  options: type === "multiple_choice" || type === "checkbox" ? ["Option 1", "Option 2"] : undefined,
});

const fieldClass = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand/60 focus:ring-4 focus:ring-brand/10";

export function NativeFormBuilder({ questions, onChange }: { questions: NativeFormQuestion[]; onChange: (questions: NativeFormQuestion[]) => void }) {
  const updateQuestion = (id: string, updates: Partial<NativeFormQuestion>) => onChange(questions.map((question) => question.id === id ? { ...question, ...updates } : question));
  const changeType = (question: NativeFormQuestion, type: NativeFormQuestionType) => updateQuestion(question.id, {
    type,
    options: type === "multiple_choice" || type === "checkbox" ? question.options ?? ["Option 1", "Option 2"] : undefined,
  });
  const addQuestion = (type: NativeFormQuestionType) => onChange([...questions, createQuestion(type)]);

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 shadow-[0_12px_34px_rgba(50,65,110,0.05)]">
      <div className="border-b border-slate-200 bg-gradient-to-br from-white via-white to-blue-50/70 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-sm font-black text-white shadow-sm">V</div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand">Native survey builder</p>
              <h3 className="mt-0.5 text-base font-black tracking-tight text-ink">Create your questions</h3>
              <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500">Keep questions focused and easy to answer. Responses are stored locally in this frontend prototype.</p>
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold text-brand-dark ring-1 ring-blue-100">{questions.length} {questions.length === 1 ? "question" : "questions"}</span>
        </div>
      </div>

      <div className="space-y-3.5 p-3 sm:p-4">
        {questions.map((question, questionIndex) => {
          const needsPrompt = !question.label.trim();
          const choiceQuestion = question.type === "multiple_choice" || question.type === "checkbox";
          const hasInvalidOption = choiceQuestion && (question.options?.some((option) => !option.trim()) ?? true);

          return (
            <section key={question.id} aria-labelledby={`${question.id}-heading`} className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${needsPrompt || hasInvalidOption ? "border-amber-200" : "border-slate-200"}`}>
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-3.5 py-3 sm:px-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-[11px] font-black text-brand-dark">{questionIndex + 1}</span>
                  <div className="min-w-0">
                    <p id={`${question.id}-heading`} className="truncate text-xs font-extrabold text-ink">Question {questionIndex + 1}</p>
                    <p className="mt-0.5 text-[10px] font-semibold text-slate-400">{questionTypeLabels[question.type]} · {question.required ? "Required" : "Optional"}</p>
                  </div>
                </div>
                <button type="button" onClick={() => onChange(questions.filter((item) => item.id !== question.id))} className="min-h-9 shrink-0 rounded-lg px-2.5 text-[11px] font-bold text-rose-500 transition hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100">Delete</button>
              </div>

              <div className="space-y-4 p-3.5 sm:p-4">
                <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
                  <label className="block text-[11px] font-bold text-slate-600">Question type
                    <select aria-label={`Question ${questionIndex + 1} type`} value={question.type} onChange={(event) => changeType(question, event.target.value as NativeFormQuestionType)} className={`${fieldClass} mt-1.5 min-h-11 cursor-pointer py-2.5 text-xs font-bold`}>
                      {questionTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                    </select>
                  </label>
                  <label className="block text-[11px] font-bold text-slate-600">Question prompt
                    <input aria-label={`Question ${questionIndex + 1} text`} value={question.label} onChange={(event) => updateQuestion(question.id, { label: event.target.value })} placeholder="What would you like to ask?" aria-invalid={needsPrompt} className={`${fieldClass} mt-1.5 min-h-11 ${needsPrompt ? "border-amber-300 focus:border-amber-400 focus:ring-amber-100" : ""}`} />
                    {needsPrompt && <span className="mt-1.5 block text-[10px] font-bold text-amber-700">Add a question before continuing.</span>}
                  </label>
                </div>

                {choiceQuestion && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div><p className="text-[11px] font-extrabold text-slate-700">Answer options</p><p className="mt-0.5 text-[10px] text-slate-400">Participants will see these in this order.</p></div>
                      <span className="text-[10px] font-bold text-slate-400">{question.options?.length ?? 0} options</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {(question.options ?? []).map((option, optionIndex) => {
                        const optionInvalid = !option.trim();
                        return (
                          <div key={`${question.id}-${optionIndex}`} className="flex items-center gap-2">
                            <span className={`grid h-8 w-8 shrink-0 place-items-center border bg-white text-[10px] font-bold text-slate-400 ${question.type === "multiple_choice" ? "rounded-full" : "rounded-lg"}`}>{optionIndex + 1}</span>
                            <input aria-label={`Question ${questionIndex + 1} option ${optionIndex + 1}`} value={option} onChange={(event) => updateQuestion(question.id, { options: (question.options ?? []).map((item, index) => index === optionIndex ? event.target.value : item) })} placeholder={`Option ${optionIndex + 1}`} aria-invalid={optionInvalid} className={`min-h-10 min-w-0 flex-1 rounded-lg border bg-white px-3 text-xs text-ink outline-none transition focus:ring-4 ${optionInvalid ? "border-amber-300 focus:border-amber-400 focus:ring-amber-100" : "border-slate-200 focus:border-brand/50 focus:ring-brand/10"}`} />
                            <button type="button" aria-label={`Remove option ${optionIndex + 1}`} disabled={(question.options?.length ?? 0) <= 2} onClick={() => updateQuestion(question.id, { options: question.options?.filter((_, index) => index !== optionIndex) })} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-25">×</button>
                          </div>
                        );
                      })}
                    </div>
                    {hasInvalidOption && <p className="mt-2 text-[10px] font-bold text-amber-700">Every option needs a label.</p>}
                    <button type="button" onClick={() => updateQuestion(question.id, { options: [...(question.options ?? []), `Option ${(question.options?.length ?? 0) + 1}`] })} className="mt-3 min-h-10 rounded-lg border border-dashed border-brand/30 bg-white px-3 text-[11px] font-extrabold text-brand transition hover:border-brand/50 hover:bg-brand-soft focus:outline-none focus:ring-4 focus:ring-brand/10">+ Add option</button>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <p className="text-[10px] leading-4 text-slate-400">Required questions must be answered before submission.</p>
                  <label className="flex min-h-10 cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-extrabold text-slate-600 transition hover:border-brand/25">
                    <input type="checkbox" checked={question.required} onChange={(event) => updateQuestion(question.id, { required: event.target.checked })} className="peer sr-only" />
                    <span aria-hidden="true" className="relative h-5 w-9 rounded-full bg-slate-200 transition peer-checked:bg-brand after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition peer-checked:after:translate-x-4" />
                    Required
                  </label>
                </div>
              </div>
            </section>
          );
        })}

        {questions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-9 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-base font-black text-brand-dark">Aa</div>
            <h4 className="mt-3 text-sm font-black text-ink">Start with your first question</h4>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">Choose a format below. You can mix question types to collect focused, useful feedback.</p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 bg-white px-3.5 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-extrabold text-ink">Add a question</p><p className="mt-0.5 text-[10px] text-slate-400">Choose the answer format participants will use.</p></div><span className="hidden text-[10px] font-bold text-slate-400 sm:inline">4 available types</span></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {questionTypes.map((type) => (
            <Button key={type.value} type="button" variant="secondary" onClick={() => addQuestion(type.value)} className="min-h-14 justify-start gap-3 rounded-xl px-3 py-2.5 text-left">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-xs font-black text-brand-dark">{type.symbol}</span>
              <span className="min-w-0"><span className="block text-xs font-extrabold text-ink">{type.label}</span><span className="mt-0.5 block text-[10px] font-medium text-slate-400">{type.description}</span></span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
