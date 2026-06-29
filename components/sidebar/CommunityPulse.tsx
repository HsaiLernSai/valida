import { Card } from "@/components/ui/Card";

const pulseMetrics = [
  { label: "Online", value: "1,248", dotClassName: "bg-highlight" },
  { label: "Responses today", value: "327", dotClassName: "bg-secondary" },
  { label: "Open research requests", value: "42", dotClassName: "bg-accent" },
];

export function CommunityPulse() {
  return (
    <Card as="section" className="p-4">
      <h2 className="text-sm font-extrabold text-ink">Community Pulse</h2>
      <div className="mt-3 grid grid-cols-3 divide-x divide-slate-100">
        {pulseMetrics.map((metric) => (
          <div key={metric.label} className="px-2 first:pl-0 last:pr-0">
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${metric.dotClassName}`} />
              <strong className="text-sm font-extrabold tracking-tight text-ink">{metric.value}</strong>
            </div>
            <p className="mt-1 text-[9px] leading-3 text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
