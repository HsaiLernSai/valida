import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-gradient text-white shadow-sm hover:brightness-105 hover:shadow-brand",
  secondary: "border border-slate-200 bg-white text-ink shadow-sm hover:bg-slate-50",
  dark: "bg-ink text-white hover:bg-brand-dark",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-ink",
};

export function Button({ children, className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`inline-flex items-center justify-center font-bold transition ${variants[variant]} ${className}`} {...props}>{children}</button>;
}
