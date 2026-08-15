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
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  localStorage.removeItem(PREFIX + key)
}
