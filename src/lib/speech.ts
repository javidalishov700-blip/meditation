import { audio } from './audio'
import { readJson, writeJson } from './storage'

let cancelled = false
let speakGen = 0
let held: SpeechSynthesisUtterance | null = null
let voicesCache: SpeechSynthesisVoice[] = []
let speakingFlag = false
let keepAliveTimer: number | null = null
const speakListeners = new Set<() => void>()

export type ReadMode = 'natural' | 'slow' | 'calm'

type SpeakOpts = {
  rate?: number
  pitch?: number
  lang?: string
  mode?: ReadMode
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

export function readReadMode(): ReadMode {
  const v = readJson<string>('readMode', 'natural')
  if (v === 'slow' || v === 'calm') return v
  return 'natural'
}

export function writeReadMode(mode: ReadMode) {
  writeJson('readMode', mode)
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

function humanize(text: string, prefix: string, mode: ReadMode): string {
  let out = text.replace(/\r\n/g, '\n')
  if (mode === 'natural') {
    out = out.replace(/[·•]/g, '.').replace(/\s*[—–]\s*/g, '. ')
  } else if (mode === 'calm') {
    out = out.replace(/[·•]/g, '.').replace(/\s*[—–]\s*/g, '. ')
  } else {
    out = out.replace(/[·•]/g, ',').replace(/\s*[—–]\s*/g, ', ')
  }
  out = out
    .replace(/(\d)-(\d)-(\d)/g, '$1, $2, $3')
    .replace(/Hz/gi, 'hertz')
    .replace(/['’]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
  if (prefix === 'tr') out = out.replace(/(\d+)\s*dk\b/gi, '$1 dakika')
  else out = out.replace(/(\d+)\s*dk\b/gi, '$1 min').replace(/(\d+)\s*min\b/gi, '$1 minutes')
  return out
}

type Phrase = { text: string; pause: number }

function splitLong(text: string, max: number): string[] {
  if (text.length <= max) return [text]
  const chunks: string[] = []
  let rest = text.trim()
  while (rest.length > max) {
    const window = rest.slice(0, max)
    const punct = Math.max(
      window.lastIndexOf(', '),
      window.lastIndexOf('; '),
      window.lastIndexOf(': '),
    )
    const space = window.lastIndexOf(' ')
    const cut = punct >= max * 0.45 ? punct + 1 : space > 40 ? space : max
    chunks.push(rest.slice(0, cut).trim())
    rest = rest.slice(cut).trim()
  }
  if (rest) chunks.push(rest)
  return chunks
}

function breathHold(sentence: string): number {
  if (/üç nefes|three breaths|tres respir|trois souff|drei atem|tre respir/i.test(sentence)) return 16000
  if (/iki nefes|two breaths|dos respir|deux souff|zwei atem|due respir/i.test(sentence)) return 11000
  if (/bir nefes|one breath|un aliento|un souffle|ein atemzug|un respiro/i.test(sentence)) return 6000
  return 0
}

function phrases(text: string, prefix: string, mode: ReadMode): Phrase[] {
  const clean = humanize(text, prefix, mode)
  if (!clean) return []
  const max = mode === 'slow' ? 108 : mode === 'calm' ? 280 : 220
  const blocks = clean.split(/\n{2,}/).map((b) => b.replace(/\n/g, ' ').trim()).filter(Boolean)
  const out: Phrase[] = []
  for (const block of blocks) {
    const sentences = block.split(/(?<=[.!?…])\s+/).filter(Boolean)
    const paraPause = mode === 'calm' ? 3200 : mode === 'slow' ? 540 : 260
    for (let s = 0; s < sentences.length; s++) {
      const sentence = sentences[s]!
      const last = s === sentences.length - 1
      const hold = mode === 'calm' ? breathHold(sentence) : 0
      const endPause = hold || (last ? paraPause : mode === 'calm' ? 1100 : mode === 'slow' ? 320 : 140)
      if (mode === 'slow' && sentence.length > 110 && /,\s/.test(sentence)) {
        const parts = sentence.split(/,\s+/)
        parts.forEach((raw, i) => {
          const piece = raw.trim()
          if (!piece) return
          const tail = i === parts.length - 1
          splitLong(tail ? piece : `${piece},`, max).forEach((bit, j, arr) => {
            const end = tail && j === arr.length - 1
            out.push({ text: bit, pause: end ? endPause : 200 })
          })
        })
        continue
      }
      splitLong(sentence, max).forEach((bit, i, arr) => {
        const end = i === arr.length - 1
        out.push({
          text: bit,
          pause: end ? endPause : mode === 'calm' ? 120 : mode === 'slow' ? 170 : 80,
        })
      })
    }
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
  const ua = navigator.userAgent
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (ios) return
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
  const mode = opts.mode ?? readReadMode()
  const parts = phrases(text, prefix, mode)
  if (!parts.length) {
    opts.onend?.()
    return
  }
  const baseRate = opts.rate ?? (mode === 'slow' ? 0.88 : mode === 'calm' ? 0.93 : 1)
  const basePitch = opts.pitch ?? (mode === 'calm' ? 0.97 : 1)
  let i = 0
  audio.hushForVoice()
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
    if (!part.text) {
      void wait(part.pause).then(next)
      return
    }
    const live = mode === 'slow'
    const u = utter(part.text, bcp, {
      rate: live ? jitter(baseRate, 0.012) : baseRate,
      pitch: live ? jitter(basePitch, 0.012) : basePitch,
    })
    u.onend = () => {
      if (cancelled || gen !== speakGen) return
      const gap = live ? part.pause + Math.floor(Math.random() * 60) : part.pause
      void wait(gap).then(next)
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
  const mode = readReadMode()
  const prefix = langPrefix(resolveLang(lang))
  const line = humanize(text, prefix, mode)
  if (!line) return
  speak(line, { lang, pitch: 1, mode })
}

export const VOICE_SAMPLE: Record<string, string> = {
  tr: 'Şimdi yanındayım. Cümleyi bölmeden konuşuyorum. Nefes al. Omuzların insin. Burada üç nefes.',
  en: 'I am here with you. I speak without chopping the sentence. Breathe in. Let the shoulders drop. Stay for three breaths.',
  es: 'Estoy aquí. Hablo sin cortar la frase. Inhala. Deja caer los hombros. Quédate tres respiraciones.',
  fr: 'Je suis là. Je parle sans couper la phrase. Inspire. Laisse descendre les épaules. Reste trois souffles.',
  de: 'Ich bin hier. Ich spreche, ohne den Satz zu zerteilen. Atme ein. Lass die Schultern sinken. Bleib drei Atemzüge.',
  it: 'Sono qui. Parlo senza spezzare la frase. Inspira. Lascia scendere le spalle. Resta tre respiri.',
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
