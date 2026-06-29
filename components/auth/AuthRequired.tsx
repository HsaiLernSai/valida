"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { getAuthUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/lib/types";

export function AuthRequired({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const currentUser = getAuthUser();
    if (!currentUser) {
      const next = `${window.location.pathname}${window.location.hash}`;
      window.location.replace(`/login?next=${encodeURIComponent(next)}`);
      return;
    }
    setUser(currentUser);
    setChecked(true);
  }, []);

  if (!checked || !user) {
    return (
      <div className="grid min-h-[50vh] place-items-center px-4">
        <Card className="max-w-sm p-6 text-center">
          <div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-brand-soft" />
          <p className="mt-3 text-sm font-bold text-slate-600">Checking your Valida session…</p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
