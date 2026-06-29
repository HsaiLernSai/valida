"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createLocalUser, saveAuthUser } from "@/lib/auth-storage";

type AuthMode = "login" | "register";

function getNextPath() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  return next?.startsWith("/") ? next : "/profile";
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const { t } = useI18n();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const isRegister = mode === "register";

  return (
    <Card className="w-full max-w-md p-6 sm:p-8">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">{isRegister ? t("auth.registerEyebrow") : t("auth.loginEyebrow")}</p>
      <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink">{isRegister ? t("auth.registerTitle") : t("auth.loginTitle")}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">{t("auth.helper")}</p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const normalizedEmail = email.trim();
          if (!normalizedEmail.includes("@")) {
            setFeedback(t("auth.invalidEmail"));
            return;
          }
          if (!password.trim()) {
            setFeedback(t("auth.passwordRequired"));
            return;
          }
          if (isRegister && !displayName.trim()) {
            setFeedback(t("auth.displayNameRequired"));
            return;
          }
          const user = createLocalUser(normalizedEmail, displayName);
          if (!saveAuthUser(user)) {
            setFeedback(t("auth.sessionSaveFailed"));
            return;
          }
          window.location.href = getNextPath();
        }}
      >
        {isRegister && (
          <div>
            <label htmlFor="displayName" className="text-xs font-bold text-slate-600">{t("auth.displayName")}</label>
            <input id="displayName" value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-1 min-h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" placeholder={t("auth.displayNamePlaceholder")} />
          </div>
        )}
        <div>
          <label htmlFor="email" className="text-xs font-bold text-slate-600">{t("auth.email")}</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 min-h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" placeholder={t("auth.emailPlaceholder")} />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-bold text-slate-600">{t("auth.password")}</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 min-h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" placeholder={t("auth.passwordPlaceholder")} />
        </div>
        <Button type="submit" className="min-h-12 w-full rounded-xl text-sm">{isRegister ? t("auth.registerButton") : t("auth.loginButton")}</Button>
      </form>

      <p className={`mt-3 min-h-5 text-xs font-semibold ${feedback ? "text-amber-700" : "text-slate-400"}`} aria-live="polite">{feedback}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs font-bold">
        <a href={isRegister ? "/login" : "/register"} className="text-brand hover:text-brand-dark">{isRegister ? t("auth.alreadyHaveAccount") : t("auth.needAccount")}</a>
        <a href="/forgot-password" className="text-slate-500 hover:text-brand">{t("auth.forgotPassword")}</a>
      </div>
    </Card>
  );
}
