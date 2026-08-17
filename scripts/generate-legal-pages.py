#!/usr/bin/env python3
"""Emit public/legal/privacy.html and terms.html in tr, en, az, ru, es, it."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "legal"
APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
APPLE_PRIVACY = "https://www.apple.com/privacy/"
APPLE_SUBS = "https://apps.apple.com/account/subscriptions"
APPLE_REFUND = "https://reportaproblem.apple.com/"
RC_PRIVACY = "https://www.revenuecat.com/privacy"
DATE = {
    "tr": "17 Ağustos 2026",
    "en": "17 August 2026",
    "az": "17 avqust 2026",
    "ru": "17 августа 2026 г.",
    "es": "17 de agosto de 2026",
    "it": "17 agosto 2026",
}


def shell(title: str, packs: str) -> str:
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="color-scheme" content="dark" />
    <title>{title} · Steady</title>
    <link rel="stylesheet" href="./legal.css" />
  </head>
  <body>
    <div class="wrap">
      <nav class="langs" aria-label="Language"></nav>
{packs}
    </div>
    <script src="./legal.js"></script>
  </body>
</html>
"""


def pack(lang: str, kicker: str, h1: str, meta: str, body: str, foot: str) -> str:
    return f"""      <article class="pack" data-lang="{lang}">
        <p class="kicker">{kicker}</p>
        <h1>{h1}</h1>
        <p class="meta">{meta}</p>
{body}
        <p class="foot">{foot}</p>
      </article>"""


def table(headers: list[str], rows: list[list[str]]) -> str:
    th = "".join(f"<th>{h}</th>" for h in headers)
    trs = []
    for row in rows:
        trs.append("<tr>" + "".join(f"<td>{c}</td>" for c in row) + "</tr>")
    return f'<table><thead><tr>{th}</tr></thead><tbody>{"".join(trs)}</tbody></table>'


PRODUCT_ROWS = {
    "tr": [
        ["Steady Pro Weekly", "app.steady.calm.weekly", "1 hafta", "3,99 USD"],
        ["Steady Pro Monthly", "app.steady.calm.monthly", "1 ay", "12,99 USD"],
        ["Steady Pro Yearly", "app.steady.calm.yearly", "1 yıl", "59,99 USD"],
    ],
    "en": [
        ["Steady Pro Weekly", "app.steady.calm.weekly", "1 week", "USD 3.99"],
        ["Steady Pro Monthly", "app.steady.calm.monthly", "1 month", "USD 12.99"],
        ["Steady Pro Yearly", "app.steady.calm.yearly", "1 year", "USD 59.99"],
    ],
    "az": [
        ["Steady Pro Weekly", "app.steady.calm.weekly", "1 həftə", "3,99 USD"],
        ["Steady Pro Monthly", "app.steady.calm.monthly", "1 ay", "12,99 USD"],
        ["Steady Pro Yearly", "app.steady.calm.yearly", "1 il", "59,99 USD"],
    ],
    "ru": [
        ["Steady Pro Weekly", "app.steady.calm.weekly", "1 неделя", "3,99 USD"],
        ["Steady Pro Monthly", "app.steady.calm.monthly", "1 месяц", "12,99 USD"],
        ["Steady Pro Yearly", "app.steady.calm.yearly", "1 год", "59,99 USD"],
    ],
    "es": [
        ["Steady Pro Weekly", "app.steady.calm.weekly", "1 semana", "3,99 USD"],
        ["Steady Pro Monthly", "app.steady.calm.monthly", "1 mes", "12,99 USD"],
        ["Steady Pro Yearly", "app.steady.calm.yearly", "1 año", "59,99 USD"],
    ],
    "it": [
        ["Steady Pro Weekly", "app.steady.calm.weekly", "1 settimana", "3,99 USD"],
        ["Steady Pro Monthly", "app.steady.calm.monthly", "1 mese", "12,99 USD"],
        ["Steady Pro Yearly", "app.steady.calm.yearly", "1 anno", "59,99 USD"],
    ],
}

COL = {
    "tr": ["Abonelik başlığı", "Ürün kimliği", "Süre", "Referans fiyat"],
    "en": ["Subscription title", "Product ID", "Length", "Reference price"],
    "az": ["Abunəlik adı", "Məhsul identifikatoru", "Müddət", "İstinad qiyməti"],
    "ru": ["Название подписки", "ID продукта", "Срок", "Справочная цена"],
    "es": ["Título de la suscripción", "ID de producto", "Duración", "Precio de referencia"],
    "it": ["Titolo dell’abbonamento", "ID prodotto", "Durata", "Prezzo di riferimento"],
}


# --- Privacy bodies ---

PRIVACY = {}

PRIVACY["en"] = f"""
        <div class="note"><strong>Summary.</strong> Steady does not create an account. Almost everything you type stays on this device. Payments, if you subscribe, are processed by Apple. We do not sell your information. This page is the functional Privacy Policy required by App Store Review Guideline 5.1 and, for auto-renewable subscriptions, Guideline 3.1.2.</div>
        <h2>1. Who we are</h2>
        <p>Steady is a personal coping app for panic, anxiety, sleep, and related states. It is published by Javid Alishov, an individual developer. The iOS bundle identifier is <code>app.steady.calm</code>. Steady is not a clinic, hospital, licensed healthcare provider, or emergency service.</p>
        <h2>2. Scope</h2>
        <p>This policy covers the Steady iOS app (Capacitor WebView), the optional web/PWA build, and these legal pages. Apple, RevenueCat, and other third parties have their own policies. In-app purchase billing is governed by Apple.</p>
        <h2>3. No account</h2>
        <p>You can use Steady without signing up. We do not ask for your name, email address, phone number, or a Steady password. We do not operate a Steady user database on a server that stores your mood, SOS taps, or onboarding answers.</p>
        <h2>4. Where information lives</h2>
        <p>Information you enter is stored in the app sandbox on this device (WebView local storage and, on iOS, related UserDefaults used by the native shell). If you delete the app or clear site data, that information is removed from the device. We cannot restore it from a Steady cloud, because there is none.</p>
        <h2>5. Information stored on the device</h2>
        <p>Depending on how you use Steady, the app may store locally:</p>
        <ul>
          <li>Onboarding answers, reminder switches, and trial timestamps (including a 3-day on-device trial flag)</li>
          <li>Language, theme, dim mode, voice versus melody preference, and cellular-media preference</li>
          <li>An optional 4-digit lock: only a random salt and a SHA-256 hash are stored — never the PIN in plain text</li>
          <li>SOS / “I passed” notes you choose to save, activity, streaks, and freeze credits</li>
          <li>Sleep-plan times and related flags</li>
          <li>An emergency-country override if you set one</li>
          <li>A local support identifier shown in Settings → Help, so you can quote it if you contact the developer; it is not uploaded by default</li>
          <li>A last-error diagnostic blob on the device if something fails</li>
          <li>A Pro entitlement flag after Apple confirms an active subscription on this Apple ID</li>
        </ul>
        <h2>6. Health-related content you type</h2>
        <p>If you write about panic, sleep, or mood, that text stays on the device. We do not use it to diagnose or treat you. Steady is not a medical device and is not intended to process health data for clinical purposes. Do not enter secrets you would not want stored on this phone.</p>
        <h2>7. Information we do not collect</h2>
        <p>We do not collect your legal name, email, postal address, government ID, contacts, precise location for advertising, payment card number, or an advertising identifier for tracking. The current app does not use the camera or photo library. We do not sell personal information.</p>
        <h2>8. Apple Privacy Nutrition Label / PrivacyInfo</h2>
        <p>Our <code>PrivacyInfo.xcprivacy</code> declares <code>NSPrivacyTracking</code> = false, no tracking domains, and an empty list of collected data types for the app itself. Accessed APIs: UserDefaults (reason CA92.1) and file timestamps (reason C617.1) for preferences and bundled media. See also <a href="{APPLE_PRIVACY}">Apple’s Privacy Policy</a>.</p>
        <h2>9. Network and audio</h2>
        <p>Guided listening uses audio files bundled with the app. The app does not call OpenAI or another generative API while you listen. Voice files may have been produced during development with a text-to-speech provider; that API key is never shipped in the app. Optional cellular settings only affect whether you allow media on cellular data; they do not upload your sessions.</p>
        <h2>10. Purchases</h2>
        <p>If you buy Steady Pro, payment is an Apple In-App Purchase charged to your Apple ID. Apple processes the transaction under Apple’s terms. We do not receive your Apple ID password or full card number. StoreKit (and, on iOS, the RevenueCat SDK with an Apple public SDK key) may see an App Store receipt or transaction identifier so the app can unlock Pro and restore purchases on this device.</p>
        <h2>11. RevenueCat</h2>
        <p>On iOS, Steady may use RevenueCat to validate App Store receipts. RevenueCat may process anonymous App Store identifiers and an app-user identifier generated on device. We do not send your name or email (we do not have them). See <a href="{RC_PRIVACY}">RevenueCat’s Privacy Policy</a>.</p>
        <h2>12. Crash reporting (optional, off by default)</h2>
        <p>If a build includes a Sentry DSN, crash reports may be sent with personally identifiable information turned off. Production intent is that this stays off unless the project owner sets the DSN. Local last-error notes remain on the device either way.</p>
        <h2>13. Tracking, advertising, analytics</h2>
        <p>Steady does not show third-party ads, does not use the App Tracking Transparency prompt to track you across other companies’ apps, and does not run a third-party marketing analytics SDK in the current app.</p>
        <h2>14. Emergency numbers</h2>
        <p>The crisis chip chooses a number from the phone’s region/timezone, not from the in-app language. You can override the country in Settings. Tapping a number opens the Phone app. We do not place the call and we do not receive the contents of the call. Steady is not an emergency service.</p>
        <h2>15. Children</h2>
        <p>Steady is not directed at children under 13, or the equivalent minimum age in your country. We do not knowingly collect personal information from children. If a child has used the app on a device you control, delete the app to remove local data.</p>
        <h2>16. EEA / UK</h2>
        <p>On-device storage exists because you asked the app to provide a feature (contract / legitimate interest in running the function you tapped). Apple’s processing of payments is Apple’s responsibility. We do not run a Steady cloud profile of you.</p>
        <h2>17. Your choices</h2>
        <ul>
          <li>Change language, theme, voice, and emergency country in Settings</li>
          <li>Turn the PIN off or replay onboarding (this can erase local answers)</li>
          <li>Delete the app to remove sandbox data</li>
          <li>Manage Apple subscriptions in iPhone Settings → Apple ID → Subscriptions or at <a href="{APPLE_SUBS}">{APPLE_SUBS}</a></li>
        </ul>
        <p>We cannot email you a copy of on-device notes because we never received them.</p>
        <h2>18. International transfers</h2>
        <p>The App Store may be used worldwide. On-device data stays on the device. Apple and, if used, RevenueCat or Sentry may process limited technical data in the United States or other countries under their terms.</p>
        <h2>19. Changes</h2>
        <p>We may update this policy. The “Last updated” date will change. Material changes that affect subscription disclosures will also appear on the in-app paywall where Apple requires them.</p>
        <h2>20. Contact</h2>
        <p>The app does not collect an email address and does not operate an in-app inbox. Open Steady → Settings → Help, copy the support ID, and quote that ID if you reach the developer through the App Store listing or another channel the developer publishes. Do not send health details you want kept off email. Related: <a href="./terms.html?lang=en">Terms of Use</a>.</p>
"""

