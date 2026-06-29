import type { AuthUser } from "@/lib/types";

export const AUTH_STORAGE_KEY = "valida:auth-session";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.userId === "string" &&
    typeof candidate.displayName === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.avatar === "string" &&
    typeof candidate.preferredLanguage === "string" &&
    typeof candidate.createdAt === "string"
  );
}

function createUserId(email: string): string {
  return `local-${email.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || Date.now()}`;
}

export function createLocalUser(email: string, displayName?: string): AuthUser {
  const normalizedEmail = email.trim().toLocaleLowerCase();
  const fallbackName = normalizedEmail.split("@")[0]?.replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toLocaleUpperCase()) || "Valida User";

  return {
    userId: createUserId(normalizedEmail),
    displayName: displayName?.trim() || fallbackName,
    email: normalizedEmail,
    avatar: "YU",
    preferredLanguage: "en",
    createdAt: new Date().toISOString(),
    bio: "",
    accountStatus: "Local active",
  };
}

export function getAuthUser(): AuthUser | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const rawValue = storage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) return null;
    const parsed: unknown = JSON.parse(rawValue);
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAuthUser(user: AuthUser): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("valida-auth-change"));
    return true;
  } catch {
    return false;
  }
}

export function clearAuthUser(): void {
  const storage = getStorage();
  try {
    storage?.removeItem(AUTH_STORAGE_KEY);
  } finally {
    if (typeof window !== "undefined") window.dispatchEvent(new Event("valida-auth-change"));
  }
}
