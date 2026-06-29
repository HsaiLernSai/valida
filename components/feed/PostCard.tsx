import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { IconName, ResearchPost } from "@/lib/types";

export function PostCard({ post, completed = false }: { post: ResearchPost; completed?: boolean }) {
  const reactions: { label: string; icon: IconName; count: number }[] = [
    { label: "Interested", icon: "heart", count: post.interestedCount },
    { label: "Participate", icon: "support", count: post.participantCount },
    { label: "Comment", icon: "comment", count: post.commentCount },
    { label: "Share", icon: "share", count: post.shareCount },
  ];
  const responseTarget = post.responseTarget ?? 0;
  const progress = responseTarget > 0
    ? Math.min(100, Math.round((post.responseCount / responseTarget) * 100))
    : 0;
  const participantsRemaining = Math.max(responseTarget - post.responseCount, 0);
  const formattedDeadline = post.deadline
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
        new Date(`${post.deadline}T00:00:00Z`),
      )
    : null;
  const targetAudiences = Array.isArray(post.targetAudience) ? post.targetAudience : [post.targetAudience];

  return (
    <Card as="article" className="p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-soft">
      <div className="flex items-start gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ring-4 ring-white ${post.avatarStyle}`}>{post.initials}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2"><span className="text-sm font-bold text-ink">{post.author}</span><span className="text-slate-300">·</span><span className="text-xs text-slate-400">{post.time}</span></div>
          <p className="mt-0.5 text-xs text-slate-500">{post.role}</p>
        </div>
        <Button variant="ghost" aria-label="More post options" className="rounded-lg px-2 py-1 text-lg leading-none text-slate-400">•••</Button>
      </div>
      {completed && <div className="mt-3 rounded-xl border border-blue-100 bg-brand-soft px-3 py-2.5"><p className="text-xs font-extrabold text-brand-dark">✓ Completed</p><p className="mt-0.5 text-[11px] text-slate-500">You already participated.</p></div>}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={post.goalStyle}>{post.goal}</Badge>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-orange-700">About {post.estimatedTime}</span>
        </div>
        <h2 className="mt-2.5 text-lg font-extrabold leading-snug tracking-[-0.02em] text-ink sm:text-xl">{post.title}</h2>
        <p className="mt-1.5 text-sm leading-[1.55rem] text-slate-600">{post.description}</p>
        <div className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1">{post.hashtags.map((tag) => <a href="#" key={tag} className="text-xs font-semibold text-brand transition hover:text-brand-dark">#{tag}</a>)}</div>
      </div>
      <div className="mt-4 rounded-xl border border-blue-100/70 bg-blue-50/50 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {post.responseMode === "unlimited" && <Badge className="bg-white text-brand-dark ring-blue-200">Unlimited responses</Badge>}
          {post.timeMode === "no_deadline" ? (
            <Badge className="bg-accent-soft text-orange-700 ring-orange-100">Open-ended</Badge>
          ) : (
            <span className="text-xs font-bold text-orange-700">Closes on {formattedDeadline}</span>
          )}
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <span className="mr-0.5 font-bold text-slate-700">Target audience:</span>
          {targetAudiences.map((audience) => <span key={audience} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600">{audience}</span>)}
        </div>
        {post.responseMode === "limited" ? (
          <div className="mt-2.5">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-bold text-brand-dark">{post.responseCount} / {responseTarget} responses</span>
              <span className="text-slate-500">{participantsRemaining > 0 ? `Need ${participantsRemaining} more participants` : "Response target reached"}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100" aria-label={`${progress}% of responses collected`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <p className="mt-2.5 text-xs font-bold text-brand-dark">{post.responseCount} responses collected</p>
        )}
        <div className="mt-3 flex justify-end">
          <a href={`/research/${post.id}`} className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-105">{completed ? "View Research" : "Open Research"} <Icon name="arrow" className="h-3.5 w-3.5" /></a>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 border-t border-slate-100 pt-2">
        {reactions.map((reaction) => (
          reaction.label === "Participate" && completed ? (
            <a href={`/research/${post.id}`} key={reaction.label} className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg py-1.5 text-brand-dark transition hover:bg-brand-soft"><Icon name="file" className="h-4 w-4 shrink-0" /><span className="hidden text-[11px] font-bold sm:inline">View Research</span></a>
          ) : (
            <Button variant="ghost" key={reaction.label} aria-label={`${reaction.label}: ${reaction.count}`} className="group min-w-0 gap-1.5 rounded-lg py-1.5 text-slate-500">
              <Icon name={reaction.icon} className="h-4 w-4 shrink-0" /><span className="hidden text-[11px] sm:inline">{reaction.label}</span><span className="text-[11px] font-medium text-slate-400 group-hover:text-brand">{reaction.count}</span>
            </Button>
          )
        ))}
      </div>
    </Card>
  );
}
