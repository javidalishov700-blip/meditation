import { audio } from './audio'

let cancelled = false
let speakGen = 0

type SpeakOpts = {
  rate?: number
  pitch?: number
  lang?: string
  onend?: () => void
}

function resolveLang(lang?: string): string {
  return lang || document.documentElement.lang || 'tr-TR'
}

function langPrefix(bcp47: string): string {
  return bcp47.slice(0, 2).toLowerCase()
}

function prefixesFor(bcp47: string): string[] {
  const p = langPrefix(bcp47)
  if (p === 'az') return ['az', 'tr']
  if (p === 'uk') return ['uk', 'ru']
  return [p]
}

function scoreVoice(v: SpeechSynthesisVoice, prefixes: string[], bcp47: string): number {
  const lang = v.lang.replace('_', '-').toLowerCase()
  const name = v.name.toLowerCase()
  const want = bcp47.replace('_', '-').toLowerCase()
  let s = 0
  if (lang === want) s += 10
  else if (prefixes.some((p) => lang.startsWith(p))) s += 6
  else return -1
  if (/google|natural|neural|premium|enhanced|online/.test(name)) s += 5
  if (/yelda|filiz|melina|samantha|daniel|kaya/.test(name)) s += 4
  if (v.localService) s += 1
  if (v.default) s += 1
  if (/compact|eloquence|novelty|whisper/.test(name)) s -= 6
  return s
}

function pickVoice(bcp47: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? []
  if (!voices.length) return null
  const prefixes = prefixesFor(bcp47)
  let best: SpeechSynthesisVoice | null = null
  let bestScore = -1
  for (const v of voices) {
    const s = scoreVoice(v, prefixes, bcp47)
    if (s > bestScore) {
      best = v
      bestScore = s
    }
  }
  return best
}

function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []
  if (clean.length < 90) return [clean]
  const parts = clean.split(/(?<=[.!?…;:])\s+/)
  const out: string[] = []
  let buf = ''
  for (const p of parts) {
    if ((buf + ' ' + p).trim().length > 110) {
      if (buf) out.push(buf.trim())
      buf = p
    } else {
      buf = (buf + ' ' + p).trim()
    }
  }
  if (buf) out.push(buf.trim())
  return out
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function utter(text: string, bcp: string, opts: { rate: number; pitch: number }) {
  const u = new SpeechSynthesisUtterance(text)
  const voice = pickVoice(bcp)
  if (voice) {
    u.voice = voice
    u.lang = voice.lang
  } else {
    u.lang = bcp
  }
  u.rate = opts.rate
  u.pitch = opts.pitch
  u.volume = 1
  return u
}

export function stopSpeak() {
  cancelled = true
  speakGen += 1
  audio.duck(false)
  window.speechSynthesis?.cancel()
}

export function speak(text: string, opts: SpeakOpts = {}): void {
  if (!window.speechSynthesis) {
    opts.onend?.()
    return
  }
  stopSpeak()
  cancelled = false
  const gen = speakGen
  const chunks = chunkText(text)
  if (!chunks.length) {
    opts.onend?.()
    return
  }
  const bcp = resolveLang(opts.lang)
  let i = 0
  audio.duck(true)
  const next = () => {
    if (cancelled || gen !== speakGen) return
    if (i >= chunks.length) {
      audio.duck(false)
      opts.onend?.()
      return
    }
    const u = utter(chunks[i]!, bcp, { rate: opts.rate ?? 0.82, pitch: opts.pitch ?? 1 })
    i += 1
    u.onend = next
    u.onerror = next
    window.speechSynthesis.speak(u)
  }
  void wait(80).then(() => {
    if (cancelled || gen !== speakGen) return
    window.speechSynthesis.getVoices()
    next()
  })
}

export function speakCue(text: string, lang?: string) {
  if (!window.speechSynthesis) return
  const line = text.trim()
  if (!line) return
  stopSpeak()
  cancelled = false
  const gen = speakGen
  const bcp = resolveLang(lang)
  void wait(70).then(() => {
    if (cancelled || gen !== speakGen) return
    window.speechSynthesis.getVoices()
    const u = utter(line.endsWith('.') ? line : `${line}.`, bcp, { rate: 0.8, pitch: 1 })
    u.onend = () => audio.duck(false)
    u.onerror = () => audio.duck(false)
    audio.duck(true)
    window.speechSynthesis.speak(u)
  })
}

export function warmVoices() {
  const synth = window.speechSynthesis
  if (!synth) return
  synth.getVoices()
  synth.addEventListener?.('voiceschanged', () => {
    synth.getVoices()
  })
}
