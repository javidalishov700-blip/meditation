/**
 * Bake OpenAI tts-1 MP3s into public/voice/clips.
 * Store languages: tr, az, en, ru, es, fr.
 * Key stays in .env — never commit it, never ship it in the IPA.
 *
 *   npm run bake-voice
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listVoiceClips } from '../src/lib/voice-catalog.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public', 'voice', 'clips')
const manifestPath = join(root, 'public', 'voice', 'manifest.json')
const SPEED = 0.85
const VOICE = 'nova'
const MAX = 4000

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
  return createHash('sha1').update(`${VOICE}|${SPEED}|${locale}|${text}`).digest('hex').slice(0, 16)
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
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      voice: VOICE,
      speed: SPEED,
      input: text,
      response_format: 'mp3',
    }),
  })
  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`openai ${res.status}: ${detail.slice(0, 240)}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

type Manifest = {
  voice: string
  speed: number
  updated: string
  clips: Record<string, string>
}

async function main() {
  const apiKey = loadKey()
  if (!apiKey) {
    console.error('OPENAI_API_KEY missing. Put it in .env (not git), then rerun.')
    process.exit(1)
  }
  mkdirSync(dir, { recursive: true })
  let manifest: Manifest = { voice: VOICE, speed: SPEED, updated: '', clips: {} }
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest
    } catch {
      /* start clean */
    }
  }
  const clips = listVoiceClips()
  let made = 0
  let skipped = 0
  for (const clip of clips) {
    const key = `${clip.locale}:${clip.id}`
    const parts = chunks(clip.text)
    const files: string[] = []
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
      const buf = await tts(apiKey, parts[i]!)
      writeFileSync(dest, buf)
      made += 1
      await new Promise((r) => setTimeout(r, 120))
    }
    manifest.clips[key] = files.join(',')
  }
  manifest.voice = VOICE
  manifest.speed = SPEED
  manifest.updated = new Date().toISOString()
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`done. new=${made} cached=${skipped} clips=${clips.length}`)
  console.log('Upload public/voice/ to your host (manifest.json + clips/).')
  console.log('Listening never calls OpenAI. Set VITE_VOICE_URL if files are not same-origin.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
