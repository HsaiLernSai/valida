import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ResearchPost } from "@/lib/types";

export function ResearchMetaPanel({ post, responseCount }: { post: ResearchPost; responseCount: number }) {
  const responseTarget = post.responseTarget ?? 0;
  const progress = responseTarget > 0 ? Math.min(100, Math.round((responseCount / responseTarget) * 100)) : 0;
  const deadline = post.deadline ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${post.deadline}T00:00:00Z`)) : null;

  return (
    <Card as="aside" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Research details</h2>
      <dl className="mt-4 space-y-3 text-xs">
        <div className="flex items-center justify-between gap-4"><dt className="text-slate-400">Goal</dt><dd><Badge className={post.goalStyle}>{post.goal}</Badge></dd></div>
        <div className="flex items-center justify-between gap-4"><dt className="text-slate-400">Estimated time</dt><dd className="font-bold text-ink">{post.estimatedTime}</dd></div>
        <div className="flex items-center justify-between gap-4"><dt className="text-slate-400">Response method</dt><dd className="font-bold capitalize text-ink">{post.responseMethod}</dd></div>
        <div className="flex items-center justify-between gap-4"><dt className="text-slate-400">Timing</dt><dd className="font-bold text-ink">{post.timeMode === "deadline" ? `Closes ${deadline}` : "Open-ended"}</dd></div>
      </dl>
      <div className="mt-4 border-t border-slate-100 pt-4">
        {post.responseMode === "limited" ? (
          <>
            <div className="flex items-center justify-between gap-3 text-xs"><span className="font-bold text-brand-dark">{responseCount} / {responseTarget} responses</span><span className="text-slate-400">{Math.max(responseTarget - responseCount, 0)} needed</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100" role="progressbar" aria-label={`${progress}% of responses collected`} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-brand-gradient" style={{ width: `${progress}%` }} /></div>
          </>
        ) : (
          <div><Badge className="bg-brand-soft text-brand-dark ring-blue-100">Unlimited responses</Badge><p className="mt-2 text-xs font-bold text-brand-dark">{responseCount} responses collected</p></div>
        )}
      </div>
    </Card>
  );
}
