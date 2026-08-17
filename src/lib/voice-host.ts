import { readCellularMedia } from './media'

/** Local bundle first (IPA / same-origin PWA), then optional CDN. */
function slash(s: string) {
  return s.endsWith('/') ? s : `${s}/`
}

export function localVoiceRoot() {
  const base = (import.meta.env.BASE_URL as string | undefined) || '/'
  return `${slash(base)}voice/`
}

export function remoteVoiceRoot() {
  const raw = (import.meta.env.VITE_VOICE_URL as string | undefined) || ''
  if (!raw.trim()) return ''
  return slash(raw.trim())
}

export function voiceRoots() {
  const local = localVoiceRoot()
  const remote = remoteVoiceRoot()
  if (remote && remote !== local && readCellularMedia()) return [local, remote]
  return [local]
}
