/** Already applied. Do not run again — 6-slot packs would be misread as the old tr|en|es|fr|de|it layout. */
import { readFileSync, writeFileSync } from 'node:fs'

const FILES = [
  'src/lib/strings.ts',
  'src/lib/extra-strings.ts',
  'src/lib/onboard-i18n.ts',
  'src/lib/audio.ts',
  'src/lib/catalog.ts',
  'src/lib/quotes.ts',
  'src/lib/sosPhrases.ts',
]

function compactPack(packed) {
  const parts = packed.split('|').map((s) => s.trim())
  const n = parts.length
  const g = (i, fb) => parts[i] || parts[fb] || parts[0] || ''
  if (n >= 8) return [0, 1, 2, 3, 4, 7].map((i) => g(i, 1)).join('|')
  if (n === 6) return [g(0, 0), g(1, 1), g(0, 0), g(1, 1), g(2, 1), g(5, 1)].join('|')
  if (n === 3) return [g(0, 0), g(1, 1), g(2, 0), g(1, 1), g(1, 1), g(1, 1)].join('|')
  if (n === 2) return [g(0, 0), g(1, 1), g(0, 0), g(1, 1), g(1, 1), g(1, 1)].join('|')
  return packed
}

for (const file of FILES) {
  const src = readFileSync(file, 'utf8')
  const next = src.replace(/R\('((?:\\'|[^'])*)'\)/g, (_, inner) => `R('${compactPack(inner)}')`)
  writeFileSync(file, next)
  console.log(file, src === next ? 'unchanged' : 'rewritten')
}
