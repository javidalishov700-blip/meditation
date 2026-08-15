import type { BreathPattern, LibraryItem } from './types'

export const breaths: (BreathPattern & { subtitle: string; free?: boolean; minutes: number })[] = [
  {
    id: 'wave',
    label: 'Dalga 4-2-6',
    subtitle: 'Uzun veriş. SOS ile aynı iskelet.',
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 0,
    cycles: 8,
    minutes: 4,
    free: true,
    voice: { inhale: 'Nefes al', hold: 'Tut', exhale: 'Ver' },
  },
  {
    id: 'box',
    label: 'Kutu 4-4-4-4',
    subtitle: 'Eşit kenarlar, eşit tempo.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    cycles: 6,
    minutes: 5,
    voice: { inhale: 'Nefes al', hold: 'Tut', exhale: 'Ver', rest: 'Boşluk' },
  },
  {
    id: '478',
    label: '4-7-8',
    subtitle: 'Al, uzun tut, uzun ver.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    cycles: 4,
    minutes: 4,
    voice: { inhale: 'Nefes al', hold: 'Tut', exhale: 'Ver' },
  },
  {
    id: 'sigh',
    label: 'Fizyolojik iç çekiş',
    subtitle: 'Çift burun alış, uzun ağız veriş.',
    inhale: 2,
    hold1: 1,
    exhale: 6,
    hold2: 2,
    cycles: 8,
    minutes: 3,
    voice: { inhale: 'Al, bir daha al', hold: 'Tut', exhale: 'Uzun ver' },
  },
  {
    id: 'equal',
    label: 'Eşit 5-5',
    subtitle: 'Aynı uzunluk, sakin tempo.',
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    cycles: 8,
    minutes: 4,
    voice: { inhale: 'Nefes al', hold: 'Tut', exhale: 'Ver' },
  },
  {
    id: 'count8',
    label: 'Sekize ver',
    subtitle: 'Al 4, ver 8. İniş.',
    inhale: 4,
    hold1: 0,
    exhale: 8,
    hold2: 0,
    cycles: 6,
    minutes: 5,
    voice: { inhale: 'Al', hold: 'Tut', exhale: 'Sekize kadar ver' },
  },
]

