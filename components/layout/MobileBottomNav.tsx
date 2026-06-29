"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getAuthUser } from "@/lib/auth-storage";
import { navigationItems } from "@/lib/mock-data";
import type { AuthUser, NavigationItem } from "@/lib/types";
import { usePathname } from "next/navigation";

export function MobileBottomNav({ onCreateResearch }: { onCreateResearch?: () => void }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const authItems: NavigationItem[] = user
    ? [navigationItems[4], navigationItems[5]]
    : [
      { label: "Log in", mobileLabel: "Login", href: "/login", icon: "user" },
      { label: "Register", mobileLabel: "Join", href: "/register", icon: "plus" },
    ];
  const items = [navigationItems[0], navigationItems[1], navigationItems[2], ...authItems];

  useEffect(() => {
    const syncUser = () => setUser(getAuthUser());
    syncUser();
    window.addEventListener("valida-auth-change", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("valida-auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return (
    <nav className="safe-area-nav fixed inset-x-3 z-30 flex items-center justify-around rounded-2xl border border-white/80 bg-white/90 px-2 py-2 shadow-floating backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : item.href === pathname;
        const href = item.label === "New Research" && !onCreateResearch ? "/?create=1" : item.href;
        return (
        <a href={href} key={item.label} aria-current={active ? "page" : undefined} aria-label={item.label} onClick={(event) => { if (item.label === "New Research" && onCreateResearch) { event.preventDefault(); onCreateResearch(); } }} className={`flex h-11 w-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[9px] font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 ${active ? "bg-brand-soft text-brand-dark" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`}>
          <Icon name={item.icon} className="h-[18px] w-[18px]" />{item.mobileLabel ?? item.label}
        </a>
        );
      })}
    </nav>
  );
}