PRIVACY["tr"] = f"""
        <div class="note"><strong>Özet.</strong> Steady hesap açmaz. Yazdıklarının neredeyse tamamı bu cihazda kalır. Abone olursan ödeme Apple üzerinden alınır. Bilgini satmayız. Bu sayfa App Store İnceleme Yönergesi 5.1 ve otomatik yenilenen abonelikler için 3.1.2 kapsamında işlevsel Gizlilik Politikasıdır.</div>
        <h2>1. Kimiz</h2>
        <p>Steady; panik, kaygı, uyku ve yakın durumlar için kişisel bir başa çıkma uygulamasıdır. Geliştirici: Javid Alishov (bireysel). iOS paket kimliği <code>app.steady.calm</code>. Steady klinik, hastane, ruhsatlı sağlık sunucusu veya acil servis değildir.</p>
        <h2>2. Kapsam</h2>
        <p>Bu politika Steady iOS uygulamasını (Capacitor WebView), isteğe bağlı web/PWA sürümünü ve bu hukuki sayfaları kapsar. Apple, RevenueCat ve diğer üçüncü tarafların kendi politikaları vardır. Uygulama içi satın alma faturalaması Apple’a aittir.</p>
        <h2>3. Hesap yok</h2>
        <p>Steady’yi kayıt olmadan kullanırsın. Ad, e-posta, telefon veya Steady şifresi istemeyiz. Ruh halini, SOS dokunuşlarını veya onboarding cevaplarını tutan bir Steady sunucu veritabanımız yoktur.</p>
        <h2>4. Bilgi nerede durur</h2>
        <p>Girdiğin bilgi bu cihazın uygulama sanal alanında durur (WebView yerel depolama ve iOS’ta yerli kabuğun UserDefaults kullanımı). Uygulamayı silersen veya site verisini temizlersen bilgi cihazdan gider. Steady bulutundan geri getiremeyiz; çünkü böyle bir bulut yoktur.</p>
        <h2>5. Cihazda saklanan bilgi</h2>
        <ul>
          <li>Onboarding cevapları, hatırlatma anahtarları, 3 günlük cihaz içi deneme zaman damgası</li>
          <li>Dil, tema, loş mod, ses/melodi tercihi, hücresel medya tercihi</li>
          <li>İsteğe bağlı 4 haneli kilit: yalnızca rastgele tuz ve SHA-256 özeti — PIN düz metin saklanmaz</li>
          <li>Kaydettiğin SOS / “geçirdim” notları, aktivite, seri, dondurma kredileri</li>
          <li>Uyku planı saatleri</li>
          <li>Acil ülke geçersiz kılması (ayarladıysan)</li>
          <li>Ayarlar → Yardım’da görünen yerel destek kimliği; varsayılan olarak yüklenmez</li>
          <li>Hata olursa cihazda son-hata kaydı</li>
          <li>Apple bu Apple ID’de aktif abonelik doğruladıktan sonra Pro hakkı bayrağı</li>
        </ul>
        <h2>6. Yazdığın sağlıkla ilgili içerik</h2>
        <p>Panik, uyku veya ruh hali yazarsan metin cihazda kalır. Teşhis veya tedavi için kullanılmaz. Steady tıbbi cihaz değildir. Bu telefonda durmasını istemediğin sırları yazma.</p>
        <h2>7. Toplamadığımız bilgi</h2>
        <p>Yasal ad, e-posta, adres, kimlik, rehber, reklam için kesin konum, kart numarası veya izleme amaçlı reklam kimliği toplamayız. Mevcut sürüm kamera veya fotoğraf kütüphanesi kullanmaz. Kişisel bilgi satmayız.</p>
        <h2>8. Apple Gizlilik Etiketi / PrivacyInfo</h2>
        <p><code>PrivacyInfo.xcprivacy</code> dosyamızda <code>NSPrivacyTracking</code> = false, izleme alanı yok, uygulamanın kendisi için toplanan veri tipi listesi boştur. Erişilen API’ler: UserDefaults (CA92.1) ve dosya zaman damgası (C617.1). Ayrıca <a href="{APPLE_PRIVACY}">Apple Gizlilik Politikası</a>.</p>
        <h2>9. Ağ ve ses</h2>
        <p>Rehberli dinleme uygulamayla gelen ses dosyalarını kullanır. Dinlerken OpenAI veya başka üretici API çağrılmaz. Geliştirmede ses dosyaları metinden-sese ile üretilmiş olabilir; o anahtar uygulamaya konmaz. Hücresel ayar yalnızca hücresel veride medyaya izin verip vermediğini etkiler; oturumunu yüklemez.</p>
        <h2>10. Satın almalar</h2>
        <p>Steady Pro alırsan ödeme Apple Kimliğine yansıyan uygulama içi satın almadır. İşlemi Apple yürütür. Apple ID şifreni veya tam kart numaranı almayız. StoreKit (iOS’ta Apple genel SDK anahtarıyla RevenueCat) Pro’yu açmak ve satın almaları geri yüklemek için makbuz / işlem kimliği görebilir.</p>
        <h2>11. RevenueCat</h2>
        <p>iOS’ta makbuz doğrulaması için RevenueCat kullanılabilir. RevenueCat anonim App Store kimlikleri ve cihazda üretilen uygulama-kullanıcı kimliği işleyebilir. Ad veya e-posta göndermeyiz. <a href="{RC_PRIVACY}">RevenueCat Gizlilik Politikası</a>.</p>
        <h2>12. Çökme raporu (isteğe bağlı, varsayılan kapalı)</h2>
        <p>Bir sürümde Sentry DSN varsa, kişisel veri kapalı tutularak çökme raporu gidebilir. Üretim niyeti: proje sahibi DSN yazmadıkça kapalı. Yerel son-hata notu her durumda cihazda kalır.</p>
        <h2>13. İzleme, reklam, analitik</h2>
        <p>Steady üçüncü taraf reklam göstermez, diğer şirketlerin uygulamalarında izlemek için App Tracking Transparency istemez, mevcut sürümde pazarlama analitik SDK’sı çalıştırmaz.</p>
        <h2>14. Acil numaralar</h2>
        <p>Kriz çipi numarayı uygulama dilinden değil, telefonun bölge/saat diliminden seçer. Ülkeyi Ayarlar’dan değiştirebilirsin. Numaraya dokunmak Telefon uygulamasını açar. Aramayı biz yapmayız, içeriğini almayız. Steady acil servis değildir.</p>
        <h2>15. Çocuklar</h2>
        <p>Steady 13 yaşından (veya ülkedeki eşdeğer asgari yaştan) küçük çocuklara yönelik değildir. Çocuklardan bilerek kişisel bilgi toplamayız. Kontrolündeki bir cihazda çocuk kullandıysa uygulamayı silerek yerel veriyi kaldır.</p>
        <h2>16. AEA / Birleşik Krallık</h2>
        <p>Cihaz içi depolama, dokunduğun özelliği sunmak için (sözleşme / meşru menfaat) vardır. Ödeme işlemleri Apple’ın sorumluluğundadır. Senin Steady bulut profilin yoktur.</p>
        <h2>17. Seçeneklerin</h2>
        <ul>
          <li>Ayarlar’da dil, tema, ses, acil ülke</li>
          <li>PIN’i kapatmak veya onboarding’i baştan almak (yerel cevaplar silinebilir)</li>
          <li>Uygulamayı silerek sanal alan verisini kaldırmak</li>
          <li>Abonelik: iPhone Ayarlar → Apple ID → Abonelikler veya <a href="{APPLE_SUBS}">{APPLE_SUBS}</a></li>
        </ul>
        <p>Cihaz notlarının kopyasını e-posta ile gönderemeyiz; çünkü bize gelmediler.</p>
        <h2>18. Uluslararası aktarım</h2>
        <p>App Store dünya genelinde kullanılabilir. Cihaz verisi cihazda kalır. Apple ve (kullanılırsa) RevenueCat veya Sentry kendi koşulları altında ABD veya başka ülkelerde sınırlı teknik veri işleyebilir.</p>
        <h2>19. Değişiklikler</h2>
        <p>Bu politikayı güncelleyebiliriz. “Son güncelleme” tarihi değişir. Abonelik açıklamalarını etkileyen esaslı değişiklikler Apple’ın istediği yerde uygulama içi ödeme ekranında da görünür.</p>
        <h2>20. İletişim</h2>
        <p>Uygulama e-posta toplamaz ve uygulama içi gelen kutusu işletmez. Steady → Ayarlar → Yardım’dan destek kimliğini kopyala; geliştiriciye App Store kaydı veya yayımladığı başka bir kanaldan ulaşırsan bu kimliği yaz. E-postada durmasını istemediğin sağlık ayrıntısı gönderme. İlgili: <a href="./terms.html?lang=tr">Kullanım koşulları</a>.</p>
"""

PRIVACY["az"] = f"""
        <div class="note"><strong>Qısa xülasə.</strong> Steady hesab açmır. Yazdıqlarının demək olar hamısı bu cihazda qalır. Abunə olsan, ödəniş Apple vasitəsilə alınır. Məlumatını satmırıq. Bu səhifə App Store İcmal Qaydası 5.1 və avtomatik yenilənən abunəliklər üçün 3.1.2 üzrə işlək Məxfilik Siyasətidir.</div>
        <h2>1. Kimik</h2>
        <p>Steady panik, narahatlıq, yuxu və yaxın vəziyyətlər üçün şəxsi öhdəlik tətbiqidir. Nəşr edən: Javid Alishov (fərdi tərtibatçı). iOS paket identifikatoru <code>app.steady.calm</code>. Steady klinika, xəstəxana, lisenziyalı səhiyyə xidməti və ya təcili yardım deyil.</p>
        <h2>2. Əhatə</h2>
        <p>Bu siyasət Steady iOS tətbiqini (Capacitor WebView), istəyə bağlı veb/PWA quruluşunu və bu hüquqi səhifələri əhatə edir. Apple, RevenueCat və digər üçüncü tərəflərin öz siyasətləri var. Tətbiq daxili alışın hesablaşması Apple-ındır.</p>
        <h2>3. Hesab yoxdur</h2>
        <p>Steady-dən qeydiyyat olmadan istifadə edirsən. Ad, e-poçt, telefon və ya Steady şifrəsi istəmirik. Əhvalını, SOS toxunuşlarını və ya onboarding cavablarını saxlayan Steady server bazamız yoxdur.</p>
        <h2>4. Məlumat harada durur</h2>
        <p>Daxil etdiyin məlumat bu cihazın tətbiq qum qutusunda qalır (WebView yerli yaddaş və iOS-da native qabığın UserDefaults istifadəsi). Tətbiqi silsən və ya sayt məlumatını təmizləsən, məlumat cihazdan gedir. Onu Steady buludundan bərpa edə bilmərik — belə bulud yoxdur.</p>
        <h2>5. Cihazda saxlanan məlumat</h2>
        <ul>
          <li>Onboarding cavabları, xatırlatma açarları, 3 günlük cihazdaxili sınaq vaxt damğası</li>
          <li>Dil, tema, sönük rejim, səs/melodiya seçimi, mobil şəbəkə medianı</li>
          <li>İstəyə bağlı 4 rəqəmli kilid: yalnız təsadüfi duz və SHA-256 xülasəsi — PIN açıq mətn saxlanılmır</li>
          <li>Saxladığın SOS / “keçdim” qeydləri, aktivlik, seriya, dondurma kreditləri</li>
          <li>Yuxu planı saatları</li>
          <li>Təcili ölkə əvəzləməsi (qursan)</li>
          <li>Ayarlar → Kömək-də görünən yerli dəstək identifikatoru; susmaya görə yüklənmir</li>
          <li>Xəta olanda cihazda son-xəta qeydi</li>
          <li>Apple bu Apple ID-də aktiv abunəliyi təsdiqlədikdən sonra Pro hüququ bayrağı</li>
        </ul>
        <h2>6. Yazdığın sağlamlıqla bağlı məzmun</h2>
        <p>Panik, yuxu və ya əhval yazsan, mətn cihazda qalır. Diaqnoz və ya müalicə üçün istifadə olunmur. Steady tibbi cihaz deyil. Bu telefondа saxlanmasını istəmədiyin sirləri yazma.</p>
        <h2>7. Toplamadığımız məlumat</h2>
        <p>Qanuni ad, e-poçt, ünvan, şəxsiyyət vəsiqəsi, kontaktlar, reklam üçün dəqiq məkan, kart nömrəsi və ya izləmə üçün reklam identifikatoru toplamırıq. Cari versiya kamera və ya foto kitabxanası istifadə etmir. Şəxsi məlumat satmırıq.</p>
        <h2>8. Apple Məxfilik Etiketi / PrivacyInfo</h2>
        <p><code>PrivacyInfo.xcprivacy</code> faylımızda <code>NSPrivacyTracking</code> = false, izləmə domeni yoxdur, tətbiqin özü üçün toplanan məlumat tipləri boşdur. İstifadə olunan API-lər: UserDefaults (CA92.1) və fayl vaxt damğası (C617.1). Həmçinin <a href="{APPLE_PRIVACY}">Apple-ın Məxfilik Siyasəti</a>.</p>
        <h2>9. Şəbəkə və səs</h2>
        <p>Bələdçi dinləmə tətbiqlə gələn səs fayllarını istifadə edir. Dinləyərkən OpenAI və ya başqa generasiya API-si çağırılmır. İnkişaf zamanı səs faylları mətndən-səsə ilə hazırlanmış ola bilər; o açar tətbiqə qoyulmur. Mobil şəbəkə ayarı yalnız hüceyrəvi məlumatda mediaya icazəni təsir edir; seansını yükləmir.</p>
        <h2>10. Alışlar</h2>
        <p>Steady Pro alsan, ödəniş Apple ID-nə yazılan In-App Purchase-dir. Əməliyyatı Apple aparır. Apple ID şifrəni və ya tam kart nömrəni almırıq. StoreKit (iOS-da Apple ictimai SDK açarı ilə RevenueCat) Pro-nu açmaq və alışları bərpa etmək üçün qəbz / əməliyyat identifikatoru görə bilər.</p>
        <h2>11. RevenueCat</h2>
        <p>iOS-da qəbz doğrulaması üçün RevenueCat istifadə oluna bilər. RevenueCat anonim App Store identifikatorları və cihazda yaranan tətbiq-istifadəçi identifikatorunu emal edə bilər. Ad və ya e-poçt göndərmirik. <a href="{RC_PRIVACY}">RevenueCat Məxfilik Siyasəti</a>.</p>
        <h2>12. Çökmə hesabatı (istəyə bağlı, susmaya görə bağlı)</h2>
        <p>Bir quruluşda Sentry DSN varsa, şəxsi məlumat söndürülmüş şəkildə çökmə hesabatı gedə bilər. İstehsal niyyəti: layihə sahibi DSN yazmayana qədər bağlı. Yerli son-xəta qeydi hər halda cihazda qalır.</p>
        <h2>13. İzləmə, reklam, analitika</h2>
        <p>Steady üçüncü tərəf reklamı göstərmir, səni başqa şirkətlərin tətbiqlərində izləmək üçün App Tracking Transparency istəmir, cari versiyada marketinq analitika SDK-sı işlətmir.</p>
        <h2>14. Təcili nömrələr</h2>
        <p>Kriz çipi nömrəni tətbiq dilindən yox, telefonun region/saat qurşağından seçir. Ölkəni Ayarlarda dəyişə bilərsən. Nömrəyə toxunmaq Telefon tətbiqini açır. Zəngi biz etmirik, məzmununu almırıq. Steady təcili xidmət deyil.</p>
        <h2>15. Uşaqlar</h2>
        <p>Steady 13 yaşından (və ya ölkəndəki ekvivalent minimum yaşdan) kiçik uşaqlara yönəlməyib. Uşaqlardan bilərəkdən şəxsi məlumat toplamırıq. Nəzarətindəki cihazda uşaq istifadə edibsə, tətbiqi silərək yerli məlumatı sil.</p>
        <h2>16. AEA / Birləşmiş Krallıq</h2>
        <p>Cihazdaxili saxlama toxunduğun funksiyanı təqdim etmək üçündür (müqavilə / qanuni maraq). Ödəniş emalı Apple-ın məsuliyyətidir. Sənin Steady bulud profilin yoxdur.</p>
        <h2>17. Seçimərin</h2>
        <ul>
          <li>Ayarlarda dil, tema, səs, təcili ölkə</li>
          <li>PIN-i söndürmək və ya onboarding-i yenidən oynatmaq (yerli cavablar silinə bilər)</li>
          <li>Tətbiqi silərək qum qutusu məlumatını silmək</li>
          <li>Abunəlik: iPhone Ayarlar → Apple ID → Abunəliklər və ya <a href="{APPLE_SUBS}">{APPLE_SUBS}</a></li>
        </ul>
        <p>Cihaz qeydlərinin surətini e-poçtla göndərə bilmərik; çünki bizə gəlməyiblər.</p>
        <h2>18. Beynəlxalq ötürülmə</h2>
        <p>App Store dünyada istifadə oluna bilər. Cihaz məlumatı cihazda qalır. Apple və (istifadə olunarsa) RevenueCat və ya Sentry öz şərtləri altında ABŞ və ya başqa ölkələrdə məhdud texniki məlumat emal edə bilər.</p>
        <h2>19. Dəyişikliklər</h2>
        <p>Bu siyasəti yeniləyə bilərik. “Son yeniləmə” tarixi dəyişər. Abunəlik açıqlamalarına təsir edən əsaslı dəyişikliklər Apple-ın tələb etdiyi yerdə tətbiq daxili ödəniş ekranında da görünər.</p>
        <h2>20. Əlaqə</h2>
        <p>Tətbiq e-poçt toplamır və tətbiq daxili gələnlər qutusu işlətmir. Steady → Ayarlar → Kömək-dən dəstək identifikatorunu köçür; tərtibatçıya App Store elanı və ya dərc etdiyi başqa kanalla çatsan, bu identifikatoru yaz. E-poçtda qalmasını istəmədiyin sağlamlıq təfərrüatı göndərmə. Əlaqəli: <a href="./terms.html?lang=az">İstifadə şərtləri</a>.</p>
"""

