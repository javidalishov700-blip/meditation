import { lastMoodDays, MOODS, MOOD_KEYS } from '../lib/mood'
import { useI18n } from '../lib/i18n'

const DOT: Record<(typeof MOODS)[number], string> = {
  calm: 'bg-emerald-400',
  tense: 'bg-rose-400',
  sleepless: 'bg-indigo-300',
  wave: 'bg-sky-400',
  distant: 'bg-amber-300',
}

export function MoodHistory() {
  const { t } = useI18n()
  const days = lastMoodDays(14)
  return (
    <section className="mt-6">
      <h2 className="text-[1.05rem] font-semibold tracking-tight">{t('mood_history')}</h2>
      <div className="mt-3 flex gap-1.5">
        {days.map((d) => (
          <span
            key={d.day}
            title={d.mood ? t(MOOD_KEYS[d.mood]) : ''}
            className={`h-7 flex-1 rounded-full ${d.mood ? DOT[d.mood] : 'bg-white/10 mood-empty'}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.08em] text-mute">
        {MOODS.map((id) => (
          <span key={id} className="inline-flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[id]}`} />
            {t(MOOD_KEYS[id])}
          </span>
        ))}
      </div>
    </section>
  )
}
