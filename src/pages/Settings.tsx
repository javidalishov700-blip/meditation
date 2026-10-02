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
import { hasPin, subscribePin } from '../lib/pin'
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

/** One colour per row, iOS-style: the icon is found by colour before it is read. */
const TONES = {
  violet: 'from-[#A78BFA] to-[#7C3AED]',
  blue: 'from-[#60A5FA] to-[#2563EB]',
  red: 'from-[#FB7185] to-[#E11D48]',
  slate: 'from-[#94A3B8] to-[#475569]',
  pink: 'from-[#F472B6] to-[#DB2777]',
  green: 'from-[#4ADE80] to-[#16A34A]',
  orange: 'from-[#FDBA74] to-[#EA580C]',
  indigo: 'from-[#818CF8] to-[#4338CA]',
  amber: 'from-[#FCD34D] to-[#D97706]',
  teal: 'from-[#5EEAD4] to-[#0D9488]',
  gray: 'from-[#A1A1AA] to-[#52525B]',
} as const

type Tone = keyof typeof TONES

function IconWrap({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <span
      className={`keep-dark flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.6rem] bg-gradient-to-br ${TONES[tone]} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]`}
    >
      {children}
    </span>
  )
}

function Group({ children }: { children: ReactNode }) {
  return <div className="mt-3 overflow-hidden rounded-[1.35rem] surface">{children}</div>
}

function Hairline() {
  return <div className="ml-[3.75rem] mr-4 h-px bg-white/[0.07]" />
}

function Row({
  icon,
  tone,
  label,
  value,
  to,
  href,
  onClick,
}: {
  icon: ReactNode
  tone: Tone
  label: string
  value?: string
  to?: string
  href?: string
  onClick?: () => void
}) {
  const inner = (
    <>
      <IconWrap tone={tone}>{icon}</IconWrap>
      <span className="min-w-0 flex-1 text-[15px] text-cream">{label}</span>
      {value ? <span className="max-w-[40%] truncate text-[13px] text-white/45">{value}</span> : null}
      <Chevron />
    </>
  )
  const cls = 'flex w-full items-center gap-3 px-4 py-3 text-left active:bg-white/[0.04]'
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
  tone,
  label,
  hint,
  on,
  onChange,
}: {
  icon: ReactNode
  tone: Tone
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
      className="flex w-full items-center gap-3 px-4 py-3 text-left"
    >
      <IconWrap tone={tone}>{icon}</IconWrap>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] text-cream">{label}</span>
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

const ICON = 'h-[18px] w-[18px]'

function Glyph({ children, fill = false }: { children: ReactNode; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={ICON}
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

function HelpIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.2 2.2c-.7.3-1.3.8-1.3 1.6V14" />
      <path d="M12 17.2h.01" />
    </Glyph>
  )
}

function GlobeIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.8 2.8 2.8 14.2 0 17M12 3.5c-2.8 2.8-2.8 14.2 0 17" />
    </Glyph>
  )
}

function BellIcon() {
  return (
    <Glyph fill>
      <path d="M12 3a6 6 0 0 0-6 6v3.4c0 1.3-.5 2.5-1.3 3.4-.4.5-.1 1.2.6 1.2h13.4c.7 0 1-.7.6-1.2-.8-.9-1.3-2.1-1.3-3.4V9a6 6 0 0 0-6-6Z" />
      <path d="M9.8 18.5a2.3 2.3 0 0 0 4.4 0Z" />
    </Glyph>
  )
}

function LockIcon() {
  return (
    <Glyph fill>
      <path d="M8 10V8a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 18 11.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5v-7A1.5 1.5 0 0 1 7.5 10H8Zm2 0h4V8a2 2 0 1 0-4 0v2Z" />
    </Glyph>
  )
}

function VoiceIcon() {
  return (
    <Glyph>
      <rect x="9" y="3.5" width="6" height="10" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v3.5" />
    </Glyph>
  )
}

function PhoneIcon() {
  return (
    <Glyph fill>
      <path d="M6.6 3.5h2.6c.5 0 .9.3 1 .8l.9 3.1c.1.4 0 .9-.4 1.1l-1.7 1.2a12.5 12.5 0 0 0 5.3 5.3l1.2-1.7c.3-.4.7-.5 1.1-.4l3.1.9c.5.1.8.5.8 1v2.6c0 1-.8 1.7-1.8 1.7A15.6 15.6 0 0 1 4.9 5.3c0-1 .7-1.8 1.7-1.8Z" />
    </Glyph>
  )
}

function ThemeIcon() {
  return (
    <Glyph>
      <path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z" />
    </Glyph>
  )
}

