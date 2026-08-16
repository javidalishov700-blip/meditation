import { audio } from './audio'
import { readJson, writeJson } from './storage'
import { remoteVoiceRoot, voiceRoots } from './voice-host'
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
let synthUtter: SpeechSynthesisUtterance | null = null
let synthChunks: string[] = []
let usingSynth = false

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

const VOICE_CACHE = 'steady-voice-v5'
type VoiceManifest = { clips?: Record<string, string> }

let manifestWait: Promise<Record<string, string[]>> | null = null
let manifestMap: Record<string, string[]> | null = null
let synthWatch: number | null = null

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

function looksLikeAudio(type: string) {
  const t = type.toLowerCase()
  if (!t) return true
  if (looksLikeHtml(t) || t.includes('javascript') || t.includes('json') || t.startsWith('text/')) return false
  return t.includes('audio') || t.includes('mpeg') || t.includes('mp3') || t.includes('octet')
}

async function fetchRes(url: string) {
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
    const res = reload
      ? await fetch(url, { cache: 'reload', mode: 'cors', credentials: 'omit' }).catch(() => null)
      : await fetchRes(url)
    if (!res || !res.ok) return null
    const type = res.headers.get('content-type') || ''
    if (type && (looksLikeHtml(type) || !looksLikeAudio(type))) return null
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
  const urls = [`${root}manifest.json?v=5`, `${root}manifest.json`]
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
      for (const root of voiceRoots()) {
        const j = await fetchManifestJson(root)
        if (j) mergeClips(merged, root, j)
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

function haltSynth() {
  usingSynth = false
  synthUtter = null
  if (synthWatch != null) {
    window.clearInterval(synthWatch)
    synthWatch = null
  }
  try {
    window.speechSynthesis.cancel()
  } catch {
    /* no speechSynthesis */
  }
}

function unlockSynth(lang?: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  try {
    window.speechSynthesis.resume()
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0
    u.rate = 1
    u.lang = lang || document.documentElement.lang || 'en-US'
    window.speechSynthesis.speak(u)
  } catch {
    /* ignore */
  }
}

function waitVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return Promise.resolve()
  const ready = window.speechSynthesis.getVoices()
  if (ready.length) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const done = () => resolve()
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true })
    window.setTimeout(done, 700)
  })
}

function pickVoice(prefix: string) {
  const voices = window.speechSynthesis.getVoices()
  const lang = prefix === 'az' ? ['az', 'tr'] : prefix === 'en' ? ['en'] : [prefix]
  const pool = voices.filter((v) => lang.some((p) => v.lang.toLowerCase().startsWith(p)))
  const female =
    /female|samantha|karen|moira|serena|fiona|tessa|veena|yelda|filiz|monica|paulina|alice|federica|milena|katya|zira|hazel|siri|ava|jenny|aria|emma|michelle|susan|victoria|kathy|google uk english female|google us english/i
  return (
    pool.find((v) => female.test(v.name)) ||
    pool.find((v) => /neural|premium|enhanced/i.test(v.name)) ||
    pool.find((v) => v.localService) ||
    pool[0] ||
    null
  )
}

