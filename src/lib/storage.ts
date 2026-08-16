const PREFIX = 'steady.'

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function readStringList(key: string): string[] {
  const v = readJson<unknown>(key, [])
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
}

export function readRecordList<T extends object>(key: string): T[] {
  const v = readJson<unknown>(key, [])
  return Array.isArray(v) ? v.filter((x): x is T => Boolean(x) && typeof x === 'object') : []
}

export function writeJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* quota / private mode */
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* private mode / disabled storage */
  }
}

export const SCHEMA_VERSION = 1

/** Stamp and reshape local keys after an app update. v0 had no version field. */
export function migrateStorage(): void {
  const from = readJson<number>('schemaVersion', 0)
  if (from === SCHEMA_VERSION) return
  if (from > SCHEMA_VERSION) {
    writeJson('schemaVersion', SCHEMA_VERSION)
    return
  }
  writeJson('schemaVersion', SCHEMA_VERSION)
}
