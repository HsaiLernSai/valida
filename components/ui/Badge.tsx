import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ring-1 ring-inset ${className}`}>{children}</span>;
}
