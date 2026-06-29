"use client";

import { useEffect, useMemo, useState } from "react";
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

export function CreateResearchWizard({ onClose, onPublish }: CreateResearchWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ResearchWizardData>({ ...initialResearchData, hashtags: [], formQuestions: [] });
  const updateData = (updates: Partial<ResearchWizardData>) => setData((current) => ({ ...current, ...updates }));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [onClose]);

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

  const nativeFormIsValid = data.formQuestions.length > 0 && data.formQuestions.every((question) =>
    question.label.trim() && (
      question.type === "short_text" ||
      question.type === "paragraph" ||
      ((question.options?.length ?? 0) >= 2 && question.options?.every((option) => option.trim()))
    ),
  );
  const responseMethodIsValid = data.responseMethod === "external" ? Boolean(data.externalLink.trim()) : nativeFormIsValid;
  const canContinue = [
    Boolean(data.goal),
    Boolean(data.title.trim() && data.description.trim() && data.estimatedTime.trim() && responseMethodIsValid),
    data.targetAudience.length > 0,
    data.responseMode === "unlimited" || data.responseTarget > 0 ? data.timeMode === "no_deadline" || Boolean(data.deadline) : false,
    true,
    true,
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="wizard-title">
      <div className="flex max-h-[96vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/60 bg-canvas shadow-floating sm:max-h-[90vh] sm:rounded-3xl">
        <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand">Create research</p><h1 id="wizard-title" className="mt-0.5 text-base font-extrabold text-ink">Step {step + 1} of {steps.length}: {steps[step]}</h1></div>
            <button type="button" onClick={onClose} aria-label="Close create research wizard" className="grid h-9 w-9 place-items-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-ink">×</button>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1" aria-hidden="true">{steps.map((label, index) => <span key={label} className={`h-1 rounded-full ${index <= step ? "bg-brand-gradient" : "bg-slate-200"}`} />)}</div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">{stepContent}</div>
        <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3.5 sm:px-6">
          <Button variant="secondary" onClick={() => step === 0 ? onClose() : setStep((current) => current - 1)} className="rounded-xl px-4 py-2.5 text-xs">{step === 0 ? "Cancel" : "Back"}</Button>
          {step < steps.length - 1 ? (
            <Button disabled={!canContinue} onClick={() => setStep((current) => current + 1)} className="rounded-xl px-5 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40">Continue</Button>
          ) : (
            <Button onClick={() => onPublish(post)} className="rounded-xl px-5 py-2.5 text-xs">Publish Research</Button>
          )}
        </footer>
      </div>
    </div>
  );
}
