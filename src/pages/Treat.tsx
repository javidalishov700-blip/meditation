import type { ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { locDay, locDoor } from '../lib/copy'
import { programs } from '../lib/content'
import { canAccess } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { treatments, type Door } from '../lib/treatments'
import { FoldList, Kicker } from '../components/ui'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

type DoorStyle = { name: StringKey; sub: StringKey; from: string; to: string; glyph: ReactNode }

/** Each door gets its own colour and mark, so the four read apart at a glance. */
const DOORS: Record<string, DoorStyle> = {
  panic: {
    name: 'door_panic',
    sub: 'door_panic_s',
    from: '#FB7185',
    to: '#F97316',
    glyph: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  },
  anxiety: {
    name: 'door_anxiety',
    sub: 'door_anxiety_s',
    from: '#A78BFA',
    to: '#6D28D9',
    glyph: <path d="M4 9h10a3 3 0 1 0-3-3M4 14h14a3 3 0 1 1-3 3M4 19h6" />,
  },
  derealization: {
    name: 'door_dr',
    sub: 'door_dr_s',
    from: '#38BDF8',
    to: '#2563EB',
    glyph: (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  depersonalization: {
    name: 'door_dp',
    sub: 'door_dp_s',
    from: '#2DD4BF',
    to: '#0F766E',
    glyph: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" strokeDasharray="2.4 2.4" />
      </>
    ),
  },
}

function DoorGlyph({ style, size = 'h-5 w-5' }: { style: DoorStyle; size?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {style.glyph}
    </svg>
  )
}

export function Treat() {
  const { door } = useParams()
  const navigate = useNavigate()
  const { pro } = useEntitlement()
  const { t, locale } = useI18n()
  const active = locDoor((treatments.find((d) => d.id === door) ?? treatments[0]) as Door, locale)
  const program = programs.find((p) => p.id === active.id)!
  const look = DOORS[active.id]!

  return (
    <div className="pb-8">
      <h1 className="mt-4 font-display text-[2rem] font-semibold leading-tight tracking-tight">{t('treat_title')}</h1>
      <p className="mt-1.5 text-[15px] leading-6 text-mute">{t('disc_calm')}</p>

      <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('treat_title')}>
        {treatments.map((d) => {
          const s = DOORS[d.id]!
          const on = d.id === active.id
          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => navigate(`/treat/${d.id}`, { replace: true })}
              className={`door-card relative flex min-h-[8.4rem] flex-col items-start justify-between overflow-hidden rounded-[1.35rem] p-3.5 text-left transition-transform active:scale-[0.98] ${
                on ? 'door-on keep-dark' : 'surface border border-white/12'
              }`}
              style={on ? { ['--door-a' as string]: s.from, ['--door-b' as string]: s.to } : undefined}
            >
              <span
                className="tint flex h-10 w-10 items-center justify-center rounded-[0.85rem]"
                style={{ ['--c' as string]: s.from }}
              >
                <DoorGlyph style={s} />
              </span>
              {on ? (
                <span
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[#17141d]"
                  style={{ background: s.from }}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.2">
                    <path d="M5 12.5 10 17l9-9" />
                  </svg>
                </span>
              ) : null}
              <span className="mt-3 block w-full">
                <span className={`block break-words font-display text-[15px] font-semibold leading-tight ${on ? 'text-white' : 'text-cream'}`}>
                  {t(s.name)}
                </span>
                <span className={`mt-1 block text-[12px] leading-4 ${on ? 'text-white/85' : 'text-white/55'}`}>{t(s.sub)}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        key={active.id}
        className="door-promise sheet-up mt-5 rounded-[1.35rem] border p-5"
        style={{ ['--door-a' as string]: look.from, ['--door-b' as string]: look.to }}
      >
        <div className="flex items-center gap-2.5">
          <span className="tint flex h-8 w-8 items-center justify-center rounded-full" style={{ ['--c' as string]: look.from }}>
            <DoorGlyph style={look} size="h-4 w-4" />
          </span>
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">{t(look.name)}</span>
        </div>
        <p className="mt-3 font-display text-[1.25rem] font-medium leading-snug text-cream">{active.promise}</p>
        {active.id === 'panic' ? (
          <Link
            to="/sos"
            className="keep-dark mt-4 inline-flex items-center gap-2 rounded-full bg-[#F29A8E] px-5 py-3 text-sm font-semibold text-[#2A1218]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="live-ping absolute inset-0 rounded-full bg-[#2A1218]/50" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#2A1218]" />
            </span>
            {t('sos_now')}
          </Link>
        ) : null}
      </div>

      <section className="mt-9">
        <div className="flex items-end justify-between">
          <Kicker>{t('program')}</Kicker>
          <span className="text-xs text-white/45">{t('min_n', { n: program.days.reduce((a, d) => a + locDay(active.id, d, locale).minutes, 0) })}</span>
        </div>
        <div className="mt-3">
          <FoldList
            items={program.days}
            preview={3}
            getKey={(d) => String(d.day)}
            render={(d) => {
              const open = pro || canAccess('program', active.id, { day: d.day })
              const to = open ? `/session/program/${active.id}?day=${d.day}` : '/paywall'
              const day = locDay(active.id, d, locale)
              return (
                <Link to={to} className="surface flex items-center gap-3.5 rounded-[1.15rem] border border-white/[0.06] px-3.5 py-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums ${
                      open ? 'tint' : 'bg-white/[0.07] text-white/55'
                    }`}
                    style={open ? { ['--c' as string]: look.from } : undefined}
                  >
                    {d.day}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-white/45">
                      {t('day_n', { n: d.day })} · {t('min_n', { n: day.minutes })}
                    </span>
                    <span className="mt-0.5 block truncate text-[15px] font-medium text-cream">{day.title}</span>
                  </span>
                  {open ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/80">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                        <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-[#FFE3C2]/12 px-2.5 text-[11px] font-semibold text-[#FFE3C2]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                        <path d="M8 10V8a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 18 11.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5v-7A1.5 1.5 0 0 1 7.5 10H8Zm2 0h4V8a2 2 0 1 0-4 0v2Z" />
                      </svg>
                      PRO
                    </span>
                  )}
                </Link>
              )
            }}
          />
        </div>
      </section>
    </div>
  )
}
