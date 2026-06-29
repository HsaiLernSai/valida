import { feedTabs } from "@/lib/mock-data";

export function FeedTabs() {
  return (
    <div className="flex h-9 items-end gap-1 overflow-x-auto" role="tablist" aria-label="Feed views">
      {feedTabs.map((tab, index) => (
        <button key={tab} role="tab" aria-selected={index === 0} className={`relative shrink-0 px-3 pb-2.5 pt-1 text-xs font-bold transition ${index === 0 ? "text-brand-dark after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-gradient" : "text-slate-400 hover:text-slate-700"}`}>{tab}</button>
      ))}
    </div>
  );
}
