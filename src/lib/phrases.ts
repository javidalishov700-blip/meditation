/** Orijinal şimdiki zaman cümleleri. Kitap alıntısı yok. */
export const SOS_SENTENCES = [
  'Bu anda bedenim güvenli bir yerde.',
  'Dalga geçiyor, ben burada kalıyorum.',
  'Nefesim şu an bana yeter.',
  'Ayaklarım yerde, odam gerçek.',
  'Bu his yoğun, ve geçici.',
  'Göğsüm açılıyor, omuzlarım iniyor.',
  'Şimdi sadece bu nefes var.',
  'Kendi adımı, bu odayı biliyorum.',
]

export const TAP_SENTENCES = [
  'Dalga geçti, ben buradayım.',
  'Bedenim şimdi yavaşlıyor.',
  'Bu oda, bu gece, bu nefes.',
  'Güvenliyim ve duruyorum.',
]

export const NIGHT_SEEDS = [
  'Kapalı bir bahçe, ılık taş, tek bir kandil.',
  'Sakin bir koy, ay çizgisi, hiç rüzgâr yok.',
  'Yumuşak bir battaniye, loş bir lamba, kapı kilitli.',
  'Çam kokusu, kuru iğneler, uzak bir dere.',
]

export function pick<T>(list: T[], seed?: number): T {
  if (seed == null) return list[Math.floor(Math.random() * list.length)]!
  return list[Math.abs(seed) % list.length]!
}

export const LEGAL =
  'Steady tıbbi teşhis veya tedavi sunmaz. Panik, anksiyete, derealizasyon ve depersonalizasyon için başa çıkma araçlarıdır. Krizde acil yardım: 112.'

export const CRISIS = 'Krizde acil hat: 112'
