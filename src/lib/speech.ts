import { audio } from './audio'
import { isVoiceLang } from './locales'
import { readJson, writeJson } from './storage'
import { VOICE_SAMPLE } from './voice-lines'

export type ReadMode = 'natural' | 'slow' | 'calm'
export type TtsVoice = 'nova' | 'shimmer'

export type SpeakOpts = {
  lang?: string
  mode?: ReadMode
  rate?: number
  fillMs?: number
  startMs?: number
  /** Catalog id, e.g. med:first-settle or lib:lighthouse. Store plays baked MP3s when present. */
  clipId?: string
  onend?: () => void
}

export type SpeechSnap = {
  speaking: boolean
  loading: boolean
  paused: boolean
  volume: number
  error: string | null
  voice: TtsVoice
  elapsedMs: number
  durationMs: number
}

type LastJob = { text: string; opts: SpeakOpts }

let cancelled = false
let speakGen = 0
let speakingFlag = false
let loadingFlag = false
let pausedFlag = false
let errorFlag: string | null = null
let pauseWait: (() => void) | null = null
let el: HTMLAudioElement | null = null
let lastJob: LastJob | null = null
let clockOrigin = 0
let clockPauseTotal = 0
let clockPausedAt = 0
let clockStartMs = 0
let clockDuration = 0
let clockTick: number | null = null
const cache = new Map<string, string>()
const listeners = new Set<() => void>()

function liveElapsed() {
  if (!speakingFlag && !loadingFlag) return 0
  const now = pausedFlag ? clockPausedAt || Date.now() : Date.now()
  return clockStartMs + Math.max(0, now - clockOrigin - clockPauseTotal)
}

function armClock() {
  if (clockTick != null) return
  clockTick = window.setInterval(() => {
    if (!speakingFlag && !loadingFlag) {
      window.clearInterval(clockTick!)
      clockTick = null
      return
    }
    emit()
  }, 250)
}

function stopClock() {
  if (clockTick == null) return
  window.clearInterval(clockTick)
  clockTick = null
}

export function readReadMode(): ReadMode {
  const v = readJson<string>('readMode', 'calm')
  if (v === 'slow' || v === 'natural') return v
  return 'calm'
}

export function writeReadMode(mode: ReadMode) {
  writeJson('readMode', mode)
}

export function readTtsVoice(): TtsVoice {
  return readJson<string>('tts.voice', 'nova') === 'shimmer' ? 'shimmer' : 'nova'
}

export function writeTtsVoice(voice: TtsVoice) {
  writeJson('tts.voice', voice)
  emit()
}

export function readVoiceVolume() {
  const n = readJson<number>('tts.volume', 1)
  return Math.max(0, Math.min(1, n))
}

export function writeVoiceVolume(n: number) {
  const v = Math.max(0, Math.min(1, n))
  writeJson('tts.volume', v)
  const node = el
  if (node) node.volume = v
  emit()
}

export function isSpeaking() {
  return speakingFlag
}

export function isLoading() {
  return loadingFlag
}

export function speechSnap(): SpeechSnap {
  return {
    speaking: speakingFlag,
    loading: loadingFlag,
    paused: pausedFlag,
    volume: readVoiceVolume(),
    error: errorFlag,
    voice: readTtsVoice(),
    elapsedMs: liveElapsed(),
    durationMs: clockDuration,
  }
}

