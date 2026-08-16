import { useEffect, useState } from 'react'
import { readJson, removeKey, writeJson } from './storage'

/** Local ambulance / crisis line. Language is not a country. */
export type EmergencyLine = {
  tel: string
  region: string
  source: 'override' | 'timezone' | 'locale' | 'default'
}

export type EmergencyChoice = {
  id: string
  tel: string
  name: string
}

const KEY = 'emergency.region'
const EVENT = 'steady-emergency'

/** ITU / national numbers used in a panic, not a language pack. */
const TEL: Record<string, string> = {
  US: '911',
  CA: '911',
  MX: '911',
  AR: '911',
  CL: '911',
  PE: '117',
  CO: '123',
  BR: '192',
  AU: '000',
  NZ: '111',
  GB: '999',
  GG: '999',
  JE: '999',
  IM: '999',
  IE: '112',
  JP: '119',
  KR: '119',
  CN: '120',
  TW: '119',
  HK: '999',
  MO: '999',
  IN: '112',
  PK: '15',
  BD: '999',
  PH: '911',
  SG: '995',
  MY: '999',
  ID: '118',
  TH: '1669',
  VN: '115',
  ZA: '10177',
  NG: '112',
  KE: '112',
  EG: '123',
  IL: '101',
  AE: '998',
  SA: '997',
  QA: '999',
  TR: '112',
  AZ: '112',
  RU: '112',
  UA: '112',
  BY: '112',
  KZ: '112',
  GE: '112',
  AM: '112',
}

const TZ_REGION: Record<string, string> = {
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Santiago': 'CL',
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Adelaide': 'AU',
  'Pacific/Auckland': 'NZ',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Europe/Istanbul': 'TR',
  'Asia/Baku': 'AZ',
  'Europe/Moscow': 'RU',
  'Europe/Kyiv': 'UA',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Taipei': 'TW',
  'Asia/Hong_Kong': 'HK',
  'Asia/Kolkata': 'IN',
  'Asia/Karachi': 'PK',
  'Asia/Dhaka': 'BD',
  'Asia/Manila': 'PH',
  'Asia/Singapore': 'SG',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Jakarta': 'ID',
  'Asia/Bangkok': 'TH',
  'Asia/Ho_Chi_Minh': 'VN',
  'Africa/Johannesburg': 'ZA',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
  'Africa/Cairo': 'EG',
  'Asia/Jerusalem': 'IL',
  'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA',
  'Asia/Qatar': 'QA',
}

export const EMERGENCY_CHOICES: EmergencyChoice[] = [
  { id: 'TR', tel: '112', name: 'Türkiye' },
  { id: 'AZ', tel: '112', name: 'Azərbaycan' },
  { id: 'US', tel: '911', name: 'United States' },
  { id: 'CA', tel: '911', name: 'Canada' },
  { id: 'GB', tel: '999', name: 'United Kingdom' },
  { id: 'AU', tel: '000', name: 'Australia' },
  { id: 'NZ', tel: '111', name: 'New Zealand' },
  { id: 'DE', tel: '112', name: 'Deutschland' },
  { id: 'FR', tel: '112', name: 'France' },
  { id: 'ES', tel: '112', name: 'España' },
  { id: 'IT', tel: '112', name: 'Italia' },
  { id: 'RU', tel: '112', name: 'Россия' },
  { id: 'UA', tel: '112', name: 'Україна' },
  { id: 'BR', tel: '192', name: 'Brasil' },
  { id: 'MX', tel: '911', name: 'México' },
  { id: 'JP', tel: '119', name: '日本' },
  { id: 'KR', tel: '119', name: '한국' },
  { id: 'IN', tel: '112', name: 'India' },
]

export function telForRegion(region: string): string {
  const id = region.trim().toUpperCase()
  if (TEL[id]) return TEL[id]!
  const eu = new Set([
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IS',
    'IT',
    'LV',
    'LI',
    'LT',
    'LU',
    'MT',
    'NL',
    'NO',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'CH',
    'AL',
    'BA',
    'ME',
    'MK',
    'RS',
    'XK',
    'MD',
  ])
  if (eu.has(id)) return '112'
  return '112'
}

function regionFromLocaleTag(raw: string): string | null {
  const m = raw.trim().replace('_', '-').match(/^[a-z]{2,3}-([A-Z]{2})\b/i)
  if (!m?.[1]) return null
  return m[1].toUpperCase()
}

function regionFromLanguages(): string | null {
  if (typeof navigator === 'undefined') return null
  const listed = [...(navigator.languages || []), navigator.language]
  for (const raw of listed) {
    const region = regionFromLocaleTag(raw || '')
    if (region) return region
  }
  return null
}

function regionFromTimeZone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!tz) return null
    if (TZ_REGION[tz]) return TZ_REGION[tz]!
    if (tz.startsWith('Australia/')) return 'AU'
    if (tz.startsWith('Europe/')) return 'DE'
    if (tz.startsWith('Pacific/Auckland') || tz.startsWith('Pacific/Chatham')) return 'NZ'
  } catch {
    /* ignore */
  }
  return null
}

export function readOverrideRegion(): string | null {
  const raw = readJson<string | null>(KEY, null)
  if (!raw || typeof raw !== 'string') return null
  const id = raw.trim().toUpperCase()
  return id.length === 2 ? id : null
}

export function writeOverrideRegion(region: string | null): void {
  if (!region) removeKey(KEY)
  else writeJson(KEY, region.toUpperCase())
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENT))
}

export function readEmergency(): EmergencyLine {
  const override = readOverrideRegion()
  if (override) return { tel: telForRegion(override), region: override, source: 'override' }
  const tz = regionFromTimeZone()
  if (tz) return { tel: telForRegion(tz), region: tz, source: 'timezone' }
  const loc = regionFromLanguages()
  if (loc) return { tel: telForRegion(loc), region: loc, source: 'locale' }
  return { tel: '112', region: 'ZZ', source: 'default' }
}

export function useEmergencyLine(): EmergencyLine {
  const [line, setLine] = useState(readEmergency)
  useEffect(() => {
    const sync = () => setLine(readEmergency())
    window.addEventListener(EVENT, sync)
    window.addEventListener('languagechange', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('languagechange', sync)
    }
  }, [])
  return line
}
