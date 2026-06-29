import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-gradient text-white shadow-sm enabled:hover:brightness-105 enabled:hover:shadow-brand",
  secondary: "border border-slate-200 bg-white text-ink shadow-sm enabled:hover:bg-slate-50",
  dark: "bg-ink text-white enabled:hover:bg-brand-dark",
  ghost: "text-slate-600 enabled:hover:bg-slate-100 enabled:hover:text-ink",
};

export function Button({ children, className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`inline-flex items-center justify-center font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`} {...props}>{children}</button>;
}
