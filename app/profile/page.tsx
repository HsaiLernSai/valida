import { ParticipationHistory } from "@/components/profile/ParticipationHistory";
import { ValidaLogo } from "@/components/ui/ValidaLogo";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8"><ValidaLogo variant="compact" /><a href="/" className="text-xs font-bold text-slate-500 hover:text-brand">← Back to community</a></div></header>
      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10"><ParticipationHistory /></main>
    </div>
  );
}
