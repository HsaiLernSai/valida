"use client";

import { useEffect, useMemo, useState } from "react";
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

interface QuestionFieldsProps {
  questions: NativeFormQuestion[];
  answers: NativeFormAnswers;
  questionErrors: Map<string, string>;
  setAnswers: (answers: NativeFormAnswers) => void;
  preview: boolean;
  submitted: boolean;
}

const emptyAnswers: NativeFormAnswers = {};

const questionTypeLabels: Record<NativeFormQuestion["type"], string> = {
  short_text: "Short answer",
  paragraph: "Long answer",
  multiple_choice: "Choose one",
  checkbox: "Choose all that apply",
  rating: "Rating",
  dropdown: "Dropdown",
  number: "Number",
  email: "Email address",
  phone: "Phone number",
  date: "Date",
  time: "Time",
};

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand/60 focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

function hasAnswer(answer: string | string[] | undefined) {
  return Array.isArray(answer) ? answer.length > 0 : Boolean(answer?.trim());
}

function isValidDateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function isValidTimeValue(value: string) {
  if (!/^\d{2}:\d{2}$/.test(value)) return false;
  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

function getQuestionError(question: NativeFormQuestion, answer: string | string[] | undefined): string | null {
  if (!hasAnswer(answer)) return question.required ? "This question is required." : null;
  if (Array.isArray(answer)) return null;
  if (typeof answer !== "string") return null;

  const value = answer.trim();
  if (question.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
  if (question.type === "number" && !Number.isFinite(Number(value))) return "Enter a valid number.";
  if (question.type === "rating" && !["1", "2", "3", "4", "5"].includes(value)) return "Choose a rating from 1 to 5.";
  if (question.type === "date" && !isValidDateValue(value)) return "Choose a valid date.";
  if (question.type === "time" && !isValidTimeValue(value)) return "Choose a valid time.";
  return null;
}

function ReadOnlyAnswer({ question, answer }: { question: NativeFormQuestion; answer: string | string[] | undefined }) {
  const values = Array.isArray(answer) ? answer : answer ? [answer] : [];

  if (values.length === 0) {
    return <p className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3.5 py-3 text-sm italic text-slate-400">No answer provided</p>;
  }

  return (
    <div className="mt-3 space-y-2">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 px-3.5 py-3 text-sm leading-6 text-slate-700">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[10px] font-black text-white">✓</span>
          <span className="min-w-0 whitespace-pre-wrap break-words">{question.type === "rating" ? `★ ${value} / 5` : value}</span>
        </div>
      ))}
    </div>
  );
}

