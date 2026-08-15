import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  detectLocale,
  localeMeta,
  LOCALES,
  type LocaleId,
  type LocaleMeta,
} from './locales'
import { interpolate, translate, type StringKey } from './strings'
import { readJson, writeJson } from './storage'

type I18nCtx = {
  locale: LocaleId
  meta: LocaleMeta
  setLocale: (id: LocaleId) => void
  t: (key: StringKey, vars?: Record<string, string | number>) => string
  locales: typeof LOCALES
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(() => {
    const stored = readJson<string | null>('locale', null)
    if (stored && LOCALES.some((l) => l.id === stored)) return stored as LocaleId
    if (typeof navigator === 'undefined') return 'en'
    return detectLocale()
  })

  useEffect(() => {
    const meta = localeMeta(locale)
    document.documentElement.lang = meta.bcp47
    document.documentElement.dir = meta.dir
    document.documentElement.dataset.locale = locale
  }, [locale])

  const value = useMemo<I18nCtx>(() => {
    const meta = localeMeta(locale)
    return {
      locale,
      meta,
      locales: LOCALES,
      setLocale: (id: LocaleId) => {
        writeJson('locale', id)
        const next = localeMeta(id)
        document.documentElement.lang = next.bcp47
        document.documentElement.dir = next.dir
        document.documentElement.dataset.locale = id
        setLocaleState(id)
      },
      t: (key, vars) => translate(key, locale, vars),
    }
  }, [locale])

  return createElement(Ctx.Provider, { value }, children)
}

export function useI18n(): I18nCtx {
  const v = useContext(Ctx)
  if (!v) throw new Error('I18nProvider missing')
  return v
}

export { interpolate }
