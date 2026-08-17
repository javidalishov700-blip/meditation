import { CoverCard } from '../components/CoverCard'
import { FoldList, Kicker } from '../components/ui'
import { BREATH_COVER, CLARITY_COVER, MED_COVER, WRITE_COVER } from '../lib/catalog'
import { locLibrary, locMedPath } from '../lib/copy'
import { canAccess } from '../lib/entitlement'
import { useI18n } from '../lib/i18n'
import { meditations, pathMinutes, todaysClarity, writings } from '../lib/library'

export function Practice() {
  const { t, locale } = useI18n()
  const today = locLibrary(todaysClarity(), locale)
  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('practice_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>

      <div className="mt-10">
        <Kicker>{t('cat_clarity')}</Kicker>
      </div>
      <div className="mt-4">
        <CoverCard
          to={`/session/clarity/${today.id}`}
          cover={CLARITY_COVER}
          title={today.title}
          minutes={today.minutes}
          fill
        />
        <p className="mt-2 text-sm text-mute">
          {today.subtitle} · {t('home_free')}
        </p>
      </div>

      <section className="mt-12">
        <Kicker>{t('cat_breath')}</Kicker>
        <div className="mt-4">
          <CoverCard to="/breath" cover={BREATH_COVER.wave!} title={t('breath_pick_title')} fill />
          <p className="mt-2 text-sm text-mute">{t('breath_pick_sub')}</p>
        </div>
      </section>

      <section className="mt-12">
        <Kicker>{t('cat_meditate')}</Kicker>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {meditations.map((raw, i) => {
            const m = locMedPath(raw, locale)
            const open = canAccess('meditation', m.id)
            return (
              <CoverCard
                key={m.id}
                to={open ? `/session/meditation/${m.id}` : '/paywall'}
                favTo={`/session/meditation/${m.id}`}
                cover={MED_COVER[m.id] ?? '/covers/cover-forest.png'}
                title={m.title}
                minutes={pathMinutes(m)}
                locked={!open}
                kenDelay={i * 0.4}
                fill
              />
            )
          })}
        </div>
      </section>

      <section className="mt-12">
        <Kicker>{t('cat_write')}</Kicker>
        <div className="mt-4">
          <FoldList
            items={writings.map((w) => locLibrary(w, locale))}
            preview={2}
            getKey={(w) => w.id}
            className="grid grid-cols-2 gap-3"
            render={(w) => {
              const open = canAccess('writing', w.id)
              return (
                <CoverCard
                  to={open ? `/session/writing/${w.id}` : '/paywall'}
                  favTo={`/session/writing/${w.id}`}
                  cover={WRITE_COVER[w.id] ?? '/covers/cover-room.png'}
                  title={w.title}
                  minutes={w.minutes}
                  locked={!open}
                  fill
                />
              )
            }}
          />
        </div>
      </section>
    </div>
  )
}
