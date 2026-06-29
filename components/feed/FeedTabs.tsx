"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import { feedTabs } from "@/lib/mock-data";
import type { FeedView } from "@/lib/types";

export function FeedTabs({ activeTab, onChange }: { activeTab: FeedView; onChange: (tab: FeedView) => void }) {
  const { t } = useI18n();
  const tabLabel = (tab: FeedView) => t(tab === "For You" ? "community.tabs.forYou" : tab === "Following Hashtags" ? "community.tabs.followingHashtags" : "community.tabs.latest");
  return (
    <div className="flex h-9 items-end gap-1 overflow-x-auto" role="tablist" aria-label="Feed views">
      {feedTabs.map((tab) => (
        <button key={tab} role="tab" aria-selected={activeTab === tab} onClick={() => onChange(tab)} className={`relative min-h-11 shrink-0 px-3 pb-2.5 pt-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 ${activeTab === tab ? "text-brand-dark after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-gradient" : "text-slate-400 hover:text-slate-700"}`}>{tabLabel(tab)}</button>
      ))}
    </div>
  );
}