export function subscribeSpeak(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function emit() {
  listeners.forEach((fn) => fn())
}

function setFlags(partial: { speaking?: boolean; loading?: boolean; paused?: boolean; error?: string | null }) {
  if (partial.speaking != null) speakingFlag = partial.speaking
  if (partial.loading != null) loadingFlag = partial.loading
  if (partial.paused != null) pausedFlag = partial.paused
  if (partial.error !== undefined) errorFlag = partial.error
  emit()
}

function player() {
  if (!el) {
    el = new Audio()
    el.preload = 'auto'
    el.volume = readVoiceVolume()
  }
  return el
}

export async function primeAudio() {
  const node = player()
  const prev = node.src
  try {
    node.src =
      'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
    node.muted = true
    await node.play()
  } catch {
    /* autoplay lock */
  }
  node.pause()
  node.muted = false
  if (prev) node.src = prev
}

function langPrefix(bcp47: string) {
  return bcp47.slice(0, 2).toLowerCase()
}

function resolveLang(lang?: string) {
  return lang || document.documentElement.lang || 'tr-TR'
}

function humanize(text: string, prefix: string, mode: ReadMode) {
  let out = text.replace(/\r\n/g, '\n')
  if (mode === 'slow') out = out.replace(/[·•]/g, ',').replace(/\s*[—–]\s*/g, ', ')
  else out = out.replace(/[·•]/g, '.').replace(/\s*[—–]\s*/g, '. ')
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

function splitLong(text: string, max: number) {
  if (text.length <= max) return [text]
  const chunks: string[] = []
  let rest = text.trim()
  while (rest.length > max) {
    const window = rest.slice(0, max)
    const stop = Math.max(window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '), window.lastIndexOf('… '))
    const punct = Math.max(stop, window.lastIndexOf(', '), window.lastIndexOf('; '))
    const space = window.lastIndexOf(' ')
    const cut = stop >= max * 0.35 ? stop + 1 : punct >= max * 0.45 ? punct + 1 : space > 40 ? space : max
    chunks.push(rest.slice(0, cut).trim())
    rest = rest.slice(cut).trim()
  }
  if (rest) chunks.push(rest)
  return chunks
}

function breathHold(sentence: string) {
  if (/üç nefes|üç nəfəs|three breaths|tres respir|trois souff|drei atem|tre respir|три дыхания/i.test(sentence))
    return 16000
  if (/iki nefes|iki nəfəs|two breaths|dos respir|deux souff|zwei atem|due respir|два дыхания/i.test(sentence))
    return 11000
  if (/bir nefes|bir nəfəs|one breath|un aliento|un souffle|ein atemzug|un respiro|одно дыхание/i.test(sentence))
    return 6000
  return 0
}

function sentencesOf(block: string) {
  return block.split(/(?<=[.!?…])\s+/).filter(Boolean)
}

function phrases(text: string, prefix: string, mode: ReadMode): Phrase[] {
  const clean = humanize(text, prefix, mode)
  if (!clean) return []
  const max = 1800
  const paraPause = mode === 'calm' ? 2400 : mode === 'slow' ? 540 : 280
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
      splitLong(buf, max).forEach((bit, i, arr) => {
        out.push({ text: bit, pause: i === arr.length - 1 ? pause : 80 })
      })
      buf = ''
    }
    for (let s = 0; s < sentences.length; s++) {
      const sentence = sentences[s]!
      const last = s === sentences.length - 1
      const hold = mode === 'calm' ? breathHold(sentence) : 0
      const joined = buf ? `${buf} ${sentence}` : sentence
      if (buf && joined.length > max) flush(420)
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

function estimateMs(parts: Phrase[], rate: number) {
  const cps = Math.max(8, 14 * rate)
  return parts.reduce((n, p) => n + (p.text.length / cps) * 1000 + p.pause, 0)
}

function stretchTo(parts: Phrase[], targetMs: number, rate: number) {
  const extra = targetMs - estimateMs(parts, rate) - 5000
  if (extra <= 0 || !parts.length) return parts
  const heavy = parts.map((p, i) => ({ i, p })).filter((x) => x.p.pause >= 800)
  const slots = heavy.length ? heavy : parts.map((p, i) => ({ i, p }))
  const each = extra / slots.length
  return parts.map((p, i) => (slots.some((s) => s.i === i) ? { ...p, pause: Math.round(p.pause + each) } : p))
}

function speakMsOf(p: Phrase, rate = 0.85) {
  if (!p.text) return 0
  const cps = Math.max(8, 14 * rate)
  return (p.text.length / cps) * 1000
}

function durOf(p: Phrase, rate = 0.85) {
  return speakMsOf(p, rate) + p.pause
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

async function wait(ms: number, gen: number) {
  let left = Math.max(0, ms)
  while (left > 0) {
    if (cancelled || gen !== speakGen) return
    await waitWhilePaused()
    if (cancelled || gen !== speakGen) return
    const slice = Math.min(80, left)
    await sleep(slice)
    left -= slice
  }
}

async function waitWhilePaused() {
  if (!pausedFlag) return
  await new Promise<void>((resolve) => {
    pauseWait = resolve
  })
}

function indexAt(parts: Phrase[], startMs: number, rate = 0.85) {
  let acc = 0
  for (let i = 0; i < parts.length; i++) {
    const d = durOf(parts[i]!, rate)
    if (acc + d > startMs) return { i, offset: startMs - acc }
    acc += d
  }
  return { i: parts.length, offset: 0 }
}

async function fetchClip(text: string, voice: TtsVoice, gen: number) {
  const key = `${voice}:${text}`
  const hit = cache.get(key)
  if (hit) return hit
  const res = await fetch(ttsUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
  })
  if (gen !== speakGen) return null
  if (!res.ok) {
    let code = 'tts_fail'
    try {
      const j = (await res.json()) as { error?: string }
      if (j.error === 'missing_key') code = 'missing_key'
    } catch {
      /* ignore */
    }
    throw new Error(code)
  }
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  if (cache.size > 48) {
    const first = cache.keys().next().value
    if (first) {
      const old = cache.get(first)
      if (old) URL.revokeObjectURL(old)
      cache.delete(first)
    }
  }
  cache.set(key, url)
  return url
}

function ttsUrl() {
  const base = (import.meta.env.VITE_TTS_URL as string | undefined) || ''
  return `${base}/api/tts`
}

function voiceRoot() {
  const base = (import.meta.env.BASE_URL as string | undefined) || '/'
  const root = base.endsWith('/') ? base : `${base}/`
  return `${root}voice/`
}

type VoiceManifest = { clips?: Record<string, string> }

let manifestWait: Promise<Record<string, string>> | null = null

function loadManifest() {
  if (!manifestWait) {
    manifestWait = fetch(`${voiceRoot()}manifest.json`)
      .then((r) => (r.ok ? (r.json() as Promise<VoiceManifest>) : { clips: {} }))
      .then((j) => j.clips || {})
      .catch(() => ({} as Record<string, string>))
  }
  return manifestWait
}

function bakedSrc(rel: string) {
  const clean = rel.replace(/^\/+/, '')
  const path = clean.startsWith('clips/') ? clean : `clips/${clean}`
  return `${voiceRoot()}${path}`
}

async function bakedUrls(prefix: string, clipId?: string) {
  if (!clipId || !isVoiceLang(prefix)) return null
  const clips = await loadManifest()
  const raw = clips[`${prefix}:${clipId}`]
  if (!raw) return null
  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (!parts.length) return null
  return parts.map(bakedSrc)
}

function mediaDuration(url: string) {
  return new Promise<number>((resolve) => {
    const a = new Audio()
    a.preload = 'metadata'
    const timer = window.setTimeout(() => finish(0), 8000)
    function finish(ms: number) {
      window.clearTimeout(timer)
      a.onloadedmetadata = null
      a.onerror = null
      a.removeAttribute('src')
      a.load()
      resolve(ms)
    }
    a.onloadedmetadata = () => finish(Math.max(0, (a.duration || 0) * 1000))
    a.onerror = () => finish(0)
    a.src = url
  })
}

async function finishSpeak(gen: number, opts: SpeakOpts, err?: string) {
  if (gen !== speakGen) return
  audio.hold(false)
  audio.duck(false)
  stopClock()
  if (err) {
    setFlags({ error: err, loading: false, speaking: false, paused: false })
  } else {
    setFlags({ speaking: false, loading: false, paused: false })
  }
  opts.onend?.()
}

/** Play store MP3s. Returns false if files are missing so live TTS can take over. */
async function runBaked(urls: string[], gen: number, opts: SpeakOpts) {
  const durs = await Promise.all(urls.map(mediaDuration))
  if (cancelled || gen !== speakGen) return true
  if (durs.some((d) => d < 80)) return false
  const total = durs.reduce((n, d) => n + d, 0)
  const startMs = Math.max(0, opts.startMs ?? 0)
  clockStartMs = startMs
  clockOrigin = Date.now()
  clockPauseTotal = 0
  clockPausedAt = 0
  clockDuration = opts.fillMs ?? total
  setFlags({ speaking: true, loading: true, paused: false, error: null })
  armClock()
  audio.hushForVoice()
  try {
    let skip = startMs
    for (let i = 0; i < urls.length; i++) {
      if (cancelled || gen !== speakGen) return true
      const durMs = durs[i]!
      if (skip >= durMs - 40) {
        skip -= durMs
        continue
      }
      setFlags({ loading: true })
      await playUrl(urls[i]!, gen, skip / 1000)
      skip = 0
      if (cancelled || gen !== speakGen) return true
    }
    if (opts.fillMs) {
      const rest = Math.max(0, opts.fillMs - liveElapsed())
      if (rest > 80) await wait(rest, gen)
    }
  } catch (err) {
    if (cancelled || gen !== speakGen) return true
    const code = err instanceof Error ? err.message : 'tts_fail'
    await finishSpeak(gen, opts, code === 'missing_key' ? 'missing_key' : 'tts_fail')
    return true
  }
  if (cancelled || gen !== speakGen) return true
  await finishSpeak(gen, opts)
  return true
}

async function playUrl(url: string, gen: number, offsetSec = 0) {
  const node = player()
  node.volume = readVoiceVolume()
  await new Promise<void>((resolve, reject) => {
    const ok = () => {
      node.removeEventListener('loadeddata', ok)
      node.removeEventListener('error', bad)
      resolve()
    }
    const bad = () => {
      node.removeEventListener('loadeddata', ok)
      node.removeEventListener('error', bad)
      reject(new Error('play'))
    }
    node.addEventListener('loadeddata', ok)
    node.addEventListener('error', bad)
    node.src = url
    node.load()
  })
  if (cancelled || gen !== speakGen) return
  if (offsetSec > 0 && Number.isFinite(node.duration) && node.duration > 0.08) {
    node.currentTime = Math.min(offsetSec, node.duration - 0.05)
  }
  await waitWhilePaused()
  if (cancelled || gen !== speakGen) return
  await node.play()
  setFlags({ loading: false, speaking: true, paused: false })
  await new Promise<void>((resolve, reject) => {
    const done = window.setInterval(() => {
      if (cancelled || gen !== speakGen) {
        window.clearInterval(done)
        node.removeEventListener('ended', ok)
        node.removeEventListener('error', bad)
        resolve()
      }
    }, 80)
    const ok = () => {
      window.clearInterval(done)
      node.removeEventListener('ended', ok)
      node.removeEventListener('error', bad)
      resolve()
    }
    const bad = () => {
      window.clearInterval(done)
      node.removeEventListener('ended', ok)
      node.removeEventListener('error', bad)
      reject(new Error('play'))
    }
    node.addEventListener('ended', ok)
    node.addEventListener('error', bad)
  })
}

export function stopSpeak() {
  cancelled = true
  speakGen += 1
  pausedFlag = false
  pauseWait?.()
  pauseWait = null
  audio.hold(false)
  audio.duck(false)
  stopClock()
  const node = el
  if (node) {
    node.pause()
    node.removeAttribute('src')
    node.load()
  }
  setFlags({ speaking: false, loading: false, paused: false })
}

export function togglePause() {
  if (!speakingFlag && !loadingFlag) return
  const node = player()
  if (pausedFlag) {
    pausedFlag = false
    if (clockPausedAt) {
      clockPauseTotal += Date.now() - clockPausedAt
      clockPausedAt = 0
    }
    pauseWait?.()
    pauseWait = null
    audio.hold(false)
    audio.hushForVoice()
    void node.play().catch(() => {
      /* no clip yet */
    })
    setFlags({ paused: false })
    return
  }
  pausedFlag = true
  clockPausedAt = Date.now()
  node.pause()
  audio.hold(true)
  setFlags({ paused: true })
}

export function seekSpeakTo(ms: number) {
  if (!lastJob) return
  const cap = lastJob.opts.fillMs || clockDuration
  const target = Math.max(0, cap ? Math.min(ms, cap) : ms)
  void runSpeak(lastJob.text, { ...lastJob.opts, startMs: target })
}

export function seekSpeakBy(deltaMs: number) {
  seekSpeakTo(liveElapsed() + deltaMs)
}

export function speak(text: string, opts: SpeakOpts = {}) {
  void runSpeak(text, opts)
}

async function runSpeak(text: string, opts: SpeakOpts) {
  lastJob = { text, opts }
  stopSpeak()
  cancelled = false
  const gen = speakGen
  const prefix = langPrefix(resolveLang(opts.lang))

  const urls = await bakedUrls(prefix, opts.clipId)
  if (cancelled || gen !== speakGen) return
  if (urls) {
    const used = await runBaked(urls, gen, opts)
    if (used) return
    if (cancelled || gen !== speakGen) return
  }

  const mode = opts.mode ?? readReadMode()
  let parts = phrases(text, prefix, mode)
  if (!parts.length) {
    opts.onend?.()
    return
  }
  if (opts.fillMs) parts = stretchTo(parts, opts.fillMs, 0.85)
  const voice = readTtsVoice()
  const startMs = Math.max(0, opts.startMs ?? 0)
  clockStartMs = startMs
  clockOrigin = Date.now()
  clockPauseTotal = 0
  clockPausedAt = 0
  clockDuration = opts.fillMs ?? estimateMs(parts, 0.85)
  const { i: from, offset } = indexAt(parts, startMs)
  setFlags({ speaking: true, loading: true, paused: false, error: null })
  armClock()
  audio.hushForVoice()

  try {
    for (let i = from; i < parts.length; i++) {
      if (cancelled || gen !== speakGen) return
      const part = parts[i]!
      const into = i === from ? offset : 0
      const talk = speakMsOf(part)
      if (into >= talk + part.pause) continue
      if (!part.text || into >= talk) {
        await wait(part.pause - Math.max(0, into - talk), gen)
        continue
      }
      setFlags({ loading: true })
      const nextText = parts[i + 1]?.text
      const nextP = nextText ? fetchClip(nextText, voice, gen) : null
      const url = await fetchClip(part.text, voice, gen)
      if (!url || cancelled || gen !== speakGen) return
      setFlags({ loading: false, speaking: true })
      await playUrl(url, gen, into / 1000)
      if (cancelled || gen !== speakGen) return
      await nextP
      await waitWhilePaused()
      if (part.pause) await wait(part.pause, gen)
    }
    if (opts.fillMs) {
      const rest = Math.max(0, opts.fillMs - liveElapsed())
      if (rest > 80) await wait(rest, gen)
    }
  } catch (err) {
    if (cancelled || gen !== speakGen) return
    const code = err instanceof Error ? err.message : 'tts_fail'
    setFlags({ error: code === 'missing_key' ? 'missing_key' : 'tts_fail', loading: false, speaking: false })
    audio.hold(false)
    audio.duck(false)
    stopClock()
    opts.onend?.()
    return
  }
  if (gen !== speakGen) return
  audio.hold(false)
  audio.duck(false)
  stopClock()
  setFlags({ speaking: false, loading: false, paused: false })
  opts.onend?.()
}

export function speakCue(text: string, lang?: string) {
  const mode = readReadMode()
  const prefix = langPrefix(resolveLang(lang))
  const line = humanize(text, prefix, mode)
  if (!line) return
  speak(line, { lang, mode })
}

export { VOICE_SAMPLE }

export function sampleLine(bcp47: string) {
  return VOICE_SAMPLE[langPrefix(bcp47)] || VOICE_SAMPLE.en!
}

export function warmVoices(): Promise<void> {
  return Promise.resolve()
}
