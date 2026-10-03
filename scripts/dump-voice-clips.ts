import { writeFileSync } from 'node:fs'
import { listVoiceClips } from '../src/lib/voice-catalog.ts'

/**
 * Write the clips to bake as JSON for bake-med-edge.py.
 *
 *   npx tsx scripts/dump-voice-clips.ts /tmp/clips.json med,lib,prog
 *
 * The second argument picks clip kinds by id prefix (med, lib, prog, quote,
 * sos, ui, sample). Default: med.
 */
const dest = process.argv[2] || '/tmp/steady-voice-clips.json'
const kinds = (process.argv[3] || 'med').split(',').map((s) => s.trim()).filter(Boolean)
const clips = listVoiceClips().filter((c) => kinds.some((k) => c.id === k || c.id.startsWith(`${k}:`)))
writeFileSync(dest, `${JSON.stringify(clips, null, 2)}\n`)
console.log(`wrote ${clips.length} clips (${kinds.join(', ')}) → ${dest}`)
