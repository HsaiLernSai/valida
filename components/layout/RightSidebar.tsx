import { PopularHashtags } from "@/components/sidebar/PopularHashtags";
import { QuickStart } from "@/components/sidebar/QuickStart";
import { TrendingResearch } from "@/components/sidebar/TrendingResearch";
import { CommunityPulse } from "@/components/sidebar/CommunityPulse";
import { SearchBar } from "@/components/ui/SearchBar";

export function RightSidebar() {
  return (
    <aside className="hidden w-[286px] shrink-0 py-4 pr-6 xl:block">
      <div className="sticky top-4 space-y-2.5">
        <SearchBar compact />
        <TrendingResearch />
        <PopularHashtags />
        <QuickStart />
        <CommunityPulse />
      </div>
    </aside>
  );
}