PRIVACY["ru"] = f"""
        <div class="note"><strong>Кратко.</strong> Steady не создаёт аккаунт. Почти всё, что вы вводите, остаётся на этом устройстве. Если вы оформляете подписку, платёж обрабатывает Apple. Мы не продаём ваши данные. Эта страница — действующая Политика конфиденциальности по правилам App Store 5.1 и, для автопродлеваемых подписок, 3.1.2.</div>
        <h2>1. Кто мы</h2>
        <p>Steady — личное приложение для совладания с паникой, тревогой, сном и близкими состояниями. Издатель: Javid Alishov (индивидуальный разработчик). Идентификатор пакета iOS: <code>app.steady.calm</code>. Steady не клиника, не больница, не лицензированный медик и не служба экстренной помощи.</p>
        <h2>2. Область действия</h2>
        <p>Политика охватывает приложение Steady для iOS (Capacitor WebView), необязательную веб/PWA-сборку и эти юридические страницы. У Apple, RevenueCat и других третьих лиц свои политики. Биллинг покупок в приложении ведёт Apple.</p>
        <h2>3. Без аккаунта</h2>
        <p>Steady можно использовать без регистрации. Мы не запрашиваем имя, эл. почту, телефон или пароль Steady. У нас нет серверной базы пользователей Steady с вашим настроением, нажатиями SOS или ответами онбординга.</p>
        <h2>4. Где хранятся данные</h2>
        <p>Введённая информация хранится в песочнице приложения на этом устройстве (локальное хранилище WebView и на iOS — UserDefaults нативной оболочки). Если удалить приложение или очистить данные сайта, информация исчезает с устройства. Восстановить её из облака Steady нельзя: облака нет.</p>
        <h2>5. Данные на устройстве</h2>
        <ul>
          <li>Ответы онбординга, переключатели напоминаний, метка 3-дневной пробной версии на устройстве</li>
          <li>Язык, тема, приглушённый режим, голос/мелодия, сотовые медиа</li>
          <li>Необязательный 4-значный код: только случайная соль и SHA-256, PIN не хранится открытым текстом</li>
          <li>Заметки SOS / «я справился», активность, серии, кредиты заморозки</li>
          <li>Время плана сна</li>
          <li>Переопределение страны экстренного номера</li>
          <li>Локальный идентификатор поддержки в Настройки → Помощь; по умолчанию не загружается</li>
          <li>Локальная запись последней ошибки</li>
          <li>Флаг права Pro после подтверждения Apple активной подписки на этом Apple ID</li>
        </ul>
        <h2>6. Текст о здоровье, который вы вводите</h2>
        <p>Если вы пишете о панике, сне или настроении, текст остаётся на устройстве. Мы не ставим диагноз и не лечим. Steady не медицинское изделие. Не вводите тайны, которые не хотите хранить на этом телефоне.</p>
        <h2>7. Что мы не собираем</h2>
        <p>Мы не собираем юридическое имя, почту, адрес, удостоверение личности, контакты, точную геолокацию для рекламы, номер карты или рекламный идентификатор для трекинга. Текущая версия не использует камеру и фототеку. Мы не продаём персональные данные.</p>
        <h2>8. Этикетка конфиденциальности Apple / PrivacyInfo</h2>
        <p>В <code>PrivacyInfo.xcprivacy</code>: <code>NSPrivacyTracking</code> = false, нет доменов трекинга, список собираемых типов данных приложения пуст. Используемые API: UserDefaults (CA92.1) и метки времени файлов (C617.1). Также <a href="{APPLE_PRIVACY}">Политика конфиденциальности Apple</a>.</p>
        <h2>9. Сеть и звук</h2>
        <p>Сеансы прослушивания используют аудиофайлы в комплекте приложения. Во время прослушивания OpenAI и другие генеративные API не вызываются. Голосовые файлы могли быть созданы при разработке через синтез речи; этот ключ в приложение не входит. Сотовая настройка влияет только на разрешение медиа в сотовой сети и не загружает ваши сеансы.</p>
        <h2>10. Покупки</h2>
        <p>Покупка Steady Pro — это In-App Purchase Apple, списание с Apple ID. Транзакцию обрабатывает Apple. Мы не получаем пароль Apple ID и полный номер карты. StoreKit (на iOS — RevenueCat с публичным ключом Apple SDK) может видеть чек / идентификатор транзакции, чтобы открыть Pro и восстановить покупки.</p>
        <h2>11. RevenueCat</h2>
        <p>На iOS для проверки чеков может использоваться RevenueCat. RevenueCat может обрабатывать анонимные идентификаторы App Store и идентификатор пользователя приложения, созданный на устройстве. Имя и почту мы не отправляем. <a href="{RC_PRIVACY}">Политика конфиденциальности RevenueCat</a>.</p>
        <h2>12. Отчёты о сбоях (необязательно, по умолчанию выкл.)</h2>
        <p>Если в сборке задан Sentry DSN, отчёт о сбое может уйти с отключёнными персональными данными. Намерение для продакшена: выкл., пока владелец проекта не задаст DSN. Локальная запись ошибки остаётся на устройстве в любом случае.</p>
        <h2>13. Трекинг, реклама, аналитика</h2>
        <p>Steady не показывает стороннюю рекламу, не запрашивает App Tracking Transparency для трекинга в чужих приложениях и не запускает маркетинговый аналитический SDK в текущей версии.</p>
        <h2>14. Экстренные номера</h2>
        <p>Чип кризиса выбирает номер по региону/часовому поясу телефона, а не по языку интерфейса. Страну можно сменить в Настройках. Нажатие открывает приложение «Телефон». Мы не совершаем звонок и не получаем его содержание. Steady не служба экстренной помощи.</p>
        <h2>15. Дети</h2>
        <p>Steady не предназначен для детей младше 13 лет (или эквивалентного возраста в вашей стране). Мы сознательно не собираем данные детей. Если ребёнок пользовался приложением на вашем устройстве, удалите приложение, чтобы стереть локальные данные.</p>
        <h2>16. ЕЭЗ / Великобритания</h2>
        <p>Хранение на устройстве нужно, чтобы выполнить функцию, которую вы нажали (договор / законный интерес). Обработка платежей — ответственность Apple. Облачного профиля Steady у вас нет.</p>
        <h2>17. Ваши возможности</h2>
        <ul>
          <li>Язык, тема, голос, страна экстренного номера в Настройках</li>
          <li>Отключить PIN или повторить онбординг (локальные ответы могут стереться)</li>
          <li>Удалить приложение, чтобы убрать данные песочницы</li>
          <li>Подписки: Настройки iPhone → Apple ID → Подписки или <a href="{APPLE_SUBS}">{APPLE_SUBS}</a></li>
        </ul>
        <p>Мы не можем выслать копию заметок с устройства по почте: мы их не получали.</p>
        <h2>18. Международная передача</h2>
        <p>App Store доступен по всему миру. Данные на устройстве остаются на устройстве. Apple и (если используются) RevenueCat или Sentry могут обрабатывать ограниченные технические данные в США или других странах по своим условиям.</p>
        <h2>19. Изменения</h2>
        <p>Мы можем обновить эту политику. Дата «Последнее обновление» изменится. Существенные изменения, влияющие на раскрытие подписки, также появятся на экране оплаты в приложении, если этого требует Apple.</p>
        <h2>20. Контакт</h2>
        <p>Приложение не собирает эл. почту и не ведёт входящие в приложении. Откройте Steady → Настройки → Помощь, скопируйте идентификатор поддержки и укажите его, если свяжетесь с разработчиком через карточку App Store или другой опубликованный канал. Не отправляйте сведения о здоровье, которые не хотите видеть в почте. См. также <a href="./terms.html?lang=ru">Условия использования</a>.</p>
"""

PRIVACY["es"] = f"""
        <div class="note"><strong>Resumen.</strong> Steady no crea una cuenta. Casi todo lo que escribes permanece en este dispositivo. Si te suscribes, el pago lo procesa Apple. No vendemos tu información. Esta página es la Política de privacidad funcional exigida por la Directriz 5.1 de App Store Review y, para suscripciones de renovación automática, la 3.1.2.</div>
        <h2>1. Quiénes somos</h2>
        <p>Steady es una app personal de afrontamiento para pánico, ansiedad, sueño y estados afines. La publica Javid Alishov, desarrollador individual. El identificador del paquete iOS es <code>app.steady.calm</code>. Steady no es una clínica, un hospital, un prestador sanitario colegiado ni un servicio de emergencias.</p>
        <h2>2. Ámbito</h2>
        <p>Esta política cubre la app iOS de Steady (WebView de Capacitor), la compilación web/PWA opcional y estas páginas legales. Apple, RevenueCat y otros terceros tienen sus propias políticas. La facturación de compras dentro de la app corresponde a Apple.</p>
        <h2>3. Sin cuenta</h2>
        <p>Puedes usar Steady sin registrarte. No pedimos nombre, correo, teléfono ni una contraseña de Steady. No operamos una base de usuarios en un servidor de Steady que guarde tu ánimo, toques de SOS o respuestas del onboarding.</p>
        <h2>4. Dónde vive la información</h2>
        <p>Lo que introduces se guarda en la zona de pruebas de la app en este dispositivo (almacenamiento local del WebView y, en iOS, UserDefaults del contenedor nativo). Si eliminas la app o borras los datos del sitio, la información desaparece del dispositivo. No podemos restaurarla desde una nube de Steady: no existe.</p>
        <h2>5. Información en el dispositivo</h2>
        <ul>
          <li>Respuestas del onboarding, recordatorios y marca de prueba de 3 días en el dispositivo</li>
          <li>Idioma, tema, modo tenue, voz/melodía y preferencia de datos móviles</li>
          <li>Bloqueo opcional de 4 dígitos: solo sal aleatoria y hash SHA-256; el PIN no se guarda en claro</li>
          <li>Notas de SOS / “lo superé”, actividad, rachas y créditos de congelación</li>
          <li>Horarios del plan de sueño</li>
          <li>Anulación del país de emergencia, si la configuras</li>
          <li>Identificador local de soporte en Ajustes → Ayuda; no se sube por defecto</li>
          <li>Registro local del último error</li>
          <li>Indicador de derecho Pro cuando Apple confirma una suscripción activa en este Apple ID</li>
        </ul>
        <h2>6. Texto de salud que escribes</h2>
        <p>Si escribes sobre pánico, sueño o ánimo, el texto permanece en el dispositivo. No lo usamos para diagnosticar ni tratar. Steady no es un producto sanitario. No escribas secretos que no quieras guardar en este teléfono.</p>
        <h2>7. Información que no recopilamos</h2>
        <p>No recopilamos nombre legal, correo, dirección postal, documento de identidad, contactos, ubicación precisa para publicidad, número de tarjeta ni identificador publicitario para seguimiento. La versión actual no usa la cámara ni la fototeca. No vendemos información personal.</p>
        <h2>8. Etiqueta de privacidad de Apple / PrivacyInfo</h2>
        <p>En <code>PrivacyInfo.xcprivacy</code>: <code>NSPrivacyTracking</code> = false, sin dominios de seguimiento y lista vacía de tipos de datos recopilados por la propia app. API accedidas: UserDefaults (CA92.1) y marcas de tiempo de archivos (C617.1). Véase también la <a href="{APPLE_PRIVACY}">Política de privacidad de Apple</a>.</p>
        <h2>9. Red y audio</h2>
        <p>La escucha guiada usa archivos de audio incluidos en la app. Mientras escuchas no se llama a OpenAI ni a otra API generativa. Los archivos de voz pueden haberse generado en desarrollo con un proveedor de texto a voz; esa clave no se incluye en la app. El ajuste móvil solo afecta a si permites medios con datos celulares; no sube tus sesiones.</p>
        <h2>10. Compras</h2>
        <p>Si compras Steady Pro, el pago es una compra dentro de la app de Apple cargada a tu Apple ID. Apple procesa la transacción. No recibimos tu contraseña de Apple ID ni el número completo de la tarjeta. StoreKit (y, en iOS, el SDK de RevenueCat con una clave pública de Apple) puede ver un recibo o identificador de transacción para desbloquear Pro y restaurar compras.</p>
        <h2>11. RevenueCat</h2>
        <p>En iOS, Steady puede usar RevenueCat para validar recibos de App Store. RevenueCat puede tratar identificadores anónimos de App Store y un identificador de usuario de la app generado en el dispositivo. No enviamos tu nombre ni correo. <a href="{RC_PRIVACY}">Política de privacidad de RevenueCat</a>.</p>
        <h2>12. Informes de fallos (opcional, desactivado por defecto)</h2>
        <p>Si una compilación incluye un DSN de Sentry, puede enviarse un informe de fallo con la información personal identificable desactivada. La intención de producción es mantenerlo apagado salvo que el responsable del proyecto configure el DSN. Las notas locales del último error permanecen en el dispositivo.</p>
        <h2>13. Seguimiento, publicidad, analítica</h2>
        <p>Steady no muestra anuncios de terceros, no usa App Tracking Transparency para rastrearte en apps de otras empresas y no ejecuta un SDK de analítica de marketing en la versión actual.</p>
        <h2>14. Números de emergencia</h2>
        <p>El chip de crisis elige el número según la región/zona horaria del teléfono, no según el idioma de la app. Puedes cambiar el país en Ajustes. Al pulsar se abre Teléfono. No realizamos la llamada ni recibimos su contenido. Steady no es un servicio de emergencias.</p>
        <h2>15. Menores</h2>
        <p>Steady no está dirigido a menores de 13 años (o la edad mínima equivalente en tu país). No recopilamos a sabiendas datos de menores. Si un menor ha usado la app en un dispositivo que controlas, elimínala para borrar los datos locales.</p>
        <h2>16. EEE / Reino Unido</h2>
        <p>El almacenamiento en el dispositivo existe porque pediste una función (contrato / interés legítimo de ejecutar lo que pulsaste). El tratamiento de pagos es responsabilidad de Apple. No mantenemos un perfil tuyo en la nube de Steady.</p>
        <h2>17. Tus opciones</h2>
        <ul>
          <li>Idioma, tema, voz y país de emergencia en Ajustes</li>
          <li>Desactivar el PIN o repetir el onboarding (pueden borrarse respuestas locales)</li>
          <li>Eliminar la app para quitar los datos de la zona de pruebas</li>
          <li>Suscripciones: Ajustes del iPhone → Apple ID → Suscripciones o <a href="{APPLE_SUBS}">{APPLE_SUBS}</a></li>
        </ul>
        <p>No podemos enviarte por correo una copia de las notas del dispositivo porque nunca las recibimos.</p>
        <h2>18. Transferencias internacionales</h2>
        <p>App Store puede usarse en todo el mundo. Los datos del dispositivo permanecen en el dispositivo. Apple y, si se usan, RevenueCat o Sentry pueden tratar datos técnicos limitados en Estados Unidos u otros países según sus condiciones.</p>
        <h2>19. Cambios</h2>
        <p>Podemos actualizar esta política. Cambiará la fecha de «Última actualización». Los cambios materiales que afecten a las revelaciones de suscripción también aparecerán en la pantalla de pago de la app cuando Apple lo exija.</p>
        <h2>20. Contacto</h2>
        <p>La app no recoge correo ni opera una bandeja dentro de la app. Abre Steady → Ajustes → Ayuda, copia el identificador de soporte y cítalo si contactas al desarrollador por la ficha de App Store u otro canal que publique. No envíes detalles de salud que no quieras en el correo. Relacionado: <a href="./terms.html?lang=es">Términos de uso</a>.</p>
"""

