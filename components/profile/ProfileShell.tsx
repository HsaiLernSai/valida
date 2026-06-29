"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProfileOverview, type ProfileSection } from "@/components/profile/ProfileOverview";
import { Card } from "@/components/ui/Card";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { getAuthUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/lib/types";

export function ProfileShell({ initialSection = "Overview" }: { initialSection?: ProfileSection }) {
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

  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <ValidaLogo variant="compact" />
          <nav aria-label="Profile navigation" className="flex items-center gap-2">
            <a href="/" className="rounded-xl px-2 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-brand">Community</a>
            {user && <LogoutButton className="min-h-10 px-3" />}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
        {checked && user ? (
          <ProfileOverview user={user} initialSection={initialSection} />
        ) : (
          <div className="grid min-h-[50vh] place-items-center">
            <Card className="max-w-sm p-6 text-center">
              <div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-brand-soft" />
              <p className="mt-3 text-sm font-bold text-slate-600">Checking your Valida session…</p>
            </Card>
          </div>
        )}
      </main>
      <MobileBottomNav />
    </div>
  );
}