export const stories: LibraryItem[] = [
  {
    id: 'lighthouse',
    title: 'Kıyı Feneri',
    subtitle: 'Ege’de bir gece nöbeti',
    minutes: 14,
    free: true,
    sentence: 'Bu kıyıda lamba yanıyor, ben duruyorum.',
    nightSeed: 'Spiral merdiven, ılık cam, durgun deniz.',
    body: `Bu hikâye bir tedavi değildir. Sadece bir kıyı, bir lamba, bir nöbet.

Kayalık bir çıkıntıda, köyden kırk dakika uzak, beyaz badanalı bir fener var. Rüzgâr bugün yok. Deniz, siyah bir kumaş gibi duruyor. Sen fener bekçisisin. İsim önemli değil. Önemli olan basamaklar.

Spiral merdiven taş. Elini duvara koyuyorsun. Duvar serin, tuzlu, tanıdık. Her basamak aynı yükseklikte. On, yirmi, otuz. Saymıyorsun artık; ayaklar biliyor. Yukarıda lamba odası var. Camlar temiz. Fitil değil, modern bir ışık — ama sen yine de eski kelimeleri seviyorsun: kandil, fitil, cam.

Oturuyorsun. Pencereden koy görünüyor. Koyun ağzında hiç kayık yok. Uzakta, çok uzakta, bir tanker ışığı belki. Belki de yıldız. Karıştırmak zorunda değilsin.

Çay demlemiyorsun. Termosta ılık su var. Yudumluyorsun. Su, limon değil, sade. Boğazından iniyor. Göğsün sakin.

Lamba düzenli aralıklarla dönüyor. Sen dönmüyorsun. Sen sabit noktasın. Işık denizi tarıyor, kayalığı tarıyor, sonra yine denizi. Bu tarama bir alarm değil. Bir ritim. Kalbin buna uysun diye zorlamıyorsun. Sadece oturuyorsun.

Aşağıda, merdivenin dibinde, palto asılı. Paltonun cebinde bir taş var. Dün sahilden aldın. Yassı, gri, ortasında ince bir damar. Taşı düşünüyorsun. Taş aşağıda. Sen yukarıdasın. İkisi de gerçek.

Gece ilerliyor. Saat yok. Nöbetin ortasındasın. Dışarıda bir martı yok; martılar uyuyor. Yalnızca ara sıra camın içinde küçük bir damla — sis değil, nefesin. Silmene gerek yok.

Gözlerin ağırlaşıyor. İzin ver. Fener kendi işini bilir. Sen kıyının insanısın. Dalga gelse de, gelmese de, lamba tarar. Sen omuzlarını bırakırsın.

Şimdi zihninde tek bir kare bırak: spiral merdiven, ılık cam, durgun deniz. Film çekme. Kartpostal yeter. Bırak, gece işlesin.

Teşekkür etmene gerek yok ama dilersen suya teşekkür et, taşa teşekkür et, bu durgunluğa teşekkür et. Sonra bırak.`,
  },
  {
    id: 'library',
    title: 'Cam Dağ Kütüphanesi',
    subtitle: 'Yüksek bir vadide sessiz raflar',
    minutes: 16,
    sentence: 'Bu rafta duruyorum, sayfalar sakin.',
    nightSeed: 'Cam dağ, toz motu, kapalı kitap.',
    body: `Yüksek bir vadidesin. Hava ince, soğuk değil. Dağların yüzü cam gibi düz; güneş yok, yine de içeriden bir ışık sızıyor. Vadinin tabanında taş bir yapı var. Tabela yok. Kapı açık.

İçeri giriyorsun. Kütüphane. Raflar tavanı aşıyor. Merdivenler tekerlekli, hiçbiri hareket etmiyor. Toz yok denecek kadar az; yine de bir mot, bir ışık çizgisinde asılı. Motu izliyorsun. Acele etmiyor.

Bir masa. Tek sandalye. Üstünde kapalı bir kitap, kalın, kumaş kaplı. Açmıyorsun. Açmak zorunda değilsin. Kitap orada dursun. Sen ellerini masaya koyuyorsun. Ahşap ılık — nasıl ılık olduğu önemli değil. Isı var.

Uzaktan bir sayfa çevrilme sesi. Kimse görünmüyor. Ses zararlı değil. Belki rüzgâr, belki eski bir alışkanlık. Sen başını kaldırmıyorsun.

Rafta sırtlar: coğrafya, taşlar, rüzgârlar, eski kıyılar. Tıp yok, kehanet yok. Sadece yer isimleri. Bir sırt: “Kuzey koylari.” Elini yaklaşıtırıp çekiyorsun. Kitabı yerinden oynatmıyorsun.

Oturuyorsun. Ayakların yerde. Kütüphanenin taşı seni taşıyor. Dışarıda cam dağ aynı. İçeride sen aynı.

Gözlerin bir satır hayal ederse, satır şudur: “Su yavaştı.” Başka cümle yok. Kitabı açmadan bu yeter.

Merdivenlerin birinden aşağı, zemin kata, taş bir çeşme var. Su ince akıyor. Avucunu tutmuyorsun. Sadece sesi dinliyorsun. İnce su, taş yalak, damla.

Yukarı çıkıyorsun yine — aslında hiç inmedin. Zihin indirdi. Sen masadasın. Kitap kapalı. Mot hâlâ çizgide.

Gece tohumu: cam dağ, toz motu, kapalı kitap. Bırak. Şükran: bu sessizlik için. Sonra bırakış: rafları saymayacaksın.`,
  },
  {
    id: 'wagon',
    title: 'Sessiz Vagon',
    subtitle: 'Gece treni, durak yok',
    minutes: 15,
    sentence: 'Bu vagonda oturuyorum, raylar düzenli.',
    nightSeed: 'Koyu vagon, pencere buğusu, düzenli tıkırtı.',
    body: `Gece treni. Bilet yok elinde, yine de yerin belli: pencere kenarı, orta vagon, kimse yok. Aydınlatma sarı ve düşük. Bagaj rafında bir palto. Senin olup olmadığı önemli değil.

Tren hareket ediyor. Tıkırtı düzenli. Alarm değil, makine. Pencerede karanlık ovayı görüyorsun. Ara sıra bir ışık: uzak bir ev, belki bir tarla lambası. İsimlendirmene gerek yok.

Ayaklarını yere koyuyorsun. Taban, titreşim. Titreşim seni götürmüyor; seni koltukta tutuyor. Ellerin dizlerinde.

Koridor boş. Kapıların arasında lastik bir eşik. Kimse geçmiyor. Kondüktör yok bu sahnede. Kontrol yok. Sen yolcusun, denetçi değil.

Pencerede buğu. Parmak ucunla küçük bir daire çiziyorsun, sonra bırakıyorsun. Daire kaybolsun. Dünya yine karanlık ova.

Çay yok, simit yok. Sadece düzenli tıkırtı. Nefesin buna uymasın diye uğraşma. Uyursa uyar, uymazsa tıkırtı yine de devam eder.

Bir tünel. Kulaklarda basınç, kısa. Çıkış. Yine ova. Tünel bir yok oluş değildi. Bir geçişti. Sen hâlâ koltuktasın.

Gözlerin kapanabilir. Tren senin yerine nöbet tutar. Raylar bilir. Vagon bilir. Sen omuzlarını indirirsin.

Gece tohumu: koyu vagon, pencere buğusu, düzenli tıkırtı. Şükran: bu ritim için. Bırakış: varacağın yeri planlamıyorsun.`,
  },
  {
    id: 'meadow',
    title: 'Yıldız Çayırı',
    subtitle: 'Yüksek yayla, ateş yok, gökyüzü var',
    minutes: 15,
    sentence: 'Bu çayırda sırtım yerde, gök açık.',
    nightSeed: 'Serin çimen, açık gök, tek bir yıldız.',
    body: `Yayladasın. Rüzgâr yok. Çimen kısa, serin, biraz nemli. Sırtüstü uzanıyorsun. Yere battaniye serilmiş; battaniye kalın. Gökyüzü açık. Ay yok bu gece. Yıldızlar var, ama saymayacaksın. Saymak iş. Sen iş bırakıyorsun.

Kulaklarında uzak bir dere. Dere görünmüyor. Ses ince. Çayırın kokusu: kekik değil belki, kuru ot, toprak. Bir koku yeter.

Ellerin battaniyenin kenarında. Göğsün göğe açık, zırh yok. Üşümüyorsun. Üşürsen battaniyeyi çekersin; şimdi gerek yok.

Bir yıldız, diğerlerinden biraz daha durağan duruyor — hepsi durağan aslında, sen birini seçiyorsun. Ad verme. Sadece bak. Göz kırpıştırma. Yıldız kaçmıyor.

Bu sahne bir kehanet değil. Bir çayır. Sen bir bedensin. Yer seni taşıyor. Gökyüzü sende bitmiyor, sende başlamıyor. Aradasın. Ara, güvenli bir yer olabilir.

Karıncaları düşünme. Sivrisinek yok bu kartpostalda. Sade tut. Çimen, gök, dere sesi.

Nefes al, ver. Yıldız kaymaz. Sen kaymazsın. Kayarsan battaniye kıvrılır, düzeltirsin. O kadar.

Gece tohumu: serin çimen, açık gök, tek yıldız. Şükran: bu ara yer için. Bırakış: yıldızları haritaya dökmeyeceksin.`,
  },
  {
    id: 'coral',
    title: 'Mercan Kapısı',
    subtitle: 'Sığ su, yavaş balık, gölgesiz öğle değil gece',
    minutes: 16,
    sentence: 'Bu sığ suda yavaşım, kapı açık.',
    nightSeed: 'Sığ su, mercan kemeri, yavaş gölge.',
    body: `Gece denizi, ama fırtına yok. Sığ bir koya yürüyorsun. Su bileklere, sonra dizlere. Sıcak, tuzlu, durgun. Ay var, ince. Mercanlar burada bir kapı gibi kavislenmiş: doğal bir kemer, geçilebilir, tehditsiz.

Kemerin altından geçiyorsun. Su beline kadar. Ayakların kumda. Kum ince. Balıklar var, küçük, gümüş, aceleleri yok. Sana çarpmıyorlar.

Nefesin üstte. Dalış yok. Bu hikâye ciğerleri zorlamaz. Sen yürüyorsun, suda. Kemerin ötesinde koy daha da sakin. Kayalık bir oturak. Oturuyorsun, belin suda, göğsün havada.

Tuz dudakta. Silmene gerek yok. Ellerini suya bırakıyorsun. Parmakların arasında ılık akıntı — aslında akıntı yok, sadece suyun varlığı.

Uzakta bir fener yok. Bu koy kendi ışığını aydan alıyor. Taşlar soluk. Mercan, gece renginde, abartısız.

Bir süre hiçbir şey olmuyor. İyi. Olay yok. Dalga büyük değil, küçük bir salınım. Göğsün buna uymasın diye çabalamıyorsun.

Kemerden geri dönmene gerek yok. Burada kalabilirsin. Su seni çekmiyor. Oturak seni tutuyor.

Gece tohumu: sığ su, mercan kemeri, yavaş gölge. Şükran: bu tuz için. Bırakış: derine inmeyeceksin. Sığ yeter.`,
  },
  {
    id: 'harbor',
    title: 'Yağmur limanı',
    subtitle: 'Kapalı güverte, damla, halat',
    minutes: 14,
    sentence: 'Bu güvertede duruyorum, yağmur dışarıda.',
    nightSeed: 'Halat, damla, kapalı cam.',
    body: `Limandasın. Gece. Yağmur var, fırtına yok. Güverte kapalı, cam buğu. Dışarıda bir halat direğe vuruyor, düzenli, yumuşak.

Oturuyorsun. Ahşap ılık değil, ılık da değil — sadece var. Avuçlarını kenara koyuyorsun. Yağmur camı tarıyor. Bu bir alarm değil. Bir ritim.

Uzaktaki bir lamba, sarı, sabit. Kayıklar bağlı. Kimse koşmuyor. Sen nöbetçi değilsin. Yolcusun, bekçi değilsin.

Çay yok. Sadece damla ve halat. Nefesin buna uymasın diye uğraşma. Uyursa uyar.

Gözlerin ağır. İzin ver. Liman kendi işini bilir. Sen omuzlarını bırakırsın.

Gece tohumu: halat, damla, kapalı cam. Şükran: bu ritim. Bırakış: sabahı kurmayacaksın.`,
  },
  {
    id: 'bath',
    title: 'Hamam taşı',
    subtitle: 'Ilık taş, buhar yok, sade ısı',
    minutes: 12,
    sentence: 'Taş ılık, ben duruyorum.',
    nightSeed: 'Ilık taş, loş kurna, sessiz oda.',
    body: `Küçük bir hamam odası. Buhar abartısız. Taş kurna, ılık. Oturuyorsun, sırt taşta. Isı omurgadan yayılır, zorlamaz.

Su ince akar. Avucunu doldurmazsın. Sadece ses. Kurna dolu değil, yeterince var.

Ayna yok bu sahnede. Yüzünü kontrol etmezsin. Isı yeter. Tabanlar taşta, serin kenar, ılık orta.

Bir süre hiçbir şey olmaz. İyi. Olay yok.

Gece tohumu: ılık taş, loş kurna, sessiz oda. Şükran: bu ısı. Bırakış: suyu yönetmeyeceksin.`,
  },
  {
    id: 'attic',
    title: 'Çatı katı yağmuru',
    subtitle: 'Tahta, damla, dar pencere',
    minutes: 13,
    sentence: 'Çatıdaki yağmur düzenli, ben içerideyim.',
    nightSeed: 'Tahta koku, damla, dar cam.',
    body: `Çatı katındasın. Tavan alçak, tahta kokusu. Yağmur yukarıda. Damla düzenli. Pencere dar, buğu var.

Bir sandık, bir battaniye, bir lamba. Lamba sarı ve düşük. Sandığı açmıyorsun. Battaniyeyi çekiyorsun.

Yağmur bir hikâye anlatmıyor. Sadece düşüyor. Sen saymıyorsun.

Ayaklar yere, baş tavanın altında. Güvenli bir darlık. Kaçış yok, gerek de yok.

Gece tohumu: tahta koku, damla, dar cam. Şükran: bu damla. Bırakış: çatıyı tamir etmeyeceksin.`,
  },
  {
    id: 'paper-boat',
    title: 'Kâğıt tekne',
    subtitle: 'Sakin gölet, yavaş kıyı',
    minutes: 8,
    free: true,
    sentence: 'Tekne yavaş, kıyı yerinde, ben duruyorum.',
    nightSeed: 'Kâğıt tekne, durgun su, ılık kıyı.',
    body: `Bu bir tedavi değildir. Küçük bir gölet, bir kâğıt tekne, bir kıyı.

Su durgun. Rüzgâr yok. Tekne katlanmış kâğıttan, beyaz, hafif. Sen kıyıdasın. Ayakların toprakta. Ellerin dizlerinde.

Tekne ileri gitmiyor, geri gitmiyor. Hafifçe duruyor. Sayı yok. Yarış yok. Kurbağa yok bu kartpostalda. Sadece su, kâğıt, kıyı.

Bir yaprak suya düşerse düşsün. Tekneyi kurtarman gerekmez. Tekne ıslanır, yine de durur.

Göğsün sakin. Omuzlar inik. Gölet küçük. Dünya büyük olmak zorunda değil bu dakikada.

Gözlerin kapanabilir. Kıyı bilir. Su bilir. Sen bırakırsın.

Tohum: kâğıt tekne, durgun su, ılık kıyı. Şükran: bu yavaşlık. Bırakış: tekneyi yönetmeyeceksin.`,
  },
  {
    id: 'lamp-cat',
    title: 'Lamba ve kedi',
    subtitle: 'Ilık oda, yavaş nefes',
    minutes: 7,
    sentence: 'Lamba yanıyor, kedi uyuyor, oda duruyor.',
    nightSeed: 'Sarı lamba, yün kedi, sessiz halı.',
    body: `Küçük oda. Sarı bir lamba. Halıda bir kedi, kıvrılmış, gözleri kapalı. Sen koltuktasın. Acele yok.

Kedinin yanı inip kalkıyor. Sen saymıyorsun. Sadece bakıyorsun. Lamba sabit. Perde kapalı. Dışarıda gece, içeride ısı.

Elini kedinin yanına uzatabilirsin, uzatmak zorunda değilsin. Isı yeter.

Bu sahne bir masal değil, bir oda. Sen bir bedensin. Koltuk seni taşıyor.

Tohum: sarı lamba, yün kedi, sessiz halı. Bırak. Kediyi uyandırma, lambayı söndürme, odayı düzeltme.`,
  },
  {
    id: 'olive-gate',
    title: 'Zeytin kapısı',
    subtitle: 'Taş sütunlar, akşam ışığı',
    minutes: 12,
    sentence: 'Kapı açık, zeytin duruyor, ben geçmiyorum aceleyle.',
    nightSeed: 'Zeytin yaprağı, taş sütun, akşam tozu.',
    body: `Bu bir destan kopyası değil. Bir tepe, taş sütunlar, zeytin ağaçları.

Akşam. Rüzgâr yok. Sütunlar eski, isimsiz. Aralarında bir açıklık: kapı gibi, kapı değil. Işık yan yatmış.

Yürüyorsun. Toprak tozlu, ılık. Zeytin yaprakları gümüş. Kimse yok. Tanrı adı yok bu sahnede. Sadece taş ve ağaç.

Açıklığın önünde duruyorsun. Geçmek zorunda değilsin. Geçersen diğer tarafta yine zeytin var, yine taş.

Oturuyorsun, bir sütunun dibinde. Sırt taşta. Serin. Ayaklar toprakta.

Bu bir kehanet değil. Bir tepe. Sen duruyorsun.

Tohum: zeytin yaprağı, taş sütun, akşam tozu. Şükran: bu açıklık. Bırakış: kapıdan bir anlam çıkarmayacaksın.`,
  },
  {
    id: 'quiet-well',
    title: 'Sessiz kuyu',
    subtitle: 'Taş yalak, ince su',
    minutes: 11,
    sentence: 'Kuyu derin değil, su ince, ben kıyıda.',
    nightSeed: 'Taş kuyu, ince su, akşam gölgesi.',
    body: `Avlu. Ortada taş bir kuyu. Kova yok, zincir yok. Su görünüyor, yakın, durgun.

Eğiliyorsun. Yüzünü aramıyorsun. Sadece suyun koyuluğu. Bir damla düşerse halka açılır, kapanır.

Kuyunun kenarı serin. Avucunu koyuyorsun. Taş gerçek.

Bu kuyu bir sınav değil. Su içmek zorunda değilsin. Bakmak yeter.

Tohum: taş kuyu, ince su, akşam gölgesi. Bırak. Dibini yoklamayacaksın.`,
  },
]

