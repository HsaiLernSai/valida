"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { clearAuthUser, getAuthUser, saveAuthUser } from "@/lib/auth-storage";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { supportedLanguages } from "@/lib/i18n";
import { researchGoals } from "@/lib/research-defaults";
import { applyThemePreference, defaultUserSettings, getUserSettings, resetLocalUserData, resetUserSettings, saveUserSettings } from "@/lib/user-settings";
import type { AuthUser, ThemePreference, UserSettings } from "@/lib/types";

function SettingsCard({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card className="p-5 sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-black text-ink">{title}</h2>
      {description && <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>}
      <div className="mt-5">{children}</div>
    </Card>
  );
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-surface px-4 py-3 transition hover:border-brand/25 hover:shadow-sm">
      <span><span className="block text-sm font-extrabold text-ink">{label}</span><span className="mt-0.5 block text-xs leading-5 text-slate-500">{description}</span></span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-blue-600" />
    </label>
  );
}

export function SettingsWorkspace() {
  const { language, setLanguage, t } = useI18n();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [settings, setSettings] = useState<UserSettings>(defaultUserSettings);
  const [displayName, setDisplayName] = useState("");
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const currentUser = getAuthUser();
    if (!currentUser) {
      window.location.replace(`/login?next=${encodeURIComponent("/settings")}`);
      return;
    }
    const currentSettings = getUserSettings();
    setUser(currentUser);
    setDisplayName(currentUser.displayName);
    setSettings(currentSettings);
    applyThemePreference(currentSettings.theme);
    setChecked(true);
  }, []);

  const persistSettings = (nextSettings: UserSettings, message = t("settings.savedLocally")) => {
    setSettings(nextSettings);
    saveUserSettings(nextSettings);
    applyThemePreference(nextSettings.theme);
    setFeedback(message);
  };
  const updateUser = (updates: Partial<AuthUser>, message = t("settings.accountSaved")) => {
    if (!user) return;
    const nextUser = { ...user, ...updates };
    if (!saveAuthUser(nextUser)) {
      setFeedback(t("settings.accountSaveFailed"));
      return;
    }
    setUser(nextUser);
    setFeedback(message);
  };

  if (!checked || !user) {
    return (
      <div className="min-h-screen bg-app-gradient">
        <main className="grid min-h-screen place-items-center px-4"><Card className="max-w-sm p-6 text-center"><div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-brand-soft" /><p className="mt-3 text-sm font-bold text-slate-600">{t("auth.checkingSession")}</p></Card></main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-surface/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <ValidaLogo variant="compact" />
          <nav className="flex items-center gap-2" aria-label="Settings navigation"><a href="/profile" className="rounded-xl px-2 py-2 text-xs font-bold text-slate-500 hover:bg-surface hover:text-brand">{t("navigation.profile")}</a><a href="/" className="rounded-xl px-2 py-2 text-xs font-bold text-slate-500 hover:bg-surface hover:text-brand">{t("app.community")}</a></nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">{t("settings.eyebrow")}</p><h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink">{t("settings.title")}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{t("settings.intro")}</p></div>
          <a href="/profile" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-surface px-4 text-xs font-bold text-slate-600 shadow-sm hover:text-brand">{t("buttons.viewProfile")}</a>
        </div>

        <div className="space-y-4">
          <SettingsCard eyebrow={t("navigation.account")} title={t("settings.accountTitle")} description={t("settings.accountDescription")}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="settings-display-name" className="text-xs font-bold text-slate-600">{t("profile.displayName")}</label><input id="settings-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" /></div>
              <div><label htmlFor="settings-email" className="text-xs font-bold text-slate-600">{t("profile.email")}</label><input id="settings-email" readOnly value={user.email} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-surface px-3 text-sm text-slate-500 outline-none" /></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2"><Button type="button" onClick={() => updateUser({ displayName: displayName.trim() || user.displayName })} className="min-h-11 rounded-xl px-4 text-xs">{t("settings.saveAccount")}</Button><Button type="button" variant="secondary" onClick={() => setFeedback(t("settings.changePasswordPlaceholder"))} className="min-h-11 rounded-xl px-4 text-xs">{t("settings.changePassword")}</Button></div>
          </SettingsCard>

          <SettingsCard eyebrow={t("settings.appearance")} title={t("settings.theme")} description={t("settings.themeDescription")}>
            <div className="grid gap-2 sm:grid-cols-3">{(["light", "dark", "system"] as ThemePreference[]).map((theme) => <button key={theme} type="button" onClick={() => persistSettings({ ...settings, theme }, t("settings.themeSaved", { theme: theme[0].toUpperCase() + theme.slice(1) }))} className={`min-h-20 rounded-2xl border px-4 text-left transition ${settings.theme === theme ? "border-brand/40 bg-brand-soft text-brand-dark" : "border-slate-200 bg-surface text-slate-600 hover:border-brand/25 hover:shadow-sm"}`}><span className="block text-sm font-black capitalize">{t(theme === "light" ? "settings.lightMode" : theme === "dark" ? "settings.darkMode" : "settings.systemMode")}</span><span className="mt-1 block text-xs text-slate-500">{theme === "system" ? t("settings.followDevice") : t(theme === "light" ? "settings.useLightColors" : "settings.useDarkColors")}</span></button>)}</div>
          </SettingsCard>

          <SettingsCard eyebrow={t("settings.language")} title={t("settings.preferredLanguage")} description={t("settings.languageDescription")}>
            <select value={language} onChange={(event) => { const nextLanguage = event.target.value as typeof language; setLanguage(nextLanguage); setUser({ ...user, preferredLanguage: nextLanguage }); setFeedback(t("settings.languageSaved")); }} className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10">{supportedLanguages.map((option) => <option key={option.code} value={option.code}>{option.nativeLabel} · {t(`language.${option.code}`)}</option>)}</select>
          </SettingsCard>

          <SettingsCard eyebrow={t("settings.notifications")} title={t("settings.notificationPreferences")} description={t("settings.notificationsDescription")}>
            <div className="space-y-2">
              <ToggleRow label={t("settings.researchUpdates")} description={t("settings.researchUpdatesDescription")} checked={settings.notifications.researchUpdates} onChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, researchUpdates: value } })} />
              <ToggleRow label={t("settings.commentNotifications")} description={t("settings.commentNotificationsDescription")} checked={settings.notifications.commentNotifications} onChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, commentNotifications: value } })} />
              <ToggleRow label={t("settings.productAnnouncements")} description={t("settings.productAnnouncementsDescription")} checked={settings.notifications.productAnnouncements} onChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, productAnnouncements: value } })} />
            </div>
          </SettingsCard>

          <SettingsCard eyebrow={t("settings.privacy")} title={t("settings.profileVisibility")} description={t("settings.privacyDescription")}>
            <div className="space-y-2">
              <ToggleRow label={t("settings.publicProfile")} description={t("settings.publicProfileDescription")} checked={settings.privacy.publicProfile} onChange={(value) => persistSettings({ ...settings, privacy: { ...settings.privacy, publicProfile: value } })} />
              <ToggleRow label={t("settings.showParticipatedResearch")} description={t("settings.showParticipatedResearchDescription")} checked={settings.privacy.showParticipatedResearch} onChange={(value) => persistSettings({ ...settings, privacy: { ...settings.privacy, showParticipatedResearch: value } })} />
              <ToggleRow label={t("settings.showBookmarks")} description={t("settings.showBookmarksDescription")} checked={settings.privacy.showBookmarks} onChange={(value) => persistSettings({ ...settings, privacy: { ...settings.privacy, showBookmarks: value } })} />
            </div>
          </SettingsCard>

          <SettingsCard eyebrow={t("settings.researchPreferences")} title={t("settings.defaultsTitle")} description={t("settings.defaultsDescription")}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><label htmlFor="default-language" className="text-xs font-bold text-slate-600">{t("settings.defaultResearchLanguage")}</label><select id="default-language" value={settings.researchPreferences.defaultResearchLanguage} onChange={(event) => persistSettings({ ...settings, researchPreferences: { ...settings.researchPreferences, defaultResearchLanguage: event.target.value } })} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10">{supportedLanguages.map((option) => <option key={option.code} value={option.code}>{option.nativeLabel} · {t(`language.${option.code}`)}</option>)}</select></div>
              <div><label htmlFor="default-audience" className="text-xs font-bold text-slate-600">{t("settings.defaultAudience")}</label><input id="default-audience" value={settings.researchPreferences.defaultAudience} onChange={(event) => persistSettings({ ...settings, researchPreferences: { ...settings.researchPreferences, defaultAudience: event.target.value } })} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" /></div>
              <div><label htmlFor="default-type" className="text-xs font-bold text-slate-600">{t("settings.defaultResearchType")}</label><select id="default-type" value={settings.researchPreferences.defaultResearchType} onChange={(event) => persistSettings({ ...settings, researchPreferences: { ...settings.researchPreferences, defaultResearchType: event.target.value as UserSettings["researchPreferences"]["defaultResearchType"] } })} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10">{researchGoals.map((goal) => <option key={goal.value} value={goal.value}>{goal.value}</option>)}</select></div>
            </div>
          </SettingsCard>

          <SettingsCard eyebrow={t("settings.dangerZone")} title={t("settings.localControls")} description={t("settings.dangerDescription")}>
            <div className="grid gap-2 sm:grid-cols-2">
              <LogoutButton className="min-h-11 rounded-xl px-4" />
              <Button type="button" variant="secondary" onClick={() => { clearAuthUser(); window.location.href = "/login"; }} className="min-h-11 rounded-xl px-4 text-xs">{t("settings.clearLocalSession")}</Button>
              <Button type="button" variant="secondary" onClick={() => { resetLocalUserData(); setFeedback(t("settings.resetLocalUserDataDone")); }} className="min-h-11 rounded-xl px-4 text-xs">{t("settings.resetLocalUserData")}</Button>
              <Button type="button" variant="secondary" onClick={() => { resetUserSettings(); const reset = getUserSettings(); persistSettings(reset, t("settings.resetSettingsDone")); }} className="min-h-11 rounded-xl px-4 text-xs">{t("settings.resetSettings")}</Button>
              <Button type="button" variant="secondary" onClick={() => setFeedback(t("settings.deletePlaceholder"))} className="min-h-11 rounded-xl px-4 text-xs sm:col-span-2">{t("settings.deleteLocalAccount")}</Button>
            </div>
          </SettingsCard>
        </div>
        <p className={`mt-4 min-h-5 text-xs font-semibold ${feedback.includes("placeholder") || feedback.includes("Could") ? "text-amber-700" : "text-emerald-700"}`} aria-live="polite">{feedback}</p>
      </main>
      <MobileBottomNav />
    </div>
  );
}
