import type { CardProps } from "@/lib/types";

export function Card({ children, className = "", as: Element = "div" }: CardProps) {
  return <Element className={`rounded-card border border-border/70 bg-surface shadow-card ${className}`}>{children}</Element>;
}
