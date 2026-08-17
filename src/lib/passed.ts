import { readRecordList, writeJson } from './storage'
import type { PassedRecord } from './types'

const KEY = 'passed'

export function readPassed(): PassedRecord[] {
  return readRecordList<PassedRecord>(KEY)
}

export function addPassed(record: PassedRecord) {
  const all = [record, ...readPassed()].slice(0, 200)
  writeJson(KEY, all)
  void import('./unlock-notify').then((m) => m.announceSkillUnlocks())
  return all
}

export function passedCount(): number {
  return readPassed().length
}