export const writings: LibraryItem[] = [
  {
    id: 'after-wave',
    title: 'Dalga indikten sonra',
    subtitle: 'Üç satır, abartısız',
    minutes: 6,
    free: true,
    sentence: 'Dalga indi, ben satırdayım.',
    body: `Kalem veya not. Üç başlık, her birine iki cümle.

1. Beden. Şimdi nerede bir milim daha yumuşak? Çene, omuz, karın. Birini yaz.
2. Oda. Bir nesne adı. Sıfat yoksa da olur.
3. Şükran. Küçük ve gerçek. “Hayatta olmak” değil; su, yer, bir mesaj, bir kumaş.

Yorum yok. Analiz yok. Defteri kapat. Bırakış: bunu bir rapor haline getirmeyeceksin.`,
  },
  {
    id: 'worry-window',
    title: 'Kaygı penceresi',
    subtitle: 'On dakika, sonra kapalı',
    minutes: 10,
    sentence: 'Pencere kapandı, ben odadayım.',
    body: `Zamanı tut. On dakika. Kaygıyı yok etme; ona resmi bir süre ver.

Yaz: ne olmasından korkuyorsun, neyi kontrol etmeye çalışıyorsun, hangisi bugün çözülmez.

Süre bitince cümle: “Pencere kapandı.” Defteri kapat, başka odaya geç veya ışığı değiştir. Gece tohumu yazma; bu bir gündüz işi.`,
  },
  {
    id: 'edges',
    title: 'Kenar envanteri',
    subtitle: 'DR için nesne listesi',
    minutes: 7,
    sentence: 'Kenarlar duruyor, ben sayıyorum.',
    body: `Beş nesne, üç doku, bir ısı, bir ses. Yüksek sesle oku, sonra yaz.

“Sanki” ve “gerçek değil gibi” eklerini kullanma. İsim ve duyusal veri. Bu bir teşhis defteri değil, bir kenar defteri.

Bırakış: sisle tartışmayacaksın.`,
  },
  {
    id: 'weight',
    title: 'Ağırlık notu',
    subtitle: 'DP için basınç',
    minutes: 7,
    sentence: 'Basınç var, ben içerdeyim.',
    body: `Dört nokta yaz: sol oturak, sağ oturak, sırt, ayaklar. Yanına “var” veya “az” yaz. Yok deme; milim varsa milim yaz.

Adını yaz. Tarihi yaz. Şehri yaz.

Bırakış: kendine ayna tutmayacaksın bu sayfada.`,
  },
  {
    id: 'gratitude-small',
    title: 'Küçük şükran',
    subtitle: 'Üç somut şey',
    minutes: 5,
    sentence: 'Üç küçük şey bugün yeter.',
    body: `Üç satır. Her satır bir nesne veya bir milim rahatlık. Kimseye gösterilmeyecek.

Abartı yasak. “Evren” yasak. Su, yer, nefes, bir kişi, bir kumaş.

Kapat. Bırak.`,
  },
  {
    id: 'night-seed-note',
    title: 'Tohum kâğıdı',
    subtitle: 'Uykudan önce tek kare',
    minutes: 5,
    nightSeed: 'Yazdığın tek kare.',
    sentence: 'Tek kareyi geceye bırakıyorum.',
    body: `Bir cümle, bir sahne. Film değil. “Kapalı bahçe, ılık taş, kandil.”

Kağıdı katla, telefonu ters çevir. Gözler kapanırken sadece o kare. Şükran bir fısıltı olabilir. Bırakış zorunlu.`,
  },
  {
    id: 'unsend',
    title: 'Gönderilmeyen mektup',
    subtitle: 'Zihindeki mahkemeyi kapat',
    minutes: 12,
    sentence: 'Mektup yazıldı, gönderilmedi, ben buradayım.',
    body: `Birine veya kendine. Gönderilmeyecek. Suçlama serbest, sonra son paragraf: “Bunu bu gece çözmeyeceğim.”

Mektubu kapat. Sil veya çekmece. Bırakış: mahkeme yarın da kurulmayabilir.`,
  },
  {
    id: 'three-colors',
    title: 'Üç renk',
    subtitle: 'Odadan üç ad',
    minutes: 5,
    free: true,
    sentence: 'Üç renk odada, ben de odadayım.',
    body: `Kalem. Üç satır. Her satır bir renk ve o rengin nesnesi. “Mavi — kupa.” Sıfat yok. Yorum yok. Sis yok.

Yüksek sesle oku bir kez. Kapat. Bırakış: paleti tamamlamayacaksın.`,
  },
  {
    id: 'safe-list',
    title: 'Güvenli liste',
    subtitle: 'Beş somut şey',
    minutes: 6,
    sentence: 'Liste duruyor, ben duruyorum.',
    body: `Beş satır: yer, su, bir kişi veya bir kumaş, bir ses, bir ısı. Hepsi bugün erişilir olsun. Yarın değil.

Kapat. Bırakış: listeyi dua etme.`,
  },
]