PRIVACY["it"] = f"""
        <div class="note"><strong>In sintesi.</strong> Steady non crea un account. Quasi tutto ciò che scrivi resta su questo dispositivo. Se ti abboni, il pagamento è elaborato da Apple. Non vendiamo le tue informazioni. Questa pagina è l’Informativa sulla privacy funzionale richiesta dalla Linea guida 5.1 di App Store Review e, per gli abbonamenti a rinnovo automatico, dalla 3.1.2.</div>
        <h2>1. Chi siamo</h2>
        <p>Steady è un’app personale di fronteggiamento per panico, ansia, sonno e stati affini. È pubblicata da Javid Alishov, sviluppatore individuale. L’identificatore del bundle iOS è <code>app.steady.calm</code>. Steady non è una clinica, un ospedale, un prestatore sanitario abilitato né un servizio di emergenza.</p>
        <h2>2. Ambito</h2>
        <p>Questa informativa copre l’app iOS Steady (WebView Capacitor), l’eventuale build web/PWA e queste pagine legali. Apple, RevenueCat e altri terzi hanno le proprie informative. La fatturazione degli acquisti in-app spetta ad Apple.</p>
        <h2>3. Nessun account</h2>
        <p>Puoi usare Steady senza registrarti. Non chiediamo nome, e-mail, telefono o una password Steady. Non gestiamo un database utenti Steady su un server che conservi umore, tocchi SOS o risposte dell’onboarding.</p>
        <h2>4. Dove stanno le informazioni</h2>
        <p>Ciò che inserisci resta nella sandbox dell’app su questo dispositivo (archivio locale del WebView e, su iOS, UserDefaults del contenitore nativo). Se elimini l’app o cancelli i dati del sito, le informazioni spariscono dal dispositivo. Non possiamo ripristinarle da un cloud Steady: non esiste.</p>
        <h2>5. Informazioni sul dispositivo</h2>
        <ul>
          <li>Risposte dell’onboarding, promemoria e marcatura della prova di 3 giorni sul dispositivo</li>
          <li>Lingua, tema, modalità attenuata, voce/melodia, preferenza dati cellulari</li>
          <li>Blocco opzionale a 4 cifre: solo sale casuale e hash SHA-256; il PIN non è in chiaro</li>
          <li>Note SOS / “ce l’ho fatta”, attività, serie, crediti di congelamento</li>
          <li>Orari del piano sonno</li>
          <li>Override del Paese di emergenza, se lo imposti</li>
          <li>Identificatore locale di supporto in Impostazioni → Aiuto; non viene caricato per impostazione predefinita</li>
          <li>Registro locale dell’ultimo errore</li>
          <li>Flag del diritto Pro dopo che Apple conferma un abbonamento attivo su questo Apple ID</li>
        </ul>
        <h2>6. Testo sulla salute che scrivi</h2>
        <p>Se scrivi di panico, sonno o umore, il testo resta sul dispositivo. Non lo usiamo per diagnosticare o curare. Steady non è un dispositivo medico. Non inserire segreti che non vuoi conservare su questo telefono.</p>
        <h2>7. Informazioni che non raccogliamo</h2>
        <p>Non raccogliamo nome legale, e-mail, indirizzo, documento, contatti, posizione precisa per pubblicità, numero di carta o identificatore pubblicitario per il tracciamento. La versione attuale non usa fotocamera né libreria foto. Non vendiamo dati personali.</p>
        <h2>8. Etichetta privacy Apple / PrivacyInfo</h2>
        <p>In <code>PrivacyInfo.xcprivacy</code>: <code>NSPrivacyTracking</code> = false, nessun dominio di tracciamento, elenco vuoto dei tipi di dati raccolti dall’app. API usate: UserDefaults (CA92.1) e timestamp dei file (C617.1). Vedi anche l’<a href="{APPLE_PRIVACY}">Informativa sulla privacy di Apple</a>.</p>
        <h2>9. Rete e audio</h2>
        <p>L’ascolto guidato usa file audio in bundle. Durante l’ascolto non si chiama OpenAI né un’altra API generativa. I file vocali possono essere stati prodotti in sviluppo con un motore text-to-speech; quella chiave non è nell’app. L’impostazione cellulare influisce solo sul permesso dei media in rete cellulare e non carica le sessioni.</p>
        <h2>10. Acquisti</h2>
        <p>Se acquisti Steady Pro, il pagamento è un In-App Purchase Apple addebitato all’Apple ID. Apple elabora la transazione. Non riceviamo la password dell’Apple ID né il numero completo della carta. StoreKit (su iOS, RevenueCat con chiave pubblica Apple SDK) può vedere una ricevuta o un identificatore di transazione per sbloccare Pro e ripristinare gli acquisti.</p>
        <h2>11. RevenueCat</h2>
        <p>Su iOS, Steady può usare RevenueCat per convalidare le ricevute App Store. RevenueCat può trattare identificatori anonimi App Store e un identificatore utente dell’app generato sul dispositivo. Non inviamo nome o e-mail. <a href="{RC_PRIVACY}">Informativa sulla privacy di RevenueCat</a>.</p>
        <h2>12. Segnalazione crash (opzionale, disattivata di default)</h2>
        <p>Se una build include un DSN Sentry, può partire un report di crash con PII disattivata. L’intento di produzione è tenerla spenta finché il proprietario del progetto non imposta il DSN. Le note locali dell’ultimo errore restano sul dispositivo.</p>
        <h2>13. Tracciamento, pubblicità, analitica</h2>
        <p>Steady non mostra annunci di terzi, non usa App Tracking Transparency per tracciarti in app di altre aziende e non esegue un SDK di analitica di marketing nella versione attuale.</p>
        <h2>14. Numeri di emergenza</h2>
        <p>Il chip crisi sceglie il numero dalla regione/fuso del telefono, non dalla lingua dell’app. Puoi cambiare Paese in Impostazioni. Il tocco apre Telefono. Non effettuiamo la chiamata e non ne riceviamo il contenuto. Steady non è un servizio di emergenza.</p>
        <h2>15. Minori</h2>
        <p>Steady non è rivolto a minori di 13 anni (o all’età minima equivalente nel tuo Paese). Non raccogliamo consapevolmente dati di minori. Se un minore ha usato l’app su un dispositivo che controlli, eliminala per rimuovere i dati locali.</p>
        <h2>16. SEE / Regno Unito</h2>
        <p>L’archiviazione sul dispositivo esiste perché hai chiesto una funzione (contratto / legittimo interesse a eseguire ciò che hai toccato). Il trattamento dei pagamenti è responsabilità di Apple. Non abbiamo un tuo profilo cloud Steady.</p>
        <h2>17. Le tue scelte</h2>
        <ul>
          <li>Lingua, tema, voce e Paese di emergenza in Impostazioni</li>
          <li>Disattivare il PIN o ripetere l’onboarding (le risposte locali possono cancellarsi)</li>
          <li>Eliminare l’app per rimuovere i dati della sandbox</li>
          <li>Abbonamenti: Impostazioni iPhone → Apple ID → Abbonamenti o <a href="{APPLE_SUBS}">{APPLE_SUBS}</a></li>
        </ul>
        <p>Non possiamo inviarti via e-mail una copia delle note sul dispositivo perché non le abbiamo mai ricevute.</p>
        <h2>18. Trasferimenti internazionali</h2>
        <p>L’App Store può essere usato in tutto il mondo. I dati sul dispositivo restano sul dispositivo. Apple e, se usati, RevenueCat o Sentry possono trattare dati tecnici limitati negli Stati Uniti o in altri Paesi secondo i propri termini.</p>
        <h2>19. Modifiche</h2>
        <p>Possiamo aggiornare questa informativa. Cambierà la data di «Ultimo aggiornamento». Le modifiche sostanziali che riguardano le informative sull’abbonamento compariranno anche nella schermata di pagamento in-app ove richiesto da Apple.</p>
        <h2>20. Contatti</h2>
        <p>L’app non raccoglie e-mail e non gestisce una casella in-app. Apri Steady → Impostazioni → Aiuto, copia l’identificatore di supporto e citolo se contatti lo sviluppatore tramite la scheda App Store o un altro canale pubblicato. Non inviare dettagli di salute che non vuoi in e-mail. Correlato: <a href="./terms.html?lang=it">Termini d’uso</a>.</p>
"""

TERMS = {}

TERMS["en"] = f"""
        <div class="note"><strong>Apple App Store Review Guideline 3.1.2.</strong> Payment will be charged to your Apple ID account at confirmation of purchase. Subscription automatically renews unless it is canceled at least 24 hours before the end of the current period. Your account will be charged for renewal within 24 hours prior to the end of the current period. You can manage and cancel your subscriptions by going to your account settings on the App Store after purchase (iPhone Settings → [your name] → Subscriptions, or <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>). Any unused portion of a free trial period, if offered, will be forfeited when you purchase a subscription.</div>
        <p>These Terms of Use (“Terms”) are a custom end-user license for Steady. They apply together with Apple’s Licensed Application End User License Agreement. If there is a conflict about how you may use the licensed application on Apple platforms, Apple’s Standard EULA controls that point: <a href="{APPLE_EULA}">{APPLE_EULA}</a>. In-app purchases are billed by Apple under Apple’s terms.</p>
        <h2>1. Acceptance</h2>
        <p>By downloading, installing, or using Steady you agree to these Terms and to the <a href="./privacy.html?lang=en">Privacy Policy</a>. If you do not agree, do not use the app.</p>
        <h2>2. Who we are</h2>
        <p>Steady is published by Javid Alishov, an individual developer. iOS bundle ID: <code>app.steady.calm</code>. App Store name: Steady (Panic &amp; Calm). Steady is not a clinic, hospital, licensed healthcare provider, or emergency service.</p>
        <h2>3. Not medical care (important)</h2>
        <p>Steady offers coping tools: breath, sound, present-tense lines, stories, writing prompts, and similar exercises. It does not diagnose, treat, cure, or prevent any disease. It does not replace a clinician, therapist, medication, or emergency care. If you are in crisis, call your local emergency number. The in-app crisis chip is a shortcut based on device region; it is not a guarantee that the number is correct for your situation and it does not place the call for you.</p>
        <h2>4. Eligibility</h2>
        <p>You must be at least 13 years old, or the minimum age required in your country to use App Store apps, whichever is higher. If you are under the age of majority, a parent or guardian must agree to these Terms on your behalf. You may only use the app with an Apple ID you are authorized to use.</p>
        <h2>5. License</h2>
        <p>We grant you a personal, limited, non-exclusive, non-transferable, revocable license to use Steady on devices you own or control, as permitted by Apple’s Standard EULA. You may not reverse-engineer, resell, scrape the content as a competing service, or use the app to provide clinical care to others as if it were a medical product.</p>
        <h2>6. Free layer and Pro</h2>
        <p>SOS is always free and does not lock. After any on-device trial ends, a thin free layer remains: 174 Hz for 3 minutes, one story, one writing, one breath, panic day 1, today’s one clarity, 5-4-3-2-1, the first meditation session, and 5 minutes of rain or piano. Listening for 15 minutes or more is Pro. Pro unlocks the remaining sessions, longer listening, and related features described on the paywall. Feature lists may change; the paywall in the current version is the description of what you buy.</p>
        <h2>7. Auto-renewable subscriptions (title, length, price)</h2>
        <p>Paid access is an auto-renewable Apple In-App Purchase in the subscription group <strong>Steady Pro</strong>. Only one of these products is active at a time; switching plans follows Apple’s upgrade and downgrade rules for that group.</p>
        {table(COL["en"], PRODUCT_ROWS["en"])}
        <p>The price shown in the app is the App Store price for your Apple ID country or region (storefront), including applicable taxes where Apple displays them. <strong>Price does not follow the in-app language.</strong> If the store is unreachable, the app may show the USD reference prices above as a fallback. The amount actually charged is always Apple’s localized price for that product at the time of confirmation — not a figure hardcoded to a language.</p>
        <h2>8. How billing works</h2>
        <ul>
          <li>Payment is charged to your Apple ID at confirmation of purchase.</li>
          <li>The subscription renews automatically unless you cancel at least 24 hours before the current period ends.</li>
          <li>Your account is charged for renewal within 24 hours prior to the end of the current period, at the then-current App Store price for that product.</li>
          <li>You manage or cancel in iPhone Settings → Apple ID → Subscriptions, or at <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>. Deleting the app does not cancel the subscription.</li>
          <li>Refunds, if any, are handled by Apple: <a href="{APPLE_REFUND}">{APPLE_REFUND}</a> or Purchase History in your Apple ID. We cannot refund an App Store charge ourselves.</li>
        </ul>
        <h2>9. On-device 3-day trial (not an Apple Introductory Offer)</h2>
        <p>Steady may start a <strong>3-day on-device trial</strong> after onboarding. That timer lives on the phone. It is <strong>not</strong> an Apple Introductory Offer. App Store Connect is left without an introductory offer so Apple does not charge a trial through StoreKit. The on-device trial does not bill your Apple ID. When it ends, the free layer above remains; Pro requires a subscription. If Apple ever offered a free trial through StoreKit, unused trial time would be forfeited when you purchase, as stated in the box at the top. Buying a subscription does not convert unused on-device trial days into a cash refund (there was no Apple charge for those days).</p>
        <h2>10. Restore purchases</h2>
        <p>Use Restore on the paywall to re-apply an active Apple subscription to this device. Restoration requires the same Apple ID that purchased the subscription. Family Sharing applies only if Apple and App Store Connect have Family Sharing enabled for these products; otherwise Pro is tied to the purchasing Apple ID.</p>
        <h2>11. Acceptable use</h2>
        <p>Do not misuse the app, attempt to break purchase checks, harass others through any future sharing feature, or treat crisis tools as a substitute for calling emergency services when you need them.</p>
        <h2>12. Your content on this phone</h2>
        <p>Notes, PIN hash, and onboarding answers stay on the device. If you delete the app, they go with it. We cannot restore them from a server.</p>
        <h2>13. Intellectual property</h2>
        <p>The Steady name, UI, bundled audio, and written exercises are licensed to you for personal use, not sold. Third-party marks (Apple, App Store, RevenueCat) belong to their owners.</p>
        <h2>14. Availability</h2>
        <p>We may change, suspend, or discontinue features. Store availability, pricing, and taxes depend on Apple and your storefront. Voice clips exist for some languages; melody remains available when a clip is missing.</p>
        <h2>15. Disclaimer of warranties</h2>
        <p>Steady is provided “as is” and “as available,” without warranties of any kind, to the maximum extent permitted by law. We do not warrant that a panic wave will pass, that an emergency number is the one you need, or that the app will be uninterrupted or error-free. Consumer protections that cannot be waived in your country remain in force.</p>
        <h2>16. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, the developer is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost data, panic outcomes, missed emergency calls, or billing disputes that Apple handles. Our total liability for claims arising from the app is limited to the amount you paid for Steady Pro through Apple in the 12 months before the claim, or the minimum your consumer law requires if that is higher. This does not exclude liability for death or personal injury caused by negligence where such exclusion is forbidden.</p>
        <h2>17. Termination</h2>
        <p>You may stop using the app at any time. Cancel Apple subscriptions separately. We may terminate the license if you materially breach these Terms. Sections that by nature should survive (including 3, 15, 16, and Apple’s billing terms) survive termination.</p>
        <h2>18. Governing law</h2>
        <p>Except where prohibited, these Terms are governed by the laws of the Republic of Azerbaijan, without regard to conflict-of-law rules. Mandatory consumer rights in your country of residence (including the EEA and the United Kingdom) still apply. Disputes about Apple charges are between you and Apple.</p>
        <h2>19. Changes</h2>
        <p>We may update these Terms. The “Last updated” date will change. Continued use after an update, where permitted, constitutes acceptance. Subscription price changes follow Apple’s rules and in-app notice requirements.</p>
        <h2>20. Contact</h2>
        <p>The app does not collect email. Open Steady → Settings → Help and copy the support ID. Quote that ID if you contact the developer through the App Store listing or another channel the developer publishes. Related: <a href="./privacy.html?lang=en">Privacy Policy</a> · <a href="{APPLE_EULA}">Apple Standard EULA</a>.</p>
"""

