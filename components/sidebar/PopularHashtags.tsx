import { Card } from "@/components/ui/Card";
import { popularHashtags } from "@/lib/mock-data";
import { discoveryUrl } from "@/lib/discovery";

export function PopularHashtags() {
  return (
    <Card as="section" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Popular Hashtags</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {popularHashtags.map((tag) => <a href={discoveryUrl({ hashtag: tag })} key={tag} className="inline-flex min-h-9 items-center rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:bg-brand-soft hover:text-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">#{tag}</a>)}
      </div>
      <p className="mt-2.5 text-[11px] leading-4 text-slate-400">Hashtags help relevant research reach the right people.</p>
    </Card>
  );
}
