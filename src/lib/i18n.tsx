import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { onAppResume } from './device'
import {
  detectLocale,
  localeMeta,
  LOCALES,
  type LocaleId,
  type LocaleMeta,
} from './locales'
import { interpolate, translate, type StringKey } from './strings'
import { readJson, writeJson } from './storage'

type LocaleSource = 'device' | 'manual'

type I18nCtx = {
  locale: LocaleId
  meta: LocaleMeta
  source: LocaleSource
  setLocale: (id: LocaleId) => void
  followDevice: () => void
  t: (key: StringKey, vars?: Record<string, string | number>) => string
  locales: typeof LOCALES
}

const Ctx = createContext<I18nCtx | null>(null)

function readSource(): LocaleSource {
  return readJson<string>('locale.source', 'device') === 'manual' ? 'manual' : 'device'
}

function readManualLocale(): LocaleId | null {
  const stored = readJson<string | null>('locale', null)
  if (stored && LOCALES.some((l) => l.id === stored)) return stored as LocaleId
  return null
}

function applyDocument(id: LocaleId) {
  const meta = localeMeta(id)
  document.documentElement.lang = meta.bcp47
  document.documentElement.dir = meta.dir
  document.documentElement.dataset.locale = id
}

function resolveLocale(): LocaleId {
  if (readSource() === 'manual') return readManualLocale() ?? detectLocale()
  return detectLocale()
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(() => resolveLocale())
  const [source, setSource] = useState<LocaleSource>(() => readSource())

  useEffect(() => {
    applyDocument(locale)
  }, [locale])

  useEffect(() => {
    const syncDevice = () => {
      if (readSource() !== 'device') return
      const next = detectLocale()
      setSource('device')
      setLocaleState(next)
      applyDocument(next)
    }
    window.addEventListener('languagechange', syncDevice)
    let off = () => undefined as void
    void onAppResume(syncDevice).then((release) => {
      off = release
    })
    return () => {
      window.removeEventListener('languagechange', syncDevice)
      off()
    }
  }, [])

  const value = useMemo<I18nCtx>(() => {
    const meta = localeMeta(locale)
    return {
      locale,
      meta,
      source,
      locales: LOCALES,
      followDevice: () => {
        writeJson('locale.source', 'device')
        const next = detectLocale()
        applyDocument(next)
        setSource('device')
        setLocaleState(next)
      },
      setLocale: (id: LocaleId) => {
        writeJson('locale', id)
        writeJson('locale.source', 'manual')
        applyDocument(id)
        setSource('manual')
        setLocaleState(id)
      },
      t: (key, vars) => translate(key, locale, vars),
    }
  }, [locale, source])

  return createElement(Ctx.Provider, { value }, children)
}

export function useI18n(): I18nCtx {
  const v = useContext(Ctx)
  if (!v) throw new Error('I18nProvider missing')
  return v
}

export { interpolate }