TERMS["tr"] = f"""
        <div class="note"><strong>App Store İnceleme Yönergesi 3.1.2.</strong> Ödeme, satın alma onayı sırasında Apple ID hesabına yansıtılır. Abonelik, mevcut dönemin bitiminden en az 24 saat önce iptal edilmedikçe otomatik yenilenir. Yenileme ücreti, mevcut dönemin bitiminden önceki 24 saat içinde hesabına yansıtılır. Satın alma sonrası abonelikleri App Store hesap ayarlarından yönetir ve iptal edersin (iPhone Ayarlar → [adın] → Abonelikler veya <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>). Ücretsiz deneme sunulmuşsa, abonelik satın alındığında kullanılmamış deneme süresi yanar.</div>
        <p>Bu Kullanım Koşulları Steady için özel bir son kullanıcı lisansıdır. Apple’ın Lisanslı Uygulama Son Kullanıcı Lisans Sözleşmesi ile birlikte uygulanır. Apple platformlarında lisanslı uygulamanın kullanımına dair çelişkide Apple Standart EULA o noktada geçerlidir: <a href="{APPLE_EULA}">{APPLE_EULA}</a>. Uygulama içi satın almaları Apple, kendi koşullarıyla faturalar.</p>
        <h2>1. Kabul</h2>
        <p>Steady’yi indirerek, kurarak veya kullanarak bu Koşulları ve <a href="./privacy.html?lang=tr">Gizlilik Politikasını</a> kabul edersin. Kabul etmiyorsan uygulamayı kullanma.</p>
        <h2>2. Kimiz</h2>
        <p>Steady’yi Javid Alishov (bireysel geliştirici) yayımlar. iOS paket kimliği: <code>app.steady.calm</code>. App Store adı: Steady (Panic &amp; Calm). Steady klinik, hastane, ruhsatlı sağlık sunucusu veya acil servis değildir.</p>
        <h2>3. Tıbbi bakım değil (önemli)</h2>
        <p>Steady başa çıkma araçları sunar: nefes, ses, şimdiki zaman cümleleri, hikâyeler, yazma ve benzeri alıştırmalar. Hastalık teşhis etmez, tedavi etmez, iyileştirmez veya önlemez. Klinisyen, terapist, ilaç veya acil bakımı yerine geçmez. Krizde yerel acil numarayı ara. Uygulama içi kriz çipi cihaz bölgesine göre kısayoldur; durumun için doğru numarayı garanti etmez ve aramayı senin yerine yapmaz.</p>
        <h2>4. Uygunluk</h2>
        <p>En az 13 yaşında veya ülkenin App Store için aradığı asgari yaşta olmalısın (hangisi yüksekse). Reşit değilsen ebeveyn veya vasi bu Koşulları senin adına kabul etmelidir. Uygulamayı yalnızca yetkili olduğun bir Apple ID ile kullan.</p>
        <h2>5. Lisans</h2>
        <p>Sana, Apple Standart EULA’nın izin verdiği şekilde, sahip olduğun veya kontrol ettiğin cihazlarda Steady’yi kullanmak için kişisel, sınırlı, münhasır olmayan, devredilemez, geri alınabilir lisans verilir. Tersine mühendislik, yeniden satış, içeriği rakip hizmet olarak kazıma veya uygulamayı tıbbi ürünmüş gibi başkalarına klinik bakım sunmak yasaktır.</p>
        <h2>6. Ücretsiz katman ve Pro</h2>
        <p>SOS her zaman ücretsizdir ve kilitlenmez. Cihaz içi deneme bitince ince ücretsiz katman kalır: 174 Hz 3 dakika, bir hikâye, bir yazı, bir nefes, panik 1. gün, günün tek netliği, 5-4-3-2-1, ilk meditasyon seansı, yağmur veya piyano 5 dakika. 15 dakika ve üzeri dinleme Pro’dur. Pro, paywall’da anlatılan kalan seansları ve uzun dinlemeyi açar. Özellik listesi değişebilir; satın aldığın şeyin tarifi güncel sürümdeki paywall’dır.</p>
        <h2>7. Otomatik yenilenen abonelikler (başlık, süre, fiyat)</h2>
        <p>Ücretli erişim, <strong>Steady Pro</strong> abonelik grubunda otomatik yenilenen Apple In-App Purchase’dır. Aynı anda bu ürünlerden biri aktiftir; plan değiştirme Apple’ın o grup için yükseltme/düşürme kurallarına uyar.</p>
        {table(COL["tr"], PRODUCT_ROWS["tr"])}
        <p>Uygulamada görünen fiyat, Apple ID ülken/bölgen (storefront) için App Store fiyatıdır; Apple’ın gösterdiği vergiler dahil olabilir. <strong>Fiyat, uygulama diline göre değişmez.</strong> Mağaza okunamazsa yukarıdaki USD referans fiyatları yedek olarak görünebilir. Fiilen çekilen tutar, onay anında o ürün için Apple’ın yerelleştirilmiş fiyatıdır — dile sabitlenmiş bir rakam değildir.</p>
        <h2>8. Faturalama nasıl işler</h2>
        <ul>
          <li>Ödeme, satın alma onayında Apple ID’ne yansır.</li>
          <li>Abonelik, mevcut dönemin bitiminden en az 24 saat önce iptal etmezsen otomatik yenilenir.</li>
          <li>Yenileme ücreti, dönemin bitiminden önceki 24 saat içinde, o ürünün o andaki App Store fiyatından çekilir.</li>
          <li>Yönetim/iptal: iPhone Ayarlar → Apple ID → Abonelikler veya <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>. Uygulamayı silmek aboneliği iptal etmez.</li>
          <li>İade varsa Apple halleder: <a href="{APPLE_REFUND}">{APPLE_REFUND}</a> veya Apple ID Satın Alma Geçmişi. App Store ücretini biz iade edemeyiz.</li>
        </ul>
        <h2>9. Cihaz içi 3 günlük deneme (Apple Introductory Offer değil)</h2>
        <p>Onboarding sonrası <strong>3 günlük cihaz içi deneme</strong> başlayabilir. Sayaç telefondadır. Bu, Apple Introductory Offer <strong>değildir</strong>. App Store Connect’te tanıtım teklifi boş bırakılır; StoreKit üzerinden deneme ücreti çekilmez. Cihaz içi deneme Apple ID’ni faturalamaz. Bitince yukarıdaki ücretsiz katman kalır; Pro için abonelik gerekir. Apple StoreKit ile ücretsiz deneme sunsaydı, satın almada kullanılmamış deneme süresi üstteki kutudaki gibi yanardı. Abonelik almak, kullanılmamış cihaz içi deneme günlerini nakit iadeye çevirmez (o günler için Apple ücreti yoktu).</p>
        <h2>10. Satın almaları geri yükle</h2>
        <p>Paywall’daki Geri Yükle, bu cihaza aktif Apple aboneliğini yeniden uygular. Satın alan aynı Apple ID gerekir. Aile Paylaşımı, Apple ve App Store Connect bu ürünler için Aile Paylaşımı’nı açtıysa geçerlidir; aksi halde Pro satın alan Apple ID’ye bağlıdır.</p>
        <h2>11. Kabul edilebilir kullanım</h2>
        <p>Uygulamayı kötüye kullanma, satın alma kontrollerini kırmaya çalışma veya kriz araçlarını acil servisi aramanın yerine koyma.</p>
        <h2>12. Bu telefondaki içeriğin</h2>
        <p>Notlar, PIN özeti ve onboarding cevapları cihazda kalır. Uygulamayı silersen gider. Sunucudan geri getiremeyiz.</p>
        <h2>13. Fikri mülkiyet</h2>
        <p>Steady adı, arayüz, paketlenmiş ses ve yazılı alıştırmalar kişisel kullanım için lisanslanır, satılmaz. Apple, App Store, RevenueCat markaları sahiplerine aittir.</p>
        <h2>14. Kullanılabilirlik</h2>
        <p>Özellikleri değiştirebilir, durdurabilir veya kaldırabiliriz. Mağaza, fiyat ve vergi Apple’a ve storefront’a bağlıdır. Bazı dillerde ses klipleri vardır; klip yoksa melodi kalır.</p>
        <h2>15. Garanti reddi</h2>
        <p>Yasaların izin verdiği azami ölçüde Steady “olduğu gibi” ve “mevcut haliyle”, her türlü garantisiz sunulur. Bir panik dalgasının geçeceğini, acil numaranın ihtiyacın olan numara olduğunu veya uygulamanın kesintisiz olacağını garanti etmeyiz. Ülkende feragat edilemeyen tüketici hakları geçerliliğini korur.</p>
        <h2>16. Sorumluluğun sınırlanması</h2>
        <p>Yasaların izin verdiği azami ölçüde geliştirici; dolaylı, arızi, özel, sonuçsal veya cezai zararlardan, kayıp veriden, panik sonuçlarından, kaçırılan acil aramalardan veya Apple’ın yürüttüğü fatura uyuşmazlıklarından sorumlu değildir. Uygulamadan doğan taleplerde toplam sorumluluk, talepten önceki 12 ayda Apple üzerinden Steady Pro için ödediğin tutar veya tüketici hukukunun zorunlu kıldığı daha yüksek asgari ile sınırlıdır. İhmalin yol açtığı ölüm veya bedensel zarar için yasağın olduğu yerlerde sorumluluk hariç tutulmaz.</p>
        <h2>17. Fesih</h2>
        <p>İstediğin zaman kullanmayı bırakabilirsin. Apple aboneliklerini ayrıca iptal et. Koşulları esaslı ihlal edersen lisansı sonlandırabiliriz. Niteliği gereği ayakta kalan maddeler (3, 15, 16 ve Apple faturalaması dahil) fesih sonrası da sürer.</p>
        <h2>18. Uygulanacak hukuk</h2>
        <p>Yasak olmadığı sürece bu Koşullar, kanunlar ihtilafı kuralları olmaksızın Azerbaycan Cumhuriyeti hukukuna tabidir. İkamet ülkenin zorunlu tüketici hakları (AEA ve Birleşik Krallık dahil) geçerlidir. Apple ücretlerine dair uyuşmazlık seninle Apple arasındadır.</p>
        <h2>19. Değişiklikler</h2>
        <p>Bu Koşulları güncelleyebiliriz. “Son güncelleme” tarihi değişir. İzin verilen yerde güncellemeden sonra kullanıma devam kabul sayılır. Abonelik fiyat değişiklikleri Apple kurallarına ve uygulama içi bildirim gereklerine uyar.</p>
        <h2>20. İletişim</h2>
        <p>Uygulama e-posta toplamaz. Steady → Ayarlar → Yardım’dan destek kimliğini kopyala. Geliştiriciye App Store kaydı veya yayımladığı kanaldan ulaşırsan bu kimliği yaz. İlgili: <a href="./privacy.html?lang=tr">Gizlilik</a> · <a href="{APPLE_EULA}">Apple Standart EULA</a>.</p>
"""

