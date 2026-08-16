import { isNativeApp } from './device'
import { requestNotify } from './onboard'
import { SKILLS, takeFreshUnlocks, type SkillId } from './skills'

export type UnlockCopy = { title: string; text: string }

type ToastFn = (msg: UnlockCopy & { id: SkillId }) => void

let copyFor: ((id: SkillId) => UnlockCopy) | null = null
const toasts = new Set<ToastFn>()

export function setUnlockCopy(fn: ((id: SkillId) => UnlockCopy) | null) {
  copyFor = fn
}

export function subscribeUnlockToast(fn: ToastFn) {
  toasts.add(fn)
  return () => {
    toasts.delete(fn)
  }
}

async function fireLocal(copy: UnlockCopy, id: number) {
  const ok = await requestNotify()
  if (!ok) return
  if (isNativeApp()) {
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title: copy.title,
            body: copy.text,
            extra: { route: '/me/skills' },
          },
        ],
      })
      return
    } catch {
      /* fall through to web */
    }
  }
  try {
    new Notification(copy.title, { body: copy.text, tag: `steady-skill-${id}` })
  } catch {
    /* ignore */
  }
}

export async function announceSkillUnlocks() {
  const fresh = takeFreshUnlocks()
  if (!fresh.length) return
  for (const id of fresh) {
    const copy = copyFor?.(id) ?? { title: 'Steady', text: id }
    toasts.forEach((fn) => fn({ ...copy, id }))
    const n = SKILLS.findIndex((s) => s.id === id)
    await fireLocal(copy, 41100 + Math.max(0, n))
  }
}
