import { Component, type ErrorInfo, type ReactNode } from 'react'
import { supportId } from '../lib/pin'
import { reportError } from '../lib/errors'
import { useI18n } from '../lib/i18n'

type Props = { children: ReactNode }
type State = { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, info.componentStack || '')
  }

  render() {
    if (this.state.failed) return <CrashScreen />
    return this.props.children
  }
}

function CrashScreen() {
  const { t } = useI18n()
  const id = supportId()
  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-5 text-center">
      <h1 className="font-display text-3xl">{t('crash_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('crash_sub')}</p>
      <p className="mt-4 font-mono text-sm text-white/80">#{id}</p>
      <button
        type="button"
        className="mt-8 rounded-full bg-[#7B61FF] px-5 py-[1.05rem] text-sm font-semibold text-white"
        onClick={() => window.location.assign('/')}
      >
        {t('crash_home')}
      </button>
    </div>
  )
}