TERMS["az"] = f"""
        <div class="note"><strong>App Store İcmal Qaydası 3.1.2.</strong> Ödəniş alışın təsdiqi zamanı Apple ID hesabına yazılacaq. Abunəlik, cari dövrün bitməsinə ən azı 24 saat qalmış ləğv edilməzsə, avtomatik yenilənir. Yeniləmə haqqı cari dövrün bitməsinə 24 saat qalmışadək hesabından tutulacaq. Alışdan sonra abunəlikləri App Store hesab ayarlarından idarə və ləğv edə bilərsən (iPhone Ayarlar → [adın] → Abunəliklər və ya <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>). Ödənişsiz sınaq təklif olunarsa, abunəlik alındıqda istifadə olunmamış sınaq müddəti itirilir.</div>
        <p>Bu İstifadə Şərtləri Steady üçün xüsusi son istifadəçi lisenziyasıdır. Apple-ın Lisenziyalı Tətbiq Son İstifadəçi Lisenziya Müqaviləsi ilə birlikdə tətbiq olunur. Apple platformalarında lisenziyalı tətbiqin istifadəsinə dair ziddiyyətdə Apple Standart EULA həmin məqama nəzarət edir: <a href="{APPLE_EULA}">{APPLE_EULA}</a>. Tətbiq daxili alışları Apple öz şərtləri ilə hesablayır.</p>
        <h2>1. Qəbul</h2>
        <p>Steady-ni endirməklə, quraşdırmaqla və ya istifadə etməklə bu Şərtləri və <a href="./privacy.html?lang=az">Məxfilik Siyasətini</a> qəbul edirsən. Qəbul etmirsənsə, tətbiqi istifadə etmə.</p>
        <h2>2. Kimik</h2>
        <p>Steady-ni Javid Alishov (fərdi tərtibatçı) nəşr edir. iOS paket ID: <code>app.steady.calm</code>. App Store adı: Steady (Panic &amp; Calm). Steady klinika, xəstəxana, lisenziyalı səhiyyə xidməti və ya təcili yardım deyil.</p>
        <h2>3. Tibbi qayğı deyil (vacib)</h2>
        <p>Steady öhdəlik alətləri təqdim edir: nəfəs, səs, indiki zaman cümlələri, hekayələr, yazı tapşırıqları və oxşar məşqlər. Heç bir xəstəliyi diaqnoz etmir, müalicə etmir, sağaltmır və ya qarşısını almır. Həkim, terapevt, dərman və ya təcili qayğını əvəz etmir. Krizdə yerli təcili nömrəni çağır. Tətbiq daxili kriz çipi cihaz regionuna görə qısayoldur; vəziyyətin üçün nömrənin düzgünlüyünü zəmanət etmir və zəngi sənin yerinə etmir.</p>
        <h2>4. Uyğunluq</h2>
        <p>Ən azı 13 yaşında və ya ölkəndə App Store tətbiqləri üçün tələb olunan minimum yaşda olmalısan (hansı yüksəkdirsə). Yetkinlik yaşına çatmamısansa, valideyn və ya qəyyum bu Şərtləri sənin adından qəbul etməlidir. Tətbiqi yalnız istifadə etməyə icazən olan Apple ID ilə işlət.</p>
        <h2>5. Lisenziya</h2>
        <p>Sənə Apple Standart EULA-nın icazə verdiyi qaydada, sahib olduğun və ya nəzarət etdiyin cihazlarda Steady-dən istifadə üçün şəxsi, məhdud, müstəsna olmayan, ötürülməz, geri alına bilən lisenziya verilir. Tərsinə mühəndislik, yenidən satış, məzmunu rəqib xidmət kimi sıyırmaq və ya tətbiqi tibbi məhsul kimi başqalarına klinik qayğı göstərmək olmaz.</p>
        <h2>6. Pulsuz təbəqə və Pro</h2>
        <p>SOS həmişə pulsuzdur və kilidlənmir. Cihazdaxili sınaq bitəndən sonra nazik pulsuz təbəqə qalır: 174 Hz 3 dəqiqə, bir hekayə, bir yazı, bir nəfəs, panik 1-ci gün, günün tək netliyi, 5-4-3-2-1, ilk meditasiya seansı, yağış və ya piano 5 dəqiqə. 15 dəqiqə və daha uzun dinləmə Pro-dur. Pro, ödəniş ekranında təsvir olunan qalan seansları və uzun dinləməni açır. Xüsusiyyət siyahısı dəyişə bilər; aldığın şeyin təsviri cari versiyadakı ödəniş ekranıdır.</p>
        <h2>7. Avtomatik yenilənən abunəliklər (ad, müddət, qiymət)</h2>
        <p>Ödənişli giriş <strong>Steady Pro</strong> abunəlik qrupunda avtomatik yenilənən Apple In-App Purchase-dir. Eyni anda bu məhsullardan biri aktivdir; plan dəyişməsi Apple-ın həmin qrup üçün yüksəltmə/endirmə qaydalarına uyğundur.</p>
        {table(COL["az"], PRODUCT_ROWS["az"])}
        <p>Tətbiqdə görünən qiymət Apple ID ölkən/regionun (storefront) üçün App Store qiymətidir; Apple-ın göstərdiyi vergi daxil ola bilər. <strong>Qiymət tətbiqin dilinə görə dəyişmir.</strong> Mağaza oxunmazsa, yuxarıdakı USD istinad qiymətləri ehtiyat kimi görünə bilər. Faktiki tutulan məbləğ həmişə təsdiq anında həmin məhsul üçün Apple-ın yerliləşdirilmiş qiymətidir — dilə bağlanmış rəqəm deyil.</p>
        <h2>8. Hesablaşma necə işləyir</h2>
        <ul>
          <li>Ödəniş alışın təsdiqində Apple ID-nə yazılır.</li>
          <li>Abunəlik, cari dövrün bitməsinə ən azı 24 saat qalmış ləğv etməsən, avtomatik yenilənir.</li>
          <li>Yeniləmə haqqı dövrün bitməsinə 24 saat qalmışadək, həmin məhsulun o andakı App Store qiyməti ilə tutulur.</li>
          <li>İdarə/ləğv: iPhone Ayarlar → Apple ID → Abunəliklər və ya <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>. Tətbiqi silmək abunəliyi ləğv etmir.</li>
          <li>Geri ödəmə varsa, Apple həll edir: <a href="{APPLE_REFUND}">{APPLE_REFUND}</a> və ya Apple ID Alış Tarixçəsi. App Store tutmasını biz qaytara bilmərik.</li>
        </ul>
        <h2>9. Cihazdaxili 3 günlük sınaq (Apple Introductory Offer deyil)</h2>
        <p>Onboarding-dən sonra <strong>3 günlük cihazdaxili sınaq</strong> başlaya bilər. Sayğac telefondadır. Bu, Apple Introductory Offer <strong>deyil</strong>. App Store Connect-də tanıtım təklifi boş saxlanılır; StoreKit vasitəsilə sınaq haqqı tutulmur. Cihazdaxili sınaq Apple ID-ni faturalamır. Bitəndə yuxarıdakı pulsuz təbəqə qalır; Pro üçün abunəlik lazımdır. Apple StoreKit ilə ödənişsiz sınaq təklif etsəydi, alış zamanı istifadə olunmamış sınaq müddəti yuxarıdakı qutudakı kimi itirilərdi. Abunəlik almaq, istifadə olunmamış cihazdaxili sınaq günlərini nağd geri ödəməyə çevirmir (o günlər üçün Apple tutması yox idi).</p>
        <h2>10. Alışları bərpa et</h2>
        <p>Ödəniş ekranındakı Bərpa, bu cihaza aktiv Apple abunəliyini yenidən tətbiq edir. Alan eyni Apple ID lazımdır. Ailə Paylaşımı yalnız Apple və App Store Connect bu məhsullar üçün Ailə Paylaşımını açıbsa keçərlidir; əks halda Pro alan Apple ID-yə bağlıdır.</p>
        <h2>11. Qəbul edilən istifadə</h2>
        <p>Tətbiqi sui-istifadə etmə, alış yoxlamalarını sındırmağa çalışma və ya kriz alətlərini təcili xidməti çağırmağın əvəzinə qoyma.</p>
        <h2>12. Bu telefondakı məzmunun</h2>
        <p>Qeydlər, PIN xülasəsi və onboarding cavabları cihazda qalır. Tətbiqi silsən, onlar da gedir. Serverdən bərpa edə bilmərik.</p>
        <h2>13. Əqli mülkiyyət</h2>
        <p>Steady adı, interfeys, paketlənmiş səs və yazılı məşqlər şəxsi istifadə üçün lisenziyalaşdırılır, satılmır. Apple, App Store, RevenueCat nişanları sahiblərinindir.</p>
        <h2>14. Əlçatanlıq</h2>
        <p>Xüsusiyyətləri dəyişə, dayandıra və ya silə bilərik. Mağaza, qiymət və vergi Apple-dan və storefront-dan asılıdır. Bəzi dillərdə səs klipləri var; klip yoxdursa melodiya qalır.</p>
        <h2>15. Zəmanətin rəddi</h2>
        <p>Qanunun icazə verdiyi maksimum dərəcədə Steady “olduğu kimi” və “mövcud olduğu kimi”, hər cür zəmanətsiz təqdim olunur. Panik dalğasının keçəcəyini, təcili nömrənin ehtiyacın olan nömrə olduğunu və ya tətbiqin fasiləsiz olacağını zəmanət etmirik. Ölkəndə imtina edilə bilməyən istehlakçı hüquqları qüvvədə qalır.</p>
        <h2>16. Məsuliyyətin məhdudlaşdırılması</h2>
        <p>Qanunun icazə verdiyi maksimum dərəcədə tərtibatçı dolayı, təsadüfi, xüsusi, nəticə və ya cəza xarakterli zərərlərə, itmiş məlumata, panik nəticələrinə, buraxılmış təcili zənglərə və ya Apple-ın apardığı hesab mübahisələrinə görə məsuliyyət daşımır. Tətbiqdən irəli gələn tələblərdə ümumi məsuliyyət, tələbdən əvvəlki 12 ayda Apple vasitəsilə Steady Pro üçün ödədiyin məbləğ və ya istehlakçı hüququnun tələb etdiyi daha yüksək minimumla məhdudlaşır. Ehtiyatsızlığın səbəb olduğu ölüm və ya bədən xəsarəti üçün belə istisnanın qadağan olduğu yerdə məsuliyyət çıxarılmır.</p>
        <h2>17. Xitam</h2>
        <p>İstədiyin vaxt istifadını dayandıra bilərsən. Apple abunəliklərini ayrıca ləğv et. Şərtləri əhəmiyyətli pozsan, lisenziyanı bitirə bilərik. Təbiətinə görə qalan maddələr (3, 15, 16 və Apple hesablaşması daxil) xitamdan sonra da qalır.</p>
        <h2>18. Tətbiq olunan hüquq</h2>
        <p>Qadağan olunmadığı halda bu Şərtlər, kolliziya qaydaları olmadan Azərbaycan Respublikasının qanunlarına tabedir. Yaşadığın ölkənin məcburi istehlakçı hüquqları (AEA və Birləşmiş Krallıq daxil) qüvvədədir. Apple tutmalarına dair mübahisə səninlə Apple arasındadır.</p>
        <h2>19. Dəyişikliklər</h2>
        <p>Bu Şərtləri yeniləyə bilərik. “Son yeniləmə” tarixi dəyişər. İcazə verilən yerdə yeniləmədən sonra istifadəni davam etdirmək qəbul sayılır. Abunəlik qiymət dəyişiklikləri Apple qaydalarına və tətbiq daxili bildiriş tələblərinə uyğundur.</p>
        <h2>20. Əlaqə</h2>
        <p>Tətbiq e-poçt toplamır. Steady → Ayarlar → Kömək-dən dəstək identifikatorunu köçür. Tərtibatçıya App Store elanı və ya dərc etdiyi kanalla çatsan, bu identifikatoru yaz. Əlaqəli: <a href="./privacy.html?lang=az">Məxfilik</a> · <a href="{APPLE_EULA}">Apple Standart EULA</a>.</p>
"""

TERMS["ru"] = f"""
        <div class="note"><strong>Правило проверки App Store 3.1.2.</strong> Платёж списывается со счёта Apple ID в момент подтверждения покупки. Подписка автоматически продлевается, если её не отменить минимум за 24 часа до конца текущего периода. Плата за продление списывается в течение 24 часов до конца текущего периода. Управлять подписками и отменять их можно в настройках учётной записи App Store после покупки (Настройки iPhone → [ваше имя] → Подписки или <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>). Неиспользованная часть бесплатного пробного периода, если он предлагается, сгорает при покупке подписки.</div>
        <p>Настоящие Условия использования — пользовательская лицензия конечного пользователя для Steady. Они действуют вместе с Лицензионным соглашением Apple на лицензируемое приложение. При конфликте о порядке использования лицензируемого приложения на платформах Apple действует Стандартное EULA Apple: <a href="{APPLE_EULA}">{APPLE_EULA}</a>. Покупки в приложении выставляет Apple по своим правилам.</p>
        <h2>1. Принятие</h2>
        <p>Скачивая, устанавливая или используя Steady, вы соглашаетесь с этими Условиями и с <a href="./privacy.html?lang=ru">Политикой конфиденциальности</a>. Если не согласны — не используйте приложение.</p>
        <h2>2. Кто мы</h2>
        <p>Steady публикует Javid Alishov (индивидуальный разработчик). ID пакета iOS: <code>app.steady.calm</code>. Имя в App Store: Steady (Panic &amp; Calm). Steady не клиника, не больница, не лицензированный медик и не служба экстренной помощи.</p>
        <h2>3. Это не медицинская помощь (важно)</h2>
        <p>Steady предлагает инструменты совладания: дыхание, звук, фразы в настоящем времени, истории, письменные задания и похожие упражнения. Приложение не ставит диагноз, не лечит, не излечивает и не предотвращает заболевания. Оно не заменяет врача, терапевта, лекарства и неотложную помощь. В кризисе звоните по местному номеру экстренных служб. Чип кризиса в приложении — ярлык по региону устройства; он не гарантирует нужный вам номер и не совершает звонок за вас.</p>
        <h2>4. Допуск</h2>
        <p>Вам должно быть не менее 13 лет или минимального возраста, требуемого в вашей стране для приложений App Store (что выше). Если вы не совершеннолетние, родитель или опекун должен принять Условия от вашего имени. Пользуйтесь приложением только с Apple ID, которым вам разрешено пользоваться.</p>
        <h2>5. Лицензия</h2>
        <p>Вам предоставляется личная, ограниченная, неисключительная, непередаваемая, отзывная лицензия на использование Steady на устройствах, которыми вы владеете или управляете, в пределах Стандартного EULA Apple. Запрещены реверс-инжиниринг, перепродажа, выгрузка контента как конкурирующего сервиса и использование приложения как медицинского продукта для клинической помощи другим.</p>
        <h2>6. Бесплатный слой и Pro</h2>
        <p>SOS всегда бесплатен и не блокируется. После окончания пробного периода на устройстве остаётся тонкий бесплатный слой: 174 Гц на 3 минуты, одна история, одно письмо, одно дыхание, день 1 паники, одна ясность дня, 5-4-3-2-1, первая сессия медитации, 5 минут дождя или пианино. Прослушивание на 15 минут и дольше — Pro. Pro открывает остальные сессии и длинное прослушивание, описанные на экране оплаты. Список функций может меняться; описание покупки — экран оплаты текущей версии.</p>
        <h2>7. Автопродлеваемые подписки (название, срок, цена)</h2>
        <p>Платный доступ — автопродлеваемая покупка Apple In-App Purchase в группе подписок <strong>Steady Pro</strong>. Одновременно активен один из этих продуктов; смена плана следует правилам Apple для повышения/понижения в этой группе.</p>
        {table(COL["ru"], PRODUCT_ROWS["ru"])}
        <p>Цена в приложении — цена App Store для страны или региона вашего Apple ID (storefront), включая налоги, которые показывает Apple. <strong>Цена не зависит от языка интерфейса.</strong> Если магазин недоступен, могут показаться справочные цены в USD. Фактически списывается локализованная цена Apple на момент подтверждения, а не цифра, привязанная к языку.</p>
        <h2>8. Как проходит оплата</h2>
        <ul>
          <li>Платёж списывается с Apple ID при подтверждении покупки.</li>
          <li>Подписка продлевается автоматически, если не отменить минимум за 24 часа до конца периода.</li>
          <li>Плата за продление списывается в течение 24 часов до конца периода по текущей цене App Store на этот продукт.</li>
          <li>Управление/отмена: Настройки iPhone → Apple ID → Подписки или <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>. Удаление приложения подписку не отменяет.</li>
          <li>Возвраты, если они есть, делает Apple: <a href="{APPLE_REFUND}">{APPLE_REFUND}</a> или История покупок Apple ID. Мы сами не возвращаем списание App Store.</li>
        </ul>
        <h2>9. 3-дневная проба на устройстве (не Introductory Offer Apple)</h2>
        <p>После онбординга может начаться <strong>3-дневная проба на устройстве</strong>. Таймер на телефоне. Это <strong>не</strong> Introductory Offer Apple. В App Store Connect вступительное предложение оставлено пустым; StoreKit не списывает плату за пробу. Проба на устройстве не выставляет счёт Apple ID. Когда она кончается, остаётся бесплатный слой выше; для Pro нужна подписка. Если бы Apple предлагала бесплатную пробу через StoreKit, неиспользованное время сгорало бы при покупке, как в рамке сверху. Покупка подписки не превращает неиспользованные дни пробы на устройстве в денежный возврат (за эти дни Apple ничего не списывала).</p>
        <h2>10. Восстановление покупок</h2>
        <p>Кнопка «Восстановить» на экране оплаты снова применяет активную подписку Apple к этому устройству. Нужен тот же Apple ID, с которого покупали. Семейный доступ действует, только если Apple и App Store Connect включили Family Sharing для этих продуктов; иначе Pro привязан к покупающему Apple ID.</p>
        <h2>11. Допустимое использование</h2>
        <p>Не злоупотребляйте приложением, не пытайтесь обойти проверки покупок и не подменяйте вызов экстренных служб кризисными инструментами, когда вам нужна помощь.</p>
        <h2>12. Ваш контент на этом телефоне</h2>
        <p>Заметки, хеш PIN и ответы онбординга остаются на устройстве. Если удалить приложение, они исчезнут. Восстановить их с сервера мы не можем.</p>
        <h2>13. Интеллектуальная собственность</h2>
        <p>Имя Steady, интерфейс, встроенное аудио и письменные упражнения лицензируются для личного использования, а не продаются. Знаки Apple, App Store, RevenueCat принадлежат их владельцам.</p>
        <h2>14. Доступность</h2>
        <p>Мы можем менять, приостанавливать или прекращать функции. Наличие в магазине, цены и налоги зависят от Apple и storefront. Голосовые клипы есть не для всех языков; если клипа нет, остаётся мелодия.</p>
        <h2>15. Отказ от гарантий</h2>
        <p>В максимальной степени, дозволенной законом, Steady предоставляется «как есть» и «по мере доступности», без каких-либо гарантий. Мы не гарантируем, что волна паники пройдёт, что экстренный номер вам подойдёт, или что приложение будет работать без сбоев. Неотчуждаемые права потребителя в вашей стране сохраняются.</p>
        <h2>16. Ограничение ответственности</h2>
        <p>В максимальной степени, дозволенной законом, разработчик не отвечает за косвенные, случайные, специальные, последующие или штрафные убытки, утрату данных, исходы паники, пропущенные экстренные звонки и споры по счетам, которые ведёт Apple. Совокупная ответственность по требованиям из приложения ограничена суммой, уплаченной за Steady Pro через Apple за 12 месяцев до требования, либо более высоким минимумом, который требует закон о защите потребителей. Ответственность за смерть или вред здоровью из-за неосторожности не исключается там, где такой отказ запрещён.</p>
        <h2>17. Прекращение</h2>
        <p>Вы можете перестать пользоваться приложением в любой момент. Подписки Apple отменяйте отдельно. При существенном нарушении Условий мы можем прекратить лицензию. Положения, которые по смыслу должны сохраняться (включая 3, 15, 16 и биллинг Apple), остаются в силе.</p>
        <h2>18. Применимое право</h2>
        <p>Если это не запрещено, настоящие Условия регулируются правом Азербайджанской Республики без коллизионных норм. Обязательные права потребителя в стране проживания (включая ЕЭЗ и Великобританию) сохраняются. Споры о списаниях Apple — между вами и Apple.</p>
        <h2>19. Изменения</h2>
        <p>Мы можем обновить Условия. Дата «Последнее обновление» изменится. Продолжение использования после обновления, где это допускается, означает согласие. Изменение цены подписки следует правилам Apple и требованиям уведомления в приложении.</p>
        <h2>20. Контакт</h2>
        <p>Приложение не собирает эл. почту. Откройте Steady → Настройки → Помощь и скопируйте идентификатор поддержки. Укажите его, если свяжетесь с разработчиком через карточку App Store или другой опубликованный канал. См. также <a href="./privacy.html?lang=ru">Конфиденциальность</a> · <a href="{APPLE_EULA}">Стандартное EULA Apple</a>.</p>
"""

