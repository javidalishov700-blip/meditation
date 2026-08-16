import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SkillIdGrid } from '../components/SkillGrid'
import { useI18n } from '../lib/i18n'
import { SKILLS } from '../lib/skills'

export function Skills() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const ids = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase()
    if (!needle) return SKILLS.map((s) => s.id)
    return SKILLS.filter((s) => t(s.key).toLocaleLowerCase().includes(needle)).map((s) => s.id)
  }, [q, t])

  return (
    <div className="pb-8">
      <header className="relative flex items-center justify-center pt-2">
        <Link
          to="/me"
          aria-label={t('back')}
          className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold tracking-tight">{t('skills_title')}</h1>
      </header>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('search')}
        className="mt-6 h-12 w-full rounded-full bg-white/8 px-5 text-sm text-white outline-none placeholder:text-white/35"
      />
      {ids.length ? <SkillIdGrid ids={ids} /> : <p className="mt-6 text-sm text-mute">{t('no_results')}</p>}
    </div>
  )
}
