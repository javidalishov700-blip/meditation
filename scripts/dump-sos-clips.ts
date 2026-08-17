import { writeFileSync } from 'node:fs'
import { listVoiceClips } from '../src/lib/voice-catalog.ts'

const argv = process.argv.slice(2)
const dest = argv.find((a) => !a.startsWith('--')) || '/tmp/steady-sos-clips.json'
const langArg = process.argv.find((a) => a.startsWith('--langs='))
const onlyLangs = langArg
  ? langArg
      .slice('--langs='.length)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  : []
const clips = listVoiceClips().filter((c) => {
  if (!(c.id.startsWith('ui:sos') || c.id.startsWith('sos:'))) return false
  if (onlyLangs.length && !onlyLangs.includes(c.locale)) return false
  return true
})
writeFileSync(dest, `${JSON.stringify(clips, null, 2)}\n`)
console.log(`wrote ${clips.length} sos clips → ${dest}`)
