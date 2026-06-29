"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { discoveryUrl } from "@/lib/discovery";

interface SearchBarProps {
  compact?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  resultCount?: number;
}

export function SearchBar({ compact = false, value, onChange, resultCount }: SearchBarProps) {
  const router = useRouter();
  const [localValue, setLocalValue] = useState("");
  const currentValue = value ?? localValue;

  return (
    <form onSubmit={(event) => { event.preventDefault(); if (!onChange) router.push(discoveryUrl({ query: currentValue })); }} role="search">
      <label className={`flex items-center border border-slate-200 bg-white shadow-soft transition focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/5 ${compact ? "gap-2 rounded-xl px-3 py-2.5" : "gap-3 rounded-2xl px-4 py-3.5"}`}>
        <Icon name="search" className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0 text-slate-400`} />
        <input type="search" value={currentValue} onChange={(event) => { setLocalValue(event.target.value); onChange?.(event.target.value); }} aria-label="Search research and topics" placeholder={compact ? "Search research" : "Search title, author, audience, category, or #hashtag"} className={`min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-slate-400 ${compact ? "text-xs" : "text-sm"}`} />
        {typeof resultCount === "number" && <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{resultCount}</span>}
      </label>
    </form>
  );
}
