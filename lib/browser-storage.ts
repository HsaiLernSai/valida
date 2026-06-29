export const STORAGE_SCHEMA_VERSION = 1 as const;

export const STORAGE_KEYS = {
  researchPosts: "valida:session-posts",
  participationHistory: "valida:participation-history",
  communityEngagements: "valida:community-engagements",
} as const;

type StorageKind = "local" | "session";

interface VersionedCollection<T> {
  version: typeof STORAGE_SCHEMA_VERSION;
  data: T[];
}

function getBrowserStorage(kind: StorageKind): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function isVersionedCollection(value: unknown): value is { version: unknown; data: unknown[] } {
  return typeof value === "object" && value !== null && "version" in value && "data" in value && Array.isArray(value.data);
}

export function readStoredCollection<T>(
  kind: StorageKind,
  key: string,
  isItem: (value: unknown) => value is T,
): T[] {
  const storage = getBrowserStorage(kind);
  if (!storage) return [];

  try {
    const rawValue = storage.getItem(key);
    if (!rawValue) return [];

    const parsed: unknown = JSON.parse(rawValue);

    if (isVersionedCollection(parsed)) {
      if (parsed.version !== STORAGE_SCHEMA_VERSION || !parsed.data.every(isItem)) return [];
      return parsed.data;
    }

    // v0 stored bare arrays. Read and upgrade valid records so existing
    // browser sessions keep working after schema versioning is introduced.
    if (Array.isArray(parsed) && parsed.every(isItem)) {
      writeStoredCollection(kind, key, parsed);
      return parsed;
    }
  } catch {
    return [];
  }

  return [];
}

export function writeStoredCollection<T>(kind: StorageKind, key: string, data: T[]): boolean {
  const storage = getBrowserStorage(kind);
  if (!storage) return false;

  const payload: VersionedCollection<T> = {
    version: STORAGE_SCHEMA_VERSION,
    data,
  };

  try {
    storage.setItem(key, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}
