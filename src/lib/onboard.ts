import { isNativeApp } from './device'
import type { StringKey } from './strings'
import { readJson, writeJson } from './storage'

export const STEADY_TRIAL_EVENT = 'steady-trial'

export function emitTrialChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(STEADY_TRIAL_EVENT))
}

export const TRIAL_DAYS = 3
export const TRIAL_MS = TRIAL_DAYS * 24 * 60 * 60 * 1000

export type BringId = 'wave' | 'worry' | 'sleep' | 'world' | 'self'
export type NeedId = 'stop' | 'sleep' | 'sentence' | 'breath'
export type FreqId = 'rarely' | 'sometimes' | 'often' | 'always'
export type HoursId = 'lt6' | 'h67' | 'h78' | 'h89' | 'h9'
export type WakeId = 'every' | 'most' | 'sometimes' | 'rarely'
export type FallId = 'meditate' | 'story' | 'nature'
export type MedexId = 'none' | 'some' | 'skip'
export type AgreeId = 'yes' | 'no'

export type OnboardAnswers = {
  bring?: BringId
  need?: NeedId
  often?: FreqId
  sleepHard?: FreqId
  hours?: HoursId
  wake?: WakeId
  fall: FallId[]
  medex?: MedexId
  agree1?: AgreeId
  agree2?: AgreeId
  remindQuote: boolean
  remindSleep: boolean
  remindTrial: boolean
}

const EMPTY: OnboardAnswers = {
  fall: [],
  remindQuote: false,
  remindSleep: false,
  remindTrial: true,
}

const listeners = new Set<() => void>()

export function subscribeOnboard(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function emit() {
  listeners.forEach((fn) => fn())
}

export function isOnboarded(): boolean {
  return readJson('onboarded', false)
}

export function readOnboard(): OnboardAnswers {
  const raw = readJson<Partial<OnboardAnswers>>('onboard', {})
  return { ...EMPTY, ...raw, fall: raw.fall ?? [] }
}

export function completeOnboard(answers: OnboardAnswers) {
  writeJson('onboard', answers)
  writeJson('onboarded', true)
  emit()
}

export function patchOnboard(partial: Partial<OnboardAnswers>) {
  writeJson('onboard', { ...readOnboard(), ...partial })
  emit()
}

/** Highest-intensity answers. Not a diagnosis — a reason to show the crisis card. */
export function onboardHighLoad(a: OnboardAnswers): boolean {
  return a.often === 'always' || a.sleepHard === 'always' || a.wake === 'every'
}

export function resetOnboard() {
  writeJson('onboarded', false)
  emit()
}

export function trialUntil(): number {
  return readJson('trialUntil', 0)
}

export function isTrialActive(): boolean {
  return trialUntil() > Date.now()
}

export function trialUsed(): boolean {
  return trialUntil() !== 0
}

export function startTrial() {
  if (trialUsed()) return
  writeJson('trialUntil', Date.now() + TRIAL_MS)
  emitTrialChange()
}

export function clearTrial() {
  writeJson('trialUntil', 0)
  emitTrialChange()
}

export type SuggestedPath = {
  to: string
  title: StringKey
  sub: StringKey
}

export function suggestedPath(a: OnboardAnswers): SuggestedPath {
  if (a.need === 'stop' || a.bring === 'wave') {
    return { to: '/sos', title: 'ob_path_sos', sub: 'ob_path_sos_s' }
  }
  if (
    a.need === 'sleep' ||
    a.bring === 'sleep' ||
    a.sleepHard === 'always' ||
    a.sleepHard === 'often' ||
    a.wake === 'every' ||
    a.wake === 'most' ||
    a.fall.includes('story')
  ) {
    return { to: '/sleep', title: 'ob_path_sleep', sub: 'ob_path_sleep_s' }
  }
  if (a.need === 'sentence') {
    return { to: '/quotes', title: 'ob_path_quote', sub: 'ob_path_quote_s' }
  }
  if (a.need === 'breath') {
    return { to: '/session/breath/wave', title: 'ob_path_breath', sub: 'ob_path_breath_s' }
  }
  if (a.bring === 'worry') {
    return { to: '/treat/anxiety', title: 'ob_path_worry', sub: 'ob_path_worry_s' }
  }
  if (a.bring === 'world') {
    return { to: '/treat/derealization', title: 'ob_path_world', sub: 'ob_path_world_s' }
  }
  if (a.bring === 'self') {
    return { to: '/treat/depersonalization', title: 'ob_path_self', sub: 'ob_path_self_s' }
  }
  if (a.fall.includes('nature')) {
    return { to: '/sleep', title: 'ob_path_sleep', sub: 'ob_path_sleep_s' }
  }
  return { to: '/discover', title: 'ob_path_disc', sub: 'ob_path_disc_s' }
}

export async function requestNotify(): Promise<boolean> {
  if (isNativeApp()) {
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      const perm = await LocalNotifications.requestPermissions()
      return perm.display === 'granted'
    } catch {
      return false
    }
  }
  if (typeof Notification === 'undefined') return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const res = await Notification.requestPermission()
  return res === 'granted'
}
