import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Ambient } from './components/Ambient'
import { Layout } from './components/Layout'
import { needsIntro, Splash } from './components/Splash'
import { CrisisChip } from './components/ui'
import { EntitlementProvider } from './lib/entitlement-store'
import { I18nProvider, useI18n } from './lib/i18n'
import { isOnboarded, subscribeOnboard } from './lib/onboard'
import { Discover } from './pages/Discover'
import { More } from './pages/More'
import { Quotes } from './pages/Quotes'
import { warmVoices } from './lib/speech'
import { Home } from './pages/Home'
import { Treat } from './pages/Treat'
import { Sleep } from './pages/Sleep'
import { Practice } from './pages/Practice'
import { Sos } from './pages/Sos'
import { Sounds } from './pages/Sounds'
import { Paywall } from './pages/Paywall'
import { Me } from './pages/Me'
import { Session } from './pages/Session'
import { Onboard } from './pages/Onboard'
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
        <Route path="/more" element={<More />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/paywall" element={<Paywall />} />
        <Route path="/me" element={<Me />} />
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
  return <RoutesTree key={locale} />
}

function Boot() {
  const [intro, setIntro] = useState(() => needsIntro())
  if (intro) return <Splash onDone={() => setIntro(false)} />
  return (
    <>
      <Ambient />
      <div className="grain" />
      <CrisisChip />
      <Gate />
    </>
  )
}

export default function App() {
  useEffect(() => {
    warmVoices()
    try {
      if (localStorage.getItem('steady.dim') === '1') document.documentElement.classList.add('dim')
    } catch {
      /* ignore */
    }
    applyTheme(readTheme())
  }, [])
  return (
    <I18nProvider>
      <EntitlementProvider>
        <BrowserRouter>
          <Boot />
        </BrowserRouter>
      </EntitlementProvider>
    </I18nProvider>
  )
}
