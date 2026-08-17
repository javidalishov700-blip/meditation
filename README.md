# Steady

Panik atak, anksiyete, derealizasyon ve depersonalizasyon **yanı sıra** uyku, nefes, meditasyon, yazı, doğa, özler ve daha fazlası için sakinleşme PWA’sı. Meditopia kopyası değil. Tıbbi teşhis veya tedavi iddiası yoktur. Krizde yerel acil hat (telefonun ülkesi; TR’de **112**).

6 dil: Türkçe, Azərbaycan, English, Русский, Español, Italiano. Dil: Profil veya karşılama.

Joseph Murphy / *Bilinçaltının Gücü* alıntısı yoktur. Rahatlatıcı özler: kamu malı satırların kendi çevirisi (Epictetus, Seneca, Marcus Aurelius, William James) + yaklaşım özleri (CBT, ACT, grounding — alıntı değil).

## Sekmeler

Ana · Keşfet · Uyku · Daha · Ben. Keşfet ızgarası kategoriler açar. Özler kartına basınca tam metin + sesli okuma. Daha fazla: 5-4-3-2-1, şükran, beden taraması, gece tohumu, kaygı penceresi ve diğer araçlar.

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

Ücretsiz dar: SOS (her zaman, PIN üstünden de), 174 Hz 3 dk deneme, 1 hikâye, 1 yazı, 1 nefes, panik programı 1. gün, günün tek netliği, ilk meditasyon seansı, yağmur ve piyano 5 dk. 15 dk ve üzeri dinleme Pro.

Kilitli: diğer tonlar, DP / DR / anksiyete programları, uyku laboratuvarı, diğer sahneler, meditasyonun sonraki seansları, çoğu yazı, Geçti geçmişi.

Vitrin: $2.99 / hafta, $9.99 / ay, $59.99 / yıl. Native IPA: App Store IAP (`app.steady.calm.weekly|monthly|yearly`, RevenueCat `pro`). 1 gün deneme isteğe bağlı, bu telefonda (Apple intro yok). Tarayıcı: yerel vitrin demosu. Product ids: `store/app-store-products.json`.

## Kod

Vite + React + TypeScript + Tailwind. Ana yerler: `src/pages/` (Home, Treat, Sleep, Practice, Sos, Sounds, Paywall, Me), `src/lib/content.ts`, `src/lib/library.ts`, `src/lib/treatments.ts`, `src/lib/audio.ts`. iOS: Capacitor bundle `app.steady.calm`, Codemagic `ios-testflight`.
