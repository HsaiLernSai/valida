export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label="Valida home">
      <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-gradient-to-br from-brand to-blue-700 text-base font-black text-white shadow-[0_8px_20px_rgba(37,99,235,.24)]"><span className="relative">V<span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" /></span></span>
      <span className="text-xl font-extrabold tracking-[-0.04em] text-ink">Valida</span>
    </a>
  );
}
