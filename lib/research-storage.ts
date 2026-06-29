import { readStoredCollection, STORAGE_KEYS, writeStoredCollection } from "@/lib/browser-storage";
import type { NativeFormQuestion, ResearchPost } from "@/lib/types";

const researchGoals = new Set([
  "Collect Survey",
  "Find Interview Participants",
  "Prototype Test",
  "Validate Business Idea",
  "Design Feedback",
  "Open Discussion",
]);

const questionTypes = new Set([
  "short_text",
  "paragraph",
  "multiple_choice",
  "checkbox",
  "rating",
  "dropdown",
  "number",
  "email",
  "phone",
  "date",
  "time",
]);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNativeFormQuestion(value: unknown): value is NativeFormQuestion {
  if (typeof value !== "object" || value === null) return false;
  const question = value as Record<string, unknown>;

  return typeof question.id === "string"
    && typeof question.label === "string"
    && typeof question.required === "boolean"
    && typeof question.type === "string"
    && questionTypes.has(question.type)
    && (question.options === undefined || isStringArray(question.options));
}

export function isResearchPost(value: unknown): value is ResearchPost {
  if (typeof value !== "object" || value === null) return false;
  const post = value as Record<string, unknown>;

  return typeof post.id === "string"
    && typeof post.initials === "string"
    && typeof post.author === "string"
    && typeof post.role === "string"
    && typeof post.time === "string"
    && typeof post.goal === "string"
    && researchGoals.has(post.goal)
    && typeof post.goalStyle === "string"
    && typeof post.avatarStyle === "string"
    && typeof post.title === "string"
    && typeof post.description === "string"
    && (post.responseMethod === "external" || post.responseMethod === "native")
    && (post.externalLink === undefined || typeof post.externalLink === "string")
    && (post.formQuestions === undefined || (Array.isArray(post.formQuestions) && post.formQuestions.every(isNativeFormQuestion)))
    && isStringArray(post.hashtags)
    && typeof post.estimatedTime === "string"
    && isStringArray(post.targetAudience)
    && (post.responseMode === "limited" || post.responseMode === "unlimited")
    && (post.responseTarget === undefined || typeof post.responseTarget === "number")
    && typeof post.responseCount === "number"
    && (post.timeMode === "deadline" || post.timeMode === "no_deadline")
    && (post.deadline === undefined || typeof post.deadline === "string")
    && typeof post.interestedCount === "number"
    && typeof post.participantCount === "number"
    && typeof post.commentCount === "number"
    && typeof post.shareCount === "number";
}

export function getSessionResearchPosts(): ResearchPost[] {
  return readStoredCollection("session", STORAGE_KEYS.researchPosts, isResearchPost);
}

export function saveSessionResearchPosts(posts: ResearchPost[]): boolean {
  return writeStoredCollection("session", STORAGE_KEYS.researchPosts, posts);
}

export function addSessionResearchPost(post: ResearchPost): ResearchPost[] {
  const posts = [post, ...getSessionResearchPosts().filter((item) => item.id !== post.id)];
  saveSessionResearchPosts(posts);
  return posts;
}

export function mergeResearchPosts(sessionPosts: ResearchPost[], basePosts: ResearchPost[]): ResearchPost[] {
  return [...sessionPosts, ...basePosts.filter((post) => !sessionPosts.some((sessionPost) => sessionPost.id === post.id))];
}

export function getAvailableResearchPosts(basePosts: ResearchPost[]): ResearchPost[] {
  return mergeResearchPosts(getSessionResearchPosts(), basePosts);
}

export function findAvailableResearchPost(researchId: string, basePosts: ResearchPost[]): ResearchPost | undefined {
  return getAvailableResearchPosts(basePosts).find((post) => post.id === researchId);
}