TERMS["es"] = f"""
        <div class="note"><strong>Directriz de revisión de App Store 3.1.2.</strong> El pago se cargará a tu cuenta de Apple ID al confirmar la compra. La suscripción se renueva automáticamente salvo que se cancele al menos 24 horas antes del final del periodo en curso. Se cargará la renovación en tu cuenta en las 24 horas anteriores al final del periodo. Puedes gestionar y cancelar las suscripciones en los ajustes de cuenta de App Store tras la compra (Ajustes del iPhone → [tu nombre] → Suscripciones, o <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>). Si se ofrece un periodo de prueba gratuito, la parte no usada se pierde al comprar una suscripción.</div>
        <p>Estos Términos de uso son una licencia de usuario final propia de Steady. Se aplican junto con el Acuerdo de licencia de usuario final de la aplicación licenciada de Apple. Si hay conflicto sobre el uso de la aplicación licenciada en plataformas Apple, prevalece el EULA estándar de Apple: <a href="{APPLE_EULA}">{APPLE_EULA}</a>. Las compras dentro de la app las factura Apple según sus condiciones.</p>
        <h2>1. Aceptación</h2>
        <p>Al descargar, instalar o usar Steady aceptas estos Términos y la <a href="./privacy.html?lang=es">Política de privacidad</a>. Si no estás de acuerdo, no uses la app.</p>
        <h2>2. Quiénes somos</h2>
        <p>Steady lo publica Javid Alishov (desarrollador individual). ID del paquete iOS: <code>app.steady.calm</code>. Nombre en App Store: Steady (Panic &amp; Calm). Steady no es una clínica, un hospital, un prestador sanitario colegiado ni un servicio de emergencias.</p>
        <h2>3. No es atención médica (importante)</h2>
        <p>Steady ofrece herramientas de afrontamiento: respiración, sonido, frases en presente, relatos, escritura y ejercicios similares. No diagnostica, trata, cura ni previene enfermedades. No sustituye a un clínico, terapeuta, medicación ni urgencias. En crisis, llama al número de emergencia local. El chip de crisis es un atajo según la región del dispositivo; no garantiza el número adecuado a tu situación ni realiza la llamada por ti.</p>
        <h2>4. Elegibilidad</h2>
        <p>Debes tener al menos 13 años o la edad mínima exigida en tu país para apps de App Store, la que sea mayor. Si eres menor de edad, un progenitor o tutor debe aceptar estos Términos en tu nombre. Usa la app solo con un Apple ID que estés autorizado a usar.</p>
        <h2>5. Licencia</h2>
        <p>Te concedemos una licencia personal, limitada, no exclusiva, intransferible y revocable para usar Steady en dispositivos que poseas o controles, según el EULA estándar de Apple. No se permite la ingeniería inversa, la reventa, extraer el contenido como servicio competidor ni usar la app como producto sanitario para atender a terceros.</p>
        <h2>6. Capa gratuita y Pro</h2>
        <p>El SOS es siempre gratuito y no se bloquea. Tras la prueba en el dispositivo queda una capa gratuita reducida: 174 Hz 3 minutos, un relato, una escritura, una respiración, pánico día 1, la claridad de hoy, 5-4-3-2-1, la primera sesión de meditación y 5 minutos de lluvia o piano. Escuchar 15 minutos o más es Pro. Pro desbloquea el resto de sesiones y la escucha larga descritas en la pantalla de pago. La lista de funciones puede cambiar; la descripción de lo que compras es la pantalla de pago de la versión actual.</p>
        <h2>7. Suscripciones de renovación automática (título, duración, precio)</h2>
        <p>El acceso de pago es una compra dentro de la app de Apple de renovación automática en el grupo <strong>Steady Pro</strong>. Solo uno de estos productos está activo a la vez; el cambio de plan sigue las reglas de Apple de subida y bajada de ese grupo.</p>
        {table(COL["es"], PRODUCT_ROWS["es"])}
        <p>El precio mostrado en la app es el de App Store para el país o región de tu Apple ID (storefront), con los impuestos que Apple muestre. <strong>El precio no sigue el idioma de la app.</strong> Si la tienda no responde, pueden verse los precios de referencia en USD. El importe cobrado es siempre el precio localizado de Apple en el momento de la confirmación, no una cifra fijada a un idioma.</p>
        <h2>8. Cómo funciona la facturación</h2>
        <ul>
          <li>El pago se carga a tu Apple ID al confirmar la compra.</li>
          <li>La suscripción se renueva automáticamente salvo que canceles al menos 24 horas antes del final del periodo.</li>
          <li>La renovación se carga en las 24 horas anteriores al final del periodo, al precio de App Store vigente de ese producto.</li>
          <li>Gestiona o cancela en Ajustes del iPhone → Apple ID → Suscripciones o en <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>. Borrar la app no cancela la suscripción.</li>
          <li>Los reembolsos, si los hay, los gestiona Apple: <a href="{APPLE_REFUND}">{APPLE_REFUND}</a> o Historial de compras del Apple ID. Nosotros no podemos devolver un cargo de App Store.</li>
        </ul>
        <h2>9. Prueba de 3 días en el dispositivo (no es Introductory Offer de Apple)</h2>
        <p>Tras el onboarding puede empezar una <strong>prueba de 3 días en el dispositivo</strong>. El temporizador está en el teléfono. <strong>No</strong> es una Introductory Offer de Apple. En App Store Connect la oferta introductoria se deja vacía; StoreKit no cobra un periodo de prueba. La prueba en el dispositivo no factura tu Apple ID. Al terminar, permanece la capa gratuita anterior; Pro exige una suscripción. Si Apple ofreciera una prueba gratuita por StoreKit, el tiempo no usado se perdería al comprar, como indica el recuadro. Comprar una suscripción no convierte los días de prueba en el dispositivo no usados en un reembolso en efectivo (Apple no cobró esos días).</p>
        <h2>10. Restaurar compras</h2>
        <p>Restaurar en la pantalla de pago vuelve a aplicar una suscripción Apple activa a este dispositivo. Hace falta el mismo Apple ID que compró. En familia solo aplica si Apple y App Store Connect tienen En familia activado para estos productos; si no, Pro queda ligado al Apple ID comprador.</p>
        <h2>11. Uso aceptable</h2>
        <p>No uses mal la app, no intentes eludir los controles de compra ni sustituyas llamar a emergencias por las herramientas de crisis cuando las necesites.</p>
        <h2>12. Tu contenido en este teléfono</h2>
        <p>Notas, hash del PIN y respuestas del onboarding quedan en el dispositivo. Si eliminas la app, desaparecen. No podemos restaurarlas desde un servidor.</p>
        <h2>13. Propiedad intelectual</h2>
        <p>El nombre Steady, la interfaz, el audio incluido y los ejercicios escritos se licencian para uso personal, no se venden. Las marcas Apple, App Store y RevenueCat pertenecen a sus titulares.</p>
        <h2>14. Disponibilidad</h2>
        <p>Podemos cambiar, suspender o retirar funciones. La disponibilidad en la tienda, precios e impuestos dependen de Apple y del storefront. Hay clips de voz en algunos idiomas; si falta un clip, permanece la melodía.</p>
        <h2>15. Exclusión de garantías</h2>
        <p>En la máxima medida permitida por la ley, Steady se ofrece «tal cual» y «según disponibilidad», sin garantías de ningún tipo. No garantizamos que pase una oleada de pánico, que el número de emergencia sea el que necesitas, ni que la app sea ininterrumpida o sin errores. Los derechos de consumo irrenunciables de tu país siguen vigentes.</p>
        <h2>16. Limitación de responsabilidad</h2>
        <p>En la máxima medida permitida por la ley, el desarrollador no responde de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de datos perdidos, desenlaces de pánico, llamadas de emergencia no hechas o disputas de facturación que gestiona Apple. La responsabilidad total por reclamaciones derivadas de la app se limita a lo que pagaste por Steady Pro a través de Apple en los 12 meses anteriores a la reclamación, o al mínimo superior que exija tu ley de consumo. No se excluye la responsabilidad por muerte o lesiones personales por negligencia donde esa exclusión esté prohibida.</p>
        <h2>17. Terminación</h2>
        <p>Puedes dejar de usar la app en cualquier momento. Cancela las suscripciones de Apple por separado. Podemos terminar la licencia si incumples de forma sustancial estos Términos. Las cláusulas que por naturaleza deban sobrevivir (incluidas 3, 15, 16 y la facturación de Apple) siguen vigentes.</p>
        <h2>18. Ley aplicable</h2>
        <p>Salvo prohibición, estos Términos se rigen por las leyes de la República de Azerbaiyán, sin normas de conflicto. Los derechos de consumo obligatorios de tu país de residencia (incluido el EEE y el Reino Unido) siguen aplicándose. Las disputas sobre cargos de Apple son entre tú y Apple.</p>
        <h2>19. Cambios</h2>
        <p>Podemos actualizar estos Términos. Cambiará la fecha de «Última actualización». Seguir usando la app tras una actualización, donde esté permitido, implica aceptación. Los cambios de precio de suscripción siguen las reglas de Apple y los avisos en la app.</p>
        <h2>20. Contacto</h2>
        <p>La app no recoge correo. Abre Steady → Ajustes → Ayuda y copia el identificador de soporte. Cítalo si contactas al desarrollador por la ficha de App Store u otro canal publicado. Relacionado: <a href="./privacy.html?lang=es">Privacidad</a> · <a href="{APPLE_EULA}">EULA estándar de Apple</a>.</p>
"""

