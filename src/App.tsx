import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LockScreen } from './components/LockScreen'
import { EntitlementProvider } from './lib/entitlement-store'
import { I18nProvider } from './lib/i18n'
import { Discover } from './pages/Discover'
import { More } from './pages/More'
import { Quotes } from './pages/Quotes'
import { LockProvider, useLock } from './lib/lock'
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

function Gate() {
  const { hasPin, unlocked, sosBypass, setSosBypass } = useLock()
  const loc = useLocation()
  const onSos = loc.pathname === '/sos'
  const locked = hasPin && !unlocked && !(sosBypass && onSos)

  useEffect(() => {
    if (!onSos) setSosBypass(false)
  }, [onSos, setSosBypass])

  return (
    <>
      {locked ? <LockScreen /> : null}
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
    </>
  )
}

export default function App() {
  useEffect(() => {
    warmVoices()
  }, [])
  return (
    <I18nProvider>
    <EntitlementProvider>
      <LockProvider>
        <BrowserRouter>
          <div className="grain" />
          <Gate />
        </BrowserRouter>
      </LockProvider>
    </EntitlementProvider>
    </I18nProvider>
  )
}
