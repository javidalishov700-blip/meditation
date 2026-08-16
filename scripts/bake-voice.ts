/**
 * Bake OpenAI gpt-4o-mini-tts MP3s into public/voice/clips.
 * Store languages: tr, az, en, ru, es.
 * Key stays in .env — never commit it, never ship it in the IPA.
 *
 *   npm run bake-voice
 *   npm run bake-voice -- --only=med
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listVoiceClips } from '../src/lib/voice-catalog.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public', 'voice', 'clips')
const manifestPath = join(root, 'public', 'voice', 'manifest.json')
const MODEL = 'gpt-4o-mini-tts'
const VOICE = 'coral'
const SPEED = 0.94
const MAX = 2200
const INSTRUCTIONS =
  'A calm adult woman in a quiet room. Warm, unhurried, natural. Speak as if sitting next to the listener, not as a robot, not as an advertisement, not as a commercial meditation app. Soft chest voice. Pause a full breath after each paragraph and after each short line. Do not sound theatrical or whispery. Do not give commands to relax. Present and steady.'

function loadKey() {
  const envPath = join(root, '.env')
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^OPENAI_API_KEY=(.*)$/)
      if (m) return m[1]!.trim().replace(/^["']|["']$/g, '')
    }
  }
  return process.env.OPENAI_API_KEY || ''
}

function hashOf(locale: string, text: string) {
  return createHash('sha1')
    .update(`${MODEL}|${VOICE}|${SPEED}|${INSTRUCTIONS}|${locale}|${text}`)
    .digest('hex')
    .slice(0, 16)
}

function chunks(text: string) {
  if (text.length <= MAX) return [text]
  const parts: string[] = []
  const paras = text.split(/\n{2,}/)
  let buf = ''
  for (const p of paras) {
    const next = buf ? `${buf}\n\n${p}` : p
    if (next.length > MAX && buf) {
      parts.push(buf)
      buf = p
    } else buf = next
  }
  if (buf) parts.push(buf)
  return parts.flatMap((p) => {
    if (p.length <= MAX) return [p]
    const bits: string[] = []
    let rest = p
    while (rest.length > MAX) {
      const cut = rest.lastIndexOf(' ', MAX)
      bits.push(rest.slice(0, cut > 40 ? cut : MAX).trim())
      rest = rest.slice(cut > 40 ? cut : MAX).trim()
    }
    if (rest) bits.push(rest)
    return bits
  })
}

async function tts(apiKey: string, text: string) {
  let last = 'openai failed'
  const bodies = [
    {
      model: MODEL,
      voice: VOICE,
      speed: SPEED,
      input: text,
      instructions: INSTRUCTIONS,
      response_format: 'mp3',
    },
    {
      model: MODEL,
      voice: VOICE,
      input: text,
      instructions: INSTRUCTIONS,
      response_format: 'mp3',
    },
  ]
  for (const body of bodies) {
    for (let attempt = 0; attempt < 6; attempt++) {
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (res.ok) return Buffer.from(await res.arrayBuffer())
      const detail = await res.text()
      last = `openai ${res.status}: ${detail.slice(0, 220)}`
      const quota = /insufficient_quota|credit_balance_exhausted|no credits/i.test(detail)
      if (quota) throw new Error(last)
      const badSpeed = res.status === 400 && 'speed' in body && /speed|unknown parameter|unrecognized/i.test(detail)
      if (badSpeed) break
      if (res.status !== 429 && res.status < 500) throw new Error(last)
      await new Promise((r) => setTimeout(r, 1500 * 2 ** attempt))
    }
  }
  throw new Error(last)
}

type Manifest = {
  voice: string
  speed: number
  model?: string
  updated: string
  clips: Record<string, string>
}

function rank(id: string) {
  if (id === 'sample' || id.startsWith('med:')) return 0
  return 1
}

function flush(manifest: Manifest) {
  manifest.voice = VOICE
  manifest.speed = SPEED
  manifest.model = MODEL
  manifest.updated = new Date().toISOString()
  for (const key of Object.keys(manifest.clips)) {
    if (key.startsWith('fr:')) delete manifest.clips[key]
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}

async function main() {
  const apiKey = loadKey()
  if (!apiKey) {
    console.error('OPENAI_API_KEY missing. Put it in .env (not git), then rerun.')
    process.exit(1)
  }
  const onlyMed = process.argv.includes('--only=med')
  const onlySos = process.argv.includes('--only=sos')
  mkdirSync(dir, { recursive: true })
  let manifest: Manifest = { voice: VOICE, speed: SPEED, model: MODEL, updated: '', clips: {} }
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest
    } catch {
      /* start clean */
    }
  }
  let clips = listVoiceClips().sort((a, b) => rank(a.id) - rank(b.id) || a.locale.localeCompare(b.locale) || a.id.localeCompare(b.id))
  if (onlyMed) clips = clips.filter((c) => rank(c.id) === 0)
  if (onlySos) clips = clips.filter((c) => c.id.startsWith('ui:sos') || c.id.startsWith('sos:'))
  let made = 0
  let skipped = 0
  let stopped = false
  for (const clip of clips) {
    if (stopped) break
    const key = `${clip.locale}:${clip.id}`
    const parts = chunks(clip.text)
    const files: string[] = []
    let complete = true
    for (let i = 0; i < parts.length; i++) {
      const h = hashOf(clip.locale, parts[i]!)
      const name = parts.length === 1 ? `${h}.mp3` : `${h}-${i}.mp3`
      const dest = join(dir, name)
      files.push(`clips/${name}`)
      if (existsSync(dest)) {
        skipped += 1
        continue
      }
      process.stdout.write(`bake ${key} [${i + 1}/${parts.length}]\n`)
      try {
        const buf = await tts(apiKey, parts[i]!)
        writeFileSync(dest, buf)
        made += 1
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        if (/insufficient_quota|credit_balance_exhausted|no credits/i.test(msg)) {
          console.error(`quota while baking ${key}; keeping clips already on disk`)
          complete = false
          stopped = true
          break
        }
        throw err
      }
      await new Promise((r) => setTimeout(r, 80))
    }
    if (complete && files.every((rel) => existsSync(join(root, 'public', 'voice', rel)))) {
      manifest.clips[key] = files.join(',')
      flush(manifest)
    }
  }
  flush(manifest)
  if (!stopped) {
    const keep = new Set(
      Object.values(manifest.clips).flatMap((raw) =>
        raw
          .split(',')
          .map((s) => s.trim().replace(/^clips\//, ''))
          .filter(Boolean),
      ),
    )
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.mp3')) continue
      if (keep.has(name)) continue
      unlinkSync(join(dir, name))
    }
  }
  console.log(`done. new=${made} cached=${skipped} clips=${clips.length}${onlyMed ? ' (med+sample)' : ''}${onlySos ? ' (sos)' : ''}${stopped ? ' (stopped: quota)' : ''}`)
  console.log('Upload public/voice/ to your host (manifest.json + clips/).')
  console.log('Listening never calls OpenAI. Set VITE_VOICE_URL if files are not same-origin.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
