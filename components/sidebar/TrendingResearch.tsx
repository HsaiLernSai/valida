import { Card } from "@/components/ui/Card";
import { trendingResearch } from "@/lib/mock-data";

export function TrendingResearch() {
  return (
    <Card as="section" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Trending Research</h2>
      <div className="mt-3 space-y-3">
        {trendingResearch.map((item, index) => (
          <a href="#" key={item.title} className="group flex items-start gap-3">
            <span className="pt-0.5 text-xs font-bold text-slate-300">{String(index + 1).padStart(2, "0")}</span>
            <span><span className="block text-sm font-bold text-slate-700 group-hover:text-brand">{item.title}</span><span className="mt-0.5 block text-[11px] text-slate-400">{item.postCount} posts</span></span>
          </a>
        ))}
      </div>
    </Card>
  );
}
