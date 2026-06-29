"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BasicInfoStep } from "@/components/research/BasicInfoStep";
import { HashtagsStep } from "@/components/research/HashtagsStep";
import { PreviewPublishStep } from "@/components/research/PreviewPublishStep";
import { ResearchGoalStep } from "@/components/research/ResearchGoalStep";
import { ResponseSettingsStep } from "@/components/research/ResponseSettingsStep";
import { TargetAudienceStep } from "@/components/research/TargetAudienceStep";
import { Button } from "@/components/ui/Button";
import { initialResearchData } from "@/lib/research-defaults";
import type { ResearchPost, ResearchWizardData } from "@/lib/types";

const steps = ["Goal", "Basics", "Audience", "Settings", "Hashtags", "Preview"];

interface CreateResearchWizardProps {
  onClose: () => void;
  onPublish: (post: ResearchPost) => void;
}

function isValidExternalLink(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function CreateResearchWizard({ onClose, onPublish }: CreateResearchWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ResearchWizardData>({ ...initialResearchData, hashtags: [], formQuestions: [] });
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const updateData = (updates: Partial<ResearchWizardData>) => setData((current) => ({ ...current, ...updates }));

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      )).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  const post = useMemo<ResearchPost>(() => ({
    id: `local-${Date.now()}`,
    initials: "YU",
    author: "You",
    role: "Research creator",
    time: "Just now",
    goal: data.goal ?? "Open Discussion",
    goalStyle: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    avatarStyle: "bg-gradient-to-br from-blue-200 to-violet-300 text-indigo-900",
    title: data.title || "Your research title",
    description: data.description || "Your research description will appear here.",
    responseMethod: data.responseMethod,
    externalLink: data.responseMethod === "external" ? data.externalLink || undefined : undefined,
    formQuestions: data.responseMethod === "native" ? data.formQuestions : undefined,
    hashtags: data.hashtags,
    estimatedTime: data.estimatedTime || "5 min",
    targetAudience: data.targetAudience.length > 0 ? data.targetAudience : ["Community members"],
    responseMode: data.responseMode,
    responseTarget: data.responseMode === "limited" ? data.responseTarget : undefined,
    responseCount: 0,
    timeMode: data.timeMode,
    deadline: data.timeMode === "deadline" ? data.deadline : undefined,
    interestedCount: 0,
    participantCount: 0,
    commentCount: 0,
    shareCount: 0,
  }), [data]);

  const nativeFormIsValid = data.formQuestions.length > 0 && data.formQuestions.every((question) => {
    const usesOptions = question.type === "multiple_choice" || question.type === "checkbox" || question.type === "dropdown";
    const normalizedOptions = (question.options ?? []).map((option) => option.trim().toLocaleLowerCase());
    const optionsAreUnique = new Set(normalizedOptions).size === normalizedOptions.length;
    return Boolean(question.label.trim()) && (!usesOptions || (
      (question.options?.length ?? 0) >= 2 && question.options?.every((option) => option.trim()) && optionsAreUnique
    ));
  });
  const responseMethodIsValid = data.responseMethod === "external" ? isValidExternalLink(data.externalLink) : nativeFormIsValid;
  const canContinue = [
    Boolean(data.goal),
    Boolean(data.title.trim() && data.description.trim() && data.estimatedTime.trim() && responseMethodIsValid),
    data.targetAudience.length > 0,
    data.responseMode === "unlimited" || data.responseTarget > 0 ? data.timeMode === "no_deadline" || Boolean(data.deadline) : false,
    true,
    true,
  ][step];
  const stepGuidance = [
    "Choose the research goal that best matches what you need to learn.",
    data.responseMethod === "native" ? "Complete the details and add at least one valid native survey question." : "Complete the details and provide a valid external form link.",
    "Add at least one target audience.",
    "Complete the response target and timing settings.",
    "Hashtags are optional. Continue when you are ready.",
    "Review the request and publish it to your current browser session.",
  ][step];

  const stepContent = [
    <ResearchGoalStep key="goal" data={data} updateData={updateData} />,
    <BasicInfoStep key="basic" data={data} updateData={updateData} />,
    <TargetAudienceStep key="audience" data={data} updateData={updateData} />,
    <ResponseSettingsStep key="settings" data={data} updateData={updateData} />,
    <HashtagsStep key="hashtags" data={data} updateData={updateData} />,
    <PreviewPublishStep key="preview" post={post} />,
  ][step];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div ref={dialogRef} className="flex max-h-[97dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/60 bg-canvas shadow-floating sm:max-h-[92vh] sm:rounded-3xl" role="dialog" aria-modal="true" aria-labelledby="wizard-title" aria-describedby="wizard-description">
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">Create research</p><h1 id="wizard-title" className="mt-1 truncate text-lg font-black tracking-tight text-ink">{steps[step]}</h1><p id="wizard-description" className="mt-1 text-xs text-slate-500">Step {step + 1} of {steps.length}</p></div>
            <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close create research wizard" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">×</button>
          </div>
          <ol className="mt-4 grid grid-cols-6 gap-1.5" aria-label="Research creation progress">
            {steps.map((label, index) => (
              <li key={label} aria-current={index === step ? "step" : undefined} className="min-w-0">
                <div className={`h-1.5 rounded-full transition ${index <= step ? "bg-brand-gradient" : "bg-slate-200"}`} aria-hidden="true" />
                <span className={`mt-1.5 hidden truncate text-[9px] font-bold sm:block ${index === step ? "text-brand-dark" : index < step ? "text-slate-500" : "text-slate-300"}`}>{label}</span>
                <span className="sr-only">Step {index + 1}: {label}{index < step ? ", completed" : index === step ? ", current" : ""}</span>
              </li>
            ))}
          </ol>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7">{stepContent}</div>
        <footer className="safe-area-footer border-t border-slate-200 bg-white px-4 pt-3.5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
          <Button variant="secondary" onClick={() => step === 0 ? onClose() : setStep((current) => current - 1)} className="min-h-11 rounded-xl px-4 py-2.5 text-xs">{step === 0 ? "Cancel" : "Back"}</Button>
          {step < steps.length - 1 ? (
            <Button disabled={!canContinue} onClick={() => setStep((current) => current + 1)} aria-describedby="step-guidance" className="min-h-11 rounded-xl px-5 py-2.5 text-xs">Continue</Button>
          ) : (
            <Button onClick={() => onPublish(post)} className="min-h-11 rounded-xl px-5 py-2.5 text-xs">Publish Research</Button>
          )}
          </div>
          <p id="step-guidance" className={`mt-2 text-center text-[10px] leading-4 sm:text-right ${canContinue ? "text-slate-400" : "font-bold text-amber-700"}`} aria-live="polite">{stepGuidance}</p>
        </footer>
      </div>
    </div>
  );
}
