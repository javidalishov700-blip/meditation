import { isNativeApp } from './device'
import { emitTrialChange, readOnboard, requestNotify, trialUntil } from './onboard'
import { readJson, writeJson } from './storage'

const TRIAL_KEY = 'remind.trial'
const SENT_KEY = 'remind.trial.sent'
const DAY_MS = 86_400_000
const NATIVE_ID = 41001

export function readRemindTrial(): boolean {
  const stored = readJson<boolean | null>(TRIAL_KEY, null)
  if (stored != null) return stored
  return readOnboard().remindTrial
}

export function writeRemindTrial(on: boolean) {
  writeJson(TRIAL_KEY, on)
  writeJson('onboard', { ...readOnboard(), remindTrial: on })
  emitTrialChange()
}

async function nativePlugin() {
  if (!isNativeApp()) return null
  try {
    const m = await import('@capacitor/local-notifications')
    return m.LocalNotifications
  } catch {
    return null
  }
}

export async function cancelNativeTrialReminder() {
  const LN = await nativePlugin()
  if (!LN) return
  try {
    await LN.cancel({ notifications: [{ id: NATIVE_ID }] })
  } catch {
    /* ignore */
  }
}

/** Last trial day, or a few seconds from now if that day has already started. */
export function nativeFireAt(until: number, now = Date.now()): number | null {
  if (until <= now) return null
  const lastDay = until - DAY_MS
  const at = now >= lastDay ? now + 8_000 : lastDay
  if (at >= until) {
    const soon = now + 2_000
    return soon < until ? soon : null
  }
  return at
}

export async function tickTrialReminder(body: { title: string; text: string }): Promise<boolean> {
  if (!readRemindTrial()) return false
  const until = trialUntil()
  if (until <= Date.now()) return false
  if (until - Date.now() > DAY_MS) return false
  if (readJson(SENT_KEY, 0) === until) return false
  const ok = await requestNotify()
  if (ok) {
    try {
      new Notification(body.title, { body: body.text, tag: 'steady-trial' })
    } catch {
      /* ignore */
    }
  }
  writeJson(SENT_KEY, until)
  return true
}

export async function syncTrialReminder(copy: { title: string; text: string }): Promise<void> {
  const until = trialUntil()
  if (!readRemindTrial() || until <= Date.now()) {
    await cancelNativeTrialReminder()
    return
  }
  const LN = await nativePlugin()
  if (!LN) {
    await tickTrialReminder(copy)
    return
  }
  try {
    const perm = await LN.requestPermissions()
    if (perm.display !== 'granted') return
    await LN.cancel({ notifications: [{ id: NATIVE_ID }] })
    const fireAt = nativeFireAt(until)
    if (fireAt == null) return
    await LN.schedule({
      notifications: [
        {
          id: NATIVE_ID,
          title: copy.title,
          body: copy.text,
          schedule: { at: new Date(fireAt), allowWhileIdle: true },
          extra: { route: '/paywall' },
        },
      ],
    })
  } catch {
    /* ignore */
  }
}

let tapArmed = false

export async function armNativeNotificationTap(): Promise<void> {
  if (tapArmed) return
  const LN = await nativePlugin()
  if (!LN) return
  try {
    await LN.addListener('localNotificationActionPerformed', (e) => {
      const extra = e.notification.extra as { route?: string } | undefined
      const route = extra?.route
      if (route) window.location.assign(route)
    })
    tapArmed = true
  } catch {
    /* retry next mount */
  }
}
