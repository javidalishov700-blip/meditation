import { audio } from './audio'
import { isNativeApp } from './device'
import type { LocaleId } from './locales'
import { emitTrialChange, readOnboard, requestNotify, trialUntil } from './onboard'
import { bedMins, nightId, readSleepPlan, sleepTone } from './sleep-plan'
import { readJson, writeJson } from './storage'
import { translate, type StringKey } from './strings'

const TRIAL_KEY = 'remind.trial'
const SENT_KEY = 'remind.trial.sent'
const CHIME_KEY = 'sleep.chime'
const DAY_MS = 86_400_000
const NATIVE_ID = 41001
const SLEEP_ID = 41021

const DAILY: { id: number; hour: number; minute: number; body: StringKey; route: string }[] = [
  { id: 41011, hour: 9, minute: 0, body: 'nudge_1_b', route: '/practice' },
  { id: 41012, hour: 14, minute: 0, body: 'nudge_2_b', route: '/breath' },
  { id: 41013, hour: 19, minute: 0, body: 'nudge_3_b', route: '/sleep' },
]

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

async function cancelIds(ids: number[]) {
  const LN = await nativePlugin()
  if (!LN || !ids.length) return
  try {
    await LN.cancel({ notifications: ids.map((id) => ({ id })) })
  } catch {
    /* ignore */
  }
}

export async function cancelNativeTrialReminder() {
  await cancelIds([NATIVE_ID])
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

export async function syncDailyReminders(locale: LocaleId): Promise<void> {
  const ids = DAILY.map((d) => d.id)
  if (!readOnboard().remindQuote) {
    await cancelIds(ids)
    return
  }
  const LN = await nativePlugin()
  if (!LN) return
  try {
    const perm = await LN.requestPermissions()
    if (perm.display !== 'granted') return
    await LN.cancel({ notifications: ids.map((id) => ({ id })) })
    const title = translate('nudge_title', locale)
    await LN.schedule({
      notifications: DAILY.map((d) => ({
        id: d.id,
        title,
        body: translate(d.body, locale),
        schedule: { on: { hour: d.hour, minute: d.minute }, repeats: true, allowWhileIdle: true },
        extra: { route: d.route },
      })),
    })
  } catch {
    /* ignore */
  }
}

export async function syncSleepReminder(locale: LocaleId): Promise<void> {
  if (!readOnboard().remindSleep) {
    await cancelIds([SLEEP_ID])
    return
  }
  const LN = await nativePlugin()
  if (!LN) return
  try {
    const perm = await LN.requestPermissions()
    if (perm.display !== 'granted') return
    await LN.cancel({ notifications: [{ id: SLEEP_ID }] })
    const plan = readSleepPlan()
    const bed = bedMins(plan)
    await LN.schedule({
      notifications: [
        {
          id: SLEEP_ID,
          title: translate('sleep_chime_title', locale),
          body: translate('sleep_chime_body', locale, { n: Number.isInteger(plan.hours) ? plan.hours : plan.hours.toFixed(1) }),
          schedule: {
            on: { hour: Math.floor(bed / 60), minute: bed % 60 },
            repeats: true,
            allowWhileIdle: true,
          },
          extra: { route: '/sleep' },
        },
      ],
    })
  } catch {
    /* ignore */
  }
}

export async function syncAllReminders(
  locale: LocaleId,
  trialCopy: { title: string; text: string },
): Promise<void> {
  await syncTrialReminder(trialCopy)
  await syncDailyReminders(locale)
  await syncSleepReminder(locale)
}

export async function maybeSleepChime(locale: LocaleId): Promise<void> {
  if (!readOnboard().remindSleep) return
  const plan = readSleepPlan()
  if (sleepTone(plan) !== 'time') return
  const id = nightId(plan)
  if (readJson(CHIME_KEY, '') === id) return
  if (audio.now.playing) return
  writeJson(CHIME_KEY, id)
  try {
    audio.unlock()
    await audio.playBed('piano')
    window.setTimeout(() => audio.stop(1.2), 22_000)
  } catch {
    /* ignore */
  }
  if (isNativeApp()) return
  const ok = await requestNotify()
  if (!ok) return
  try {
    new Notification(translate('sleep_chime_title', locale), {
      body: translate('sleep_chime_body', locale, { n: Number.isInteger(plan.hours) ? plan.hours : plan.hours.toFixed(1) }),
      tag: 'steady-sleep',
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
