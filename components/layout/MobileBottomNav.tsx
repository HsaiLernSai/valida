import { Icon } from "@/components/ui/Icon";
import { navigationItems } from "@/lib/mock-data";

export function MobileBottomNav({ onCreateResearch }: { onCreateResearch: () => void }) {
  return (
    <nav className="safe-area-nav fixed inset-x-3 z-30 flex items-center justify-around rounded-2xl border border-white/80 bg-white/90 px-2 py-2 shadow-floating backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
      {navigationItems.slice(0, 5).map((item, index) => (
        <a href={item.href} key={item.label} aria-label={item.label} onClick={(event) => { if (item.label === "New Research") { event.preventDefault(); onCreateResearch(); } }} className={`flex h-11 w-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[9px] font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 ${index === 0 ? "bg-brand-soft text-brand-dark" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`}>
          <Icon name={item.icon} className="h-[18px] w-[18px]" />{item.mobileLabel ?? item.label}
        </a>
      ))}
    </nav>
  );
}
