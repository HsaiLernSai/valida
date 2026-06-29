import type { ReactNode } from "react";

export type IconName =
  | "home"
  | "compass"
  | "plus"
  | "file"
  | "bookmark"
  | "user"
  | "search"
  | "sparkles"
  | "heart"
  | "support"
  | "comment"
  | "share"
  | "arrow";

export type ResearchGoal =
  | "Collect Survey"
  | "Find Interview Participants"
  | "Prototype Test"
  | "Validate Business Idea"
  | "Design Feedback"
  | "Open Discussion";

export type NativeFormQuestionType =
  | "short_text"
  | "paragraph"
  | "multiple_choice"
  | "checkbox"
  | "rating"
  | "dropdown"
  | "number"
  | "email"
  | "phone"
  | "date"
  | "time";

export interface NativeFormQuestion {
  id: string;
  type: NativeFormQuestionType;
  label: string;
  required: boolean;
  options?: string[];
}

export type NativeFormAnswers = Record<string, string | string[]>;

export interface ParticipationRecord {
  postId: string;
  completedAt: string;
  answers: NativeFormAnswers;
  postSnapshot?: {
    title: string;
    author: string;
    goal: ResearchGoal;
  };
}

export interface CommunityEngagement {
  postId: string;
  interested: boolean;
  commentCount: number;
  shareCount: number;
  comments: CommunityComment[];
}

export interface CommunityComment {
  id: string;
  author: string;
  initials: string;
  message: string;
  createdAt: string;
}

export interface AuthUser {
  userId: string;
  displayName: string;
  email: string;
  avatar: string;
  preferredLanguage: string;
  createdAt: string;
}

export type FeedView = "For You" | "Following Hashtags" | "Latest";

export interface ResearchWizardData {
  goal: ResearchGoal | null;
  title: string;
  description: string;
  responseMethod: "external" | "native";
  externalLink: string;
  formQuestions: NativeFormQuestion[];
  estimatedTime: string;
  targetAudience: string[];
  responseMode: "limited" | "unlimited";
  responseTarget: number;
  timeMode: "deadline" | "no_deadline";
  deadline: string;
  hashtags: string[];
}

export interface ResearchStepProps {
  data: ResearchWizardData;
  updateData: (updates: Partial<ResearchWizardData>) => void;
}

export interface NavigationItem {
  label: string;
  mobileLabel?: string;
  href: string;
  icon: IconName;
}

export interface ResearchPost {
  id: string;
  initials: string;
  author: string;
  role: string;
  time: string;
  goal: ResearchGoal;
  goalStyle: string;
  avatarStyle: string;
  title: string;
  description: string;
  responseMethod: "external" | "native";
  externalLink?: string;
  formQuestions?: NativeFormQuestion[];
  hashtags: string[];
  estimatedTime: string;
  targetAudience: string[];
  responseMode: "limited" | "unlimited";
  responseTarget?: number;
  responseCount: number;
  timeMode: "deadline" | "no_deadline";
  deadline?: string;
  interestedCount: number;
  participantCount: number;
  commentCount: number;
  shareCount: number;
}

export interface TrendingResearchItem {
  title: string;
  postCount: number;
  query: string;
}

export interface QuickStartItem {
  goal: ResearchGoal;
  dotClassName: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "article" | "aside" | "div" | "section";
}
