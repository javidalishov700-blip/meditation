import { audio } from './audio'
import { isNativeApp } from './device'
import { readJson, writeJson } from './storage'
import { localVoiceRoot, remoteVoiceRoot, voiceRoots } from './voice-host'
import { VOICE_SAMPLE } from './voice-lines'
import bundledVoiceManifest from '../../public/voice/manifest.json'

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
let lastJob: LastJob | null = null
let clockOrigin = 0
let clockPauseTotal = 0
let clockPausedAt = 0
let clockStartMs = 0
let clockDuration = 0
let clockTick: number | null = null
const bufCache = new Map<string, AudioBuffer>()
const listeners = new Set<() => void>()

type SliceCtl = {
  source: AudioBufferSourceNode
  startedCtx: number
  offset: number
  settle: (nextOffset: number) => void
}

let sliceCtl: SliceCtl | null = null
let htmlVoice: HTMLAudioElement | null = null

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
  audio.setVoiceLevel(v)
  emit()
}

export function isSpeaking() {
  return speakingFlag
}

export function isLoading() {
  return loadingFlag
}

let snapCache: SpeechSnap = {
  speaking: false,
  loading: false,
  paused: false,
  volume: readVoiceVolume(),
  error: null,
  voice: readTtsVoice(),
  elapsedMs: 0,
  durationMs: 0,
}

export function speechSnap(): SpeechSnap {
  return snapCache
}

