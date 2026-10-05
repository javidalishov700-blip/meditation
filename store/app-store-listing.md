# App Store Connect — iOS App Listing

## Version 1.2

### Promotional Text (170)
- EN: New: longer sleep stories, 6-minute meditations and fuller program days, read aloud in calm native voices. SOS stays free, works offline, no sign-up.
- TR: Yeni: daha uzun uyku hikâyeleri, 6 dakikalık meditasyonlar ve dolu dolu program günleri, sakin ve doğal seslerle. SOS her zaman ücretsiz, internetsiz çalışır.
- RU: Новое: длинные истории для сна, 6-минутные медитации и насыщенные дни программ спокойным голосом. SOS всегда бесплатно и работает без интернета.

### What's New in This Version
EN:
```
• Sleep stories now run about 4 minutes; writings, sleep lab nights, short practices and program days about 3 minutes
• Meditations fill all 6 minutes with spoken guidance
• Calmer, native voices in Turkish, English, Azerbaijani and Russian
• The minutes on every card now match the real audio
• Full-screen player with a soft animated background
• Steady Pro is now monthly or yearly
• Bug fixes and polish
```
TR:
```
• Uyku hikâyeleri artık yaklaşık 4 dakika; yazılar, uyku laboratuvarı, kısa egzersizler ve program günleri yaklaşık 3 dakika
• Meditasyonlar 6 dakikanın tamamında sesli rehberlik veriyor
• Türkçe, İngilizce, Azerbaycanca ve Rusçada daha sakin, doğal sesler
• Kartlardaki süreler artık gerçek ses süresini gösteriyor
• Tam ekran oynatıcı ve yumuşak hareketli arka plan
• Steady Pro artık aylık veya yıllık
• Hata düzeltmeleri ve iyileştirmeler
```
RU:
```
• Истории для сна теперь длятся около 4 минут; письменные практики, ночи лаборатории сна, короткие упражнения и дни программ — около 3 минут
• Медитации на все 6 минут наполнены голосовым сопровождением
• Более спокойные, естественные голоса на турецком, английском, азербайджанском и русском
• Минуты на карточках теперь совпадают с реальной длительностью аудио
• Полноэкранный плеер с мягким анимированным фоном
• Steady Pro теперь по месяцу или по году
• Исправления ошибок и улучшения
```

### Screenshots
iPhone 6.9" (1320×2868), 8 per language: home, SOS, meditation player, story
player, programs, sleep, sounds, profile. Made from the app with a headless
browser; regenerate before each release that changes the look.

---

# Version 1.0 (original listing)

Copy-paste source for the App Store listing. Character limits are Apple's.
Product ids and review note: `store/app-store-products.json`.

---

## App Name (30) — already set
```
Steady - Panic & Calm
```

## Subtitle (30)
```
For panic and hard nights
```

## Promotional Text (170)
```
For the 3 a.m. panic wave and the nights that will not switch off. SOS is always free, works offline, and never asks you to sign up.
```

## Keywords (100, comma separated, no spaces)
Words already in the app name are left out on purpose — Apple indexes those anyway.
```
anxiety,sleep,breathe,meditation,grounding,relax,insomnia,stress,SOS,derealization,mindfulness
```

## Description (4000)
```
Steady is a calm place for the moments that do not wait — a panic wave at 3 a.m., a night you cannot switch off, a day that will not stop humming.

No account. No sign-up. Almost everything you type stays on your phone.

SOS — ALWAYS FREE
One tap opens a steady room: a 174 Hz ground tone, soft music, and a voice that breathes with you. It never locks, and it opens even from the app's own PIN screen.

WHAT IS INSIDE
• Guided meditations — short sessions that build into longer paths
• Sleep stories and a sleep lab, with a bedtime dial and gentle reminders
• Breathing patterns you follow with sound, not just a timer
• Writing prompts for worry, grounding, and 5-4-3-2-1
• Nature scenes and tones — rain, ocean, fire, wind, piano, 174 Hz and many more
• Line of the day: public-domain wisdom, translated fresh
• Programs for panic, anxiety, derealization and depersonalization
• Mood and sleep history that stays on the device

SIX LANGUAGES
Türkçe, Azərbaycan, English, Русский, Español, Italiano. Spoken audio in every language except Italian.

WORKS OFFLINE
Audio ships inside the app. No streaming, no buffering, no data burned at 3 a.m.

FREE AND PRO
Free covers SOS, one sleep story, one writing, one breath, the first meditation session, today's clarity, day 1 of the panic program, and 5 minutes of rain or piano. Steady Pro unlocks every program, the full library, longer listening, the sleep lab, and your history.

Steady Pro is available as a monthly or yearly auto-renewable subscription. Prices are shown inside the app in your App Store region's currency. Payment is charged to your Apple ID at confirmation of purchase. A subscription renews automatically unless it is cancelled at least 24 hours before the end of the current period, and your account is charged for renewal within 24 hours before the period ends. Manage or cancel anytime in iPhone Settings → Apple ID → Subscriptions. Deleting the app does not cancel a subscription.

IMPORTANT
Steady is not a clinic, a therapist, a licensed healthcare provider, or an emergency service. It does not diagnose or treat any condition. If you are in crisis, call your local emergency number.
```

## Support URL (required)
Must be a public https page. See "Hosting" below.
```
https://<your-domain>/support.html
```

## Marketing URL (optional)
Leave empty if you do not have a site.

## Privacy Policy URL (required, App Privacy section)
```
https://<your-domain>/legal/privacy.html
```

## Copyright
```
2026 Javid Alishov
```

---

## Hosting the two required URLs

App Store Connect cannot open a private GitHub repo, so the legal pages need a
public https origin. `public/legal/privacy.html` and `public/legal/terms.html`
are already generated and committed (regenerate with
`python3 scripts/generate-legal-pages.py`). Pick any one of these:

1. **GitHub Pages** — create a new *public* repo, upload the contents of
   `public/legal/`, enable Pages in Settings → Pages. URL becomes
   `https://<user>.github.io/<repo>/privacy.html`.
2. **Netlify Drop** — drag the `public/legal` folder onto app.netlify.com/drop.
3. Any static host you already own.

Whatever origin you pick, also set it as `VITE_LEGAL_ORIGIN` in Codemagic so the
in-app legal links point at the same public pages.

A support page can be a single HTML file on the same host with the support email
(javidalishov700@gmail.com) and a line saying replies come from that address.

---

## App Review Information

- **Contact:** Javid Alishov · javidalishov700@gmail.com · (phone number required)
- **Sign-in required:** No — the app has no account.
- **Notes:** use the `reviewNote` field in `store/app-store-products.json`.

## App Privacy questionnaire

The app collects nothing and has no server. Answer **"No, we do not collect data
from this app."** This matches `native/ios/PrivacyInfo.xcprivacy`, which declares
`NSPrivacyTracking = false`, no tracking domains, and no collected data types.

## Pricing

The app itself is **Free**. Revenue comes from the Steady Pro subscriptions.

## Age Rating

Answer the questionnaire honestly. Mental-health coping content usually lands on
12+; there is no violence, sexual content, gambling, or user-generated content.

## Screenshots

Required for iPhone (first 3 are the ones users see). 6.7" or 6.9" display sizes
cover the rest. Good set: SOS screen, a meditation player, the sleep dial, the
Explore grid, and the paywall.
