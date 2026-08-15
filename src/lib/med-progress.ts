import { readJson, writeJson } from './storage'
import type { MedPath } from './types'

type Store = Record<string, string[]>

function read(): Store {
  return readJson<Store>('medDone', {})
}

export function completedSteps(pathId: string): string[] {
  return read()[pathId] ?? []
}

export function markMedStep(pathId: string, stepId: string) {
  const all = read()
  const cur = all[pathId] ?? []
  if (cur.includes(stepId)) return
  writeJson('medDone', { ...all, [pathId]: [...cur, stepId] })
}

export function pathPercent(path: MedPath, playing?: { stepId: string; frac: number }): number {
  const done = new Set(completedSteps(path.id))
  const n = path.steps.length
  if (!n) return 0
  let acc = 0
  for (const s of path.steps) {
    if (playing?.stepId === s.id) acc += Math.min(1, Math.max(0, playing.frac))
    else if (done.has(s.id)) acc += 1
  }
  return Math.min(100, Math.round((acc / n) * 100))
}

export function stepUnlocked(path: MedPath, index: number): boolean {
  if (index <= 0) return true
  const prev = path.steps[index - 1]
  if (!prev) return true
  return completedSteps(path.id).includes(prev.id)
}
