/** Shared with scripts/bake-voice.ts. Changing INSTRUCTIONS invalidates every clip hash. */
export const VOICE_MODEL = 'gpt-4o-mini-tts'
export const VOICE_NAME = 'coral'
export const VOICE_SPEED = 0.94
export const VOICE_MAX = 2200
export const VOICE_INSTRUCTIONS =
  'A calm adult woman in a quiet room. Warm, unhurried, natural. Speak as if sitting next to the listener, not as a robot, not as an advertisement, not as a commercial meditation app. Soft chest voice. Pause a full breath after each paragraph and after each short line. Do not sound theatrical or whispery. Do not give commands to relax. Present and steady.'

export function voiceHashPayload(locale: string, text: string) {
  return `${VOICE_MODEL}|${VOICE_NAME}|${VOICE_SPEED}|${VOICE_INSTRUCTIONS}|${locale}|${text}`
}

export function chunkVoiceText(text: string) {
  if (text.length <= VOICE_MAX) return [text]
  const parts: string[] = []
  const paras = text.split(/\n{2,}/)
  let buf = ''
  for (const p of paras) {
    const next = buf ? `${buf}\n\n${p}` : p
    if (next.length > VOICE_MAX && buf) {
      parts.push(buf)
      buf = p
    } else buf = next
  }
  if (buf) parts.push(buf)
  return parts.flatMap((p) => {
    if (p.length <= VOICE_MAX) return [p]
    const bits: string[] = []
    let rest = p
    while (rest.length > VOICE_MAX) {
      const cut = rest.lastIndexOf(' ', VOICE_MAX)
      bits.push(rest.slice(0, cut > 40 ? cut : VOICE_MAX).trim())
      rest = rest.slice(cut > 40 ? cut : VOICE_MAX).trim()
    }
    if (rest) bits.push(rest)
    return bits
  })
}

export function clipFileName(hash: string, index: number, total: number) {
  return total === 1 ? `${hash}.mp3` : `${hash}-${index}.mp3`
}
