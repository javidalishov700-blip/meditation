import { breaths, extras, meditations, sleepLab, stories, writings } from './library'
import { quotes } from './quotes'
import { programs } from './content'
import { TONES } from './audio'
import { readJson, writeJson } from './storage'
import type { PlanId, SessionKind } from './types'

export const PLANS: {
  id: PlanId
  label: string
  price: string
  period: string
  note: string
  featured?: boolean
}[] = [
  {
    id: 'week',
    label: 'Haftalık',
    price: '$2.99',
    period: '/ hafta',
    note: '3 gün deneme · vitrin fiyatı',
  },
  {
    id: 'month',
    label: 'Aylık',
    price: '$9.99',
    period: '/ ay',
    note: '3 gün deneme · vitrin fiyatı',
    featured: true,
  },
  {
    id: 'year',
    label: 'Yıllık',
    price: '$59.99',
    period: '/ yıl',
    note: '3 gün deneme · en sakin tempo',
  },
]

export function isPro(): boolean {
  return readJson('pro', false)
}

export function setPro(value: boolean) {
  writeJson('pro', value)
}

export function isItemFree(kind: SessionKind, id: string, extra?: { day?: number }): boolean {
  if (kind === 'program') {
    const p = programs.find((x) => x.id === id)
    if (!p) return false
    const d = extra?.day ?? 1
    return d <= p.freeDays
  }
  if (kind === 'story') return stories.find((s) => s.id === id)?.free === true
  if (kind === 'writing') return writings.find((w) => w.id === id)?.free === true
  if (kind === 'breath') return breaths.find((b) => b.id === id)?.free === true
  if (kind === 'clarity') return true
  if (kind === 'meditation') return meditations.find((m) => m.id === id)?.free === true
  if (kind === 'sleeplab') return sleepLab.find((s) => s.id === id)?.free === true
  if (kind === 'tone') return TONES.find((t) => t.id === id)?.trialSeconds != null
  if (kind === 'nature') return false
  if (kind === 'extra') return extras.find((e) => e.id === id)?.free === true
  return false
}

export function quoteFree(id: string): boolean {
  return quotes.find((q) => q.id === id)?.free === true
}

export function canAccess(kind: SessionKind, id: string, extra?: { day?: number }): boolean {
  if (isPro()) return true
  return isItemFree(kind, id, extra)
}

export const FREE_LIST = [
  'SOS — her zaman, kilit ve PIN üstünden de',
  '174 Hz — 3 dakikalık deneme',
  '1 hikâye, 1 yazı, 1 nefes',
  'Panik programı 1. gün',
  'Günün zihinsel netliği',
]

export const PRO_LIST = [
  'Anksiyete, derealizasyon, depersonalizasyon programları',
  'Panik gün 2–7',
  'Uyku laboratuvarı ve doğa sahneleri',
  'Diğer tonlar, meditasyonlar, yazılar, hikâyeler',
  'Geçti geçmişi',
]