function CrownIcon() {
  return (
    <Glyph fill>
      <path d="M4 8.5 8 12l4-6 4 6 4-3.5-1.6 9.1c-.1.5-.5.9-1 .9H6.6c-.5 0-.9-.4-1-.9L4 8.5Z" />
    </Glyph>
  )
}

function SparkIcon() {
  return (
    <Glyph fill>
      <path d="M12 2.8 13.9 9l6.3 1.9-6.3 1.9L12 19l-1.9-6.2-6.3-1.9L10.1 9 12 2.8ZM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </Glyph>
  )
}

function ClockIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Glyph>
  )
}

function DataIcon() {
  return (
    <Glyph>
      <path d="M5 18.5V15M10 18.5v-6M15 18.5V9M20 18.5V5.5" />
    </Glyph>
  )
}

function DocIcon() {
  return (
    <Glyph>
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1-1.5Z" />
      <path d="M13.5 3.5V8H18M9 12.5h6M9 16h4" />
    </Glyph>
  )
}

function ShieldIcon() {
  return (
    <Glyph>
      <path d="M12 3.5 5 6.2v5.3c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6.2l-7-2.7Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Glyph>
  )
}

function ReplayIcon() {
  return (
    <Glyph>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4.5v4h4" />
    </Glyph>
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
  const [quote, setQuote] = useState(onboard.remindQuote)
  const [sleep, setSleep] = useState(onboard.remindSleep)
  const bed = formatHm(bedMins(readSleepPlan()), locale)
  return (
    <div className="mt-6 space-y-3">
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
  const { store: storePro } = useEntitlement()
  const emergency = useEmergencyLine()
  const [pinOn, setPinOn] = useState(() => hasPin())
  const [cellular, setCellular] = useState(() => readCellularMedia())
  const theme = readTheme()
  const onboard = readOnboard()
  const remind = onboard.remindQuote || onboard.remindSleep
  const tier = storePro ? t('me_pro') : t('me_free')

  useEffect(() => subscribePin(() => setPinOn(hasPin())), [])

  return (
    <>
      {/* Anyone without a real subscription keeps a way in. */}
      {!storePro ? (
        <Link
          to="/paywall"
          className="keep-dark relative mt-5 flex items-center gap-3.5 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#DB2777] px-4 py-4 shadow-[0_12px_32px_rgba(124,58,237,0.35)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-white/20 text-white">
            <SparkIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold leading-5 text-white">Steady Pro</span>
            <span className="mt-0.5 block text-[12px] leading-4 text-white/85">{t('premium_banner')}</span>
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/90" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      ) : null}

      <Group>
        <Row icon={<GlobeIcon />} tone="blue" label={t('me_set_lang')} value={meta.native} to="/me/settings/lang" />
        <Hairline />
        <Row
          icon={<BellIcon />}
          tone="red"
          label={t('me_set_notify')}
          value={remind ? t('me_set_on') : t('me_set_off')}
          to="/me/settings/notify"
        />
        <Hairline />
        <Row
          icon={<ThemeIcon />}
          tone="indigo"
          label={t('theme')}
          value={theme === 'dark' ? t('theme_dark') : t('theme_light')}
          to="/me/settings/theme"
        />
        <Hairline />
        <Row icon={<VoiceIcon />} tone="pink" label={t('voice')} to="/me/settings/voice" />
      </Group>

      <Group>
        <RowSwitch
          icon={<LockIcon />}
          tone="slate"
          label={t('me_pin')}
          on={pinOn}
          onChange={() => navigate('/me/settings/lock')}
        />
        <Hairline />
        <RowSwitch
          icon={<DataIcon />}
          tone="green"
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
        <Row icon={<PhoneIcon />} tone="orange" label={t('me_emergency')} value={emergency.tel} to="/me/settings/emergency" />
      </Group>

      <Group>
        <Row icon={<CrownIcon />} tone="amber" label={t('me_tier')} value={tier} to="/paywall" />
        <Hairline />
        <Row icon={<ClockIcon />} tone="teal" label={t('me_history')} to="/me/settings/history" />
      </Group>

      <Group>
        <Row icon={<HelpIcon />} tone="violet" label={t('me_help')} to="/me/settings/help" />
        <Hairline />
        <Row icon={<DocIcon />} tone="gray" label={t('pay_terms')} to={legalPath('terms')} />
        <Hairline />
        <Row icon={<ShieldIcon />} tone="gray" label={t('pay_privacy')} to={legalPath('privacy')} />
        <Hairline />
        <Row icon={<ReplayIcon />} tone="gray" label={t('me_ob_replay')} onClick={() => resetOnboard()} />
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