export const meditations: LibraryItem[] = [
  {
    id: 'body-drop',
    title: 'Beden bırakışı',
    subtitle: 'Tepeden tabana, zorlamadan',
    minutes: 12,
    sentence: 'Bedenim katman katman iniyor.',
    body: `Otur veya yat. Gözler kapalı veya loş.

Alın. Kaş. Göz kapakları. Yanak. Çene. Dil. Boğaz. Omuzlar. Üst kollar. Dirsekler. Avuçlar. Göğüs. Kaburga. Karın. Bel. Kalçalar. Uyluk. Diz. Baldır. Ayak bileği. Taban.

Her bölgede bir nefes. Düzeltme yok. “Rahatla” emri yok. Sadece ad ve bırakış.

Cümle: bedenim katman katman iniyor. Sahne: aynı oda, daha ağır yorgan. Şükran: bu taban için. Bırak.`,
  },
  {
    id: 'known-room',
    title: 'Bilinen oda',
    subtitle: 'İcat yok, hafıza var',
    minutes: 10,
    sentence: 'Bildiğim odadayım, kapı yerinde.',
    body: `Gerçek bir oda seç. İdeal bahçe değil.

Kapı. Pencere. Yerin cinsi. Bir koku. Bir ses. Sen neredesin: sandalye mı, yatak mı.

Zihin süslerse sadeleştir. Üç nesne yeter.

Bırakış: odayı yeniden dekore etmeyeceksin. Şükran: bu kapı için.`,
  },
  {
    id: 'shore-sit',
    title: 'Kıyıda oturuş',
    subtitle: 'Dalga metaforu, deniz zorunlu değil',
    minutes: 11,
    sentence: 'Kıyıdayım, dalga bana ait değil.',
    body: `İskele veya taş kenar. Su varsa su, yoksa sadece ritmik bir ses.

Dalga gelir, iskele kalır. Sen iskelesin. Islanmak zorunda değilsin.

Nefes verişi dalganın çekilişi gibi uzun tutabilirsin. Zorlama.

Gece tohumu: ıslak tahta, çekilmiş su. Şükran: bu kenar için.`,
  },
  {
    id: 'hands-pulse',
    title: 'El ve nabız',
    subtitle: 'DP yatağı, ayna yok',
    minutes: 8,
    sentence: 'Nabzım içeride, ellerim bende.',
    body: `İki el, bir bilek. Nabız bulunursa sayma; sadece varlığını fark et. Bulunmazsa elin ısısı yeter.

Adını fısılda. Tarihi fısılda.

Bırakış: nabzı kanıt yapmayacaksın.`,
  },
  {
    id: 'window-light',
    title: 'Pencere ışığı',
    subtitle: 'DR yatağı, yön sayımı',
    minutes: 8,
    sentence: 'Işık bir yerden geliyor.',
    body: `Gözler yumuşak. Işığın yönü. Gölgenin yönü. Perde ağır mı, tül mü.

Kenar çiz. Sis yorumunu not etme.

Şükran: bu yön için. Bırakış: görüntüyü netleştirmeyeceksin.`,
  },
  {
    id: 'seed-only',
    title: 'Yalnız tohum',
    subtitle: 'Beş dakika, tek kare',
    minutes: 5,
    nightSeed: 'Kapalı bahçe, ılık taş, kandil.',
    sentence: 'Tohumu geceye bırakıyorum.',
    body: `Rahat beden: çene, omuz, karın. Bir cümle. Tek sahne: kapalı bahçe, ılık taş, kandil. Tekrar etme, süsleme. Bırak. Şükran fısıltısı. Uyu.`,
  },
  {
    id: 'warm-stone',
    title: 'Avuçta taş',
    subtitle: 'Ağırlık, ısı, kenar',
    minutes: 8,
    sentence: 'Taş avucumda, ben buradayım.',
    body: `Bir taş, bir anahtar, bir kupa. Avuç. Ağırlık. Kenar. Isı veya serinlik. Adını söyleme, nesneyi söyle.

Gözler yumuşak. Zihin hikâye uydurursa nesneye dön. Bırakış: taşı kanıt yapma. Şükran: bu ağırlık.`,
  },
  {
    id: 'feet-press',
    title: 'Taban basışı',
    subtitle: 'İki ayak, yer, sayı yok',
    minutes: 7,
    free: true,
    sentence: 'Tabanlarım yerde, yer beni tutuyor.',
    body: `Ayakta veya sandalyede. İki tabanı yere bas. Topuk, kemer, parmak. Sayı yok. “Daha sert” yok. Sadece basınç.

On nefes. Her verişte milim daha fazla ağırlık. Bırakış: yarışı kazanma. Şükran: bu yer.`,
  },
]

