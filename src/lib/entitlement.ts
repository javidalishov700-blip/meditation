import { breaths, extras, meditations, sleepLab, stories, todaysClarity, writings } from './library'
import { quotes } from './quotes'
import { programs } from './content'
import { PRO_LISTEN_MINUTES, TONES } from './audio'
import { isTrialActive } from './onboard'
import { readJson, writeJson } from './storage'
import type { StringKey } from './strings'
import type { PlanId, SessionKind } from './types'

export const STEADY_PRO_EVENT = 'steady-pro'

export const PLANS: {
  id: PlanId
  price: string
  featured?: boolean
}[] = [
  { id: 'week', price: '$3.99' },
  { id: 'month', price: '$12.99', featured: true },
  { id: 'year', price: '$59.99' },
]

/** Fallback only when App Store prices have not loaded. Never tied to UI language. */
export function displayPlanPrice(id: PlanId): string {
  return PLANS.find((p) => p.id === id)?.price ?? ''
}

export const FREE_NATURE_IDS = ['rain', 'piano'] as const

export type AccessExtra = { day?: number; step?: string }

/** Which App Store product the cached entitlement came from, and when it lapses. */
export type ProInfo = { productId?: string; expiresAt?: number }

/**
 * A renewal StoreKit confirmed while the app was closed lands on the next launch
 * or resume. Trust a just-lapsed cache this long so a paying subscriber is never
 * locked out over renewal timing or a moment offline.
 */
const RENEWAL_GRACE_MS = 48 * 60 * 60 * 1000

export function readProInfo(): ProInfo {
  return readJson<ProInfo>('pro.info', {})
}

/**
 * The on-device mirror of StoreKit's answer — never a local grant.
 *
 * Only `setPro`, called from lib/purchases.ts with what StoreKit actually
 * reported, writes it. A cached flag is honoured only when it carries the
 * product id StoreKit issued it for: a bare `pro: true` with no provenance is a
 * leftover from a build that unlocked locally, and is dropped on sight.
 */
export function hasStoreEntitlement(): boolean {
  if (!readJson('pro', false)) return false
  const info = readProInfo()
  if (!info.productId) {
    clearStalePro()
    return false
  }
  if (info.expiresAt && info.expiresAt * 1000 + RENEWAL_GRACE_MS < Date.now()) {
    clearStalePro()
    return false
  }
  return true
}

function clearStalePro() {
  writeJson('pro', false)
  writeJson('pro.info', {})
}

export function isPro(): boolean {
  return hasStoreEntitlement() || isTrialActive()
}

/** StoreKit is the only caller. `info` carries the transaction that granted it. */
export function setPro(value: boolean, info?: ProInfo) {
  writeJson('pro', value)
  writeJson('pro.info', value ? info || {} : {})
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(STEADY_PRO_EVENT))
}

export function isItemFree(kind: SessionKind, id: string, extra?: AccessExtra): boolean {
  if (kind === 'program') {
    const p = programs.find((x) => x.id === id)
    if (!p) return false
    const d = extra?.day ?? 1
    return d <= p.freeDays
  }
  if (kind === 'story') return stories.find((s) => s.id === id)?.free === true
  if (kind === 'writing') return writings.find((w) => w.id === id)?.free === true
  if (kind === 'breath') return breaths.find((b) => b.id === id)?.free === true
  if (kind === 'clarity') return id === todaysClarity().id
  if (kind === 'meditation') {
    const path = meditations.find((m) => m.id === id)
    if (!path?.free) return false
    const stepId = extra?.step
    if (!stepId) return true
    return path.steps[0]?.id === stepId
  }
  if (kind === 'sleeplab') return sleepLab.find((s) => s.id === id)?.free === true
  if (kind === 'tone') return TONES.find((t) => t.id === id)?.trialSeconds != null
  if (kind === 'nature') return (FREE_NATURE_IDS as readonly string[]).includes(id)
  if (kind === 'extra') return extras.find((e) => e.id === id)?.free === true
  return false
}

export function quoteFree(id: string): boolean {
  return quotes.find((q) => q.id === id)?.free === true
}

export function canAccess(kind: SessionKind, id: string, extra?: AccessExtra): boolean {
  if (isPro()) return true
  return isItemFree(kind, id, extra)
}

export function canListenMinutes(minutes: number): boolean {
  if (isPro()) return true
  return minutes < PRO_LISTEN_MINUTES
}

export const FREE_KEYS: StringKey[] = [
  'pay_free_sos',
  'pay_free_174',
  'pay_free_one',
  'pay_free_first',
  'pay_free_panic',
  'pay_free_clarity',
  'pay_free_listen',
]

export const PRO_KEYS: StringKey[] = ['pay_pro_doors', 'pay_pro_panic', 'pay_pro_sleep', 'pay_pro_rest', 'pay_pro_history']
