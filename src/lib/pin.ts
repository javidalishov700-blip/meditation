import { readJson, removeKey, writeJson } from './storage'

const HASH_KEY = 'pin.hash'
const SALT_KEY = 'pin.salt'
const SESSION = 'steady.pin.unlock'

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((fn) => fn())
}

export function subscribePin(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function randomSalt(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function digest(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function isPinDigits(value: string): boolean {
  return /^\d{4}$/.test(value)
}

export function hasPin(): boolean {
  return Boolean(readJson<string | null>(HASH_KEY, null))
}

export function isSessionUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION) === '1'
  } catch {
    return false
  }
}

export function needsLock(): boolean {
  return hasPin() && !isSessionUnlocked()
}

export function unlockSession() {
  try {
    sessionStorage.setItem(SESSION, '1')
  } catch {
    /* private mode */
  }
  emit()
}

export function lockNow() {
  try {
    sessionStorage.removeItem(SESSION)
  } catch {
    /* ignore */
  }
  emit()
}

export async function setPin(pin: string): Promise<boolean> {
  if (!isPinDigits(pin)) return false
  const salt = randomSalt()
  const hash = await digest(`${salt}:${pin}`)
  writeJson(SALT_KEY, salt)
  writeJson(HASH_KEY, hash)
  unlockSession()
  return true
}

export async function checkPin(pin: string): Promise<boolean> {
  if (!isPinDigits(pin) || !hasPin()) return false
  const salt = readJson(SALT_KEY, '')
  const hash = readJson(HASH_KEY, '')
  return hash === (await digest(`${salt}:${pin}`))
}

export function clearPin() {
  removeKey(HASH_KEY)
  removeKey(SALT_KEY)
  try {
    sessionStorage.removeItem(SESSION)
  } catch {
    /* ignore */
  }
  emit()
}

export function supportId(): string {
  const existing = readJson<string | null>('supportId', null)
  if (existing && /^[A-Za-z0-9]{8,12}$/.test(existing)) return existing
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  const bytes = new Uint8Array(9)
  crypto.getRandomValues(bytes)
  const id = [...bytes].map((b) => chars[b % chars.length]).join('')
  writeJson('supportId', id)
  return id
}