export const sleepLab: LibraryItem[] = [
  {
    id: 'lab-1',
    title: '1. gece — Yatak bir iş yeri değil',
    subtitle: 'Uyaran denetimi, sade kural',
    minutes: 12,
    sentence: 'Yatak uykuya, oda karanlık.',
    nightSeed: 'Kapalı kapı, sönük lamba, ağır yorgan.',
    body: `Bu yedi gece bir laboratuvar iddiası değil; uyku biliminden süzülmüş başa çıkma iskeleti. Teşhis koymaz. CBT-I tarzı: yatağı uyanık işlerden ayır.

Kural: yatakta plan yapma, tartışma, kaydırma. Uyku gelmezse kalk, loş başka bir köşede sıkıcı bir şey yap, uykuluk gelince dön.

Rahat beden. Cümle. Sahne: yatağın yalnızca yorgan olduğu bir oda. Bırakış: bu geceyi performans yapma. Şükran: bu yorgan. Tohum: kapalı kapı, sönük lamba, ağır yorgan.`,
  },
  {
    id: 'lab-2',
    title: '2. gece — Kalkış saati',
    subtitle: 'Sabah çipası, geceyi sabaha bağlar',
    minutes: 11,
    sentence: 'Sabah saati sabit, gece ona yaslanır.',
    nightSeed: 'Pencere, erken ışık, aynı saat.',
    body: `Yatış saati esner, kalkış saati mümkün olduğunca sabit kalır. Bu bir ceza değil, sinir sistemine bir kıyı.

Rahat beden. Cümle. Sahne: aynı pencereden giren erken ışık. Bırakış: geceyi telafi uykusuyla şişirme planı yok. Şükran: bu çipa. Tohum: pencere, erken ışık, aynı saat.`,
  },
  {
    id: 'lab-3',
    title: '3. gece — Zihin mahkemesi',
    subtitle: 'Bilişsel indirme, kanıt değil bırakış',
    minutes: 12,
    sentence: 'Bu gece mahkeme yok.',
    nightSeed: 'Kapalı defter, sönük lamba.',
    body: `Uykusuzluk çoğu zaman “uyuyamazsam yarın biter” cümlesiyle şişer. Cümleyi fark et, çürütmeye çalışma, rafa koy.

Gündüz on dakikalık kaygı penceresi açtıysan gece defteri kapalıdır.

Rahat beden. Sahne: kapalı defter. Bırakış: gece savcı koltuğunu bırak. Şükran: bu rafa. Tohum: kapalı defter, sönük lamba.`,
  },
  {
    id: 'lab-4',
    title: '4. gece — İniş ritüeli',
    subtitle: 'Aynı sıra, aynı loşluk',
    minutes: 10,
    sentence: 'Sıra aynı, beden anlıyor.',
    nightSeed: 'Su, loşluk, yorgan.',
    body: `Kırk dakikalık bir iniş: ışık düşer, ekran kapanır, ılık su veya yavaş gerinme, sonra yatak. Ritüel büyülü değil; koşullu bir işaret.

Rahat beden. Cümle. Sahne: mutfakta son bir bardak su, koridor, yatak. Bırakış: ritüeli mükemmelleştirme. Şükran: bu sıra. Tohum: su, loşluk, yorgan.`,
  },
  {
    id: 'lab-5',
    title: '5. gece — Tohum gecesi',
    subtitle: 'Tek kare, film yok',
    minutes: 9,
    sentence: 'Tek kare yeter, gece işler.',
    nightSeed: 'Kapalı bahçe, ılık taş, kandil.',
    body: `Zihin epik ister. Sen kartpostal verirsin. Kapalı bahçe, ılık taş, kandil. Tekrar etme. Süsleme. Bırak.

Rahat beden önce. Şükran fısıltısı. Uyku bir görev değil, bir düşüş.`,
  },
  {
    id: 'lab-6',
    title: '6. gece — Kaygı dökümü erken',
    subtitle: 'Gündüz penceresi, gece boş yatak',
    minutes: 11,
    sentence: 'Döküm gündüz bitti, yatak boş.',
    nightSeed: 'Boş masa, kapalı defter, yatak.',
    body: `Akşam değil, ikindi. On dakika yaz, bitir. Gece o kâğıda dönme.

Rahat beden. Sahne: boş masa. Bırakış: ek madde yok. Şükran: bu erken döküm. Tohum: boş masa, kapalı defter, yatak.`,
  },
  {
    id: 'lab-7',
    title: '7. gece — Birleştirme',
    subtitle: 'Kıyı, sıra, tohum, bırakış',
    minutes: 12,
    sentence: 'İskelet duruyor, ben bırakıyorum.',
    nightSeed: 'Aynı yatak, aynı tohum, aynı bırakış.',
    body: `Yedi gece bir kür değil. İskelet: yatak iş yeri değil, kalkış çipası, mahkeme yok, iniş sırası, tek tohum, erken döküm.

Bugün hepsini birden mükemmel yapma. Birini seç, diğerlerini hafif tut.

Rahat beden. Cümle. Sahne: aynı oda. Şükran: bu iskelet. Bırakış: programı bitirmeyi bir zafer konuşmasına çevirme. Tohum: aynı yatak, aynı tohum, aynı bırakış.`,
  },
]

