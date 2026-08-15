import { activityStats, readSessionIds, readSessionKinds } from './activity'
import { readMoodHistory } from './mood'
import { readPassed } from './passed'
import type { StringKey } from './strings'

export type SkillId =
  | 'wellbeing'
  | 'performance'
  | 'focus'
  | 'sleep'
  | 'breath'
  | 'ground'
  | 'kindness'
  | 'patience'
  | 'presence'
  | 'body'
  | 'night'
  | 'courage'

export type Skill = {
  id: SkillId
  key: StringKey
  image: string
}

export const SKILLS: Skill[] = [
  { id: 'wellbeing', key: 'skill_wellbeing', image: '/skills/skill-wellbeing.png' },
  { id: 'performance', key: 'skill_performance', image: '/skills/skill-performance.png' },
  { id: 'focus', key: 'skill_focus', image: '/skills/skill-focus.png' },
  { id: 'sleep', key: 'skill_sleep', image: '/skills/skill-sleep.png' },
  { id: 'breath', key: 'skill_breath', image: '/skills/skill-breath.png' },
  { id: 'ground', key: 'skill_ground', image: '/skills/skill-ground.png' },
  { id: 'kindness', key: 'skill_kindness', image: '/skills/skill-kindness.png' },
  { id: 'patience', key: 'skill_patience', image: '/skills/skill-patience.png' },
  { id: 'presence', key: 'skill_presence', image: '/skills/skill-presence.png' },
  { id: 'body', key: 'skill_body', image: '/skills/skill-body.png' },
  { id: 'night', key: 'skill_night', image: '/skills/skill-night.png' },
  { id: 'courage', key: 'skill_courage', image: '/skills/skill-courage.png' },
]

export function skillUnlocked(id: SkillId): boolean {
  try {
    const stats = activityStats()
    const kinds = new Set(readSessionKinds())
    const ids = new Set(readSessionIds())
    const moods = readMoodHistory()
    const sos = readPassed().length

    if (id === 'wellbeing') return stats.activeDays >= 1 || moods.length >= 1
    if (id === 'performance') return stats.activeDays >= 3
    if (id === 'focus') return kinds.has('nature') || kinds.has('tone')
    if (id === 'sleep') return kinds.has('story') || kinds.has('sleeplab') || ids.has('night')
    if (id === 'breath') return kinds.has('breath')
    if (id === 'ground') return kinds.has('extra') || sos >= 1 || ids.has('three-objects')
    if (id === 'kindness') return ids.has('kind-friend')
    if (id === 'patience') return stats.currentStreak >= 3 || stats.longestStreak >= 3
    if (id === 'presence') return new Set(moods.map((m) => m.day).filter(Boolean)).size >= 3
    if (id === 'body') return kinds.has('meditation')
    if (id === 'night') return kinds.has('story') || kinds.has('sleeplab') || ids.has('night') || ids.has('seed-only')
    if (id === 'courage') return sos >= 1
    return false
  } catch {
    return false
  }
}
