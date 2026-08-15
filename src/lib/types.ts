export const DOORS = ['panic', 'anxiety', 'derealization', 'depersonalization'] as const
export type DoorId = (typeof DOORS)[number]

export type PlanId = 'week' | 'month' | 'year'

export type SessionKind =
  | 'program'
  | 'story'
  | 'writing'
  | 'breath'
  | 'meditation'
  | 'sleeplab'
  | 'tone'
  | 'nature'
  | 'clarity'

export type BreathPattern = {
  id: string
  label: string
  inhale: number
  hold1: number
  exhale: number
  hold2: number
  cycles: number
  voice: { inhale: string; hold: string; exhale: string; rest?: string }
}

export type ScriptBlock = {
  kicker: string
  title: string
  body: string
  speak?: string
}

export type ProgramDay = {
  day: number
  title: string
  minutes: number
  summary: string
  blocks: ScriptBlock[]
  sentence: string
  scene: string
  release: string
  gratitude: string
  nightSeed?: string
}

export type Program = {
  id: DoorId
  title: string
  subtitle: string
  days: ProgramDay[]
  freeDays: number
}

export type LibraryItem = {
  id: string
  title: string
  subtitle: string
  minutes: number
  free?: boolean
  body: string
  sentence?: string
  nightSeed?: string
}

export type PassedRecord = {
  id: string
  startedAt: number
  endedAt: number
  seconds: number
  taps: number
  sentence: string
}

export type NatureScene = {
  id: string
  title: string
  subtitle: string
}

export type Tone = {
  id: string
  hz: number
  title: string
  subtitle: string
  trialSeconds?: number
}
