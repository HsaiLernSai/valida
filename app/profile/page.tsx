import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ProfileOverview } from "@/components/profile/ProfileOverview";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Review your browser-local Valida research, participation history, and saved activity.",
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"><ValidaLogo variant="compact" /><nav aria-label="Profile navigation"><a href="/" className="text-xs font-bold text-slate-500 hover:text-brand">Community</a></nav></div></header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10"><ProfileOverview /></main>
      <MobileBottomNav />
    </div>
  );
}