function QuestionFields({ questions, answers, questionErrors, setAnswers, preview, submitted }: QuestionFieldsProps) {
  const updateCheckbox = (questionId: string, option: string, checked: boolean) => {
    const current = Array.isArray(answers[questionId]) ? answers[questionId] as string[] : [];
    setAnswers({ ...answers, [questionId]: checked ? [...current, option] : current.filter((item) => item !== option) });
  };

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {questions.map((question, index) => {
        const error = questionErrors.get(question.id);
        const invalid = Boolean(error);
        const answer = answers[question.id];
        const errorId = `${question.id}-error`;

        return (
          <fieldset
            key={question.id}
            id={`native-question-${question.id}`}
            tabIndex={invalid ? -1 : undefined}
            className={`min-w-0 rounded-2xl border bg-white p-4 shadow-[0_10px_28px_rgba(50,65,110,0.045)] transition sm:p-5 ${invalid ? "border-rose-300 ring-4 ring-rose-50" : "border-slate-200/90"}`}
            disabled={preview || submitted}
            aria-describedby={invalid ? errorId : undefined}
          >
            <legend className="sr-only">Question {index + 1}: {question.label || "Untitled question"}</legend>
            <div className="flex items-start gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black ${invalid ? "bg-rose-100 text-rose-700" : "bg-brand-soft text-brand-dark"}`}>{index + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">{questionTypeLabels[question.type]}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${question.required ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"}`}>{question.required ? "Required" : "Optional"}</span>
                </div>
                <p className="mt-1.5 break-words text-sm font-extrabold leading-6 text-ink sm:text-[15px]">{question.label || "Untitled question"}</p>
              </div>
            </div>

            {submitted ? (
              <ReadOnlyAnswer question={question} answer={answer} />
            ) : (
              <div className="mt-4">
                {question.type === "short_text" && (
                  <input
                    value={typeof answer === "string" ? answer : ""}
                    onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })}
                    placeholder="Type your answer"
                    aria-invalid={invalid}
                    className={inputClass}
                  />
                )}
                {question.type === "paragraph" && (
                  <textarea
                    rows={4}
                    value={typeof answer === "string" ? answer : ""}
                    onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })}
                    placeholder="Share your thoughts"
                    aria-invalid={invalid}
                    className={`${inputClass} min-h-28 resize-y`}
                  />
                )}
                {(question.type === "multiple_choice" || question.type === "checkbox") && (
                  <div className="space-y-2.5">
                    {(question.options ?? []).map((option, optionIndex) => {
                      const checked = question.type === "multiple_choice"
                        ? answer === option
                        : Array.isArray(answer) && answer.includes(option);

                      return (
                        <label key={`${question.id}-${optionIndex}`} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition ${checked ? "border-brand/40 bg-brand-soft text-brand-dark ring-2 ring-brand/10" : "border-slate-200 bg-white text-slate-600 hover:border-brand/25 hover:bg-slate-50"} ${preview ? "cursor-default" : ""}`}>
                          <input
                            type={question.type === "multiple_choice" ? "radio" : "checkbox"}
                            name={question.type === "multiple_choice" ? question.id : undefined}
                            value={option}
                            checked={checked}
                            onChange={(event) => question.type === "multiple_choice"
                              ? setAnswers({ ...answers, [question.id]: option })
                              : updateCheckbox(question.id, option, event.target.checked)}
                            className="h-4 w-4 shrink-0 accent-blue-600"
                          />
                          <span className="min-w-0 break-words leading-5">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
                {question.type === "rating" && (
                  <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={question.label}>
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const selected = answer === String(rating);
                      return (
                        <label key={rating} className={`flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-xl border text-xs font-extrabold transition ${selected ? "border-brand/40 bg-brand-gradient text-white shadow-sm ring-2 ring-brand/10" : "border-slate-200 bg-white text-slate-500 hover:border-brand/30 hover:bg-brand-soft"} ${preview ? "cursor-default" : ""}`}>
                          <input type="radio" name={question.id} value={rating} checked={selected} onChange={() => setAnswers({ ...answers, [question.id]: String(rating) })} className="peer sr-only" />
                          <span className="rounded-md text-base peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20" aria-hidden="true">★</span>
                          <span className="mt-0.5">{rating}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
                {question.type === "dropdown" && (
                  <select value={typeof answer === "string" ? answer : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} aria-invalid={invalid} className={`${inputClass} min-h-12 cursor-pointer`}>
                    <option value="">Select an option</option>
                    {(question.options ?? []).map((option, optionIndex) => <option key={`${question.id}-${optionIndex}`} value={option}>{option}</option>)}
                  </select>
                )}
                {question.type === "number" && (
                  <input type="number" step="any" inputMode="decimal" value={typeof answer === "string" ? answer : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} placeholder="Enter a number" aria-invalid={invalid} className={inputClass} />
                )}
                {question.type === "email" && (
                  <input type="email" inputMode="email" autoComplete="email" value={typeof answer === "string" ? answer : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} placeholder="name@example.com" aria-invalid={invalid} className={inputClass} />
                )}
                {question.type === "phone" && (
                  <input type="tel" inputMode="tel" autoComplete="tel" value={typeof answer === "string" ? answer : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} placeholder="Enter a phone number" aria-invalid={invalid} className={inputClass} />
                )}
                {question.type === "date" && (
                  <input type="date" value={typeof answer === "string" ? answer : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} aria-invalid={invalid} className={`${inputClass} min-h-12`} />
                )}
                {question.type === "time" && (
                  <input type="time" value={typeof answer === "string" ? answer : ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} aria-invalid={invalid} className={`${inputClass} min-h-12`} />
                )}
              </div>
            )}

            {invalid && <p id={errorId} className="mt-3 flex items-center gap-2 text-xs font-bold text-rose-600"><span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-rose-100 text-[10px]">!</span>{error}</p>}
          </fieldset>
        );
      })}
    </div>
  );
}

export function NativeFormRenderer({ post, preview = false, embedded = false, submitted = false, initialAnswers = emptyAnswers, onClose, onSubmit }: NativeFormRendererProps) {
  const [answers, setAnswers] = useState<NativeFormAnswers>(initialAnswers);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const questions = useMemo(() => post.formQuestions ?? [], [post.formQuestions]);

  useEffect(() => {
    if (submitted) setAnswers(initialAnswers);
  }, [initialAnswers, submitted]);

  const questionErrors = useMemo(() => new Map(
    questions.flatMap((question) => {
      const error = getQuestionError(question, answers[question.id]);
      return error ? [[question.id, error] as const] : [];
    }),
  ), [answers, questions]);

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (questionErrors.size === 0 && !submitted && questions.length > 0) {
      onSubmit?.(answers);
      return;
    }
    const firstInvalidQuestionId = questionErrors.keys().next().value;
    if (firstInvalidQuestionId) requestAnimationFrame(() => document.getElementById(`native-question-${firstInvalidQuestionId}`)?.focus());
  };

  const formContent = (
    <>
      <div className={`overflow-hidden rounded-2xl border ${submitted ? "border-blue-200 bg-blue-50/70" : "border-slate-200 bg-gradient-to-br from-white via-white to-blue-50/70"}`} role={submitted ? "status" : undefined}>
        <div className="relative px-4 py-5 sm:px-6 sm:py-6">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-violet-200/30 blur-3xl" aria-hidden="true" />
          <div className="relative flex items-start gap-3.5">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl shadow-sm ${submitted ? "bg-brand text-white" : "bg-brand-gradient text-white"}`} aria-hidden="true">
              {submitted ? <span className="text-lg font-black">✓</span> : <span className="text-sm font-black">V</span>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-dark">{submitted ? "Response complete" : "Valida native survey"}</p>
                {!submitted && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">Submitted in Valida</span>}
              </div>
              <h2 className="mt-1.5 break-words text-lg font-black tracking-[-0.025em] text-ink sm:text-xl">{submitted ? "Thank you for your response" : "Share your perspective"}</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">{submitted ? "Your answers are saved in this browser and shown below in read-only mode." : "Your feedback helps this researcher make a better-informed decision."}</p>
            </div>
          </div>
          <div className="relative mt-4 flex flex-wrap gap-2 border-t border-slate-200/70 pt-3">
            <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">About {post.estimatedTime}</span>
            <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">{questions.length} {questions.length === 1 ? "question" : "questions"}</span>
            <span className="rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">{questions.filter((question) => question.required).length} required</span>
          </div>
        </div>
      </div>

      {submitAttempted && questionErrors.size > 0 && (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5" role="alert">
          <p className="text-sm font-extrabold text-rose-700">Please review {questionErrors.size === 1 ? "the highlighted answer" : `${questionErrors.size} highlighted answers`}.</p>
          <p className="mt-0.5 text-xs text-rose-600">Required or invalid answers are marked below.</p>
        </div>
      )}

      <div className="mt-4">
        {questions.length > 0 ? (
          <QuestionFields
            questions={questions}
            answers={answers}
            questionErrors={submitAttempted ? questionErrors : new Map()}
            setAnswers={setAnswers}
            preview={preview}
            submitted={submitted}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-9 text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-lg text-slate-400">?</div>
            <p className="mt-3 text-sm font-extrabold text-ink">No questions yet</p>
            <p className="mt-1 text-xs text-slate-500">Questions added by the creator will appear here.</p>
          </div>
        )}
      </div>
    </>
  );

  if (preview) return <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">{formContent}</section>;

  const responseForm = (
    <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }} noValidate>
      {formContent}
      {!submitted && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
          <div>
            <p className="text-xs font-extrabold text-ink">Ready to send?</p>
            <p className="mt-0.5 text-[11px] leading-5 text-slate-500">Review your answers before submitting. You can participate once in this browser profile.</p>
          </div>
          <Button type="submit" disabled={questions.length === 0} className="mt-3 min-h-11 w-full rounded-xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40 sm:mt-0 sm:w-auto sm:shrink-0">Submit response</Button>
        </div>
      )}
    </form>
  );

  if (embedded) return <section aria-label="Valida native survey" className="rounded-card border border-slate-200/80 bg-slate-50/60 p-3 shadow-card sm:p-5">{responseForm}</section>;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="native-form-title">
      <div className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-canvas shadow-floating sm:max-h-[90vh] sm:rounded-3xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Research response</p><h2 id="native-form-title" className="mt-1 truncate text-base font-extrabold text-ink">{post.title}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close native form" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-ink focus:outline-none focus:ring-4 focus:ring-brand/10">×</button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">{responseForm}</div>
      </div>
    </div>
  );
}
