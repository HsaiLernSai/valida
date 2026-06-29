import { ValidaLogo } from "@/components/ui/ValidaLogo";
import type { ReactNode } from "react";

export function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <ValidaLogo variant="compact" />
        <a href="/" className="text-xs font-bold text-slate-500 hover:text-brand">Community</a>
      </header>
      <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
