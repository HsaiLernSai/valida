import { FeedTabs } from "@/components/feed/FeedTabs";
import type { FeedView } from "@/lib/types";

export function StickyCommunityHeader({ activeTab, onTabChange }: { activeTab: FeedView; onTabChange: (tab: FeedView) => void }) {
  return (
    <header className="sticky top-0 z-20 -mx-2 h-[88px] border-b border-slate-200/80 bg-canvas/90 px-2 pt-3 backdrop-blur-xl sm:h-[82px]">
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-xl font-extrabold tracking-[-0.035em] text-ink sm:text-[22px]">Valida Community</h1>
        <span className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
        <p className="hidden text-[11px] font-medium text-slate-500 sm:block">Validate ideas faster with real feedback.</p>
      </div>
      <p className="mt-0.5 text-[11px] text-slate-500 sm:hidden">Real feedback for better ideas.</p>
      <div className="absolute inset-x-2 bottom-0"><FeedTabs activeTab={activeTab} onChange={onTabChange} /></div>
    </header>
  );
}
