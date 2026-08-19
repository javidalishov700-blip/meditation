import { useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { PinSettings } from '../components/PinLock'
import { VoicePicker } from '../components/VoicePicker'
import { Card, LegalNote, Switch } from '../components/ui'
import {
  EMERGENCY_CHOICES,
  readOverrideRegion,
  useEmergencyLine,
  writeOverrideRegion,
} from '../lib/emergency'
import { useEntitlement } from '../lib/entitlement-store'
import { formatClock, formatDuration, formatHm } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { patchOnboard, readOnboard, requestNotify, resetOnboard } from '../lib/onboard'
import { bedMins, readSleepPlan } from '../lib/sleep-plan'
import { readPassed } from '../lib/passed'
import { hasPin, subscribePin, supportId } from '../lib/pin'
import { readRemindTrial, writeRemindTrial } from '../lib/remind'
import { readDim, readTheme, writeDim, writeTheme, type ThemeId } from '../lib/theme'
import { readCellularMedia, writeCellularMedia } from '../lib/media'
import { legalPath } from '../lib/purchases'
import type { StringKey } from '../lib/strings'

const PANELS = ['lang', 'notify', 'lock', 'voice', 'emergency', 'theme', 'history'] as const
type Panel = (typeof PANELS)[number]

function isPanel(value: string | undefined): value is Panel {
  return Boolean(value && (PANELS as readonly string[]).includes(value))
}

const TITLES: Record<Panel, StringKey> = {
  lang: 'me_set_lang',
  notify: 'me_set_notify',
  lock: 'me_pin',
  voice: 'voice',
  emergency: 'me_emergency',
  theme: 'theme',
  history: 'me_history',
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] bg-white/8 text-white/80">
      {children}
    </span>
  )
}

function Group({ children }: { children: ReactNode }) {
  return <div className="mt-3 overflow-hidden rounded-[1.35rem] surface">{children}</div>
}

function Hairline() {
  return <div className="mx-4 h-px bg-white/[0.07]" />
}

function Row({
  icon,
  label,
  value,
  badge,
  to,
  href,
  onClick,
}: {
  icon: ReactNode
  label: string
  value?: string
  badge?: string
  to?: string
  href?: string
  onClick?: () => void
}) {
  const inner = (
    <>
      <IconWrap>{icon}</IconWrap>
      <span className="min-w-0 flex-1 text-sm text-cream">{label}</span>
      {badge ? (
        <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] text-white/70">{badge}</span>
      ) : null}
      {value ? <span className="max-w-[40%] truncate text-xs text-white/40">{value}</span> : null}
      <Chevron />
    </>
  )
  const cls = 'flex w-full items-center gap-3 px-4 py-3.5 text-left'
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

