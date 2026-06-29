import { Card } from "@/components/ui/Card";
import { quickStartItems } from "@/lib/mock-data";
import { discoveryUrl } from "@/lib/discovery";

export function QuickStart() {
  return (
    <Card as="section" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Quick Start</h2>
      <div className="mt-3 space-y-2">
        {quickStartItems.map((item) => (
          <a href={discoveryUrl({ category: item.goal })} key={item.goal} className="flex min-h-11 w-full items-center justify-between rounded-xl border border-slate-100 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-brand/20 hover:bg-brand-soft hover:text-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">
            {item.goal}<span className={`h-2 w-2 rounded-full ${item.dotClassName}`} />
          </a>
        ))}
      </div>
    </Card>
  );
}
