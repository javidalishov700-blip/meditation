import type { DoorId } from './types'

export type Door = {
  id: DoorId
  title: string
  short: string
  kicker: string
  promise: string
  distinct: string
  body: string[]
  tools: { title: string; body: string }[]
  accent: string
}

export const treatments: Door[] = [
  {
    id: 'panic',
    title: 'Panik',
    short: 'Dalga',
    kicker: 'Teşhis değil, dalga haritası',
    promise: 'Tepe gelir, tepe iner. Sen odada kalırsın.',
    distinct:
      'Panik kapısı ani yükseliş içindir: kalp, nefes, kaçma hissi. Anksiyete kapısı geleceğe yayılan gerginlik içindir; karıştırma.',
    body: [
      'Panik bir alarmdır, bir kehanet değil. Beden kısa sürede yüksek alarma geçer: kalp hızlanır, nefes sığlaşır, dünya daralır. Bu sekme o alarmın üstüne tıbbi bir yorum bindirmez. Sadece dalgayı geçirene kadar yanında durur.',
      'Çoğu dalga birkaç dakikada tırmanır ve iner. “Geçti” kaydı bunu hatırlatmak içindir — kanıt değil, iz. SOS bu kapının kriz kapısıdır; kilitlenmez.',
      'Burada üç iş var: bedeni yere bağlamak, nefesi uzatmak, şimdiki zamanda tek cümle. Zihinsel sahne alarm sönünce gelir, önce değil.',
    ],
    tools: [
      { title: 'SOS yatağı', body: '174 Hz + kahverengi gürültü, sesli al / tut / ver, arada kısa cümle.' },
      { title: 'Dalga nefesi', body: '4-2-6. Uzun veriş sinir sistemine “indi” der.' },
      { title: 'Yere temas', body: 'Topuk, sandalye, duvar kenarı. İsimlendir: soğuk, sert, sabit.' },
      { title: '7 gün program', body: '1. gün ücretsiz. Geri kalanı Pro. Her gün: rahat beden, cümle, sahne, bırakış, şükran.' },
    ],
    accent: '#fb7185',
  },
  {
    id: 'anxiety',
    title: 'Anksiyete',
    short: 'Yarın',
    kicker: 'Teşhis değil, dikkat kaydırma',
    promise: 'Endişe gelecekte yaşar. Sen şimdiye bir sandalye koyarsın.',
    distinct:
      'Anksiyete kapısı süreğen, yarın-yüklü gerginlik içindir. Panik kapısındaki ani dalga ile aynı şey değildir. Burada tempo daha yavaş, iş daha çok “planı rafa almak”.',
    body: [
      'Anksiyete sıkça bedeni hafif alarmda tutar: çene, omuz, mide, uykusuzluk. Zihin olmamış işleri prova eder. Bu sekme o prova odasını kapatmana yardım eder; hastalığı adlandırmaz.',
      'Araçlar: kaygıyı bir pencereye yazmak, bedeni bırakmak, kısa olumlu şimdiki zaman cümlesi, sonra zihinsel sahne. Gece tohumu, uykuya geçerken tek görüntü bırakmaktır.',
      'Programın tamamı Pro’dadır. Ücretsiz katmanda SOS ve panik 1. gün hâlâ yanındadır — kriz ile süreğen gerginlik ayrı kapılardır.',
    ],
    tools: [
      { title: 'Kaygı penceresi', body: 'On dakika yaz, sonra defteri kapat. Günün geri kalanı prova yasağı.' },
      { title: 'Kutu nefesi', body: '4-4-4-4. Tempo eşit, zihin ritme bağlanır.' },
      { title: 'Sahne', body: 'Bilinen bir oda. Kapı, pencere, kumaş. Yeni bir dünya icat etme.' },
      { title: '7 gün program', body: 'Pro. Her gün bırakış ve küçük şükran ile biter.' },
    ],
    accent: '#e879f9',
  },
  {
    id: 'derealization',
    title: 'Derealizasyon',
    short: 'Dünya',
    kicker: 'Teşhis değil, dünya ile temas',
    promise: 'Cam buğulanır. Oda yine de odadır.',
    distinct:
      'Derealizasyon dünyanın yabancı, sisli, sahne gibi durmasıdır. Depersonalizasyon ise “ben”in uzak düşmesidir. Bu iki kapı bilinçli olarak ayrıdır. DR’de iş: dışarıdaki kenarları adlandırmak.',
    body: [
      'Dünya karton gibi, ışıklı vitrin gibi, rüya gibi durabilir. Bu korkutucudur ve yine de bir algı kaymasıdır — yok oluş kanıtı değil. Steady bunu hastalık ilanı olarak kullanmaz.',
      'Araç: kenar, renk, ısı, ses. “Pencere dikdörtgen. Perde ağır. Bardak soğuk.” Zihin sis anlatırken sen nesne listesi tutarsın.',
      'Ayna ve ekran bu kapıda zorunlu değildir. Dışarıdaki üç gerçek nesne yeter. Program Pro’dadır.',
    ],
    tools: [
      { title: 'Oda envanteri', body: 'Beş nesne, üç doku, bir ısı. Yüksek sesle, yavaş.' },
      { title: 'Pencere ışığı', body: 'Işığın geldiği yönü söyle. Gölgeyi söyle. Bu, “dünya sahne” fikrini deler.' },
      { title: 'Doğa yatağı', body: 'Yağmur veya koy. Dışarıda bir süreklilik hatırlatır.' },
      { title: '7 gün program', body: 'Pro. Sis ile tartışmaz, kenar çizer.' },
    ],
    accent: '#a78bfa',
  },
  {
    id: 'depersonalization',
    title: 'Depersonalizasyon',
    short: 'Beden',
    kicker: 'Teşhis değil, beden ile temas',
    promise: 'İzleyici koltuğundan koltuğun kumaşına dön.',
    distinct:
      'Depersonalizasyon kendini camın arkasından izlemek, bedenin “ben değil” durmasıdır. Derealizasyon dış dünyanın yabancılaşmasıdır. DP’de iş: ağırlık, nabız, ses, ad.',
    body: [
      'Eller senin, nefes senin, isim senin — bunlar slogan değil, tekrar edilecek verilerdir. DP kapısı kimlik tartışması açmaz. Sadece bedeni tekrar hisseder.',
      'Ayna bazı kişilerde işi zorlaştırır; burada zorunlu değil. Ayak tabanı, oturulan yerin basıncı, konuşulan kendi adın yeter.',
      'Program Pro’dadır. Kriz anında yine SOS: kilit yok, PIN ekranından da açılır. DP ile DR’yi aynı sekmeye sıkıştırmıyoruz.',
    ],
    tools: [
      { title: 'Ağırlık sayımı', body: 'Sol oturak, sağ oturak, sırt, ayak. Dörder saniye.' },
      { title: 'Ses ve ad', body: 'Adını, bugünün tarihini, bulunduğun şehri söyle. Kendi kulağın için.' },
      { title: 'Fizyolojik iç çekiş', body: 'Çift burun alış, uzun ağız veriş. Bedeni içeri çağırır.' },
      { title: '7 gün program', body: 'Pro. Her gün beden sahnesi, bırakış, şükran.' },
    ],
    accent: '#f9a8d4',
  },
]

export function doorById(id: string | undefined): Door {
  return treatments.find((d) => d.id === id) ?? treatments[0]!
}
