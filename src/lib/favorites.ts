import { readJson, writeJson } from './storage'

export const STEADY_FAV_EVENT = 'steady-fav'

export type FavItem = {
  to: string
  title: string
  cover: string
}

const KEY = 'favorites'

function emitFav() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(STEADY_FAV_EVENT))
}

export function readFavorites(): FavItem[] {
  const v = readJson<unknown>(KEY, [])
  return Array.isArray(v)
    ? v.filter((x): x is FavItem => Boolean(x) && typeof x === 'object' && typeof (x as FavItem).to === 'string')
    : []
}

export function isFavorite(to: string): boolean {
  const clean = to.split('?')[0]
  return readFavorites().some((f) => f.to === to || f.to.split('?')[0] === clean)
}

export function toggleFavorite(item: FavItem): FavItem[] {
  const all = readFavorites()
  const clean = item.to.split('?')[0]
  const hit = all.some((f) => f.to === item.to || f.to.split('?')[0] === clean)
  const next = hit
    ? all.filter((f) => f.to !== item.to && f.to.split('?')[0] !== clean)
    : [item, ...all].slice(0, 40)
  writeJson(KEY, next)
  emitFav()
  return next
}
