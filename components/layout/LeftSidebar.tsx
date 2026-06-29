"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { navigationItems } from "@/lib/mock-data";
import { usePathname } from "next/navigation";

export function LeftSidebar({ onCreateResearch }: { onCreateResearch?: () => void }) {
  const pathname = usePathname();
  const navigationSections = [
    { label: "Main", items: navigationItems.slice(0, 2) },
    { label: "My Space", items: navigationItems.slice(3) },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-[224px] shrink-0 flex-col border-r border-slate-200/70 bg-white/70 px-4 py-5 backdrop-blur-xl lg:flex">
      <div className="px-2"><ValidaLogo variant="compact" /></div>
      <nav className="mt-6 space-y-4" aria-label="Primary navigation">
        {navigationSections.map((section) => (
          <div key={section.label}>
            <p className="mb-1 px-3 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <a key={item.label} href={item.href} aria-current={item.href === pathname ? "page" : undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${item.href === pathname ? "bg-brand-soft text-brand-dark" : "text-slate-600 hover:bg-white hover:text-ink"}`}>
                  <Icon name={item.icon} className="h-[19px] w-[19px]" />{item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
      {onCreateResearch ? <Button onClick={onCreateResearch} className="mt-5 gap-2 rounded-xl px-4 py-2.5 text-sm"><Icon name="plus" className="h-4 w-4" /> Start research</Button> : <a href="/?create=1" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-bold text-white shadow-brand"><Icon name="plus" className="h-4 w-4" /> Start research</a>}
      <div className="mt-4 rounded-xl border border-brand/10 bg-gradient-to-br from-brand-soft to-white p-3">
        <div className="flex items-center gap-2 text-accent"><Icon name="sparkles" className="h-4 w-4" /><p className="text-xs font-bold text-ink">Good research starts curious.</p></div>
        <p className="mt-1.5 text-[11px] leading-4 text-slate-500">Ask clearly, listen openly, and share what you learn.</p>
      </div>
      <div className="mt-auto px-2 pt-4 text-[9px] leading-4 text-slate-400">
        <div className="flex flex-wrap gap-x-2.5 gap-y-1">
          <a href="#" className="transition hover:text-slate-600">About</a>
          <a href="#" className="transition hover:text-slate-600">Guidelines</a>
          <a href="#" className="transition hover:text-slate-600">Privacy</a>
        </div>
        <p className="mt-1.5">© 2026 Valida</p>
      </div>
    </aside>
  );
}
