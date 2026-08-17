/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_VOICE_URL?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_REVENUECAT_IOS_KEY?: string
  readonly VITE_LEGAL_ORIGIN?: string
}
