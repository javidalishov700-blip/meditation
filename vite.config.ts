import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const voiceHost = (env.VITE_VOICE_URL || '').replace(/\/?$/, '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'voice/manifest.json'],
        manifest: {
          name: 'Steady',
          short_name: 'Steady',
          description: 'Sakinleşme araçları. Tıbbi tedavi değildir. Krizde yerel acil hat.',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          orientation: 'portrait',
          lang: 'tr',
          start_url: '/',
          scope: '/',
          categories: ['health', 'lifestyle'],
          icons: [
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: 'icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: 'icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest,json}'],
          globIgnores: ['**/voice/clips/*.mp3'],
          runtimeCaching: [
            {
              urlPattern: ({ url }) =>
                url.pathname.includes('/voice/') || Boolean(voiceHost && url.href.startsWith(voiceHost)),
              handler: 'CacheFirst',
              options: {
                cacheName: 'steady-voice',
                expiration: {
                  maxEntries: 800,
                  maxAgeSeconds: 60 * 60 * 24 * 400,
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
      }),
    ],
    server: {
      host: true,
      port: 5173,
    },
  }
})
