import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export function ExternalFormPanel({ externalLink }: { externalLink?: string }) {
  return (
    <Card as="section" className="p-5 sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">External response</p>
      <h2 className="mt-1 text-lg font-extrabold text-ink">Continue to the research form</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">This request uses a form hosted outside Valida.</p>
      {externalLink ? (
        <a href={externalLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-bold text-white shadow-brand transition hover:brightness-105">Open External Form <Icon name="arrow" className="h-4 w-4" /></a>
      ) : (
        <button type="button" disabled className="mt-4 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-400">External link unavailable</button>
      )}
      <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3 text-xs leading-5 text-amber-800">External form submissions are not verified in this MVP.</p>
    </Card>
  );
}
