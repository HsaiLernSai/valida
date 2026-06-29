import { Card } from "@/components/ui/Card";
import { quickStartItems } from "@/lib/mock-data";

export function QuickStart() {
  return (
    <Card as="section" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Quick Start</h2>
      <div className="mt-3 space-y-2">
        {quickStartItems.map((item) => (
          <button key={item.goal} className="flex w-full items-center justify-between rounded-xl border border-slate-100 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-brand/20 hover:bg-brand-soft hover:text-brand-dark">
            {item.goal}<span className={`h-2 w-2 rounded-full ${item.dotClassName}`} />
          </button>
        ))}
      </div>
    </Card>
  );
}
