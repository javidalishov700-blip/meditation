# Steady

Panik atak, anksiyete, derealizasyon ve depersonalizasyon için sakinleşme PWA’sı. Meditopia kopyası değil. Tıbbi teşhis veya tedavi iddiası yoktur; “tedavi sekmeleri” başa çıkma araçlarıdır. Krizde acil hat: **112**.

Joseph Murphy / *Bilinçaltının Gücü* alıntısı yoktur. Yalnızca yaklaşım iskeleti: rahat beden, kısa şimdiki zaman olumlu cümle, zihinsel sahne, gece tohumu, bırakış, şükran.

## Çalıştır

```bash
npm install
npm run dev
```

Tarayıcı: `http://localhost:5173` — Web Audio ve `speechSynthesis` (kayıtlı ses dosyası yok).

```bash
npm run build
npm run preview
```

## Ücretsiz / Pro

Ücretsiz dar: SOS (her zaman, PIN üstünden de), 174 Hz 3 dk deneme, 1 hikâye, 1 yazı, 1 nefes, panik programı 1. gün, günün netliği.

Kilitli: diğer tonlar, DP / DR / anksiyete programları, uyku laboratuvarı, doğa timer’ları, çoğu meditasyon ve yazı, Geçti geçmişi.

Vitrin: $2.99 / hafta, $9.99 / ay, $59.99 / yıl, 3 gün deneme. Paywall’daki buton cihazda Pro açar; Stripe sonra.

## Kod

Vite + React + TypeScript + Tailwind. Ana yerler: `src/pages/` (Home, Treat, Sleep, Practice, Sos, Sounds, Paywall, Me), `src/lib/content.ts`, `src/lib/library.ts`, `src/lib/treatments.ts`, `src/lib/audio.ts`.
