import { useState } from 'react'
import { audio, bedLabel, listBeds } from '../lib/audio'
import { useI18n } from '../lib/i18n'

export function BedPicker({
  value,
  onChange,
  className = '',
  showVolume = true,
}: {
  value: string
  onChange: (id: string) => void
  className?: string
  showVolume?: boolean
}) {
  const { t, locale } = useI18n()
  const [open, setOpen] = useState(false)
  const [vol, setVol] = useState(() => audio.getBedLevel())
  const name = bedLabel(value, locale)

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${t('bed_pick')}: ${name}`}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-black/35 px-4 py-2.5 text-sm"
      >
        <NoteGlyph />
        <span className="truncate">
          {t('bed_pick')}: {name}
        </span>
      </button>
      {open ? (
        <div className="mt-2 max-h-40 overflow-y-auto rounded-2xl border border-white/10 bg-black/50 p-2">
          <div className="flex flex-wrap gap-1.5">
            {listBeds().map((id) => {
              const on = value === id
              const label = bedLabel(id, locale)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onChange(id)
                    setOpen(false)
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs ${
                    on ? 'bg-[#7B61FF] text-white' : 'bg-white/8 text-white/75'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          {showVolume ? (
            <label className="mt-3 flex items-center gap-2 px-1 text-xs text-white/50">
              <span className="w-14 shrink-0">{t('vol_bed')}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={vol}
                onChange={(e) => {
                  const n = Number(e.target.value)
                  setVol(n)
                  audio.setBedLevel(n)
                }}
                className="steady-range flex-1"
              />
            </label>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function NoteGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18.5V7.2l10-2.2v11.3" />
      <circle cx="7.2" cy="18.5" r="2.2" />
      <circle cx="17.2" cy="16.3" r="2.2" />
    </svg>
  )
}
