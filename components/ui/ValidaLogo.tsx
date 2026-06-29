type ValidaLogoVariant = "compact" | "full" | "markOnly";

interface ValidaLogoProps {
  variant?: ValidaLogoVariant;
  className?: string;
}

export function ValidaLogo({ variant = "compact", className = "" }: ValidaLogoProps) {
  const isMarkOnly = variant === "markOnly";
  const isFull = variant === "full";

  return (
    <a href="/" aria-label="Valida home" className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`grid shrink-0 place-items-center bg-brand-gradient font-extrabold text-white shadow-sm ${isFull ? "h-10 w-10 rounded-[13px] text-lg" : "h-9 w-9 rounded-xl text-base"}`}>
        <span className="-translate-y-px tracking-[-0.08em]">V</span>
      </span>
      {!isMarkOnly && (
        <span className="min-w-0">
          <span className="block text-lg font-extrabold tracking-[-0.04em] text-ink">Valida</span>
          {isFull && <span className="mt-0.5 block whitespace-nowrap text-[9px] font-semibold tracking-[0.04em] text-slate-400">Validate Before You Build</span>}
        </span>
      )}
    </a>
  );
}