export function subscribeSpeak(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function emit() {
  snapCache = {
    speaking: speakingFlag,
    loading: loadingFlag,
    paused: pausedFlag,
    volume: readVoiceVolume(),
    error: errorFlag,
    voice: readTtsVoice(),
    elapsedMs: liveElapsed(),
    durationMs: clockDuration,
  }
  listeners.forEach((fn) => fn())
}

function setFlags(partial: { speaking?: boolean; loading?: boolean; paused?: boolean; error?: string | null }) {
  if (partial.speaking != null) speakingFlag = partial.speaking
  if (partial.loading != null) loadingFlag = partial.loading
  if (partial.paused != null) pausedFlag = partial.paused
  if (partial.error !== undefined) errorFlag = partial.error
  emit()
}

export async function primeAudio() {
  try {
    await audio.ensure()
  } catch {
    /* no Web Audio */
  }
}

function langPrefix(bcp47: string) {
  return bcp47.slice(0, 2).toLowerCase()
}

function resolveLang(lang?: string) {
  return lang || document.documentElement.lang || 'tr-TR'
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

const VOICE_CACHE = 'steady-voice-v7'
type VoiceManifest = { clips?: Record<string, string> }

let manifestWait: Promise<Record<string, string[]>> | null = null
let manifestMap: Record<string, string[]> | null = null

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

function looksLikeHtml(type: string) {
  const t = type.toLowerCase()
  return t.includes('text/html') || t.includes('application/xhtml')
}

function looksLikeAudio(type: string, url = '') {
  const t = type.toLowerCase()
  if (!t) return /\.mp3(?:\?|$)/i.test(url)
  if (looksLikeHtml(t) || t.includes('javascript') || t.includes('json') || t.startsWith('text/')) return false
  return t.includes('audio') || t.includes('mpeg') || t.includes('mp3') || t.includes('octet')
}

function isVoiceClipUrl(url: string) {
  return /\.mp3(?:\?|$)/i.test(url)
}

async function fetchRes(url: string) {
  if (isNativeApp()) {
    try {
      const res = await fetch(url, { cache: 'no-store', credentials: 'omit' })
      if (!res.ok) return null
      if (looksLikeHtml(res.headers.get('content-type') || '')) return null
      return res
    } catch {
      return null
    }
  }
  const cache = await cacheStore()
  if (cache) {
    const hit = await cache.match(url)
    if (hit) {
      if (!looksLikeHtml(hit.headers.get('content-type') || '')) return hit
      try {
        await cache.delete(url)
      } catch {
        /* ignore */
      }
    }
  }
  try {
    const res = await fetch(url, { mode: 'cors', credentials: 'omit' })
    if (!res.ok) return null
    if (looksLikeHtml(res.headers.get('content-type') || '')) return null
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

function decodeBuffer(ctx: AudioContext, data: ArrayBuffer) {
  const copy = data.slice(0)
  return new Promise<AudioBuffer>((resolve, reject) => {
    let settled = false
    const ok = (buf: AudioBuffer) => {
      if (settled) return
      settled = true
      resolve(buf)
    }
    const bad = (err?: unknown) => {
      if (settled) return
      settled = true
      reject(err ?? new Error('decode'))
    }
    try {
      const ret = ctx.decodeAudioData(copy, ok, bad)
      if (ret && typeof ret.then === 'function') ret.then(ok, bad)
    } catch (err) {
      bad(err)
    }
  })
}

function isRemoteVoiceUrl(url: string) {
  const remote = remoteVoiceRoot()
  return Boolean(remote && url.startsWith(remote))
}

function canHitNetwork(url: string) {
  if (typeof navigator === 'undefined' || navigator.onLine !== false) return true
  return !isRemoteVoiceUrl(url)
}

async function decodeUrl(url: string, ctx: AudioContext) {
  const hit = bufCache.get(url)
  if (hit) return hit
  const tryOnce = async (reload: boolean) => {
    if (reload && !canHitNetwork(url)) return null
    const res = reload && !isNativeApp()
      ? await fetch(url, { cache: 'reload', mode: 'cors', credentials: 'omit' }).catch(() => null)
      : await fetchRes(url)
    if (!res || !res.ok) return null
    const type = res.headers.get('content-type') || ''
    const nativeClip = isNativeApp() && isVoiceClipUrl(url)
    if (type && looksLikeHtml(type)) return null
    if (type && !looksLikeAudio(type, url) && !nativeClip) return null
    const data = await res.arrayBuffer()
    if (data.byteLength < 80) return null
    const buf = await decodeBuffer(ctx, data)
    if (buf.duration < 0.08) return null
    return buf
  }
  try {
    const buf = (await tryOnce(false)) || (await tryOnce(true))
    if (!buf) return null
    bufCache.set(url, buf)
    return buf
  } catch {
    try {
      const cache = await cacheStore()
      await cache?.delete(url)
    } catch {
      /* ignore */
    }
    try {
      const buf = await tryOnce(true)
      if (!buf) return null
      bufCache.set(url, buf)
      return buf
    } catch {
      return null
    }
  }
}

function haltHtmlVoice() {
  const el = htmlVoice
  htmlVoice = null
  if (!el) return
  el.onended = null
  el.onerror = null
  try {
    el.pause()
  } catch {
    /* ignore */
  }
  try {
    el.removeAttribute('src')
    el.load()
  } catch {
    /* ignore */
  }
}

function haltSlice(nextOffset: number) {
  const ctl = sliceCtl
  if (!ctl) return
  sliceCtl = null
  ctl.settle(nextOffset)
  try {
    ctl.source.stop()
  } catch {
    /* already stopped */
  }
}

function playSlice(ctx: AudioContext, buffer: AudioBuffer, offset: number, gen: number) {
  return new Promise<number>((resolve, reject) => {
    if (cancelled || gen !== speakGen) {
      resolve(-1)
      return
    }
    const gain = audio.voiceGain()
    if (!gain) {
      reject(new Error('play'))
      return
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.connect(gain)
    const startOff = Math.min(Math.max(0, offset), Math.max(0, buffer.duration - 0.02))
    let settled = false
    const settle = (next: number) => {
      if (settled) return
      settled = true
      if (sliceCtl?.source === src) sliceCtl = null
      resolve(next)
    }
    src.onended = () => {
      if (settled) return
      settle(-1)
    }
    sliceCtl = { source: src, startedCtx: ctx.currentTime, offset: startOff, settle }
    audio.setVoiceLevel(readVoiceVolume())
    try {
      src.start(0, startOff)
    } catch (err) {
      sliceCtl = null
      reject(err)
      return
    }
    audio.hushForVoice()
    setFlags({ loading: false, speaking: true, paused: false })
  })
}

async function readManifestRes(res: Response | null) {
  if (!res || !res.ok) return null
  const type = res.headers.get('content-type') || ''
  if (looksLikeHtml(type)) return null
  try {
    return (await res.json()) as VoiceManifest
  } catch {
    return null
  }
}

async function fetchManifestJson(root: string) {
  const cache = await cacheStore()
  const urls = [`${root}manifest.json?v=7`, `${root}manifest.json`]
  if (canHitNetwork(urls[0]!)) {
    for (const url of urls) {
      try {
        const res = await fetch(url, { cache: 'no-store', mode: 'cors', credentials: 'omit' })
        if (!res.ok) continue
        const stored = res.clone()
        const j = await readManifestRes(res)
        if (!j) continue
        if (cache) {
          try {
            await cache.put(url, stored.clone())
            await cache.put(urls[1]!, stored)
          } catch {
            /* quota */
          }
        }
        return j
      } catch {
        /* offline or blocked */
      }
    }
  }
  if (cache) {
    for (const url of urls) {
      try {
        const hit = await cache.match(url)
        const j = await readManifestRes(hit ?? null)
        if (j) return j
      } catch {
        /* ignore */
      }
    }
  }
  for (const url of urls) {
    try {
      const res = await fetch(url, { mode: 'cors', credentials: 'omit' })
      const j = await readManifestRes(res)
      if (j) return j
    } catch {
      /* ignore */
    }
  }
  return null
}

function mergeClips(merged: Record<string, string[]>, root: string, j: VoiceManifest) {
  for (const [key, raw] of Object.entries(j.clips || {})) {
    if (merged[key]?.length) continue
    const parts = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((rel) => `${root}${clipRel(rel)}`)
    if (parts.length) merged[key] = parts
  }
}

async function loadManifest() {
  if (!manifestWait) {
    manifestWait = (async () => {
      const merged: Record<string, string[]> = {}
      const local = localVoiceRoot()
      if (isNativeApp()) {
        mergeClips(merged, local, bundledVoiceManifest as VoiceManifest)
      }
      for (const root of voiceRoots()) {
        const j = await fetchManifestJson(root)
        if (j) mergeClips(merged, root, j)
      }
      if (!Object.keys(merged).length) {
        mergeClips(merged, local, bundledVoiceManifest as VoiceManifest)
      }
      manifestMap = merged
      return merged
    })()
  }
  return manifestWait
}

function clipPriority(key: string) {
  if (key.includes(':ui:') || key.includes(':sos:')) return 0
  if (key.includes(':sample')) return 1
  if (key.includes(':med:first-')) return 2
  if (key.includes(':med:')) return 3
  return 9
}

async function prefetchOfflineVoice(prefix: string) {
  const lang = prefix
  const clips = await loadManifest()
  const urls = Object.entries(clips)
    .filter(([key]) => key.startsWith(`${lang}:`) && clipPriority(key) < 9)
    .sort((a, b) => clipPriority(a[0]) - clipPriority(b[0]))
    .flatMap(([, parts]) => parts)
  const seen = new Set<string>()
  for (const url of urls) {
    if (seen.has(url)) continue
    seen.add(url)
    try {
      await fetchRes(url)
    } catch {
      /* keep going */
    }
  }
}

async function bakedUrls(prefix: string, clipId?: string) {
  if (!clipId) return null
  const clips = manifestMap ?? (await loadManifest())
  const urls = clips[`${prefix}:${clipId}`]
  return urls?.length ? urls : null
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

/** Play store MP3s through Web Audio. Returns false if files are missing. */
async function runBaked(urls: string[], gen: number, opts: SpeakOpts) {
  if (isNativeApp()) return runBakedHtml(urls, gen, opts)
  const ctx = await audio.ensure()
  if (cancelled || gen !== speakGen) return true
  const buffers: AudioBuffer[] = []
  for (const url of urls) {
    if (cancelled || gen !== speakGen) return true
    const buf = await decodeUrl(url, ctx)
    if (buf) buffers.push(buf)
  }
  if (!buffers.length) return false
  if (cancelled || gen !== speakGen) return true
  const total = buffers.reduce((n, b) => n + b.duration * 1000, 0)
  if (total < 80) return false
  const startMs = Math.max(0, opts.startMs ?? 0)
  clockStartMs = startMs
  clockOrigin = Date.now()
  clockPauseTotal = 0
  clockPausedAt = 0
  clockDuration = opts.fillMs ?? total
  setFlags({ speaking: true, loading: true, paused: false, error: null })
  armClock()
  try {
    let skip = startMs / 1000
    for (const buffer of buffers) {
      if (cancelled || gen !== speakGen) return true
      if (skip >= buffer.duration - 0.04) {
        skip -= buffer.duration
        continue
      }
      let offset = skip
      skip = 0
      while (offset >= 0) {
        if (cancelled || gen !== speakGen) return true
        await waitWhilePaused()
        if (cancelled || gen !== speakGen) return true
        if (ctx.state === 'suspended') await ctx.resume()
        offset = await playSlice(ctx, buffer, offset, gen)
      }
    }
    if (opts.fillMs) {
      audio.duck(false)
      const rest = Math.max(0, opts.fillMs - liveElapsed())
      if (rest > 80) await wait(rest, gen)
    }
  } catch {
    if (cancelled || gen !== speakGen) return true
    return false
  }
  if (cancelled || gen !== speakGen) return true
  await finishSpeak(gen, opts)
  return true
}

/** Reads a clip's duration without playing it, so we know whether startMs skips past it entirely. */
function probeClipDuration(url: string): Promise<number> {
  return new Promise((resolve) => {
    const el = new Audio()
    el.preload = 'metadata'
    let settled = false
    const done = (d: number) => {
      if (settled) return
      settled = true
      el.onloadedmetadata = null
      el.onerror = null
      resolve(d)
    }
    el.onloadedmetadata = () => done(Number.isFinite(el.duration) ? el.duration : 0)
    el.onerror = () => done(0)
    el.src = url
  })
}

/** iOS WKWebView often fails decodeAudioData on baked ADTS MP3s; HTMLAudio plays them. */
async function runBakedHtml(urls: string[], gen: number, opts: SpeakOpts): Promise<boolean> {
  audio.unlock()
  if (cancelled || gen !== speakGen) return true
  const startMs = Math.max(0, opts.startMs ?? 0)
  clockStartMs = startMs
  clockOrigin = Date.now()
  clockPauseTotal = 0
  clockPausedAt = 0
  clockDuration = opts.fillMs ?? 0
  setFlags({ speaking: true, loading: true, paused: false, error: null })
  armClock()
  let played = false
  try {
    let skip = startMs / 1000
    for (const url of urls) {
      if (cancelled || gen !== speakGen) return true
      let offset = 0
      if (skip > 0.02) {
        const dur = await probeClipDuration(url)
        if (skip >= Math.max(0, dur - 0.04)) {
          skip -= dur
          continue
        }
        offset = skip
        skip = 0
      }
      await waitWhilePaused()
      if (cancelled || gen !== speakGen) return true
      const ok = await playHtmlClip(url, gen, offset)
      if (ok) played = true
      // A single broken/missing segment should not silence the rest of the step.
    }
    if (!played && urls.length) return false
    if (opts.fillMs) {
      audio.duck(false)
      const rest = Math.max(0, opts.fillMs - liveElapsed())
      if (rest > 80) await wait(rest, gen)
    }
  } catch {
    if (cancelled || gen !== speakGen) return true
    return false
  }
  if (cancelled || gen !== speakGen) return true
  await finishSpeak(gen, opts)
  return true
}

function playHtmlClip(url: string, gen: number, offsetSec = 0) {
  return new Promise<boolean>((resolve) => {
    haltHtmlVoice()
    if (cancelled || gen !== speakGen) {
      resolve(true)
      return
    }
    const el = new Audio(url)
    el.setAttribute('playsinline', 'true')
    el.setAttribute('webkit-playsinline', 'true')
    el.preload = 'auto'
    el.volume = readVoiceVolume()
    htmlVoice = el
    let settled = false
    const finish = (ok: boolean) => {
      if (settled) return
      settled = true
      if (htmlVoice === el) htmlVoice = null
      resolve(ok)
    }
    el.onended = () => finish(true)
    el.onerror = () => finish(false)
    if (offsetSec > 0.02) {
      el.onloadedmetadata = () => {
        try {
          el.currentTime = Math.min(offsetSec, Math.max(0, (el.duration || offsetSec) - 0.05))
        } catch {
          /* seek not ready yet; play from the start instead of failing */
        }
      }
    }
    audio.hushForVoice()
    setFlags({ loading: false, speaking: true, paused: false })
    void el
      .play()
      .then(() => undefined)
      .catch(() => finish(false))
  })
}

function haltSynth() {
  try {
    window.speechSynthesis.cancel()
  } catch {
    /* device TTS is unused */
  }
}

export function stopSpeak() {
  cancelled = true
  speakGen += 1
  pausedFlag = false
  pauseWait?.()
  pauseWait = null
  haltHtmlVoice()
  haltSlice(-1)
  haltSynth()
  audio.hold(false)
  audio.duck(false)
  stopClock()
  setFlags({ speaking: false, loading: false, paused: false })
}

export function togglePause() {
  if (!speakingFlag && !loadingFlag) return
  if (htmlVoice) {
    if (pausedFlag) {
      pausedFlag = false
      if (clockPausedAt) {
        clockPauseTotal += Date.now() - clockPausedAt
        clockPausedAt = 0
      }
      pauseWait?.()
      pauseWait = null
      audio.hold(false)
      void htmlVoice.play().catch(() => undefined)
      audio.hushForVoice()
      setFlags({ paused: false })
      return
    }
    pausedFlag = true
    clockPausedAt = Date.now()
    htmlVoice.pause()
    audio.hold(true)
    setFlags({ paused: true })
    return
  }
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
    setFlags({ paused: false })
    return
  }
  pausedFlag = true
  clockPausedAt = Date.now()
  const ctl = sliceCtl
  if (ctl) {
    const elapsed = ctl.offset + Math.max(0, audio.ctxTime() - ctl.startedCtx)
    haltSlice(elapsed)
  }
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

export function speechClipId() {
  return lastJob?.opts.clipId ?? null
}

export function speak(text: string, opts: SpeakOpts = {}) {
  audio.unlock()
  void runSpeak(text, opts)
}

async function runSpeak(text: string, opts: SpeakOpts) {
  lastJob = { text, opts }
  stopSpeak()
  cancelled = false
  const gen = speakGen
  const prefix = langPrefix(resolveLang(opts.lang))

  setFlags({ speaking: true, loading: true, paused: false, error: null })
  await wait(90, gen)
  if (cancelled || gen !== speakGen) return
  if (!text.trim() || !opts.clipId) {
    await finishSpeak(gen, opts, 'voice_missing')
    return
  }
  let urls: string[] | null = null
  try {
    urls = await bakedUrls(prefix, opts.clipId)
  } catch {
    urls = null
  }
  if (cancelled || gen !== speakGen) return
  if (urls) {
    try {
      const used = await runBaked(urls, gen, opts)
      if (cancelled || gen !== speakGen) return
      if (used) return
    } catch {
      /* missing clip */
    }
  }
  await finishSpeak(gen, opts, 'voice_missing')
}

export function speakCue(text: string, lang?: string, clipId?: string) {
  if (!text.trim()) return
  speak(text, { lang, clipId })
}

export { VOICE_SAMPLE }

export function sampleLine(bcp47: string) {
  return VOICE_SAMPLE[langPrefix(bcp47)] || VOICE_SAMPLE.en!
}

export function warmVoices(lang?: string): Promise<void> {
  const prefix = langPrefix(resolveLang(lang))
  const run = () => {
    void prefetchOfflineVoice(prefix)
  }
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 2500 })
  } else {
    window.setTimeout(run, 400)
  }
  return Promise.resolve()
}
