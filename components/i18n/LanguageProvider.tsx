"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getAuthUser, saveAuthUser } from "@/lib/auth-storage";
import { defaultLanguage, normalizeLanguage, translate } from "@/lib/i18n";
import { getUserSettings, saveUserSettings } from "@/lib/user-settings";
import type { LanguageCode } from "@/lib/types";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    const syncLanguage = () => {
      const settings = getUserSettings();
      const user = getAuthUser();
      setLanguageState(normalizeLanguage(user?.preferredLanguage ?? settings.researchPreferences.defaultResearchLanguage));
    };
    syncLanguage();
    window.addEventListener("valida-settings-change", syncLanguage);
    window.addEventListener("valida-auth-change", syncLanguage);
    window.addEventListener("storage", syncLanguage);
    return () => {
      window.removeEventListener("valida-settings-change", syncLanguage);
      window.removeEventListener("valida-auth-change", syncLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: (nextLanguage) => {
      const normalized = normalizeLanguage(nextLanguage);
      const settings = getUserSettings();
      saveUserSettings({
        ...settings,
        researchPreferences: {
          ...settings.researchPreferences,
          defaultResearchLanguage: normalized,
        },
      });
      const user = getAuthUser();
      if (user) saveAuthUser({ ...user, preferredLanguage: normalized });
      setLanguageState(normalized);
    },
    t: (key, values) => translate(language, key, values),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useI18n must be used inside LanguageProvider");
  return context;
}
