import { Card } from "@/components/ui/Card";
import { popularHashtags } from "@/lib/mock-data";

export function PopularHashtags() {
  return (
    <Card as="section" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Popular Hashtags</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {popularHashtags.map((tag) => <a href="#" key={tag} className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:bg-brand-soft hover:text-brand-dark">#{tag}</a>)}
      </div>
      <p className="mt-2.5 text-[11px] leading-4 text-slate-400">Hashtags help relevant research reach the right people.</p>
    </Card>
  );
}
