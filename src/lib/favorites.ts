import { readJson, writeJson } from './storage'

export type FavItem = {
  to: string
  title: string
  cover: string
}

const KEY = 'favorites'

export function readFavorites(): FavItem[] {
  return readJson<FavItem[]>(KEY, [])
}

export function isFavorite(to: string): boolean {
  return readFavorites().some((f) => f.to === to)
}

export function toggleFavorite(item: FavItem): FavItem[] {
  const all = readFavorites()
  const next = all.some((f) => f.to === item.to)
    ? all.filter((f) => f.to !== item.to)
    : [item, ...all].slice(0, 40)
  writeJson(KEY, next)
  return next
}