function splitForSynth(text: string) {
  const paras = text
    .split(/\n{2,}/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  const out: string[] = []
  for (const p of paras) {
    if (p.length <= 220) {
      out.push(p)
      continue
    }
    const bits = p.split(/(?<=[.!?…])\s+/)
    let buf = ''
    for (const b of bits) {
      const next = buf ? `${buf} ${b}` : b
      if (next.length > 220 && buf) {
        out.push(buf)
        buf = b
      } else buf = next
    }
    if (buf) out.push(buf)
  }
  return out
}

function synthRate(opts: SpeakOpts) {
  if (opts.rate) return Math.max(0.6, Math.min(1.05, opts.rate))
  const mode = opts.mode || readReadMode()
  if (mode === 'slow') return 0.72
  if (mode === 'natural') return 0.94
  return 0.8
}

function speakUtterance(text: string, prefix: string, opts: SpeakOpts, gen: number) {
  return new Promise<void>((resolve, reject) => {
    if (cancelled || gen !== speakGen) {
      resolve()
      return
    }
    const u = new SpeechSynthesisUtterance(text)
    const voice = pickVoice(prefix)
    if (voice) {
      u.voice = voice
      u.lang = voice.lang || `${prefix}-${prefix.toUpperCase()}`
    } else {
      u.lang =
        prefix === 'en'
          ? 'en-US'
          : prefix === 'tr'
            ? 'tr-TR'
            : prefix === 'az'
              ? 'az-AZ'
              : prefix === 'ru'
                ? 'ru-RU'
                : prefix === 'es'
                  ? 'es-ES'
                  : prefix === 'it'
                    ? 'it-IT'
                    : `${prefix}-${prefix.toUpperCase()}`
    }
    u.rate = synthRate(opts)
    u.pitch = 0.98
    u.volume = Math.max(0.15, readVoiceVolume())
    synthUtter = u
    u.onend = () => {
      if (synthUtter === u) synthUtter = null
      resolve()
    }
    u.onerror = (ev) => {
      if (synthUtter === u) synthUtter = null
      if (ev.error === 'canceled' || ev.error === 'interrupted') resolve()
      else reject(new Error(ev.error || 'synth'))
    }
    try {
      window.speechSynthesis.resume()
    } catch {
      /* ignore */
    }
    window.speechSynthesis.speak(u)
  })
}

async function runSynth(text: string, gen: number, opts: SpeakOpts, prefix: string) {
  const line = humanize(text, prefix, opts.mode || readReadMode())
  if (!line || typeof window === 'undefined' || !window.speechSynthesis) return false
  await waitVoices()
  if (cancelled || gen !== speakGen) return true
  synthChunks = splitForSynth(line)
  if (!synthChunks.length) return false
  const words = line.split(/\s+/).filter(Boolean).length
  const estMs = Math.max(1200, (words / (synthRate(opts) * 2.35)) * 1000)
  const startMs = Math.max(0, opts.startMs ?? 0)
  clockStartMs = startMs
  clockOrigin = Date.now()
  clockPauseTotal = 0
  clockPausedAt = 0
  clockDuration = opts.fillMs ?? estMs
  usingSynth = true
  setFlags({ speaking: true, loading: false, paused: false, error: null })
  armClock()
  audio.hushForVoice()
  if (synthWatch != null) window.clearInterval(synthWatch)
  synthWatch = window.setInterval(() => {
    if (!usingSynth || cancelled || gen !== speakGen) return
    try {
      window.speechSynthesis.resume()
    } catch {
      /* Chrome drops long utterances unless resumed */
    }
  }, 8000)
  const skip = startMs / Math.max(1, estMs)
  let acc = 0
  try {
    await wait(40, gen)
    for (let i = 0; i < synthChunks.length; i++) {
      if (cancelled || gen !== speakGen) return true
      await waitWhilePaused()
      if (cancelled || gen !== speakGen) return true
      const share = 1 / synthChunks.length
      acc += share
      if (skip >= acc) continue
      await speakUtterance(synthChunks[i]!, prefix, opts, gen)
      if (cancelled || gen !== speakGen) return true
      await wait(380, gen)
    }
    if (opts.fillMs) {
      audio.duck(false)
      const rest = Math.max(0, opts.fillMs - liveElapsed())
      if (rest > 80) await wait(rest, gen)
    }
  } catch {
    if (cancelled || gen !== speakGen) return true
    usingSynth = false
    if (synthWatch != null) {
      window.clearInterval(synthWatch)
      synthWatch = null
    }
    await finishSpeak(gen, opts, 'tts_fail')
    return true
  }
  usingSynth = false
  if (synthWatch != null) {
    window.clearInterval(synthWatch)
    synthWatch = null
  }
  if (cancelled || gen !== speakGen) return true
  await finishSpeak(gen, opts)
  return true
}

export function stopSpeak() {
  cancelled = true
  speakGen += 1
  pausedFlag = false
  pauseWait?.()
  pauseWait = null
  haltSlice(-1)
  haltSynth()
  audio.hold(false)
  audio.duck(false)
  stopClock()
  setFlags({ speaking: false, loading: false, paused: false })
}

export function togglePause() {
  if (!speakingFlag && !loadingFlag) return
  if (pausedFlag) {
    pausedFlag = false
    if (clockPausedAt) {
      clockPauseTotal += Date.now() - clockPausedAt
      clockPausedAt = 0
    }
    pauseWait?.()
    pauseWait = null
    audio.hold(false)
    if (usingSynth) {
      try {
        window.speechSynthesis.resume()
      } catch {
        /* iOS often ignores resume */
      }
    }
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
  if (usingSynth) {
    try {
      window.speechSynthesis.pause()
    } catch {
      /* iOS often ignores pause */
    }
  }
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
  unlockSynth(opts.lang)
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
  if (!text.trim()) {
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
      /* device voice next */
    }
  }
  const spoken = await runSynth(text, gen, opts, prefix)
  if (cancelled || gen !== speakGen) return
  if (!spoken) await finishSpeak(gen, opts, 'voice_missing')
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

export function warmVoices(lang?: string): Promise<void> {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.getVoices()
      void waitVoices()
    } catch {
      /* ignore */
    }
  }
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