function RowSwitch({
  icon,
  label,
  hint,
  on,
  onChange,
}: {
  icon: ReactNode
  label: string
  hint?: string
  on: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      <IconWrap>{icon}</IconWrap>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-cream">{label}</span>
        {hint ? <span className="mt-0.5 block text-[11px] leading-4 text-white/35">{hint}</span> : null}
      </span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full ${on ? 'bg-[#7B61FF]' : 'bg-white/15'}`}>
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            on ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.2 2.2c-.7.3-1.3.8-1.3 1.6V14" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.8 2.8 2.8 13.2 0 16M12 4c-2.8 2.8-2.8 13.2 0 16" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.2 5.5 1.2 5.5H4.8S6 14 6 10Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="11" width="12" height="9" rx="1.6" />
      <path d="M9 11V8a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function VoiceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 10v4M12 7v10M16 10v4" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6.6 4.2h2.8l1.2 3.6-2 1.2a13 13 0 0 0 6.4 6.4l1.2-2 3.6 1.2v2.8A15.5 15.5 0 0 1 6.6 4.2Z" />
    </svg>
  )
}

function ThemeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16" />
      <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" stroke="none" opacity="0.35" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="m12 4 2.1 5.4H20l-4.6 3.4 1.8 5.5L12 15.2 6.8 18.3 8.6 12.8 4 9.4h5.9L12 4Z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </svg>
  )
}

function DataIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="7" y="3.5" width="10" height="17" rx="2" />
      <path d="M11 17.5h2" />
    </svg>
  )
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 8.5A6 6 0 1 1 6 12" />
      <path d="M7 4.5v4h4" />
    </svg>
  )
}

function SettingsHeader({ title, backTo }: { title: string; backTo: string }) {
  const { t } = useI18n()
  return (
    <header className="relative flex items-center justify-center pt-2">
      <Link
        to={backTo}
        aria-label={t('back')}
        className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 5 8 12l7 7" />
        </svg>
      </Link>
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
    </header>
  )
}

function NotifyPanel() {
  const { t, locale } = useI18n()
  const onboard = readOnboard()
  const [trial, setTrial] = useState(() => readRemindTrial())
  const [quote, setQuote] = useState(onboard.remindQuote)
  const [sleep, setSleep] = useState(onboard.remindSleep)
  const bed = formatHm(bedMins(readSleepPlan()), locale)
  return (
    <div className="mt-6 space-y-3">
      <Switch
        on={trial}
        label={t('ob_rem_trial')}
        hint={t('ob_rem_trial_h')}
        onChange={(v) => {
          setTrial(v)
          writeRemindTrial(v)
          if (v) void requestNotify()
        }}
      />
      <Switch
        on={quote}
        label={t('ob_rem_quote')}
        hint={t('ob_rem_quote_h')}
        onChange={(v) => {
          setQuote(v)
          patchOnboard({ remindQuote: v })
          if (v) void requestNotify()
        }}
      />
      <Switch
        on={sleep}
        label={t('ob_rem_sleep')}
        hint={`${t('ob_rem_sleep_h')} · ${bed}`}
        onChange={(v) => {
          setSleep(v)
          patchOnboard({ remindSleep: v })
          if (v) void requestNotify()
        }}
      />
    </div>
  )
}

function EmergencyPanel() {
  const { t } = useI18n()
  const emergency = useEmergencyLine()
  const [region, setRegion] = useState(() => readOverrideRegion() || '')
  return (
    <Card className="mt-6">
      <p className="text-xl font-semibold tabular-nums">{emergency.tel}</p>
      <p className="mt-2 text-sm leading-6 text-mute">{t('me_emergency_hint')}</p>
      <label className="mt-3 block">
        <select
          aria-label={t('me_emergency')}
          className="w-full rounded-2xl bg-white/8 px-3 py-3 text-sm text-white/90"
          value={region}
          onChange={(e) => {
            const next = e.target.value
            setRegion(next)
            writeOverrideRegion(next || null)
          }}
        >
          <option value="">{t('me_emergency_auto')}</option>
          {EMERGENCY_CHOICES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} · {c.tel}
            </option>
          ))}
        </select>
      </label>
    </Card>
  )
}

function ThemePanel() {
  const { t } = useI18n()
  const [theme, setTheme] = useState<ThemeId>(() => readTheme())
  const [dim, setDim] = useState(() => readDim())
  return (
    <div className="mt-6">
      <Card>
        <p className="text-xs text-white/40">{t('theme')}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(['dark', 'light'] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                writeTheme(id)
                setTheme(id)
              }}
              className={`rounded-2xl px-3 py-3 text-sm ${theme === id ? 'bg-[#7B61FF] text-white' : 'bg-white/8'}`}
            >
              {id === 'dark' ? t('theme_dark') : t('theme_light')}
            </button>
          ))}
        </div>
      </Card>
      <div className="mt-3">
        <Switch
          on={dim}
          label={t('dim')}
          onChange={(v) => {
            writeDim(v)
            setDim(v)
          }}
        />
      </div>
    </div>
  )
}

function HistoryPanel() {
  const { t, locale } = useI18n()
  const { pro } = useEntitlement()
  const history = readPassed()
  return (
    <Card className="mt-6">
      {!pro ? (
        <p className="text-sm text-white/45">{t('me_history_locked')}</p>
      ) : history.length === 0 ? (
        <p className="text-sm text-white/45">{t('me_history_empty')}</p>
      ) : (
        <ul className="space-y-2">
          {history.map((h) => (
            <li key={h.id} className="rounded-2xl bg-black/30 px-3 py-2 text-sm">
              <p>{formatClock(h.endedAt, locale)}</p>
              <p className="text-white/45">
                {formatDuration(h.seconds, locale)} · {t('taps_n', { n: h.taps })}
              </p>
              <p className="mt-1">{h.sentence}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function Index() {
  const { t, meta } = useI18n()
  const navigate = useNavigate()
  const { pro, store: storePro, trial, trialEndsAt } = useEntitlement()
  const emergency = useEmergencyLine()
  const helpId = supportId()
  const [pinOn, setPinOn] = useState(() => hasPin())
  const [cellular, setCellular] = useState(() => readCellularMedia())
  const theme = readTheme()
  const remind = readRemindTrial()
  const ms = trialEndsAt - Date.now()
  const tier = storePro
    ? t('me_pro')
    : trial && ms > 0
      ? ms < 86_400_000
        ? t('me_trial_today')
        : t('me_trial', { n: Math.ceil(ms / 86_400_000) })
      : t('me_free')

  useEffect(() => subscribePin(() => setPinOn(hasPin())), [])

  return (
    <>
      {!pro ? (
        <Link
          to="/paywall"
          className="mt-5 flex items-center gap-3 overflow-hidden rounded-[1.2rem] bg-gradient-to-r from-[#5B3FD6] to-[#4F7DD4] px-4 py-3.5"
        >
          <span className="rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white">
            {t('me_set_go')}
          </span>
          <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-white">{t('premium_banner')}</span>
        </Link>
      ) : null}

      <Group>
        <Row icon={<HelpIcon />} label={t('me_help')} badge={`#${helpId}`} to="/me/settings/help" />
        <Hairline />
        <Row icon={<GlobeIcon />} label={t('me_set_lang')} value={meta.native} to="/me/settings/lang" />
        <Hairline />
        <Row
          icon={<BellIcon />}
          label={t('me_set_notify')}
          value={remind ? t('me_set_on') : t('me_set_off')}
          to="/me/settings/notify"
        />
        <Hairline />
        <RowSwitch icon={<LockIcon />} label={t('me_pin')} on={pinOn} onChange={() => navigate('/me/settings/lock')} />
      </Group>

      <Group>
        <Row icon={<VoiceIcon />} label={t('voice')} to="/me/settings/voice" />
        <Hairline />
        <RowSwitch
          icon={<DataIcon />}
          label={t('me_mobile_data')}
          hint={t('me_mobile_data_h')}
          on={cellular}
          onChange={() => {
            const next = !cellular
            writeCellularMedia(next)
            setCellular(next)
          }}
        />
        <Hairline />
        <Row icon={<PhoneIcon />} label={t('me_emergency')} value={emergency.tel} to="/me/settings/emergency" />
        <Hairline />
        <Row
          icon={<ThemeIcon />}
          label={t('theme')}
          value={theme === 'dark' ? t('theme_dark') : t('theme_light')}
          to="/me/settings/theme"
        />
      </Group>

      <Group>
        <Row icon={<StarIcon />} label={t('me_tier')} value={tier} to="/paywall" />
        <Hairline />
        <Row icon={<ClockIcon />} label={t('me_history')} to="/me/settings/history" />
      </Group>

      <Group>
        <Row icon={<HelpIcon />} label={t('pay_terms')} to={legalPath('terms')} />
        <Hairline />
        <Row icon={<HelpIcon />} label={t('pay_privacy')} to={legalPath('privacy')} />
      </Group>

      <Group>
        <Row icon={<ReplayIcon />} label={t('me_ob_replay')} onClick={() => resetOnboard()} />
      </Group>

      <div className="mt-10">
        <LegalNote />
      </div>
    </>
  )
}

export function Settings() {
  const { t } = useI18n()
  const { panel } = useParams()
  if (panel && !isPanel(panel)) return <Navigate to="/me/settings" replace />
  const current = isPanel(panel) ? panel : undefined
  const title = current ? t(TITLES[current]) : t('me_settings')
  const backTo = current ? '/me/settings' : '/me'

  return (
    <div className="pb-8">
      <SettingsHeader title={title} backTo={backTo} />
      {!current ? <Index /> : null}
      {current === 'lang' ? (
        <Card className="mt-6">
          <LangPicker />
        </Card>
      ) : null}
      {current === 'notify' ? <NotifyPanel /> : null}
      {current === 'lock' ? (
        <Card className="mt-6">
          <PinSettings />
        </Card>
      ) : null}
      {current === 'voice' ? (
        <Card className="mt-6">
          <VoicePicker />
        </Card>
      ) : null}
      {current === 'emergency' ? <EmergencyPanel /> : null}
      {current === 'theme' ? <ThemePanel /> : null}
      {current === 'history' ? <HistoryPanel /> : null}
    </div>
  )
}
