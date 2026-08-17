import { readJson, writeJson } from './storage'

export const THEMES = ['dark', 'light'] as const
export type ThemeId = (typeof THEMES)[number]

export function readTheme(): ThemeId {
  const v = readJson<string>('theme', 'dark')
  return v === 'light' ? 'light' : 'dark'
}

export function applyTheme(id: ThemeId) {
  document.documentElement.classList.toggle('light', id === 'light')
}

export function writeTheme(id: ThemeId) {
  writeJson('theme', id)
  applyTheme(id)
}

export function readDim(): boolean {
  try {
    return localStorage.getItem('steady.dim') === '1'
  } catch {
    return false
  }
}

export function writeDim(on: boolean) {
  try {
    localStorage.setItem('steady.dim', on ? '1' : '0')
  } catch {
    /* ignore */
  }
  document.documentElement.classList.toggle('dim', on)
}
