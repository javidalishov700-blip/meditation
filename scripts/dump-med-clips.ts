import { writeFileSync } from 'node:fs'
import { listVoiceClips } from '../src/lib/voice-catalog.ts'

const dest = process.argv[2] || '/tmp/steady-med-clips.json'
const clips = listVoiceClips().filter((c) => c.id.startsWith('med:'))
writeFileSync(dest, `${JSON.stringify(clips, null, 2)}\n`)
console.log(`wrote ${clips.length} med clips → ${dest}`)
