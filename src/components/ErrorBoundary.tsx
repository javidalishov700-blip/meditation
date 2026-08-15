import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error(err, info.componentStack)
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="pb-8 pt-8">
          <p className="font-display text-2xl">Sayfa durdu.</p>
          <p className="mt-3 text-sm leading-6 text-mute">Geri dön, bir kere daha dene. Teşhis yok; bu bir kilit değil.</p>
          <button
            type="button"
            className="mt-6 rounded-full bg-[#7B61FF] px-5 py-3 text-sm text-white"
            onClick={() => this.setState({ failed: false })}
          >
            Yeniden
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
