import { Link } from 'react-router-dom'
import { CategoryTile, TileIcon } from '../components/CategoryTile'
import { LegalNote } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Discover() {
  const { t } = useI18n()
  const cats = [
    {
      to: '/practice',
      title: t('cat_meditate'),
      glow: '#5b21b6',
      icon: <TileIcon d="M12 4v16M8 8c2 2 6 2 8 0M8 16c2-2 6-2 8 0" />,
    },
    {
      to: '/sleep',
      title: t('cat_stories'),
      glow: '#4c1d95',
      icon: <TileIcon d="M4 6h11a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3V6Z" />,
    },
    {
      to: '/practice',
      title: t('cat_breath'),
      glow: '#0f766e',
      icon: <TileIcon d="M4 12c3-6 13-6 16 0M4 12c3 6 13 6 16 0" />,
    },
    {
      to: '/practice',
      title: t('cat_write'),
      glow: '#9d174d',
      icon: <TileIcon d="M5 19h14M7 15l9-9 3 3-9 9H7v-3Z" />,
    },
    {
      to: '/sleep',
      title: t('cat_nature'),
      glow: '#14532d',
      icon: <TileIcon d="M12 21V11M7 14c2-5 10-5 12 0M12 11c-3-4-1-8 0-8s3 4 0 8Z" />,
    },
    {
      to: '/quotes',
      title: t('cat_quotes'),
      glow: '#c2410c',
      icon: <TileIcon d="M7 8h5v6H8a3 3 0 0 1-3-3V8h2Zm8 0h5v6h-4a3 3 0 0 1-3-3V8h2Z" />,
    },
    {
      to: '/treat',
      title: t('cat_cope'),
      glow: '#be185d',
      icon: <TileIcon d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" />,
    },
    {
      to: '/sounds',
      title: t('cat_tones'),
      glow: '#1e3a8a',
      icon: <TileIcon d="M12 5v14M8 9v6M16 9v6M4 11v2M20 11v2" />,
    },
    {
      to: '/sos',
      title: t('cat_sos'),
      glow: '#e11d48',
      icon: <TileIcon d="M12 8v4M12 16h.01M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />,
    },
    {
      to: '/more',
      title: t('cat_more'),
      glow: '#3f3f46',
      icon: <TileIcon d="M12 5v14M5 12h14" />,
    },
  ]
  return (
    <div className="pb-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose-300/85">{t('nav_discover')}</p>
      <h1 className="mt-2 font-display text-3xl">{t('disc_title')}</h1>
      <p className="mt-2 text-sm text-mute">{t('disc_sub')}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {cats.map((c) => (
          <CategoryTile key={c.title + c.to} {...c} />
        ))}
      </div>
      <Link to={`/session/clarity/c1`} className="mt-4 block rounded-2xl border border-white/10 px-4 py-3 text-sm">
        {t('cat_clarity')} →
      </Link>
      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
