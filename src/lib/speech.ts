import { audio } from './audio'
import { readJson, writeJson } from './storage'

let cancelled = false
let speakGen = 0
let held: SpeechSynthesisUtterance | null = null
let voicesCache: SpeechSynthesisVoice[] = []
let speakingFlag = false
let keepAliveTimer: number | null = null
const speakListeners = new Set<() => void>()

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

function voiceKey(bcp47: string) {
  return `voice.${langPrefix(bcp47)}`
}

export function readVoiceUri(bcp47: string): string | null {
  return readJson<string | null>(voiceKey(bcp47), null)
}

export function writeVoiceUri(bcp47: string, uri: string | null) {
  writeJson(voiceKey(bcp47), uri)
}

export function isSpeaking() {
  return speakingFlag
}

export function subscribeSpeak(fn: () => void) {
  speakListeners.add(fn)
  return () => {
    speakListeners.delete(fn)
  }
}

function setSpeaking(on: boolean) {
  speakingFlag = on
  speakListeners.forEach((fn) => fn())
}

function refreshVoices() {
  const list = window.speechSynthesis?.getVoices?.() ?? []
  if (list.length) voicesCache = list
  return voicesCache
}

function preferredNames(prefix: string): string[] {
  if (prefix === 'tr') return ['yelda', 'filiz', 'emel', 'google türk', 'google türkçe']
  if (prefix === 'es') return ['google español', 'mónica', 'monica', 'paulina', 'elvira', 'conchita']
  if (prefix === 'fr') return ['google français', 'thomas', 'amélie', 'amelie', 'audrey', 'denise']
  if (prefix === 'de') return ['google deutsch', 'anna', 'hedwig', 'katja', 'google german']
  if (prefix === 'it') return ['google italiano', 'alice', 'elsa', 'bianca', 'carla']
  return ['google uk english', 'google us english', 'samantha', 'karen', 'moira', 'aria', 'jenny', 'sonia', 'natural']
}

function scoreVoice(v: SpeechSynthesisVoice, bcp47: string): number {
  const lang = v.lang.replace('_', '-').toLowerCase()
  const name = v.name.toLowerCase()
  const want = bcp47.replace('_', '-').toLowerCase()
  const prefix = langPrefix(bcp47)
  let s = 0
  if (lang === want) s += 18
  else if (lang.startsWith(prefix)) s += 12
  else return -1
  if (/neural|natural|premium|enhanced|online|wavenet|studio|google|microsoft.*neural/.test(name)) s += 16
  if (preferredNames(prefix).some((n) => name.includes(n))) s += 14
  if (/samantha|karen|yelda|filiz|emel|aria|jenny|alice|anna|thomas/.test(name)) s += 6
  if (v.localService && /samantha|karen|yelda|alice|anna|thomas|moira/.test(name)) s += 4
  if (v.default) s += 1
  if (/compact|eloquence|novelty|whisper|espeak|robot|dummy|mute|zira|david desktop/.test(name)) s -= 22
  return s
}

