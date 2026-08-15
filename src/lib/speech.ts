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
  fillMs?: number
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
  const v = readJson<string>('readMode', 'calm')
  if (v === 'slow' || v === 'natural') return v
  return 'calm'
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
  if (prefix === 'tr') return ['yelda', 'emel online', 'emel', 'filiz', 'google türkçe', 'google türk']
  if (prefix === 'es') return ['paulina', 'mónica', 'monica', 'elvira', 'google español', 'conchita']
  if (prefix === 'fr') return ['amélie', 'amelie', 'audrey', 'denise', 'google français', 'thomas']
  if (prefix === 'de') return ['anna', 'helena', 'katja', 'google deutsch', 'hedwig']
  if (prefix === 'it') return ['alice', 'elsa', 'bianca', 'google italiano', 'carla']
  return [
    'samantha',
    'siri',
    'karen',
    'moira',
    'tessa',
    'serena',
    'aria',
    'jenny',
    'sonia',
    'google uk english',
    'google us english',
  ]
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
  if (/siri/.test(name)) s += 26
  if (/neural|premium|enhanced|wavenet|studio|online \(natural\)|\bnatural\b/.test(name)) s += 22
  if (/google/.test(name) && !/compact/.test(name)) s += 16
  if (/microsoft/.test(name) && /online|natural|neural/.test(name)) s += 18
  if (preferredNames(prefix).some((n) => name.includes(n))) s += 16
  if (/yelda|samantha|karen|moira|tessa|aria|jenny|alice|anna|amelie|amélie|paulina/.test(name)) s += 8
  if (v.localService && /siri|yelda|samantha|karen|moira|tessa|alice|anna|amelie/.test(name)) s += 10
  if (v.default) s += 1
  if (
    /compact|eloquence|novelty|whisper|espeak|robot|dummy|mute|zira|david desktop|fred|ralph|trinoids|zarvox|bells|boing|bubbles|cellos|bad news|good news|hysterical|organ|superstar/.test(
      name,
    )
  ) {
    s -= 30
  }
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
  if (mode === 'slow') {
    out = out.replace(/[·•]/g, ',').replace(/\s*[—–]\s*/g, ', ')
  } else {
    out = out.replace(/[·•]/g, '.').replace(/\s*[—–]\s*/g, '. ')
  }
  if (mode === 'calm') out = out.replace(/!+/g, '.')
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
    const stop = Math.max(
      window.lastIndexOf('. '),
      window.lastIndexOf('? '),
      window.lastIndexOf('! '),
      window.lastIndexOf('… '),
    )
    const punct = Math.max(stop, window.lastIndexOf(', '), window.lastIndexOf('; '), window.lastIndexOf(': '))
    const space = window.lastIndexOf(' ')
    const cut = stop >= max * 0.35 ? stop + 1 : punct >= max * 0.45 ? punct + 1 : space > 40 ? space : max
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

function sentencesOf(block: string): string[] {
  return block.split(/(?<=[.!?…])\s+/).filter(Boolean)
}

function pushBits(out: Phrase[], text: string, max: number, pause: number, inner: number) {
  splitLong(text, max).forEach((bit, i, arr) => {
    out.push({ text: bit, pause: i === arr.length - 1 ? pause : inner })
  })
}

function phrasesGrouped(clean: string, max: number, paraPause: number, joinPause: number): Phrase[] {
  const blocks = clean
    .split(/\n{2,}/)
    .map((b) => b.replace(/\n/g, ' ').trim())
    .filter(Boolean)
  const out: Phrase[] = []
  for (const block of blocks) {
    const sentences = sentencesOf(block)
    let buf = ''
    const flush = (pause: number) => {
      if (!buf) return
      pushBits(out, buf, max, pause, 70)
      buf = ''
    }
    for (let s = 0; s < sentences.length; s++) {
      const sentence = sentences[s]!
      const last = s === sentences.length - 1
      const hold = breathHold(sentence)
      const joined = buf ? `${buf} ${sentence}` : sentence
      if (buf && joined.length > max) flush(joinPause)
      buf = buf ? `${buf} ${sentence}` : sentence
      if (hold) {
        flush(hold)
        continue
      }
      if (last) flush(paraPause)
    }
  }
  return out
}

function phrases(text: string, prefix: string, mode: ReadMode): Phrase[] {
  const clean = humanize(text, prefix, mode)
  if (!clean) return []
  if (mode === 'calm') return phrasesGrouped(clean, 460, 2600, 220)
  if (mode === 'natural') return phrasesGrouped(clean, 280, 280, 140)
  const max = 108
  const blocks = clean
    .split(/\n{2,}/)
    .map((b) => b.replace(/\n/g, ' ').trim())
    .filter(Boolean)
  const out: Phrase[] = []
  for (const block of blocks) {
    const sentences = sentencesOf(block)
    for (let s = 0; s < sentences.length; s++) {
      const sentence = sentences[s]!
      const last = s === sentences.length - 1
      const endPause = last ? 540 : 320
      if (sentence.length > 110 && /,\s/.test(sentence)) {
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
      pushBits(out, sentence, max, endPause, 170)
    }
  }
  return out
}

function estimateMs(parts: Phrase[], rate: number): number {
  const cps = Math.max(8, 14 * rate)
  return parts.reduce((n, p) => n + (p.text.length / cps) * 1000 + p.pause, 0)
}

function stretchTo(parts: Phrase[], targetMs: number, rate: number): Phrase[] {
  const est = estimateMs(parts, rate)
  const extra = targetMs - est - 5000
  if (extra <= 0 || !parts.length) return parts
  const heavy = parts.map((p, i) => ({ i, p })).filter((x) => x.p.pause >= 800)
  const slots = heavy.length ? heavy : parts.map((p, i) => ({ i, p }))
  const each = extra / slots.length
  return parts.map((p, i) =>
    slots.some((s) => s.i === i) ? { ...p, pause: Math.round(p.pause + each) } : p,
  )
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
  let parts = phrases(text, prefix, mode)
  if (!parts.length) {
    opts.onend?.()
    return
  }
  const baseRate = opts.rate ?? (mode === 'slow' ? 0.88 : mode === 'calm' ? 0.94 : 1)
  const basePitch = opts.pitch ?? (mode === 'calm' ? 0.99 : 1)
  if (opts.fillMs) parts = stretchTo(parts, opts.fillMs, baseRate)
  const started = Date.now()
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
      const rest = opts.fillMs ? Math.max(0, opts.fillMs - (Date.now() - started)) : 0
      if (rest > 80) {
        void wait(rest).then(finish)
        return
      }
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
  tr: 'Şimdi yanındayım. Cümleyi bölmeden, yavaş konuşuyorum. Omuzların insin. Nefes burada.',
  en: 'I am here with you. I speak slowly, without chopping the line. Let the shoulders drop. The breath is here.',
  es: 'Estoy aquí. Hablo despacio, sin cortar la frase. Deja caer los hombros. El aliento está aquí.',
  fr: 'Je suis là. Je parle lentement, sans couper la phrase. Laisse descendre les épaules. Le souffle est là.',
  de: 'Ich bin hier. Ich spreche langsam, ohne den Satz zu zerteilen. Lass die Schultern sinken. Der Atem ist hier.',
  it: 'Sono qui. Parlo piano, senza spezzare la frase. Lascia scendere le spalle. Il respiro è qui.',
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
