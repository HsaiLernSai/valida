import type { NativeFormAnswers, ParticipationRecord } from "@/lib/types";

const PARTICIPATION_KEY = "valida:participation-history";

export function getParticipationHistory(): ParticipationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(PARTICIPATION_KEY) ?? "[]") as ParticipationRecord[];
  } catch {
    return [];
  }
}

export function getParticipation(postId: string): ParticipationRecord | undefined {
  return getParticipationHistory().find((record) => record.postId === postId);
}

export function saveParticipation(postId: string, answers: NativeFormAnswers): ParticipationRecord {
  const existing = getParticipation(postId);
  if (existing) return existing;

  const record: ParticipationRecord = {
    postId,
    answers,
    completedAt: new Date().toISOString(),
  };
  localStorage.setItem(PARTICIPATION_KEY, JSON.stringify([record, ...getParticipationHistory()]));
  return record;
}
