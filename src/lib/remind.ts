import { readOnboard, requestNotify, trialUntil } from './onboard'
import { readJson, writeJson } from './storage'

const TRIAL_KEY = 'remind.trial'
const SENT_KEY = 'remind.trial.sent'
const DAY_MS = 86_400_000

export function readRemindTrial(): boolean {
  const stored = readJson<boolean | null>(TRIAL_KEY, null)
  if (stored != null) return stored
  return readOnboard().remindTrial
}

export function writeRemindTrial(on: boolean) {
  writeJson(TRIAL_KEY, on)
  writeJson('onboard', { ...readOnboard(), remindTrial: on })
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