export function listVoices(bcp47: string): SpeechSynthesisVoice[] {
  const voices = refreshVoices()
  return voices
    .map((v) => ({ v, s: scoreVoice(v, bcp47) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.v)
}

function pickVoice(bcp47: string): SpeechSynthesisVoice | null {
  const voices = listVoices(bcp47)
  if (!voices.length) return null
  const saved = readVoiceUri(bcp47)
  if (saved) {
    const hit = voices.find((v) => v.voiceURI === saved) || voicesCache.find((v) => v.voiceURI === saved)
    if (hit) return hit
  }
  return voices[0] ?? null
}

function humanize(text: string, prefix: string): string {
  let out = text
    .replace(/\s+/g, ' ')
    .replace(/[·•]/g, ',')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/(\d)-(\d)-(\d)/g, '$1, $2, $3')
    .replace(/Hz/gi, 'hertz')
    .replace(/['’]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
  if (prefix === 'tr') out = out.replace(/(\d+)\s*dk\b/gi, '$1 dakika')
  else out = out.replace(/(\d+)\s*dk\b/gi, '$1 min').replace(/(\d+)\s*min\b/gi, '$1 minutes')
  return out
}

type Phrase = { text: string; pause: number }

function splitLong(text: string, max = 108): string[] {
  if (text.length <= max) return [text]
  const words = text.split(' ')
  const chunks: string[] = []
  let cur = ''
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word
    if (next.length > max && cur) {
      chunks.push(cur)
      cur = word
    } else {
      cur = next
    }
  }
  if (cur) chunks.push(cur)
  return chunks
}

function phrases(text: string, prefix: string): Phrase[] {
  const clean = humanize(text, prefix)
  if (!clean) return []
  const sentences = clean.split(/(?<=[.!?…])\s+/).filter(Boolean)
  const out: Phrase[] = []
  for (const sentence of sentences) {
    const endPause = /[.!?…]$/.test(sentence) ? 540 : 320
    if (sentence.length > 110 && /,\s/.test(sentence)) {
      const parts = sentence.split(/,\s+/)
      parts.forEach((raw, i) => {
        const piece = raw.trim()
        if (!piece) return
        const last = i === parts.length - 1
        splitLong(last ? piece : `${piece},`).forEach((bit, j, arr) => {
          const tail = last && j === arr.length - 1
          out.push({ text: bit, pause: tail ? endPause : 200 })
        })
      })
      continue
    }
    splitLong(sentence).forEach((bit, i, arr) => {
      out.push({ text: bit, pause: i === arr.length - 1 ? endPause : 170 })
    })
  }
  return out
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function jitter(base: number, spread: number) {
  return Math.max(0.72, Math.min(1.08, base + (Math.random() * 2 - 1) * spread))
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
  held = u
  return u
}

function startKeepAlive() {
  stopKeepAlive()
  keepAliveTimer = window.setInterval(() => {
    const synth = window.speechSynthesis
    if (!synth?.speaking) return
    synth.pause()
    synth.resume()
  }, 9000)
}

function stopKeepAlive() {
  if (keepAliveTimer != null) {
    window.clearInterval(keepAliveTimer)
    keepAliveTimer = null
  }
}

export function stopSpeak() {
  cancelled = true
  speakGen += 1
  audio.duck(false)
  const keep = held
  held = null
  stopKeepAlive()
  setSpeaking(false)
  if (keep || window.speechSynthesis) window.speechSynthesis.cancel()
}

export function speak(text: string, opts: SpeakOpts = {}): void {
  if (!window.speechSynthesis) {
    opts.onend?.()
    return
  }
  stopSpeak()
  cancelled = false
  const gen = speakGen
  const bcp = resolveLang(opts.lang)
  const prefix = langPrefix(bcp)
  const parts = phrases(text, prefix)
  if (!parts.length) {
    opts.onend?.()
    return
  }
  const baseRate = opts.rate ?? 0.88
  const basePitch = opts.pitch ?? 1
  let i = 0
  audio.duck(true)
  refreshVoices()
  setSpeaking(true)
  startKeepAlive()

  const finish = () => {
    if (gen !== speakGen) return
    stopKeepAlive()
    audio.duck(false)
    setSpeaking(false)
    opts.onend?.()
  }

  const next = () => {
    if (cancelled || gen !== speakGen) return
    if (i >= parts.length) {
      finish()
      return
    }
    const part = parts[i]!
    i += 1
    const u = utter(part.text, bcp, {
      rate: jitter(baseRate, 0.012),
      pitch: jitter(basePitch, 0.012),
    })
    u.onend = () => {
      if (cancelled || gen !== speakGen) return
      void wait(part.pause + Math.floor(Math.random() * 60)).then(next)
    }
    u.onerror = () => {
      if (cancelled || gen !== speakGen) return
      next()
    }
    window.speechSynthesis.speak(u)
  }

  void wait(80).then(() => {
    if (cancelled || gen !== speakGen) return
    refreshVoices()
    next()
  })
}

export function speakCue(text: string, lang?: string) {
  const prefix = langPrefix(resolveLang(lang))
  const line = humanize(text, prefix)
  if (!line) return
  speak(line, { lang, rate: 0.9, pitch: 1 })
}

export const VOICE_SAMPLE: Record<string, string> = {
  tr: 'Şimdi yavaşça konuşuyorum. Nefes al. Omuzların insin. Yanında duran biri gibi.',
  en: 'I am speaking slowly now. Breathe in. Let the shoulders drop. Like someone in the room with you.',
  es: 'Ahora hablo despacio. Inhala. Deja caer los hombros. Como alguien en la habitación.',
  fr: 'Je parle lentement. Inspire. Laisse descendre les épaules. Comme quelqu un dans la pièce.',
  de: 'Ich spreche jetzt langsam. Atme ein. Lass die Schultern sinken. Wie jemand im Raum.',
  it: 'Parlo piano adesso. Inspira. Lascia scendere le spalle. Come qualcuno nella stanza.',
}

export function sampleLine(bcp47: string) {
  return VOICE_SAMPLE[langPrefix(bcp47)] || VOICE_SAMPLE.en!
}

export function warmVoices() {
  const synth = window.speechSynthesis
  if (!synth) return
  refreshVoices()
  synth.addEventListener?.('voiceschanged', () => {
    refreshVoices()
  })
}