export const clarity: LibraryItem[] = [
  { id: 'c1', title: 'Çene', subtitle: 'Bugünün milimi', minutes: 3, free: true, sentence: 'Çenem şimdi yumuşak.', body: 'Azı dişlerini ayır. Dil alt damağa. Otuz saniye. Cümle. Bırak. Şükran: bu milim.' },
  { id: 'c2', title: 'Taban', subtitle: 'Yer var', minutes: 3, free: true, sentence: 'Tabanım yerde.', body: 'İki taban. Serin veya ılık, fark et. Cümle. Sahne: eşik. Bırak.' },
  { id: 'c3', title: 'Tek nesne', subtitle: 'Adı söyle', minutes: 3, free: true, sentence: 'Bu nesne odada.', body: 'Bir bardak veya bir düğme. Ad. Doku. Bırakış: yorum yok.' },
  { id: 'c4', title: 'Omuz', subtitle: 'Kulaktan uzak', minutes: 3, free: true, sentence: 'Omuzlarım iniyor.', body: 'Omuzları kaldır, bırak. İki kez. Şükran: bu iniş.' },
  { id: 'c5', title: 'Pencere yönü', subtitle: 'Işık nereden', minutes: 3, free: true, sentence: 'Işık bir yerden geliyor.', body: 'Yönü söyle. Gölgeyi söyle. Sis yorumu yok.' },
  { id: 'c6', title: 'Su', subtitle: 'Bir yudum', minutes: 3, free: true, sentence: 'Su içeride, ben buradayım.', body: 'Yudum. Isı. Boğaz. Şükran: bu su. Bırak.' },
  { id: 'c7', title: 'Ad', subtitle: 'Kulak için', minutes: 3, free: true, sentence: 'Adım bu, ben buradayım.', body: 'Adını fısılda. Tarihi fısılda. Ayna yok.' },
  { id: 'c8', title: 'Avuç ısısı', subtitle: 'İki el', minutes: 3, free: true, sentence: 'Avuçlarımda ısı var.', body: 'Avuçları birleştir, ayır. Isıyı fark et. Bırak.' },
  { id: 'c9', title: 'Veriş', subtitle: 'Bir uzun nefes', minutes: 3, free: true, sentence: 'Verişim uzun, ben iniyorum.', body: 'Burun al, ağızdan altıya kadar ver. Üç tur. Zorlama.' },
  { id: 'c10', title: 'Kapı', subtitle: 'Kenar', minutes: 3, free: true, sentence: 'Kapı yerinde, oda yerinde.', body: 'Kapının dikdörtgenini içinden çiz. DR günü için kenar.' },
  { id: 'c11', title: 'Sırt', subtitle: 'Yaslan', minutes: 3, free: true, sentence: 'Sırtım yaslanıyor.', body: 'Sandalyenin seni taşımasına izin ver. Çaba azalt.' },
  { id: 'c12', title: 'Üç şükran', subtitle: 'Küçük', minutes: 3, free: true, sentence: 'Üç küçük şey yeter.', body: 'Üç somut şey. Abartma. Kapat.' },
  { id: 'c13', title: 'Kaygı rafa', subtitle: 'Bir cümle', minutes: 3, free: true, sentence: 'Bunu bu saatte çözmüyorum.', body: 'Kaygıyı bir cümleye sıkıştır, rafa koy. Pencere değil, etiket.' },
  { id: 'c14', title: 'Yorgan', subtitle: 'Örtü', minutes: 3, free: true, sentence: 'Örtü beni tutuyor.', body: 'Bir kumaşın ağırlığı. DP günü için temas. Bırakış.' },
  { id: 'c15', title: 'Üç renk', subtitle: 'Bak, ad', minutes: 3, free: true, sentence: 'Üç renk odada.', body: 'Üç nesne, üç renk. Yüksek sesle. Sis yok. Bırak.' },
  { id: 'c16', title: 'Telefon ağırlığı', subtitle: 'İki el', minutes: 3, free: true, sentence: 'Bu ağırlık avucumda.', body: 'Telefonu iki elle tut. Ağırlığını fark et. On saniye. Bırakış.' },
]

