import { readStoredCollection, STORAGE_KEYS, writeStoredCollection } from "@/lib/browser-storage";
import type { NativeFormAnswers, ParticipationRecord, ResearchPost } from "@/lib/types";

function isNativeFormAnswers(value: unknown): value is NativeFormAnswers {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;

  return Object.values(value).every(
    (answer) => typeof answer === "string" || (Array.isArray(answer) && answer.every((item) => typeof item === "string")),
  );
}

export function isParticipationRecord(value: unknown): value is ParticipationRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;

  const snapshot = record.postSnapshot;
  const validSnapshot = snapshot === undefined || (
    typeof snapshot === "object" && snapshot !== null
    && typeof (snapshot as Record<string, unknown>).title === "string"
    && typeof (snapshot as Record<string, unknown>).author === "string"
    && typeof (snapshot as Record<string, unknown>).goal === "string"
  );

  return typeof record.postId === "string"
    && typeof record.completedAt === "string"
    && !Number.isNaN(Date.parse(record.completedAt))
    && isNativeFormAnswers(record.answers)
    && validSnapshot;
}

export function getParticipationHistory(): ParticipationRecord[] {
  return readStoredCollection("local", STORAGE_KEYS.participationHistory, isParticipationRecord);
}

export function getParticipation(postId: string, history = getParticipationHistory()): ParticipationRecord | undefined {
  return history.find((record) => record.postId === postId);
}

export function getCompletedPostIds(history = getParticipationHistory()): Set<string> {
  return new Set(history.map((record) => record.postId));
}

export function hasCompletedResearch(postId: string, history = getParticipationHistory()): boolean {
  return getCompletedPostIds(history).has(postId);
}

export function getLocalResponseCount(post: ResearchPost, history = getParticipationHistory()): number {
  return post.responseCount + (hasCompletedResearch(post.id, history) ? 1 : 0);
}

export function saveParticipation(postId: string, answers: NativeFormAnswers, post?: ResearchPost): ParticipationRecord {
  const history = getParticipationHistory();
  const existing = getParticipation(postId, history);
  if (existing) return existing;

  const record: ParticipationRecord = {
    postId,
    answers,
    completedAt: new Date().toISOString(),
    postSnapshot: post ? { title: post.title, author: post.author, goal: post.goal } : undefined,
  };
  writeStoredCollection("local", STORAGE_KEYS.participationHistory, [record, ...history]);
  return record;
}
