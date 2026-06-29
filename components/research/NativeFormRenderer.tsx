"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { NativeFormAnswers, NativeFormQuestion, ResearchPost } from "@/lib/types";

interface NativeFormRendererProps {
  post: ResearchPost;
  preview?: boolean;
  embedded?: boolean;
  submitted?: boolean;
  initialAnswers?: NativeFormAnswers;
  onClose?: () => void;
  onSubmit?: (answers: NativeFormAnswers) => void;
}

const emptyAnswers: NativeFormAnswers = {};

function QuestionFields({ questions, answers, setAnswers, disabled }: { questions: NativeFormQuestion[]; answers: NativeFormAnswers; setAnswers: (answers: NativeFormAnswers) => void; disabled: boolean }) {
  const updateCheckbox = (questionId: string, option: string, checked: boolean) => {
    const current = Array.isArray(answers[questionId]) ? answers[questionId] as string[] : [];
    setAnswers({ ...answers, [questionId]: checked ? [...current, option] : current.filter((item) => item !== option) });
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <fieldset key={question.id} className="rounded-xl border border-slate-200 bg-white p-3.5" disabled={disabled}>
          <legend className="px-1 text-xs font-bold text-ink">{index + 1}. {question.label || "Untitled question"}{question.required && <span className="ml-1 text-rose-500">*</span>}</legend>
          {question.type === "short_text" && <input value={typeof answers[question.id] === "string" ? answers[question.id] as string : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} placeholder="Your answer" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand/50 disabled:bg-slate-50" />}
          {question.type === "paragraph" && <textarea rows={3} value={typeof answers[question.id] === "string" ? answers[question.id] as string : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} placeholder="Your answer" className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand/50 disabled:bg-slate-50" />}
          {question.type === "multiple_choice" && <div className="mt-2 space-y-2">{(question.options ?? []).map((option) => <label key={option} className="flex items-center gap-2 text-xs text-slate-600"><input type="radio" name={question.id} value={option} checked={answers[question.id] === option} onChange={() => setAnswers({ ...answers, [question.id]: option })} className="accent-blue-600" />{option}</label>)}</div>}
          {question.type === "checkbox" && <div className="mt-2 space-y-2">{(question.options ?? []).map((option) => <label key={option} className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={Array.isArray(answers[question.id]) && (answers[question.id] as string[]).includes(option)} onChange={(event) => updateCheckbox(question.id, option, event.target.checked)} className="accent-blue-600" />{option}</label>)}</div>}
        </fieldset>
      ))}
    </div>
  );
}

export function NativeFormRenderer({ post, preview = false, embedded = false, submitted = false, initialAnswers = emptyAnswers, onClose, onSubmit }: NativeFormRendererProps) {
  const [answers, setAnswers] = useState<NativeFormAnswers>(initialAnswers);
  const questions = post.formQuestions ?? [];
  useEffect(() => { if (submitted) setAnswers(initialAnswers); }, [initialAnswers, submitted]);
  const canSubmit = questions.every((question) => {
    if (!question.required) return true;
    const answer = answers[question.id];
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer?.trim());
  });

  const formContent = (
    <>
      {questions.length > 0 ? <QuestionFields questions={questions} answers={answers} setAnswers={setAnswers} disabled={preview || submitted} /> : <p className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-xs text-slate-400">No questions added yet.</p>}
      {submitted && <div className="mt-4 rounded-xl border border-blue-200 bg-brand-soft px-4 py-3 text-sm font-bold text-brand-dark" role="status">Response submitted</div>}
    </>
  );

  if (preview) return <div className="mt-4">{formContent}</div>;

  const responseForm = (
    <form onSubmit={(event) => { event.preventDefault(); if (canSubmit && !submitted) onSubmit?.(answers); }}>
      {formContent}
      <div className="mt-5 flex justify-end">
        <Button type="submit" disabled={!canSubmit || submitted || questions.length === 0} className="rounded-xl px-5 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40">{submitted ? "Response submitted" : "Submit response"}</Button>
      </div>
    </form>
  );

  if (embedded) return responseForm;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="native-form-title">
      <div className="flex max-h-[94vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-canvas shadow-floating sm:max-h-[88vh] sm:rounded-3xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Valida Native Form</p><h2 id="native-form-title" className="mt-1 text-lg font-extrabold text-ink">{post.title}</h2><p className="mt-1 text-xs text-slate-500">{post.estimatedTime} · {questions.length} questions</p></div>
          <button type="button" onClick={onClose} aria-label="Close native form" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl text-slate-400 hover:bg-slate-100 hover:text-ink">×</button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{responseForm}</div>
      </div>
    </div>
  );
}
