"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ShareResearchDialog } from "@/components/research/ShareResearchDialog";
import { commentsByPostId } from "@/lib/mock-data";
import { discoveryUrl } from "@/lib/discovery";
import type { CommunityComment, CommunityEngagement, IconName, ResearchPost } from "@/lib/types";

interface PostCardProps {
  post: ResearchPost;
  completed?: boolean;
  engagement?: CommunityEngagement;
  onEngagementChange?: (engagement: CommunityEngagement) => void;
}

const emptyEngagement = (postId: string): CommunityEngagement => ({
  postId,
  interested: false,
  commentCount: 0,
  shareCount: 0,
  comments: [],
});

function CommentList({ comments }: { comments: CommunityComment[] }) {
  if (comments.length === 0) {
    return <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center"><p className="text-xs font-bold text-slate-600">No comments yet</p><p className="mt-1 text-[11px] text-slate-400">Start a thoughtful conversation about this research.</p></div>;
  }

  return (
    <div className="max-h-64 space-y-3 overflow-y-auto overscroll-contain pr-1" aria-label="Comments">
      {comments.map((item) => (
        <article key={item.id} className="flex gap-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[10px] font-black text-brand-dark">{item.initials}</div>
          <div className="min-w-0 flex-1 rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-xs font-extrabold text-ink">{item.author}</p><time dateTime={item.createdAt} className="text-[9px] text-slate-400">{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(item.createdAt))}</time></div>
            <p className="mt-1 break-words text-xs leading-5 text-slate-600">{item.message}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PostCard({ post, completed = false, engagement, onEngagementChange }: PostCardProps) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState("");
  const [interestPending, setInterestPending] = useState(false);
  const currentEngagement = engagement ?? emptyEngagement(post.id);
  const userCommentCount = Math.max(currentEngagement.commentCount, currentEngagement.comments.length);
  const visibleComments = [...(commentsByPostId[post.id] ?? []), ...currentEngagement.comments];
  const updateEngagement = (updates: Partial<CommunityEngagement>) => onEngagementChange?.({ ...currentEngagement, ...updates });
  const reactions: { label: string; icon: IconName; count: number }[] = [
    { label: "Interested", icon: "heart", count: post.interestedCount + (currentEngagement.interested ? 1 : 0) },
    { label: "Participate", icon: "support", count: post.participantCount },
    { label: "Comment", icon: "comment", count: post.commentCount + userCommentCount },
    { label: "Share", icon: "share", count: post.shareCount + currentEngagement.shareCount },
  ];
  const responseTarget = post.responseTarget ?? 0;
  const progress = responseTarget > 0 ? Math.min(100, Math.round((post.responseCount / responseTarget) * 100)) : 0;
  const participantsRemaining = Math.max(responseTarget - post.responseCount, 0);
  const formattedDeadline = post.deadline ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${post.deadline}T00:00:00Z`)) : null;

  return (
    <>
    <Card as="article" className="p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-soft sm:p-5">
      <div className="flex items-start gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ring-4 ring-white ${post.avatarStyle}`}>{post.initials}</div>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2"><span className="text-sm font-bold text-ink">{post.author}</span><span className="text-slate-300">·</span><span className="text-xs text-slate-400">{post.time}</span></div><p className="mt-0.5 text-xs text-slate-500">{post.role}</p></div>
      </div>
      {completed && <div className="mt-3 rounded-xl border border-blue-100 bg-brand-soft px-3 py-2.5"><p className="text-xs font-extrabold text-brand-dark">✓ Completed</p><p className="mt-0.5 text-[11px] text-slate-500">You already participated. Your answers remain available in read-only mode.</p></div>}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2"><Badge className={post.goalStyle}>{post.goal}</Badge><span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-orange-700">About {post.estimatedTime}</span></div>
        <h2 className="mt-2.5 text-lg font-extrabold leading-snug tracking-[-0.02em] text-ink sm:text-xl">{post.title}</h2>
        <p className="mt-1.5 text-sm leading-[1.55rem] text-slate-600">{post.description}</p>
        <div className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1">{post.hashtags.map((tag) => <a href={discoveryUrl({ hashtag: tag })} key={tag} className="rounded-md text-xs font-semibold text-brand transition hover:bg-brand-soft hover:text-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">#{tag}</a>)}</div>
      </div>
      <div className="mt-4 rounded-xl border border-blue-100/70 bg-blue-50/50 p-3 sm:p-3.5">
        <div className="flex flex-wrap items-center gap-2">{post.responseMode === "unlimited" && <Badge className="bg-white text-brand-dark ring-blue-200">Unlimited responses</Badge>}{post.timeMode === "no_deadline" ? <Badge className="bg-accent-soft text-orange-700 ring-orange-100">Open-ended</Badge> : <span className="text-xs font-bold text-orange-700">Closes on {formattedDeadline}</span>}</div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500"><span className="mr-0.5 font-bold text-slate-700">Target audience:</span>{post.targetAudience.map((audience) => <span key={audience} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600">{audience}</span>)}</div>
        {post.responseMode === "limited" ? <div className="mt-2.5"><div className="flex items-center justify-between gap-3 text-xs"><span className="font-bold text-brand-dark">{post.responseCount} / {responseTarget} responses</span><span className="text-right text-slate-500">{participantsRemaining > 0 ? `Need ${participantsRemaining} more` : "Target reached"}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100" aria-label={`${progress}% of responses collected`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-brand-gradient" style={{ width: `${progress}%` }} /></div></div> : <p className="mt-2.5 text-xs font-bold text-brand-dark">{post.responseCount} responses collected</p>}
        <div className="mt-3 flex justify-end"><a href={`/research/${post.id}`} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-gradient px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20">{completed ? "View Research" : "Open Research"} <Icon name="arrow" className="h-3.5 w-3.5" /></a></div>
      </div>
      <div className="mt-3 grid grid-cols-4 border-t border-slate-100 pt-2">
        {reactions.map((reaction) => reaction.label === "Participate" ? (
          <a href={`/research/${post.id}`} key={reaction.label} aria-label={`${completed ? "View Research" : "Participate"}: ${reaction.count}`} className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg py-2.5 text-slate-500 transition hover:bg-brand-soft hover:text-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15"><Icon name={completed ? "file" : "support"} className="h-4 w-4 shrink-0" /><span className="hidden text-[11px] font-bold sm:inline">{completed ? "View" : "Participate"}</span><span className="text-[11px] font-medium">{reaction.count}</span></a>
        ) : (
          <Button variant="ghost" key={reaction.label} disabled={reaction.label === "Interested" && interestPending} aria-pressed={reaction.label === "Interested" ? currentEngagement.interested : undefined} onClick={() => {
            if (reaction.label === "Interested") {
              setInterestPending(true);
              updateEngagement({ interested: !currentEngagement.interested });
              window.setTimeout(() => setInterestPending(false), 250);
            }
            if (reaction.label === "Comment") { setCommentOpen((current) => !current); setFeedback(""); }
            if (reaction.label === "Share") { setShareDialogOpen(true); setCommentOpen(false); setFeedback(""); }
          }} aria-label={`${reaction.label}: ${reaction.count}`} className={`group min-w-0 gap-1.5 rounded-lg py-2.5 transition active:scale-95 ${reaction.label === "Interested" && currentEngagement.interested ? "bg-brand-soft text-brand-dark" : "text-slate-500"}`}>
            <Icon name={reaction.icon} filled={reaction.label === "Interested" && currentEngagement.interested} className={`h-4 w-4 shrink-0 transition ${reaction.label === "Interested" && currentEngagement.interested ? "scale-110" : ""}`} /><span className="hidden text-[11px] sm:inline">{reaction.label}</span><span className="text-[11px] font-medium">{reaction.count}</span>
          </Button>
        ))}
      </div>
      {commentOpen && (
        <section className="mt-3 border-t border-slate-100 pt-4" aria-labelledby={`comments-${post.id}`}>
          <div className="mb-3 flex items-center justify-between gap-3"><h3 id={`comments-${post.id}`} className="text-xs font-extrabold text-ink">Comments</h3><span className="text-[10px] font-semibold text-slate-400">{visibleComments.length} recent</span></div>
          <CommentList comments={visibleComments} />
          <form className="mt-3 flex gap-2" onSubmit={(event) => {
            event.preventDefault();
            const message = comment.trim();
            if (!message) return;
            const newComment: CommunityComment = { id: globalThis.crypto?.randomUUID?.() ?? `comment-${Date.now()}`, author: "You", initials: "YU", message, createdAt: new Date().toISOString() };
            updateEngagement({ comments: [...currentEngagement.comments, newComment], commentCount: userCommentCount + 1 });
            setComment("");
            setFeedback("Your comment was posted.");
          }}>
            <label className="sr-only" htmlFor={`comment-${post.id}`}>Comment on {post.title}</label>
            <input id={`comment-${post.id}`} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add a thoughtful comment" className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" />
            <Button type="submit" disabled={!comment.trim()} className="min-h-11 rounded-xl px-4 text-xs">Post</Button>
          </form>
        </section>
      )}
      <p className={`mt-2 text-xs font-semibold ${feedback.includes("failed") || feedback.includes("cancelled") ? "text-amber-700" : "text-emerald-700"}`} aria-live="polite">{feedback}</p>
    </Card>
    {shareDialogOpen && <ShareResearchDialog post={post} onClose={() => setShareDialogOpen(false)} onShared={() => updateEngagement({ shareCount: currentEngagement.shareCount + 1 })} />}
    </>
  );
}
