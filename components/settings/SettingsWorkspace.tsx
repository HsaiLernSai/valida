"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { clearAuthUser, getAuthUser, saveAuthUser } from "@/lib/auth-storage";
import { researchGoals } from "@/lib/research-defaults";
import { applyThemePreference, defaultUserSettings, getUserSettings, resetLocalUserData, resetUserSettings, saveUserSettings } from "@/lib/user-settings";
import type { AuthUser, ThemePreference, UserSettings } from "@/lib/types";

const languages = [
  { value: "en", label: "English" },
  { value: "th", label: "Thai" },
  { value: "my", label: "Myanmar" },
  { value: "zh", label: "Chinese" },
];

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
    <label className="flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-brand/25 hover:shadow-sm">
      <span><span className="block text-sm font-extrabold text-ink">{label}</span><span className="mt-0.5 block text-xs leading-5 text-slate-500">{description}</span></span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-blue-600" />
    </label>
  );
}

export function SettingsWorkspace() {
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

  const persistSettings = (nextSettings: UserSettings, message = "Settings saved locally.") => {
    setSettings(nextSettings);
    saveUserSettings(nextSettings);
    applyThemePreference(nextSettings.theme);
    setFeedback(message);
  };
  const updateUser = (updates: Partial<AuthUser>, message = "Account saved locally.") => {
    if (!user) return;
    const nextUser = { ...user, ...updates };
    if (!saveAuthUser(nextUser)) {
      setFeedback("Could not save account changes in this browser.");
      return;
    }
    setUser(nextUser);
    setFeedback(message);
  };

  if (!checked || !user) {
    return (
      <div className="min-h-screen bg-app-gradient">
        <main className="grid min-h-screen place-items-center px-4"><Card className="max-w-sm p-6 text-center"><div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-brand-soft" /><p className="mt-3 text-sm font-bold text-slate-600">Checking your Valida session…</p></Card></main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-gradient">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <ValidaLogo variant="compact" />
          <nav className="flex items-center gap-2" aria-label="Settings navigation"><a href="/profile" className="rounded-xl px-2 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-brand">Profile</a><a href="/" className="rounded-xl px-2 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-brand">Community</a></nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">User settings</p><h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink">Settings</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Manage your local Valida profile, preferences, privacy, and account controls. These settings are ready for future backend integration but remain browser-local today.</p></div>
          <a href="/profile" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-xs font-bold text-slate-600 shadow-sm hover:text-brand">View profile</a>
        </div>

        <div className="space-y-4">
          <SettingsCard eyebrow="Account" title="Account details" description="Identity fields for the local authenticated user. Email remains read-only until backend auth exists.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="settings-display-name" className="text-xs font-bold text-slate-600">Display name</label><input id="settings-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" /></div>
              <div><label htmlFor="settings-email" className="text-xs font-bold text-slate-600">Email</label><input id="settings-email" readOnly value={user.email} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 outline-none" /></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2"><Button type="button" onClick={() => updateUser({ displayName: displayName.trim() || user.displayName })} className="min-h-11 rounded-xl px-4 text-xs">Save account</Button><Button type="button" variant="secondary" onClick={() => setFeedback("Change Password is a placeholder until backend authentication is approved.")} className="min-h-11 rounded-xl px-4 text-xs">Change Password</Button></div>
          </SettingsCard>

          <SettingsCard eyebrow="Appearance" title="Theme" description="Theme selection is persisted locally and can later map to account preferences.">
            <div className="grid gap-2 sm:grid-cols-3">{(["light", "dark", "system"] as ThemePreference[]).map((theme) => <button key={theme} type="button" onClick={() => persistSettings({ ...settings, theme }, `${theme[0].toUpperCase()}${theme.slice(1)} theme saved locally.`)} className={`min-h-20 rounded-2xl border px-4 text-left transition ${settings.theme === theme ? "border-brand/40 bg-brand-soft text-brand-dark" : "border-slate-200 bg-white text-slate-600 hover:border-brand/25 hover:shadow-sm"}`}><span className="block text-sm font-black capitalize">{theme} mode</span><span className="mt-1 block text-xs text-slate-500">{theme === "system" ? "Follow this device" : `Use ${theme} colors`}</span></button>)}</div>
          </SettingsCard>

          <SettingsCard eyebrow="Language" title="Preferred language" description="Ready for future Auto Translate integration; no translation is performed in this sprint.">
            <select value={user.preferredLanguage} onChange={(event) => updateUser({ preferredLanguage: event.target.value }, "Preferred language saved locally.")} className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10">{languages.map((language) => <option key={language.value} value={language.value}>{language.label}</option>)}</select>
          </SettingsCard>

          <SettingsCard eyebrow="Notifications" title="Notification preferences" description="Frontend toggles only. No notification delivery exists yet.">
            <div className="space-y-2">
              <ToggleRow label="Research updates" description="Updates about research you create or follow." checked={settings.notifications.researchUpdates} onChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, researchUpdates: value } })} />
              <ToggleRow label="Comment notifications" description="Activity on research conversations." checked={settings.notifications.commentNotifications} onChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, commentNotifications: value } })} />
              <ToggleRow label="Product announcements" description="Occasional Valida product news." checked={settings.notifications.productAnnouncements} onChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, productAnnouncements: value } })} />
            </div>
          </SettingsCard>

          <SettingsCard eyebrow="Privacy" title="Profile visibility" description="Local privacy preferences only; no public profile is published yet.">
            <div className="space-y-2">
              <ToggleRow label="Public Profile" description="Prepare your profile for future public visibility." checked={settings.privacy.publicProfile} onChange={(value) => persistSettings({ ...settings, privacy: { ...settings.privacy, publicProfile: value } })} />
              <ToggleRow label="Show Participated Research" description="Allow future profiles to display completed research." checked={settings.privacy.showParticipatedResearch} onChange={(value) => persistSettings({ ...settings, privacy: { ...settings.privacy, showParticipatedResearch: value } })} />
              <ToggleRow label="Show Bookmarks" description="Allow future profiles to display saved research." checked={settings.privacy.showBookmarks} onChange={(value) => persistSettings({ ...settings, privacy: { ...settings.privacy, showBookmarks: value } })} />
            </div>
          </SettingsCard>

          <SettingsCard eyebrow="Research preferences" title="Defaults for future research" description="These preferences do not alter the existing Create Research Wizard yet.">
            <div className="grid gap-4 sm:grid-cols-3">
              <div><label htmlFor="default-language" className="text-xs font-bold text-slate-600">Default Research Language</label><select id="default-language" value={settings.researchPreferences.defaultResearchLanguage} onChange={(event) => persistSettings({ ...settings, researchPreferences: { ...settings.researchPreferences, defaultResearchLanguage: event.target.value } })} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10">{languages.map((language) => <option key={language.value} value={language.value}>{language.label}</option>)}</select></div>
              <div><label htmlFor="default-audience" className="text-xs font-bold text-slate-600">Default Audience</label><input id="default-audience" value={settings.researchPreferences.defaultAudience} onChange={(event) => persistSettings({ ...settings, researchPreferences: { ...settings.researchPreferences, defaultAudience: event.target.value } })} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" /></div>
              <div><label htmlFor="default-type" className="text-xs font-bold text-slate-600">Default Research Type</label><select id="default-type" value={settings.researchPreferences.defaultResearchType} onChange={(event) => persistSettings({ ...settings, researchPreferences: { ...settings.researchPreferences, defaultResearchType: event.target.value as UserSettings["researchPreferences"]["defaultResearchType"] } })} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10">{researchGoals.map((goal) => <option key={goal.value} value={goal.value}>{goal.value}</option>)}</select></div>
            </div>
          </SettingsCard>

          <SettingsCard eyebrow="Danger zone" title="Local account controls" description="These controls only affect this browser. Delete Local Account remains a placeholder until real accounts exist.">
            <div className="grid gap-2 sm:grid-cols-2">
              <LogoutButton className="min-h-11 rounded-xl px-4" />
              <Button type="button" variant="secondary" onClick={() => { clearAuthUser(); window.location.href = "/login"; }} className="min-h-11 rounded-xl px-4 text-xs">Clear Local Session</Button>
              <Button type="button" variant="secondary" onClick={() => { resetLocalUserData(); setFeedback("Local research, participation, and engagement data reset in this browser."); }} className="min-h-11 rounded-xl px-4 text-xs">Reset Local User Data</Button>
              <Button type="button" variant="secondary" onClick={() => { resetUserSettings(); const reset = getUserSettings(); persistSettings(reset, "Settings reset to defaults."); }} className="min-h-11 rounded-xl px-4 text-xs">Reset Settings</Button>
              <Button type="button" variant="secondary" onClick={() => setFeedback("Delete Local Account is a placeholder until backend account deletion is approved.")} className="min-h-11 rounded-xl px-4 text-xs sm:col-span-2">Delete Local Account</Button>
            </div>
          </SettingsCard>
        </div>
        <p className={`mt-4 min-h-5 text-xs font-semibold ${feedback.includes("placeholder") || feedback.includes("Could") ? "text-amber-700" : "text-emerald-700"}`} aria-live="polite">{feedback}</p>
      </main>
      <MobileBottomNav />
    </div>
  );
}
