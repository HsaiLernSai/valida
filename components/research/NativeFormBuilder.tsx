"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { NativeFormQuestion, NativeFormQuestionType } from "@/lib/types";

const questionTypes: { value: NativeFormQuestionType; label: string }[] = [
  { value: "short_text", label: "Short answer" },
  { value: "paragraph", label: "Paragraph" },
  { value: "multiple_choice", label: "Multiple choice" },
  { value: "checkbox", label: "Checkbox" },
];

const createQuestion = (type: NativeFormQuestionType): NativeFormQuestion => ({
  id: globalThis.crypto?.randomUUID?.() ?? `question-${Date.now()}`,
  type,
  label: "",
  required: false,
  options: type === "multiple_choice" || type === "checkbox" ? ["Option 1", "Option 2"] : undefined,
});

export function NativeFormBuilder({ questions, onChange }: { questions: NativeFormQuestion[]; onChange: (questions: NativeFormQuestion[]) => void }) {
  const [newQuestionType, setNewQuestionType] = useState<NativeFormQuestionType>("short_text");
  const updateQuestion = (id: string, updates: Partial<NativeFormQuestion>) => onChange(questions.map((question) => question.id === id ? { ...question, ...updates } : question));
  const changeType = (question: NativeFormQuestion, type: NativeFormQuestionType) => updateQuestion(question.id, {
    type,
    options: type === "multiple_choice" || type === "checkbox" ? question.options ?? ["Option 1", "Option 2"] : undefined,
  });

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div><h3 className="text-sm font-extrabold text-ink">Valida form questions</h3><p className="mt-0.5 text-[11px] text-slate-500">Responses stay inside this browser session for now.</p></div>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold text-brand-dark">{questions.length} questions</span>
      </div>

      <div className="mt-3 space-y-3">
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Question {questionIndex + 1}</span>
              <button type="button" onClick={() => onChange(questions.filter((item) => item.id !== question.id))} className="text-[11px] font-bold text-rose-500 hover:text-rose-700">Delete question</button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-[150px_1fr]">
              <select aria-label={`Question ${questionIndex + 1} type`} value={question.type} onChange={(event) => changeType(question, event.target.value as NativeFormQuestionType)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-brand/50">
                {questionTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>
              <input aria-label={`Question ${questionIndex + 1} text`} value={question.label} onChange={(event) => updateQuestion(question.id, { label: event.target.value })} placeholder="Write your question" className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-ink outline-none focus:border-brand/50" />
            </div>
            {(question.type === "multiple_choice" || question.type === "checkbox") && (
              <div className="mt-3 space-y-2 pl-2">
                {(question.options ?? []).map((option, optionIndex) => (
                  <div key={`${question.id}-${optionIndex}`} className="flex items-center gap-2">
                    <span className={`h-3 w-3 shrink-0 border border-slate-300 ${question.type === "multiple_choice" ? "rounded-full" : "rounded"}`} />
                    <input aria-label={`Question ${questionIndex + 1} option ${optionIndex + 1}`} value={option} onChange={(event) => updateQuestion(question.id, { options: (question.options ?? []).map((item, index) => index === optionIndex ? event.target.value : item) })} className="min-w-0 flex-1 border-b border-slate-200 bg-transparent px-1 py-1 text-xs outline-none focus:border-brand" />
                    {(question.options?.length ?? 0) > 2 && <button type="button" aria-label={`Remove option ${optionIndex + 1}`} onClick={() => updateQuestion(question.id, { options: question.options?.filter((_, index) => index !== optionIndex) })} className="text-sm text-slate-400 hover:text-rose-500">×</button>}
                  </div>
                ))}
                <button type="button" onClick={() => updateQuestion(question.id, { options: [...(question.options ?? []), `Option ${(question.options?.length ?? 0) + 1}`] })} className="text-[11px] font-bold text-brand hover:text-brand-dark">+ Add option</button>
              </div>
            )}
            <label className="mt-3 flex w-fit items-center gap-2 text-[11px] font-semibold text-slate-600">
              <input type="checkbox" checked={question.required} onChange={(event) => updateQuestion(question.id, { required: event.target.checked })} className="h-3.5 w-3.5 accent-blue-600" /> Required
            </label>
          </div>
        ))}
        {questions.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-xs text-slate-400">Add your first question to continue.</div>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <select aria-label="New question type" value={newQuestionType} onChange={(event) => setNewQuestionType(event.target.value as NativeFormQuestionType)} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-brand/50">
          {questionTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
        <Button type="button" onClick={() => onChange([...questions, createQuestion(newQuestionType)])} className="shrink-0 rounded-xl px-3.5 py-2.5 text-xs">Add question</Button>
      </div>
    </div>
  );
}
