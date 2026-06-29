import { readStoredCollection, STORAGE_KEYS, writeStoredCollection } from "@/lib/browser-storage";
import type { CommunityComment, CommunityEngagement } from "@/lib/types";

function isCommunityComment(value: unknown): value is CommunityComment {
  if (typeof value !== "object" || value === null) return false;
  const comment = value as Record<string, unknown>;
  return typeof comment.id === "string"
    && typeof comment.author === "string"
    && typeof comment.initials === "string"
    && typeof comment.message === "string"
    && typeof comment.createdAt === "string"
    && !Number.isNaN(Date.parse(comment.createdAt));
}

function isCommunityEngagement(value: unknown): value is CommunityEngagement {
  if (typeof value !== "object" || value === null) return false;
  const engagement = value as Record<string, unknown>;
  return typeof engagement.postId === "string"
    && typeof engagement.interested === "boolean"
    && typeof engagement.commentCount === "number"
    && engagement.commentCount >= 0
    && typeof engagement.shareCount === "number"
    && engagement.shareCount >= 0
    && (engagement.comments === undefined || (Array.isArray(engagement.comments) && engagement.comments.every(isCommunityComment)));
}

export function getCommunityEngagements(): CommunityEngagement[] {
  return readStoredCollection("local", STORAGE_KEYS.communityEngagements, isCommunityEngagement).map((engagement) => ({
    ...engagement,
    comments: engagement.comments ?? [],
  }));
}

export function saveCommunityEngagements(engagements: CommunityEngagement[]): boolean {
  return writeStoredCollection("local", STORAGE_KEYS.communityEngagements, engagements);
}
