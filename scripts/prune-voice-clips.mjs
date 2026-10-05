// Drop narration files the manifest no longer points at before a build, so
// stale clips (for example ones restored from a CI cache) never ship.
import { existsSync, readFileSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public', 'voice', 'clips')
const manifestPath = join(root, 'public', 'voice', 'manifest.json')

if (existsSync(dir) && existsSync(manifestPath)) {
  const clips = JSON.parse(readFileSync(manifestPath, 'utf8')).clips ?? {}
  const keep = new Set(
    Object.values(clips).flatMap((v) =>
      String(v)
        .split(',')
        .map((p) => p.trim().replace(/^clips\//, ''))
        .filter(Boolean),
    ),
  )
  let dropped = 0
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.mp3') || keep.has(name)) continue
    unlinkSync(join(dir, name))
    dropped += 1
  }
  if (dropped) console.log(`prune-voice-clips: removed ${dropped} unused clip(s)`)
}
