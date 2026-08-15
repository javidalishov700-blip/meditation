import { audio } from './audio'
import { isVoiceLang } from './locales'
import { readJson, writeJson } from './storage'
import { voiceRoots } from './voice-host'
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

const VOICE_CACHE = 'steady-voice-v1'
type VoiceManifest = { clips?: Record<string, string> }

let manifestWait: Promise<Record<string, string[]>> | null = null

function clipRel(rel: string) {
  const clean = rel.replace(/^\/+/, '')
  return clean.startsWith('clips/') ? clean : `clips/${clean}`
}

async function cacheStore() {
  try {
    return await caches.open(VOICE_CACHE)
  } catch {
    return null
  }
}

async function fetchRes(url: string) {
  const cache = await cacheStore()
  if (cache) {
    const hit = await cache.match(url)
    if (hit) return hit
  }
  try {
    const res = await fetch(url, { mode: 'cors', credentials: 'omit' })
    if (!res.ok) return null
    if (cache) {
      try {
        await cache.put(url, res.clone())
      } catch {
        /* quota */
      }
    }
    return res
  } catch {
    return null
  }
}

async function audioObjectUrl(url: string) {
  const hit = cache.get(url)
  if (hit) return hit
  const res = await fetchRes(url)
  if (!res) return null
  const blob = await res.blob()
  if (!blob.size) return null
  const obj = URL.createObjectURL(blob)
  cache.set(url, obj)
  return obj
}

async function loadManifest() {
  if (!manifestWait) {
    manifestWait = (async () => {
      const merged: Record<string, string[]> = {}
      for (const root of voiceRoots()) {
        try {
          const res = await fetchRes(`${root}manifest.json`)
          if (!res) continue
          const j = (await res.json()) as VoiceManifest
          for (const [key, raw] of Object.entries(j.clips || {})) {
            if (merged[key]?.length) continue
            const parts = raw
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .map((rel) => `${root}${clipRel(rel)}`)
            if (parts.length) merged[key] = parts
          }
        } catch {
          /* try next root */
        }
      }
      return merged
    })()
  }
  return manifestWait
}

async function bakedUrls(prefix: string, clipId?: string) {
  if (!clipId || !isVoiceLang(prefix)) return null
  const clips = await loadManifest()
  const urls = clips[`${prefix}:${clipId}`]
  return urls?.length ? urls : null
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

/** Play store MP3s. Returns false if files are missing. */
async function runBaked(urls: string[], gen: number, opts: SpeakOpts) {
  const blobs: string[] = []
  for (const url of urls) {
    if (cancelled || gen !== speakGen) return true
    const obj = await audioObjectUrl(url)
    if (!obj) return false
    blobs.push(obj)
  }
  const durs = await Promise.all(blobs.map(mediaDuration))
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
    for (let i = 0; i < blobs.length; i++) {
      if (cancelled || gen !== speakGen) return true
      const durMs = durs[i]!
      if (skip >= durMs - 40) {
        skip -= durMs
        continue
      }
      setFlags({ loading: true })
      await playUrl(blobs[i]!, gen, skip / 1000)
      skip = 0
      if (cancelled || gen !== speakGen) return true
    }
    if (opts.fillMs) {
      const rest = Math.max(0, opts.fillMs - liveElapsed())
      if (rest > 80) await wait(rest, gen)
    }
  } catch {
    if (cancelled || gen !== speakGen) return true
    await finishSpeak(gen, opts, 'tts_fail')
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

  setFlags({ speaking: true, loading: true, paused: false, error: null })
  const urls = await bakedUrls(prefix, opts.clipId)
  if (cancelled || gen !== speakGen) return
  if (!urls) {
    await finishSpeak(gen, opts, 'voice_missing')
    return
  }
  const used = await runBaked(urls, gen, opts)
  if (cancelled || gen !== speakGen) return
  if (!used) await finishSpeak(gen, opts, 'voice_missing')
}

export function speakCue(text: string, lang?: string, clipId?: string) {
  const mode = readReadMode()
  const prefix = langPrefix(resolveLang(lang))
  const line = humanize(text, prefix, mode)
  if (!line) return
  speak(line, { lang, mode, clipId })
}

export { VOICE_SAMPLE }

export function sampleLine(bcp47: string) {
  return VOICE_SAMPLE[langPrefix(bcp47)] || VOICE_SAMPLE.en!
}

export function warmVoices(): Promise<void> {
  return Promise.resolve()
}
