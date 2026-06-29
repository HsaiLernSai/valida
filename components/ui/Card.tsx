import type { CardProps } from "@/lib/types";

export function Card({ children, className = "", as: Element = "div" }: CardProps) {
  return <Element className={`rounded-card border border-slate-200/80 bg-surface shadow-card ${className}`}>{children}</Element>;
}
