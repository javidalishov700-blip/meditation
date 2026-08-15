let cancelled = false
let watchdog: number | null = null

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? []
  const tr = voices.find((v) => v.lang.toLowerCase().startsWith('tr'))
  if (tr) return tr
  return voices.find((v) => v.lang.toLowerCase().startsWith('en')) ?? voices[0] ?? null
}

function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []
  const parts = clean.split(/(?<=[.!?…;:])\s+/)
  const out: string[] = []
  let buf = ''
  for (const p of parts) {
    if ((buf + ' ' + p).trim().length > 140) {
      if (buf) out.push(buf.trim())
      buf = p
    } else {
      buf = (buf + ' ' + p).trim()
    }
  }
  if (buf) out.push(buf.trim())
  return out
}

function clearWatchdog() {
  if (watchdog != null) {
    window.clearInterval(watchdog)
    watchdog = null
  }
}

function startWatchdog() {
  clearWatchdog()
  watchdog = window.setInterval(() => {
    if (!window.speechSynthesis?.speaking) return
    window.speechSynthesis.pause()
    window.speechSynthesis.resume()
  }, 9000)
}

type SpeakOpts = {
  rate?: number
  pitch?: number
  onend?: () => void
}

export function stopSpeak() {
  cancelled = true
  clearWatchdog()
  window.speechSynthesis?.cancel()
}

export function speak(text: string, opts: SpeakOpts = {}): void {
  if (!window.speechSynthesis) {
    opts.onend?.()
    return
  }
  stopSpeak()
  cancelled = false
  const chunks = chunkText(text)
  if (!chunks.length) {
    opts.onend?.()
    return
  }
  let i = 0
  const voice = pickVoice()
  const next = () => {
    if (cancelled) return
    if (i >= chunks.length) {
      clearWatchdog()
      opts.onend?.()
      return
    }
    const u = new SpeechSynthesisUtterance(chunks[i]!)
    i += 1
    u.lang = 'tr-TR'
    u.rate = opts.rate ?? 0.92
    u.pitch = opts.pitch ?? 0.95
    u.volume = 1
    if (voice) u.voice = voice
    u.onend = next
    u.onerror = next
    window.speechSynthesis.speak(u)
  }
  startWatchdog()
  next()
}

export function speakCue(text: string) {
  if (!window.speechSynthesis) return
  cancelled = true
  clearWatchdog()
  window.speechSynthesis.cancel()
  cancelled = false
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'tr-TR'
  u.rate = 0.88
  u.pitch = 0.92
  u.volume = 1
  const voice = pickVoice()
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}

export function warmVoices() {
  window.speechSynthesis?.getVoices()
  window.speechSynthesis?.addEventListener?.('voiceschanged', () => {
    window.speechSynthesis.getVoices()
  })
}
