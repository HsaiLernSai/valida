"use client";

import { useEffect } from "react";
import { applyThemePreference, getUserSettings } from "@/lib/user-settings";

export function ThemeController() {
  useEffect(() => {
    const syncTheme = () => applyThemePreference(getUserSettings().theme);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    syncTheme();
    window.addEventListener("valida-settings-change", syncTheme);
    mediaQuery.addEventListener("change", syncTheme);
    return () => {
      window.removeEventListener("valida-settings-change", syncTheme);
      mediaQuery.removeEventListener("change", syncTheme);
    };
  }, []);

  return null;
}
