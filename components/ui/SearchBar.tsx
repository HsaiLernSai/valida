import { Icon } from "@/components/ui/Icon";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  return (
    <label className={`flex items-center border border-slate-200 bg-white shadow-soft transition focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/5 ${compact ? "gap-2 rounded-xl px-3 py-2.5" : "mt-6 gap-3 rounded-2xl px-4 py-3.5"}`}>
      <Icon name="search" className={`${compact ? "h-4 w-4" : "h-5 w-5"} text-slate-400`} />
      <input type="search" aria-label="Search research and topics" placeholder={compact ? "Search research" : "Search research, people, or #hashtags"} className={`w-full bg-transparent text-ink outline-none placeholder:text-slate-400 ${compact ? "text-xs" : "text-sm"}`} />
      {!compact && <span className="hidden rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-400 sm:block">⌘ K</span>}
    </label>
  );
}
