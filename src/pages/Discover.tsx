import { Link } from 'react-router-dom'
import { CategoryTile, TileIcon } from '../components/CategoryTile'
import { LegalNote } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Discover() {
  const { t } = useI18n()
  const cats = [
    {
      to: '/practice',
      title: t('cat_breath'),
      icon: <TileIcon d="M4 12c3-6 13-6 16 0M4 12c3 6 13 6 16 0" />,
    },
    {
      to: '/quotes',
      title: t('cat_quotes'),
      icon: <TileIcon d="M7 8h5v6H8a3 3 0 0 1-3-3V8h2Zm8 0h5v6h-4a3 3 0 0 1-3-3V8h2Z" />,
    },
    {
      to: '/treat',
      title: t('cat_cope'),
      icon: <TileIcon d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" />,
    },
    {
      to: '/sounds',
      title: t('cat_tones'),
      icon: <TileIcon d="M12 5v14M8 9v6M16 9v6M4 11v2M20 11v2" />,
    },
  ]
  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('disc_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>
      <div className="mt-10 grid grid-cols-2 gap-3">
        {cats.map((c) => (
          <CategoryTile key={c.to} {...c} />
        ))}
      </div>
      <Link to="/more" className="mt-8 block text-center text-sm text-mute">
        {t('cat_more')}
      </Link>
      <div className="mt-16">
        <LegalNote compact />
      </div>
    </div>
  )
}
