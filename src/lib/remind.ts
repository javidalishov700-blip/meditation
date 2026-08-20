import { audio } from './audio'
import { isNativeApp } from './device'
import type { LocaleId } from './locales'
import { readOnboard, requestNotify } from './onboard'
import { bedMins, nightId, readSleepPlan, sleepTone } from './sleep-plan'
import { readJson, writeJson } from './storage'
import { translate, type StringKey } from './strings'

const CHIME_KEY = 'sleep.chime'
const SLEEP_ID = 41021

const DAILY: { id: number; hour: number; minute: number; body: StringKey; route: string }[] = [
  { id: 41011, hour: 9, minute: 0, body: 'nudge_1_b', route: '/practice' },
  { id: 41012, hour: 14, minute: 0, body: 'nudge_2_b', route: '/breath' },
  { id: 41013, hour: 19, minute: 0, body: 'nudge_3_b', route: '/sleep' },
]

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

export async function syncAllReminders(locale: LocaleId): Promise<void> {
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
