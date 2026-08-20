import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Ambient } from './components/Ambient'
import { Layout } from './components/Layout'
import { PinGate } from './components/PinLock'
import { needsIntro, Splash } from './components/Splash'
import { CrisisChip } from './components/ui'
import { ErrorBoundary } from './components/ErrorBoundary'
import { onAppResume } from './lib/device'
import { audio } from './lib/audio'
import { EntitlementProvider } from './lib/entitlement-store'
import { I18nProvider, useI18n } from './lib/i18n'
import { isOnboarded, STEADY_TRIAL_EVENT, subscribeOnboard } from './lib/onboard'
import { Discover } from './pages/Discover'
import { More } from './pages/More'
import { Quotes } from './pages/Quotes'
import { armNativeNotificationTap, maybeSleepChime, syncAllReminders } from './lib/remind'
import { STEADY_SLEEP_EVENT } from './lib/sleep-plan'
import { warmVoices } from './lib/speech'
import { Home } from './pages/Home'
import { Treat } from './pages/Treat'
import { Sleep } from './pages/Sleep'
import { Breath } from './pages/Breath'
import { Practice } from './pages/Practice'
import { Sos } from './pages/Sos'
import { Sounds } from './pages/Sounds'
import { Paywall } from './pages/Paywall'
import { Me } from './pages/Me'
import { Settings } from './pages/Settings'
import { Help } from './pages/Help'
import { Legal } from './pages/Legal'
import { Skills } from './pages/Skills'
import { Session } from './pages/Session'
import { Onboard } from './pages/Onboard'
import { UnlockToast } from './components/UnlockToast'
import { setUnlockCopy } from './lib/unlock-notify'
import { SKILLS, takeFreshUnlocks } from './lib/skills'
import { applyTheme, readTheme } from './lib/theme'

function RoutesTree() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/treat" element={<Treat />} />
        <Route path="/treat/:door" element={<Treat />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/more" element={<More />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/paywall" element={<Paywall />} />
        <Route path="/me" element={<Me />} />
        <Route path="/me/skills" element={<Skills />} />
        <Route path="/me/settings" element={<Settings />} />
        <Route path="/me/settings/help" element={<Help />} />
        <Route path="/me/settings/help/:topic" element={<Help />} />
        <Route path="/me/settings/:panel" element={<Settings />} />
        <Route path="/legal/:page" element={<Legal />} />
        <Route path="/session/:kind/:id" element={<Session />} />
      </Route>
      <Route path="/sos" element={<Sos />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function Gate() {
  const { locale } = useI18n()
  const [ready, setReady] = useState(() => isOnboarded())
  useEffect(() => subscribeOnboard(() => setReady(isOnboarded())), [])
  if (!ready) return <Onboard onDone={() => setReady(true)} />
  return (
    <PinGate>
      <RoutesTree key={locale} />
    </PinGate>
  )
}

function Boot() {
  const [intro, setIntro] = useState(() => needsIntro())
  if (intro) return <Splash onDone={() => setIntro(false)} />
  return (
    <>
      <Ambient />
      <div className="grain" />
      <CrisisChip />
      <UnlockToast />
      <Gate />
    </>
  )
}

export default function App() {
  useEffect(() => {
    try {
      if (localStorage.getItem('steady.dim') === '1') document.documentElement.classList.add('dim')
    } catch {
      /* ignore */
    }
    applyTheme(readTheme())
  }, [])
  return (
    <I18nProvider>
      <ErrorBoundary>
        <VoiceWarm />
        <EntitlementProvider>
          <BrowserRouter>
            <Boot />
          </BrowserRouter>
        </EntitlementProvider>
      </ErrorBoundary>
    </I18nProvider>
  )
}

function VoiceWarm() {
  const { t, locale, meta } = useI18n()
  useEffect(() => {
    warmVoices(meta.bcp47)
  }, [meta.bcp47])
  useEffect(() => {
    setUnlockCopy((id) => {
      const skill = SKILLS.find((s) => s.id === id)
      return {
        title: t('skill_unlock_h', { n: skill ? t(skill.key) : id }),
        text: t('skill_unlock_t'),
      }
    })
    takeFreshUnlocks()
    return () => setUnlockCopy(null)
  }, [t])
  useEffect(() => {
    const trial = () => ({ title: t('ob_rem_trial'), text: t('ob_rem_trial_t') })
    void armNativeNotificationTap()
    const fire = () => {
      // Reminders and the sleep chime call audio.playBed()/native permission prompts,
      // both of which would cut into the onboarding ambience or its first user gesture.
      if (!isOnboarded()) return
      void syncAllReminders(locale, trial())
      void maybeSleepChime(locale)
    }
    fire()
    const onVis = () => {
      if (document.visibilityState === 'visible') fire()
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener(STEADY_TRIAL_EVENT, fire)
    window.addEventListener(STEADY_SLEEP_EVENT, fire)
    const unsub = subscribeOnboard(fire)
    const tick = window.setInterval(() => {
      void maybeSleepChime(locale)
    }, 30_000)
    let offResume = () => undefined as void
    void onAppResume(() => {
      audio.unlock()
      fire()
    }).then((release) => {
      offResume = release
    })
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener(STEADY_TRIAL_EVENT, fire)
      window.removeEventListener(STEADY_SLEEP_EVENT, fire)
      unsub()
      window.clearInterval(tick)
      offResume()
    }
  }, [t, locale])
  return null
}
