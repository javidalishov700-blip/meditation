import { useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { audio, sceneName } from '../lib/audio'
import { ITEMS } from '../lib/catalog'
import { useI18n } from '../lib/i18n'

export function useNowPlaying() {
  return useSyncExternalStore(
    (cb) => audio.subscribe(cb),
    () => audio.now,
    () => audio.now,
  )
}

export function NowPlayingBar({ lift = false }: { lift?: boolean }) {
  const { t, locale } = useI18n()
  const { pathname } = useLocation()
  const now = useNowPlaying()
  if (!now.playing) return null
  if (now.kind !== 'nature' && now.kind !== 'tone') return null
  if (pathname.startsWith('/session') || pathname === '/sos') return null

  const item = ITEMS.find((i) => i.to === now.route)
  const title =
    now.kind === 'nature' ? sceneName(now.id, locale) : item?.title[locale] || now.label

  return (
    <div className={`now-bar pointer-events-none fixed inset-x-0 z-[45] px-3 ${lift ? 'now-bar-lift' : ''}`}>
      <div className="pointer-events-auto mx-auto flex max-w-lg items-center gap-3 rounded-[1.2rem] border border-white/10 bg-[#16141f]/92 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {item ? (
          <img src={item.cover} alt="" className="h-11 w-9 rounded-lg object-cover" />
        ) : (
          <span className="flex h-11 w-9 items-center justify-center rounded-lg bg-white/8 text-xs">♪</span>
        )}
        <Link to={now.route || '/sounds'} className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#C4B5FD]/80">{t('now_playing')}</p>
          <p className="truncate text-sm font-medium text-white">{title}</p>
        </Link>
        <button
          type="button"
          className="rounded-full bg-white/12 px-3 py-1.5 text-xs text-white"
          onClick={() => audio.stop(0.4)}
        >
          {t('stop_now')}
        </button>
      </div>
    </div>
  )
}
