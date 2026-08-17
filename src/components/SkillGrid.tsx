import { useI18n } from '../lib/i18n'
import { SKILLS, skillUnlocked, type SkillId } from '../lib/skills'

export function SkillGrid({ limit }: { limit?: number }) {
  const { t } = useI18n()
  const list = limit ? SKILLS.slice(0, limit) : SKILLS
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {list.map((s) => {
        const on = skillUnlocked(s.id)
        return (
          <div key={s.id} className={`surface overflow-hidden rounded-[1.2rem] p-2 text-center ${on ? '' : 'opacity-55'}`}>
            <img src={s.image} alt="" className={`mx-auto h-16 w-16 rounded-full object-cover ${on ? '' : 'grayscale'}`} />
            <p className="mt-2 text-[11px] font-medium leading-tight">{t(s.key)}</p>
            <p className="mt-1 text-[9px] leading-4 text-mute">{on ? t('skill_open') : t('skill_locked')}</p>
          </div>
        )
      })}
    </div>
  )
}

export function SkillIdGrid({ ids }: { ids: SkillId[] }) {
  const { t } = useI18n()
  const list = SKILLS.filter((s) => ids.includes(s.id))
  if (!list.length) return null
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {list.map((s) => {
        const on = skillUnlocked(s.id)
        return (
          <div key={s.id} className={`surface overflow-hidden rounded-[1.2rem] p-2 text-center ${on ? '' : 'opacity-55'}`}>
            <img src={s.image} alt="" className={`mx-auto h-16 w-16 rounded-full object-cover ${on ? '' : 'grayscale'}`} />
            <p className="mt-2 text-[11px] font-medium leading-tight">{t(s.key)}</p>
            <p className="mt-1 text-[9px] leading-4 text-mute">{on ? t('skill_open') : t('skill_locked')}</p>
          </div>
        )
      })}
    </div>
  )
}
