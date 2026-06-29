import { STORAGE_KEYS } from "@/lib/browser-storage";
import type { ThemePreference, UserSettings } from "@/lib/types";

export const USER_SETTINGS_STORAGE_KEY = "valida:user-settings";

export const defaultUserSettings: UserSettings = {
  theme: "system",
  notifications: {
    researchUpdates: true,
    commentNotifications: true,
    productAnnouncements: false,
  },
  privacy: {
    publicProfile: false,
    showParticipatedResearch: true,
    showBookmarks: false,
  },
  researchPreferences: {
    defaultResearchLanguage: "en",
    defaultAudience: "Product builders",
    defaultResearchType: "Collect Survey",
  },
};

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function mergeSettings(value: unknown): UserSettings {
  if (typeof value !== "object" || value === null) return defaultUserSettings;
  const candidate = value as Record<string, unknown>;
  const notifications = typeof candidate.notifications === "object" && candidate.notifications !== null ? candidate.notifications as Record<string, unknown> : {};
  const privacy = typeof candidate.privacy === "object" && candidate.privacy !== null ? candidate.privacy as Record<string, unknown> : {};
  const researchPreferences = typeof candidate.researchPreferences === "object" && candidate.researchPreferences !== null ? candidate.researchPreferences as Record<string, unknown> : {};

  return {
    theme: isThemePreference(candidate.theme) ? candidate.theme : defaultUserSettings.theme,
    notifications: {
      researchUpdates: isBoolean(notifications.researchUpdates) ? notifications.researchUpdates : defaultUserSettings.notifications.researchUpdates,
      commentNotifications: isBoolean(notifications.commentNotifications) ? notifications.commentNotifications : defaultUserSettings.notifications.commentNotifications,
      productAnnouncements: isBoolean(notifications.productAnnouncements) ? notifications.productAnnouncements : defaultUserSettings.notifications.productAnnouncements,
    },
    privacy: {
      publicProfile: isBoolean(privacy.publicProfile) ? privacy.publicProfile : defaultUserSettings.privacy.publicProfile,
      showParticipatedResearch: isBoolean(privacy.showParticipatedResearch) ? privacy.showParticipatedResearch : defaultUserSettings.privacy.showParticipatedResearch,
      showBookmarks: isBoolean(privacy.showBookmarks) ? privacy.showBookmarks : defaultUserSettings.privacy.showBookmarks,
    },
    researchPreferences: {
      defaultResearchLanguage: typeof researchPreferences.defaultResearchLanguage === "string" ? researchPreferences.defaultResearchLanguage : defaultUserSettings.researchPreferences.defaultResearchLanguage,
      defaultAudience: typeof researchPreferences.defaultAudience === "string" ? researchPreferences.defaultAudience : defaultUserSettings.researchPreferences.defaultAudience,
      defaultResearchType: typeof researchPreferences.defaultResearchType === "string" ? researchPreferences.defaultResearchType as UserSettings["researchPreferences"]["defaultResearchType"] : defaultUserSettings.researchPreferences.defaultResearchType,
    },
  };
}

export function getUserSettings(): UserSettings {
  const storage = getStorage();
  if (!storage) return defaultUserSettings;

  try {
    const rawValue = storage.getItem(USER_SETTINGS_STORAGE_KEY);
    return rawValue ? mergeSettings(JSON.parse(rawValue)) : defaultUserSettings;
  } catch {
    return defaultUserSettings;
  }
}

export function saveUserSettings(settings: UserSettings): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(USER_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("valida-settings-change"));
    return true;
  } catch {
    return false;
  }
}

export function resetUserSettings(): void {
  saveUserSettings(defaultUserSettings);
}

export function resetLocalUserData(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEYS.participationHistory);
    window.localStorage.removeItem(STORAGE_KEYS.communityEngagements);
    window.sessionStorage.removeItem(STORAGE_KEYS.researchPosts);
  } finally {
    window.dispatchEvent(new Event("valida-local-data-reset"));
  }
}

export function resolveTheme(theme: ThemePreference): "light" | "dark" {
  if (theme !== "system") return theme;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export function applyThemePreference(theme: ThemePreference): void {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(theme);
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("valida-dark", resolved === "dark");
}
