import { supportId } from './pin'
import { writeJson } from './storage'

let sentryOn = false

export function reportError(error: unknown, extra?: string) {
  const payload = {
    at: Date.now(),
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    extra: extra || '',
    support: supportId(),
  }
  writeJson('last-error', payload)
  const dsn = (import.meta.env.VITE_SENTRY_DSN as string | undefined)?.trim()
  if (!dsn) return
  void import('@sentry/react')
    .then((Sentry) => {
      if (!sentryOn) {
        Sentry.init({ dsn, sendDefaultPii: false })
        sentryOn = true
      }
      Sentry.captureException(error instanceof Error ? error : new Error(payload.message))
    })
    .catch(() => {
      /* package missing or blocked */
    })
}