TERMS["it"] = f"""
        <div class="note"><strong>Linea guida App Store Review 3.1.2.</strong> Il pagamento verrà addebitato sull’account Apple ID alla conferma dell’acquisto. L’abbonamento si rinnova automaticamente salvo disdetta almeno 24 ore prima della fine del periodo in corso. L’addebito del rinnovo avviene nelle 24 ore precedenti la fine del periodo. Puoi gestire e annullare gli abbonamenti nelle impostazioni dell’account App Store dopo l’acquisto (Impostazioni iPhone → [il tuo nome] → Abbonamenti, oppure <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>). L’eventuale porzione non usata di un periodo di prova gratuito, se offerto, decade con l’acquisto di un abbonamento.</div>
        <p>I presenti Termini d’uso sono una licenza per l’utente finale personalizzata per Steady. Si applicano insieme al Licensed Application End User License Agreement di Apple. In caso di conflitto sull’uso dell’applicazione licenziata sulle piattaforme Apple, prevale l’EULA standard Apple: <a href="{APPLE_EULA}">{APPLE_EULA}</a>. Gli acquisti in-app sono fatturati da Apple secondo i propri termini.</p>
        <h2>1. Accettazione</h2>
        <p>Scaricando, installando o usando Steady accetti questi Termini e l’<a href="./privacy.html?lang=it">Informativa sulla privacy</a>. Se non sei d’accordo, non usare l’app.</p>
        <h2>2. Chi siamo</h2>
        <p>Steady è pubblicata da Javid Alishov (sviluppatore individuale). ID bundle iOS: <code>app.steady.calm</code>. Nome su App Store: Steady (Panic &amp; Calm). Steady non è una clinica, un ospedale, un prestatore sanitario abilitato né un servizio di emergenza.</p>
        <h2>3. Non è assistenza medica (importante)</h2>
        <p>Steady offre strumenti di fronteggiamento: respiro, suono, frasi al presente, storie, scrittura ed esercizi simili. Non diagnostica, cura, guarisce né previene malattie. Non sostituisce un clinico, un terapeuta, un farmaco o il pronto soccorso. In crisi chiama il numero di emergenza locale. Il chip crisi in-app è una scorciatoia in base alla regione del dispositivo; non garantisce il numero adatto alla tua situazione e non effettua la chiamata al posto tuo.</p>
        <h2>4. Idoneità</h2>
        <p>Devi avere almeno 13 anni o l’età minima richiesta nel tuo Paese per le app App Store, se superiore. Se non sei maggiorenne, un genitore o tutore deve accettare questi Termini per tuo conto. Usa l’app solo con un Apple ID che sei autorizzato a usare.</p>
        <h2>5. Licenza</h2>
        <p>Ti concediamo una licenza personale, limitata, non esclusiva, non trasferibile e revocabile per usare Steady sui dispositivi che possiedi o controlli, nei limiti dell’EULA standard Apple. Vietati reverse engineering, rivendita, estrazione dei contenuti come servizio concorrente e uso dell’app come prodotto medico per assistere terzi.</p>
        <h2>6. Livello gratuito e Pro</h2>
        <p>SOS è sempre gratuito e non si blocca. Dopo la prova sul dispositivo resta un livello gratuito sottile: 174 Hz per 3 minuti, una storia, una scrittura, un respiro, panico giorno 1, la chiarezza di oggi, 5-4-3-2-1, la prima sessione di meditazione e 5 minuti di pioggia o pianoforte. L’ascolto di 15 minuti o più è Pro. Pro sblocca le altre sessioni e l’ascolto lungo descritti nella schermata di pagamento. L’elenco delle funzioni può cambiare; la descrizione di ciò che acquisti è la schermata di pagamento della versione attuale.</p>
        <h2>7. Abbonamenti a rinnovo automatico (titolo, durata, prezzo)</h2>
        <p>L’accesso a pagamento è un In-App Purchase Apple a rinnovo automatico nel gruppo <strong>Steady Pro</strong>. È attivo un solo prodotto alla volta; il cambio piano segue le regole Apple di upgrade/downgrade di quel gruppo.</p>
        {table(COL["it"], PRODUCT_ROWS["it"])}
        <p>Il prezzo mostrato nell’app è il prezzo App Store per il Paese o la regione del tuo Apple ID (storefront), incluse le tasse che Apple mostra. <strong>Il prezzo non segue la lingua dell’app.</strong> Se lo store non è raggiungibile, possono comparire i prezzi di riferimento in USD. L’importo addebitato è sempre il prezzo localizzato Apple al momento della conferma, non una cifra legata a una lingua.</p>
        <h2>8. Come funziona la fatturazione</h2>
        <ul>
          <li>Il pagamento è addebitato all’Apple ID alla conferma dell’acquisto.</li>
          <li>L’abbonamento si rinnova automaticamente se non lo disdici almeno 24 ore prima della fine del periodo.</li>
          <li>Il rinnovo è addebitato nelle 24 ore precedenti la fine del periodo, al prezzo App Store allora vigente per quel prodotto.</li>
          <li>Gestisci o annulla in Impostazioni iPhone → Apple ID → Abbonamenti oppure su <a href="{APPLE_SUBS}">{APPLE_SUBS}</a>. Eliminare l’app non annulla l’abbonamento.</li>
          <li>I rimborsi, se previsti, li gestisce Apple: <a href="{APPLE_REFUND}">{APPLE_REFUND}</a> o Cronologia acquisti dell’Apple ID. Non possiamo rimborsare noi un addebito App Store.</li>
        </ul>
        <h2>9. Prova di 3 giorni sul dispositivo (non è Introductory Offer Apple)</h2>
        <p>Dopo l’onboarding può partire una <strong>prova di 3 giorni sul dispositivo</strong>. Il timer è sul telefono. <strong>Non</strong> è un Introductory Offer Apple. In App Store Connect l’offerta introduttiva resta vuota; StoreKit non addebita una prova. La prova sul dispositivo non fattura l’Apple ID. Al termine resta il livello gratuito sopra; per Pro serve un abbonamento. Se Apple offrisse una prova gratuita via StoreKit, il tempo non usato decadrebbe all’acquisto, come nel riquadro. Acquistare un abbonamento non converte i giorni di prova sul dispositivo non usati in un rimborso in denaro (Apple non ha addebitato quei giorni).</p>
        <h2>10. Ripristina acquisti</h2>
        <p>Ripristina nella schermata di pagamento riapplica un abbonamento Apple attivo a questo dispositivo. Serve lo stesso Apple ID che ha acquistato. In famiglia vale solo se Apple e App Store Connect hanno attivato In famiglia per questi prodotti; altrimenti Pro è legato all’Apple ID acquirente.</p>
        <h2>11. Uso consentito</h2>
        <p>Non abusare dell’app, non tentare di aggirare i controlli di acquisto e non sostituire la chiamata ai soccorsi con gli strumenti di crisi quando ne hai bisogno.</p>
        <h2>12. I tuoi contenuti su questo telefono</h2>
        <p>Note, hash del PIN e risposte dell’onboarding restano sul dispositivo. Se elimini l’app, spariscono. Non possiamo ripristinarli da un server.</p>
        <h2>13. Proprietà intellettuale</h2>
        <p>Il nome Steady, l’interfaccia, l’audio in bundle e gli esercizi scritti sono concessi in licenza per uso personale, non venduti. I marchi Apple, App Store e RevenueCat appartengono ai rispettivi titolari.</p>
        <h2>14. Disponibilità</h2>
        <p>Possiamo modificare, sospendere o interrompere funzioni. Disponibilità nello store, prezzi e tasse dipendono da Apple e dallo storefront. Ci sono clip vocali per alcune lingue; se manca una clip resta la melodia.</p>
        <h2>15. Esclusione di garanzie</h2>
        <p>Nella misura massima consentita dalla legge, Steady è fornita «così com’è» e «secondo disponibilità», senza garanzie di alcun tipo. Non garantiamo che un’ondata di panico passi, che il numero di emergenza sia quello che ti serve, o che l’app sia ininterrotta o priva di errori. I diritti del consumatore inderogabili nel tuo Paese restano in vigore.</p>
        <h2>16. Limitazione di responsabilità</h2>
        <p>Nella misura massima consentita dalla legge, lo sviluppatore non è responsabile per danni indiretti, incidentali, speciali, consequenziali o punitivi, né per dati persi, esiti di panico, chiamate di emergenza mancate o controversie di fatturazione gestite da Apple. La responsabilità complessiva per pretese derivanti dall’app è limitata a quanto hai pagato per Steady Pro tramite Apple nei 12 mesi precedenti la pretesa, o al minimo superiore richiesto dalla tua legge consumeristica. Non si esclude la responsabilità per morte o lesioni personali da negligenza ove tale esclusione sia vietata.</p>
        <h2>17. Recesso</h2>
        <p>Puoi smettere di usare l’app in qualsiasi momento. Annulla gli abbonamenti Apple separatamente. Possiamo revocare la licenza in caso di violazione sostanziale. Le clausole che per natura devono sopravvivere (incluse 3, 15, 16 e la fatturazione Apple) restano efficaci.</p>
        <h2>18. Legge applicabile</h2>
        <p>Salvo divieto, i presenti Termini sono regolati dalle leggi della Repubblica dell’Azerbaigian, senza norme di conflitto. Restano i diritti inderogabili del consumatore nel Paese di residenza (SEE e Regno Unito inclusi). Le controversie sugli addebiti Apple sono tra te e Apple.</p>
        <h2>19. Modifiche</h2>
        <p>Possiamo aggiornare questi Termini. Cambierà la data di «Ultimo aggiornamento». L’uso continuato dopo un aggiornamento, ove consentito, vale come accettazione. Le variazioni di prezzo dell’abbonamento seguono le regole Apple e gli avvisi in-app.</p>
        <h2>20. Contatti</h2>
        <p>L’app non raccoglie e-mail. Apri Steady → Impostazioni → Aiuto e copia l’identificatore di supporto. Citalo se contatti lo sviluppatore tramite la scheda App Store o un altro canale pubblicato. Correlato: <a href="./privacy.html?lang=it">Privacy</a> · <a href="{APPLE_EULA}">EULA standard Apple</a>.</p>
"""

META = {
    "privacy": {
        "tr": ("Gizlilik politikası", "Gizlilik politikası", f"Son güncelleme: {DATE['tr']}. Geliştirici: Javid Alishov. Uygulama: Steady (paket kimliği app.steady.calm)."),
        "en": ("Privacy Policy", "Privacy Policy", f"Last updated: {DATE['en']}. Developer: Javid Alishov. App: Steady (bundle ID app.steady.calm)."),
        "az": ("Məxfilik siyasəti", "Məxfilik siyasəti", f"Son yeniləmə: {DATE['az']}. Tərtibatçı: Javid Alishov. Tətbiq: Steady (paket identifikatoru app.steady.calm)."),
        "ru": ("Политика конфиденциальности", "Политика конфиденциальности", f"Последнее обновление: {DATE['ru']}. Разработчик: Javid Alishov. Приложение: Steady (ID пакета app.steady.calm)."),
        "es": ("Política de privacidad", "Política de privacidad", f"Última actualización: {DATE['es']}. Desarrollador: Javid Alishov. App: Steady (ID del paquete app.steady.calm)."),
        "it": ("Informativa sulla privacy", "Informativa sulla privacy", f"Ultimo aggiornamento: {DATE['it']}. Sviluppatore: Javid Alishov. App: Steady (ID bundle app.steady.calm)."),
    },
    "terms": {
        "tr": ("Kullanım koşulları", "Kullanım koşulları", f"Son güncelleme: {DATE['tr']}. Geliştirici: Javid Alishov. Uygulama: Steady (paket kimliği app.steady.calm)."),
        "en": ("Terms of Use", "Terms of Use", f"Last updated: {DATE['en']}. Developer: Javid Alishov. App: Steady (bundle ID app.steady.calm)."),
        "az": ("İstifadə şərtləri", "İstifadə şərtləri", f"Son yeniləmə: {DATE['az']}. Tərtibatçı: Javid Alishov. Tətbiq: Steady (paket identifikatoru app.steady.calm)."),
        "ru": ("Условия использования", "Условия использования", f"Последнее обновление: {DATE['ru']}. Разработчик: Javid Alishov. Приложение: Steady (ID пакета app.steady.calm)."),
        "es": ("Términos de uso", "Términos de uso", f"Última actualización: {DATE['es']}. Desarrollador: Javid Alishov. App: Steady (ID del paquete app.steady.calm)."),
        "it": ("Termini d’uso", "Termini d’uso", f"Ultimo aggiornamento: {DATE['it']}. Sviluppatore: Javid Alishov. App: Steady (ID bundle app.steady.calm)."),
    },
}

FOOT = {
    "tr": "Steady · app.steady.calm · Bu metin App Store yönergeleri 3.1.2 ve 5.1 için yazıldı.",
    "en": "Steady · app.steady.calm · Written for App Store Review Guidelines 3.1.2 and 5.1.",
    "az": "Steady · app.steady.calm · App Store icmal qaydaları 3.1.2 və 5.1 üçün yazılıb.",
    "ru": "Steady · app.steady.calm · Подготовлено для правил проверки App Store 3.1.2 и 5.1.",
    "es": "Steady · app.steady.calm · Redactado para las directrices de revisión 3.1.2 y 5.1 de App Store.",
    "it": "Steady · app.steady.calm · Redatto per le linee guida App Store Review 3.1.2 e 5.1.",
}

LANGS = ["tr", "en", "az", "ru", "es", "it"]


def build(kind: str) -> str:
    src = PRIVACY if kind == "privacy" else TERMS
    titles = {
        "privacy": "Privacy Policy",
        "terms": "Terms of Use",
    }
    articles = []
    for lang in LANGS:
        kicker, h1, meta = META[kind][lang]
        articles.append(pack(lang, kicker, h1, meta, src[lang].rstrip() + "\n", FOOT[lang]))
    return shell(titles[kind], "\n".join(articles))


def emit_ts() -> None:
    import json

    dest = Path(__file__).resolve().parents[1] / "src" / "lib" / "legal-html.ts"

    def blob(kind: str) -> tuple[dict[str, str], dict[str, str], dict[str, str]]:
        src = PRIVACY if kind == "privacy" else TERMS
        titles = {lang: META[kind][lang][1] for lang in LANGS}
        metas = {lang: META[kind][lang][2] for lang in LANGS}
        bodies = {lang: src[lang].strip() for lang in LANGS}
        return titles, metas, bodies

    p_title, p_meta, p_body = blob("privacy")
    t_title, t_meta, t_body = blob("terms")
    dest.write_text(
        "import type { LocaleId } from './locales'\n\n"
        "export const LEGAL_PRIVACY_TITLE: Record<LocaleId, string> = "
        + json.dumps(p_title, ensure_ascii=False, indent=2)
        + "\n\nexport const LEGAL_PRIVACY_META: Record<LocaleId, string> = "
        + json.dumps(p_meta, ensure_ascii=False, indent=2)
        + "\n\nexport const LEGAL_PRIVACY: Record<LocaleId, string> = "
        + json.dumps(p_body, ensure_ascii=False, indent=2)
        + "\n\nexport const LEGAL_TERMS_TITLE: Record<LocaleId, string> = "
        + json.dumps(t_title, ensure_ascii=False, indent=2)
        + "\n\nexport const LEGAL_TERMS_META: Record<LocaleId, string> = "
        + json.dumps(t_meta, ensure_ascii=False, indent=2)
        + "\n\nexport const LEGAL_TERMS: Record<LocaleId, string> = "
        + json.dumps(t_body, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )
    print("wrote", dest)


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "privacy.html").write_text(build("privacy"), encoding="utf-8")
    (ROOT / "terms.html").write_text(build("terms"), encoding="utf-8")
    emit_ts()
    print("wrote", ROOT / "privacy.html", ROOT / "terms.html")


if __name__ == "__main__":
    main()


