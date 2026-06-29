import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex rounded-full bg-surface-muted px-3 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-inset ring-border/60 ${className}`}>{children}</span>;
}
