"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { navigationItems } from "@/lib/mock-data";
import { usePathname } from "next/navigation";
import { getAuthUser } from "@/lib/auth-storage";
import type { AuthUser, NavigationItem } from "@/lib/types";

export function LeftSidebar({ onCreateResearch }: { onCreateResearch?: () => void }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const guestItems: NavigationItem[] = [
    { label: t("navigation.login"), href: "/login", icon: "user" },
    { label: t("navigation.register"), href: "/register", icon: "plus" },
  ];
  const navigationLabel = (label: string) => {
    const map: Record<string, string> = {
      Home: "navigation.home",
      Explore: "navigation.explore",
      "New Research": "navigation.newResearch",
      "My Research": "navigation.myResearch",
      Bookmarks: "navigation.bookmarks",
      Profile: "navigation.profile",
      Settings: "navigation.settings",
    };
    return t(map[label] ?? label);
  };
  const navigationSections = [
    { label: t("navigation.main"), items: navigationItems.slice(0, 2) },
    { label: user ? t("navigation.mySpace") : t("navigation.account"), items: user ? navigationItems.slice(3) : guestItems },
  ];

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

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href;

  return (
    <aside className="sticky top-0 hidden h-screen w-[224px] shrink-0 flex-col border-r border-slate-200/70 bg-surface/70 px-4 py-5 backdrop-blur-xl lg:flex">
      <div className="px-2"><ValidaLogo variant="compact" /></div>
      <nav className="mt-6 space-y-4" aria-label="Primary navigation">
        {navigationSections.map((section) => (
          <div key={section.label}>
            <p className="mb-1 px-3 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <a key={item.label} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive(item.href) ? "bg-brand-soft text-brand-dark" : "text-slate-600 hover:bg-surface hover:text-ink"}`}>
                  <Icon name={item.icon} className="h-[19px] w-[19px]" />{navigationLabel(item.label)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
      {onCreateResearch ? <Button onClick={onCreateResearch} className="mt-5 gap-2 rounded-xl px-4 py-2.5 text-sm"><Icon name="plus" className="h-4 w-4" /> {t("buttons.startResearch")}</Button> : <a href="/?create=1" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-bold text-white shadow-brand"><Icon name="plus" className="h-4 w-4" /> {t("buttons.startResearch")}</a>}
      {user && <LogoutButton className="mt-3 min-h-10 w-full px-4" />}
      <div className="mt-4 rounded-xl border border-brand/10 bg-gradient-to-br from-brand-soft to-surface p-3">
        <div className="flex items-center gap-2 text-accent"><Icon name="sparkles" className="h-4 w-4" /><p className="text-xs font-bold text-ink">{t("community.footerTitle")}</p></div>
        <p className="mt-1.5 text-[11px] leading-4 text-slate-500">{t("community.footerDescription")}</p>
      </div>
      <div className="mt-auto px-2 pt-4 text-[9px] leading-4 text-slate-400">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1">
          <a href="#" className="transition hover:text-slate-600">{t("navigation.about")}</a>
          <a href="#" className="transition hover:text-slate-600">{t("navigation.guidelines")}</a>
          <a href="#" className="transition hover:text-slate-600">{t("navigation.privacy")}</a>
        </div>
        <p className="mt-1.5">{t("navigation.copyright")}</p>
      </div>
    </aside>
  );
}