export function todaysClarity(): LibraryItem {
  const i = Math.floor(Date.now() / 86_400_000) % clarity.length
  return clarity[i]!
}

export function storyById(id: string) {
  return stories.find((s) => s.id === id)
}
export function writingById(id: string) {
  return writings.find((w) => w.id === id)
}
export function meditationById(id: string) {
  return meditations.find((m) => m.id === id)
}
export function breathById(id: string) {
  return breaths.find((b) => b.id === id)
}
export function sleepLabById(id: string) {
  return sleepLab.find((s) => s.id === id)
}
export function clarityById(id: string) {
  return clarity.find((c) => c.id === id)
}

export const extras: LibraryItem[] = [
  {
    id: 'ground54321',
    title: '5-4-3-2-1',
    subtitle: 'Gör, dokun, işit, kokla, tat',
    minutes: 4,
    free: true,
    sentence: 'Oda geri geldi, ben buradayım.',
    body: 'Beş görülen. Dört dokunulan. Üç işitilen. İki koklanan. Bir tadılan. Yüksek sesle, yavaş. Sis yorumu yok. Bırakış: listeyi mahkeme yapma. Şükran: bu kenarlar.',
  },
  {
    id: 'values',
    title: 'Değer pusulası',
    subtitle: 'Bir milim yön',
    minutes: 8,
    sentence: 'Bu saatte küçük bir yönüm var.',
    body: 'Üç değer adı yaz: örneğin nezaket, duruluk, bağlılık. Bugün hangisine bir milim yaklaşabilirsin? Bir davranış, abartısız. ACT tarzı öz: duyguyu taşı, küçük adımı seç. Alıntı değil. Bırakış: pusulayı mükemmel yapma.',
  },
  {
    id: 'kind-friend',
    title: 'Nazik arkadaş',
    subtitle: 'İç sesin tonu',
    minutes: 6,
    sentence: 'Kendime yorgun bir dosta konuşurum.',
    body: 'İçerideki sert cümleyi duy. Aynı cümleyi, yorgun bir arkadaşa söyler gibi yeniden yaz. Bir kez sesli. Bırakış: kendine dava açma. Şükran: bu milim yumuşaklık.',
  },
  {
    id: 'ten-steps',
    title: 'On adım',
    subtitle: 'Taban, yer, sayı',
    minutes: 5,
    free: true,
    sentence: 'Adımlarımı içeriden atıyorum.',
    body: 'On adım. Her birinde topuk-parmak. “Bir, yer.” Koşu yok. İzleyici kamerasını kapat. Bırakış: adımı performans yapma.',
  },
  {
    id: 'tension-drop',
    title: 'Gerilim bırakışı',
    subtitle: 'Omuz, çene, el',
    minutes: 5,
    sentence: 'Omuzlarım iniyor, ben iniyorum.',
    body: 'Omuzları kulaklara yaklaştır, bırak. Çeneyi milim aç. Avuçları sık, aç. Üç tur. Bırakış asıl iş. Şükran: bu iniş.',
  },
  {
    id: 'morning-light',
    title: 'Sabah ışığı',
    subtitle: 'Yön ve pencere',
    minutes: 6,
    sentence: 'Işık bir yerden geliyor.',
    body: 'Pencereye bakmadan önce omuzları bırak. Sonra yönü söyle. Gölgeyi söyle. Ekran değil, gün ışığı tercihi. Bırakış: ışığı düzeltmeye çalışma.',
  },
  {
    id: 'three-objects',
    title: '3 nesne',
    subtitle: 'Bak, renk, dokun',
    minutes: 4,
    free: true,
    sentence: 'Üç nesne odada, ben odadayım.',
    body: 'Üç nesne seç. Her biri için: bak, rengi söyle, dokun. Isı, ağırlık, pürüz. Yüksek sesle. Sis yorumu yok. Sonra iki tabanı yere bas. Bırakış: envanteri mahkeme yapma. Şükran: bu kenarlar.',
  },
  {
    id: 'room-sound',
    title: 'Odadaki ses',
    subtitle: 'Bir ses, adını söyle',
    minutes: 3,
    free: true,
    sentence: 'Bu ses odada, ben de odadayım.',
    body: 'Bir ses seç: buzdolabı, trafik, yağmur, kendi nefesin. Adını söyle. Yorum yok. On nefes boyunca sadece o ses. Bırakış: sesi kapatmaya çalışma.',
  },
  {
    id: 'slow-evening',
    title: 'Akşam yavaş',
    subtitle: 'Okunan bir parça, sohbet kaydı değil',
    minutes: 9,
    sentence: 'Akşam yavaş, masa yerinde, ben oturuyorum.',
    body: `Bu bir podcast sunucusu iddiası değil. Okunan bir parça.

Akşam. Masa. Bir bardak su. Ekran kapalıysa iyi, açıksa bir kenara bırak.

Bugün bitmedi belki. Bitirmek zorunda değilsin. Bir omuz inebilir. Bir çene yumuşayabilir.

Konuşma şudur: yavaş kal. Kanıt yok. Tavsiye yok. Sadece bu oda, bu su, bu saat.

Tohum: masa, su, sönük lamba. Bırakış: günü kapatma konuşması yapma.`,
  },
  {
    id: 'room-enough',
    title: 'Oda yeter',
    subtitle: 'Kısa konuşma',
    minutes: 7,
    sentence: 'Bu oda yeter, ben buradayım.',
    body: `Dışarıdaki gürültü büyük görünebilir. Bu parça onu küçültmez. Sadece odayı hatırlatır.

Dört kenar. Bir zemin. Bir tavan. Sen ortadasın, merkez olmak zorunda değilsin.

Bir nesne seç, adını söyle. Bir ses seç, adını söyle. Sonra bırak.

Bırakış: odayı mükemmel yapma.`,
  },
  {
    id: 'desk-window',
    title: 'Masa ve pencere',
    subtitle: 'İş arası, tek görev',
    minutes: 6,
    free: true,
    sentence: 'Bir iş, bir pencere, omuzlar inik.',
    body: `Masa. Pencere. Tek bir iş adı yaz: küçük, bitirilebilir. İkincisini yazma.

Omuzları bırak. Ayaklar yerde. Pencereden bir kenar: çerçeve, ışık, gölge.

Beş nefes. Sonra o tek işe dön, ya da dönme. İkisi de olur.

Bırakış: verimliliği kanıtlama.`,
  },
  {
    id: 'one-task',
    title: 'Tek iş',
    subtitle: 'Listeyi daralt',
    minutes: 5,
    sentence: 'Bugün bir iş yeter.',
    body: `Üç şey aklındaysa ikisini rafa yaz. Birini bırak masada.

Rafa yazılanlar yok olmadı. Sadece bu saatte yok.

Omuz, çene, taban. Sonra tek işin ilk milimi. Bırakış: listeyi kahramanlık yapma.`,
  },
  {
    id: 'week-note',
    title: 'Bu haftanın notu',
    subtitle: 'Uygulama içi bülten, e-posta yok',
    minutes: 6,
    free: true,
    sentence: 'Bu hafta yavaş, bir milim yeter.',
    body: `Bu bir e-posta listesi değil. Bu telefonda duran kısa bir not.

Haftanın cümlesi: acele etme. Bir nefes, bir nesne, bir uyku tohumu yeter.

Panik kapısı kilitlenmez. SOS durur. Gerisi seçilir, yığılmaz.

Şükran: bu küçük iskelet. Bırakış: haftayı bir skor tahtası yapma.`,
  },
  {
    id: 'first-hour',
    title: 'İlk saat',
    subtitle: 'Steady’ye yavaş giriş',
    minutes: 8,
    free: true,
    sentence: 'Bir şey seçtim, gerisini bırakıyorum.',
    body: `Teşhis yok. Tedavi iddiası yok. Bugün bir kapı seç: SOS, nefes, hikâye, ya da üç nesne.

Ayarlarda dili ve koyu/açık görünümü seç. Sesli okuma cihazındaki sese bağlı.

Favori için kartı uzun bas. Seri, gösterdiğin günlerden oluşur. Donma hakkı haftada bir.

Bırakış: uygulamayı bitirme. Birini seç, kapat.`,
  },
  {
    id: 'about-sleep',
    title: 'Uyku hakkında',
    subtitle: 'İskelet, kür değil',
    minutes: 8,
    free: true,
    sentence: 'Yatak uykuya, gece bir tohum.',
    body: `Bu bir uyku laboratuvarı vaadi değil. Kısa iskelet: yatak iş yeri değil. Kalkış saati mümkünse sabit. Gece mahkeme yok. Işık düşer, ekran kapanır, tek bir gece tohumu.

Uyumazsan kalk, loş bir köşede sıkıcı bir şey, uykuluk gelince dön.

Teşhis yok. İlaç yok. Bırakış: bu geceyi performans yapma. Şükran: yorgan.`,
  },
  {
    id: 'night-table',
    title: 'Gece masası',
    subtitle: 'Okunan parça, sunucu yok',
    minutes: 10,
    sentence: 'Masa loş, ben bırakıyorum.',
    body: `Bu bir yayın değil. Bir masa, bir lamba, okunan cümleler.

Su. Kitap kapalı. Telefon ters. Omuzlar.

Cümle: gece işini bilir. Sen nöbetçi değilsin.

Tohum: loş lamba, kapalı kitap, ağır örtü. Bırak.`,
  },
]

export function extraById(id: string) {
  return extras.find((e) => e.id === id)
}
