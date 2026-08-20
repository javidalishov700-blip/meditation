import { R, type LocaleId } from './locales'
import { translate } from './strings'
import type { NatureScene, Tone } from './types'

export const TONES: Tone[] = [
  {
    id: '174',
    hz: 174,
    title: '174 Hz',
    subtitle: 'Zemin tonu — SOS ile aynı yatak',
    trialSeconds: 180,
  },
  { id: '396', hz: 396, title: '396 Hz', subtitle: 'Alçak, yavaş katman' },
  { id: '417', hz: 417, title: '417 Hz', subtitle: 'Yumuşak geçiş yatağı' },
  { id: '432', hz: 432, title: '432 Hz', subtitle: 'Ilık, orta zemin' },
  { id: '528', hz: 528, title: '528 Hz', subtitle: 'Orta, açık alan' },
  { id: '639', hz: 639, title: '639 Hz', subtitle: 'Üst göğüs boşluğu' },
  { id: '741', hz: 741, title: '741 Hz', subtitle: 'İnce, net zemin' },
  { id: '852', hz: 852, title: '852 Hz', subtitle: 'Yüksek, duru katman' },
]

export const NATURE_SCENES: NatureScene[] = [
  {
    id: 'rain',
    title: 'Yağmur camı',
    subtitle: 'Camdaki damla ve uzak gök',
    names: R('Yağmur camı|Rain on glass|Yağış şüşəsi|Дождь на стекле|Lluvia en el cristal|Pioggia sul vetro'),
    blurbs: R('Camdaki damla ve uzak gök|Drops on glass, distant sky|Şüşədə damcı və uzaq göy|Капли на стекле, дальнее небо|Gotas en el cristal|Gocce sul vetro'),
  },
  {
    id: 'ocean',
    title: 'Gece koyu',
    subtitle: 'Yavaş dalga, çakıl, tuz',
    names: R('Gece koyu|Night cove|Gecə körfəzi|Ночная бухта|Cala nocturna|Cala notturna'),
    blurbs: R('Yavaş dalga, çakıl, tuz|Slow wave, pebble, salt|Yavaş dalğa, çınqıl, duz|Медленная волна, галька, соль|Ola lenta, guijarro, sal|Onda lenta, ciottolo, sale'),
  },
  {
    id: 'forest',
    title: 'Çam altı',
    subtitle: 'Yaprak, uzak kuş, rüzgâr',
    names: R('Çam altı|Under the pines|Şam altı|Под соснами|Bajo los pinos|Sotto i pini'),
    blurbs: R('Yaprak, uzak kuş, rüzgâr|Leaves, distant bird, wind|Yarpaq, uzaq quş, külək|Листва, далёкая птица, ветер|Hojas, pájaro lejano, viento|Foglie, uccello lontano, vento'),
  },
  {
    id: 'fire',
    title: 'Köz',
    subtitle: 'Çıtırtı ve alçak ısı',
    names: R('Köz|Embers|Köz|Угли|Brasas|Braci'),
    blurbs: R('Çıtırtı ve alçak ısı|Crackling and low heat|Çatırtı və alçaq istilik|Трескт и низкое тепло|Crepitar y calor bajo|Scoppiettio e calore basso'),
  },
  {
    id: 'wind',
    title: 'Bozkır rüzgârı',
    subtitle: 'Geniş, boş, yavaş',
    names: R('Bozkır rüzgârı|Steppe wind|Bozqır küləyi|Степной ветер|Viento de estepa|Vento di steppa'),
    blurbs: R('Geniş, boş, yavaş|Wide, empty, slow|Geniş, boş, yavaş|Широко, пусто, медленно|Amplio, vacío, lento|Ampio, vuoto, lento'),
  },
  {
    id: 'night',
    title: 'Kır gecesi',
    subtitle: 'Cırcır ve uzak ova',
    names: R('Kır gecesi|Country night|Kənd gecəsi|Сельская ночь|Noche de campo|Notte di campagna'),
    blurbs: R('Cırcır ve uzak ova|Crickets and a far field|Cırcır və uzaq düz|Сверчки и дальнее поле|Grillos y campo lejano|Grilli e campo lontano'),
  },
  {
    id: 'storm',
    title: 'Gök gürültüsü',
    subtitle: 'Uzak gürleme, yağmur',
    names: R('Gök gürültüsü|Thunder|Göy gurultusu|Гром|Trueno|Tuono'),
    blurbs: R('Uzak gürleme, yağmur|Distant rumble, rain|Uzaq gurultu, yağış|Далёкий гул, дождь|Rumores lejanos, lluvia|Rombo lontano, pioggia'),
  },
  {
    id: 'river',
    title: 'Dere',
    subtitle: 'Taş, su, sürekli akış',
    names: R('Dere|Stream|Çay|Ручей|Arroyo|Ruscello'),
    blurbs: R('Taş, su, sürekli akış|Stone, water, steady flow|Daş, su, sabit axın|Камень, вода, ровный поток|Piedra, agua, flujo constante|Pietra, acqua, flusso costante'),
  },
  {
    id: 'birds',
    title: 'Sabah kuşları',
    subtitle: 'Uzak ötüş, yaprak',
    names: R('Sabah kuşları|Morning birds|Səhər quşları|Утренние птицы|Pájaros de mañana|Uccelli del mattino'),
    blurbs: R('Uzak ötüş, yaprak|Distant song, leaves|Uzaq ötüş, yarpaq|Далёкая песня, листва|Canto lejano, hojas|Canto lontano, foglie'),
  },
  {
    id: 'cafe',
    title: 'Sessiz kafe',
    subtitle: 'Uzak mırıltı, fincan',
    names: R('Sessiz kafe|Quiet cafe|Sakit kafe|Тихое кафе|Café silencioso|Caffè quieto'),
    blurbs: R('Uzak mırıltı, fincan|Distant murmur, cup|Uzaq pıçıltı, fincan|Далёкий шёпот, чашка|Murmullo lejano, taza|Mormorio lontano, tazza'),
  },
  {
    id: 'snow',
    title: 'Kar',
    subtitle: 'Yumuşak, yüksek, boş',
    names: R('Kar|Snow|Qar|Снег|Nieve|Neve'),
    blurbs: R('Yumuşak, yüksek, boş|Soft, high, empty|Yumşaq, yüksək, boş|Мягко, высоко, пусто|Suave, alto, vacío|Morbido, acuto, vuoto'),
  },
  {
    id: 'bowl',
    title: 'Çan kâsesi',
    subtitle: 'Tek ton, yavaş sönüş',
    names: R('Çan kâsesi|Singing bowl|Zəng qabı|Поющая чаша|Cuenco tibetano|Campana tibetana'),
    blurbs: R('Tek ton, yavaş sönüş|One tone, slow fade|Tək ton, yavaş sönmə|Один тон, медленное затухание|Un tono, desvanecer lento|Un tono, fade lento'),
  },
  {
    id: 'fan',
    title: 'Vantilatör',
    subtitle: 'Düz, kapalı oda',
    names: R('Vantilatör|Fan|Ventilyator|Вентилятор|Ventilador|Ventilatore'),
    blurbs: R('Düz, kapalı oda|Flat, closed room|Düz, bağlı otaq|Плоско, закрытая комната|Plano, habitación cerrada|Piatto, stanza chiusa'),
  },
  {
    id: 'waves',
    title: 'Açık deniz',
    subtitle: 'Daha büyük dalga',
    names: R('Açık deniz|Open sea|Açıq dəniz|Открытое море|Mar abierto|Mare aperto'),
    blurbs: R('Daha büyük dalga|A larger wave|Daha böyük dalğa|Более крупная волна|Una ola más grande|Un’onda più grande'),
  },
  {
    id: 'piano',
    title: 'Gece piyanosu',
    subtitle: 'Seyrek nota, pad',
    names: R('Gece piyanosu|Night piano|Gecə pianosu|Ночное пианино|Piano nocturno|Pianoforte notturno'),
    blurbs: R('Seyrek nota, pad|Sparse notes, pad|Seyrək nota, pad|Редкие ноты, подложка|Notas escasas, fondo|Note rade, pad'),
  },
  {
    id: 'drone',
    title: 'Sıcak drone',
    subtitle: 'Alçak beşli, yavaş salınım',
    names: R('Sıcak drone|Warm drone|İsti drone|Тёплый дрон|Drone cálido|Drone caldo'),
    blurbs: R('Alçak beşli, yavaş salınım|Low fifth, slow sway|Aşağı kvinta, yavaş yellənmə|Низкая квинта, медленное качание|Quinta baja, vaivén lento|Quinta bassa, oscillazione lenta'),
  },
  {
    id: 'ohm',
    title: 'Om yatağı',
    subtitle: 'Tek ünlü, hafif detune',
    names: R('Om yatağı|Om bed|Om yatağı|Постель ом|Cama de om|Letto di om'),
    blurbs: R('Tek ünlü, hafif detune|One vowel, slight detune|Tək sait, yüngül detune|Одна гласная, лёгкий расстрой|Una vocal, desafinación leve|Una vocale, lieve stonatura'),
  },
  {
    id: 'chime',
    title: 'Rüzgâr çanı',
    subtitle: 'Seyrek metal, uzun sönüş',
    names: R('Rüzgâr çanı|Wind chime|Külək zəngi|Ветряные колокольчики|Campanilla de viento|Campanelle a vento'),
    blurbs: R('Seyrek metal, uzun sönüş|Sparse metal, long fade|Seyrək metal, uzun sönmə|Редкий металл, долгое затухание|Metal escaso, fade largo|Metallo rado, fade lungo'),
  },
  {
    id: 'crystal',
    title: 'Kristal',
    subtitle: 'İnce katman, yavaş vuruş',
    names: R('Kristal|Crystal|Kristal|Кристалл|Cristal|Cristallo'),
    blurbs: R('İnce katman, yavaş vuruş|Thin layer, slow beat|İncə qat, yavaş vuruş|Тонкий слой, медленный удар|Capa fina, pulso lento|Strato sottile, battito lento'),
  },
  {
    id: 'gong',
    title: 'Gong',
    subtitle: 'Derin vuruş, uzun oda',
    names: R('Gong|Gong|Gong|Gong|Gong|Gong'),
    blurbs: R('Derin vuruş, uzun oda|Deep strike, long room|Dərin vuruş, uzun otaq|Глубокий удар, длинная комната|Golpe hondo, sala larga|Colpo profondo, stanza lunga'),
  },
  {
    id: 'swell',
    title: 'Nefes yatağı',
    subtitle: 'Al-ver gibi şişer, iner',
    names: R('Nefes yatağı|Breath bed|Nəfəs yatağı|Дыхательная постель|Cama de aliento|Letto di respiro'),
    blurbs: R('Al-ver gibi şişer, iner|Swells like in and out|Al-ver kimi şişir, enir|Набухает как вдох и выдох|Crece como inhalar y soltar|Si gonfia come dentro e fuori'),
  },
  {
    id: 'harp',
    title: 'Seyrek arp',
    subtitle: 'Beş nota, geniş boşluk',
    names: R('Seyrek arp|Sparse harp|Seyrək arfa|Редкая арфа|Arpa escasa|Arpa rada'),
    blurbs: R('Beş nota, geniş boşluk|Five notes, wide space|Beş nota, geniş boşluq|Пять нот, широкое пространство|Cinco notas, espacio amplio|Cinque note, spazio ampio'),
  },
  {
    id: 'white',
    title: 'Beyaz gürültü',
    subtitle: 'Düz, açık, örtü',
    names: R('Beyaz gürültü|White noise|Ağ küy|Белый шум|Ruido blanco|Rumore bianco'),
    blurbs: R('Düz, açık, örtü|Flat, open, a cover|Düz, açıq, örtük|Плоско, открыто, покрывало|Plano, abierto, una cubierta|Piatto, aperto, una coperta'),
  },
  {
    id: 'pink',
    title: 'Pembe gürültü',
    subtitle: 'Yumuşak, orta, oda',
    names: R('Pembe gürültü|Pink noise|Çəhrayı küy|Розовый шум|Ruido rosa|Rumore rosa'),
    blurbs: R('Yumuşak, orta, oda|Soft, mid, a room|Yumşaq, orta, otaq|Мягко, середина, комната|Suave, medio, una habitación|Morbido, medio, una stanza'),
  },
  {
    id: 'brown',
    title: 'Kahverengi gürültü',
    subtitle: 'Alçak, kalın, zemin',
    names: R('Kahverengi gürültü|Brown noise|Qəhvəyi küy|Коричневый шум|Ruido marrón|Rumore bruno'),
    blurbs: R('Alçak, kalın, zemin|Low, thick, ground|Aşağı, qalın, zəmin|Низко, густо, земля|Bajo, espeso, suelo|Basso, spesso, terra'),
  },
  {
    id: 'radio',
    title: 'Gece radyosu',
    subtitle: 'Yavaş nota, ılık pad',
    names: R('Gece radyosu|Night radio|Gecə radiosu|Ночное радио|Radio nocturna|Radio notturna'),
    blurbs: R('Yavaş nota, ılık pad|Slow notes, warm pad|Yavaş nota, isti pad|Медленные ноты, тёплый фон|Notas lentas, fondo cálido|Note lente, pad caldo'),
  },
  {
    id: 'flow',
    title: 'Akışa odak',
    subtitle: 'Sürekli su, yavaş beşli',
    names: R('Akışa odak|Focus on the flow|Axına fokus|Фокус на потоке|Foco en el flujo|Focus sul flusso'),
    blurbs: R('Sürekli su, yavaş beşli|Steady water, slow fifth|Sabit su, yavaş kvinta|Ровная вода, медленная квинта|Agua constante, quinta lenta|Acqua ferma, quinta lenta'),
  },
  {
    id: 'dryer',
    title: 'Saç kurutma',
    subtitle: 'Yüksek motor, ılık hava',
    names: R('Saç kurutma|Hair dryer|Saçqurutma|Фен|Secador|Asciugacapelli'),
    blurbs: R('Yüksek motor, ılık hava|High motor, warm air|Yüksək motor, isti hava|Высокий мотор, тёплый воздух|Motor alto, aire cálido|Motore alto, aria calda'),
  },
  {
    id: 'site',
    title: 'Şantiye',
    subtitle: 'Uzak vuruş, alçak uğultu',
    names: R('Şantiye|Construction|Tikinti|Стройка|Obra|Cantiere'),
    blurbs: R('Uzak vuruş, alçak uğultu|Distant hit, low hum|Uzaq vuruş, alçaq uğultu|Далёкий удар, низкий гул|Golpe lejano, zumbido bajo|Colpo lontano, ronzio basso'),
  },
  {
    id: 'lullaby',
    title: 'Çocuk uykusu',
    subtitle: 'Seyrek nota, yumuşak pad',
    names: R('Çocuk uykusu|Kids bedtime|Uşaq yuxusu|Детский сон|Hora de dormir|Nanna bimbi'),
    blurbs: R('Seyrek nota, yumuşak pad|Sparse notes, soft pad|Seyrək nota, yumşaq pad|Редкие ноты, мягкий фон|Notas escasas, fondo suave|Note rade, pad morbido'),
  },
  {
    id: 'heart',
    title: 'Kalp atışı',
    subtitle: 'Yavaş lub-dub, gövde',
    names: R('Kalp atışı|Heartbeat|Ürək döyüntüsü|Сердцебиение|Latido|Battito'),
    blurbs: R('Yavaş lub-dub, gövde|Slow lub-dub, body|Yavaş lub-dub, bədən|Медленный стук, тело|Lub-dub lento, cuerpo|Lub-dub lento, corpo'),
  },
  {
    id: 'cups',
    title: 'Kahve molası',
    subtitle: 'Buhar, fincan, oda',
    names: R('Kahve molası|Coffee break|Qəhvə fasiləsi|Кофе-пауза|Pausa café|Pausa caffè'),
    blurbs: R('Buhar, fincan, oda|Steam, cup, room|Buxar, fincan, otaq|Пар, чашка, комната|Vapor, taza, sala|Vapore, tazza, stanza'),
  },
  {
    id: 'pages',
    title: 'Sayfalar',
    subtitle: 'Kâğıt, yavaş çevirme',
    names: R('Sayfalar|Pages|Səhifələr|Страницы|Páginas|Pagine'),
    blurbs: R('Kâğıt, yavaş çevirme|Paper, slow turn|Kağız, yavaş çevirmə|Бумага, медленный оборот|Papel, paso lento|Carta, volta lenta'),
  },
  {
    id: 'grey',
    title: 'Gri gürültü',
    subtitle: 'Orta tepe, düz örtü',
    names: R('Gri gürültü|Grey noise|Boz küy|Серый шум|Ruido gris|Rumore grigio'),
    blurbs: R('Orta tepe, düz örtü|Mid bump, flat cover|Orta zirvə, düz örtük|Средний пик, ровное покрывало|Pico medio, cubierta plana|Picco medio, coperta piatta'),
  },
  {
    id: 'flight',
    title: 'Uçuş',
    subtitle: 'Kabin uğultusu, ince hava',
    names: R('Uçuş|Flight|Uçuş|Полёт|Vuelo|Volo'),
    blurbs: R('Kabin uğultusu, ince hava|Cabin hum, thin air|Kabin uğultusu, incə hava|Гул кабины, тонкий воздух|Zumbido de cabina, aire fino|Ronzio di cabina, aria sottile'),
  },
  {
    id: 'bus',
    title: 'Otobüs',
    subtitle: 'Motor, yol, ara sıra fren',
    names: R('Otobüs|Bus|Avtobus|Автобус|Autobús|Autobus'),
    blurbs: R('Motor, yol, ara sıra fren|Engine, road, rare brake|Motor, yol, ara fren|Мотор, дорога, редкий тормоз|Motor, carretera, freno raro|Motore, strada, freno raro'),
  },
  {
    id: 'murmur',
    title: 'Uzak sesler',
    subtitle: 'Filtrelenmiş kalabalık, söz yok',
    names: R('Uzak sesler|Distant voices|Uzaq səslər|Далёкие голоса|Voces lejanas|Voci lontane'),
    blurbs: R('Filtrelenmiş kalabalık, söz yok|Filtered crowd, no words|Süzülmüş izdiham, söz yox|Фильтрованная толпа, без слов|Multitud filtrada, sin palabras|Folla filtrata, senza parole'),
  },
  {
    id: 'yellow',
    title: 'Sarı gürültü',
    subtitle: 'Ilık orta bant',
    names: R('Sarı gürültü|Yellow noise|Sarı küy|Жёлтый шум|Ruido amarillo|Rumore giallo'),
    blurbs: R('Ilık orta bant|Warm mid band|İsti orta zolaq|Тёплая средняя полоса|Banda media cálida|Banda media calda'),
  },
  {
    id: 'rumble',
    title: 'Yalnız gök',
    subtitle: 'Gürleme, yağmur yok',
    names: R('Yalnız gök|Thunder only|Yalnız göy|Только гром|Solo trueno|Solo tuono'),
    blurbs: R('Gürleme, yağmur yok|Rumble, no rain|Gurultu, yağış yox|Гул, без дождя|Rumores, sin lluvia|Rombo, senza pioggia'),
  },
  {
    id: 'wood',
    title: 'Dolap',
    subtitle: 'Ahşap, seyrek gıcırtı',
    names: R('Dolap|Cabinet|Dolab|Шкаф|Armario|Armadio'),
    blurbs: R('Ahşap, seyrek gıcırtı|Wood, sparse creak|Taxta, seyrək cırılma|Дерево, редкий скрип|Madera, crujido escaso|Legno, scricchiolio rado'),
  },
  {
    id: 'blue',
    title: 'Mavi gürültü',
    subtitle: 'İnce, yüksek örtü',
    names: R('Mavi gürültü|Blue noise|Mavi küy|Синий шум|Ruido azul|Rumore blu'),
    blurbs: R('İnce, yüksek örtü|Thin, high cover|İncə, yüksək örtük|Тонкое, высокое покрывало|Capa fina y alta|Coperta sottile e acuta'),
  },
  {
    id: 'bath',
    title: 'Ses banyosu',
    subtitle: 'Çok kâse, uzun oda',
    names: R('Ses banyosu|Sound bath|Səs hamamı|Звуковая ванна|Baño de sonido|Bagno sonoro'),
    blurbs: R('Çok kâse, uzun oda|Many bowls, long room|Çox qab, uzun otaq|Много чаш, длинная комната|Varios cuencos, sala larga|Tante coppe, stanza lunga'),
  },
  {
    id: 'study',
    title: 'Yağmurlu çalışma',
    subtitle: 'Camın ardı, oda, tik-tak',
    names: R('Yağmurlu çalışma|Rainy study room|Yağışlı otaq|Дождливая учёба|Estudio con lluvia|Studio sotto la pioggia'),
    blurbs: R('Camın ardı, oda, tik-tak|Behind glass, room, tick|Şüşə arxası, otaq, tik-tak|За стеклом, комната, тик-так|Tras el cristal, sala, tic|Dietro il vetro, stanza, tic'),
  },
  {
    id: 'spa',
    title: 'Spa salonu',
    subtitle: 'Damla, ılık pad, taş',
    names: R('Spa salonu|Spa lounge|Spa zalı|Спа-зал|Salón spa|Lounge spa'),
    blurbs: R('Damla, ılık pad, taş|Drip, warm pad, stone|Damcı, isti pad, daş|Капля, тёплый фон, камень|Gota, fondo cálido, piedra|Goccia, pad caldo, pietra'),
  },
]

export function sceneName(id: string, locale: LocaleId): string {
  const scene = NATURE_SCENES.find((s) => s.id === id)
  return scene?.names[locale] || scene?.title || id
}

export function sceneBlurb(id: string, locale: LocaleId): string {
  const scene = NATURE_SCENES.find((s) => s.id === id)
  return scene?.blurbs[locale] || scene?.subtitle || ''
}

/** Built-in SOS mix (174 Hz + piano pad). */
export const SOS_DEFAULT_BED = 'sos'

const MUSIC_BED_IDS = ['piano', 'harp', 'radio', 'swell', 'ohm', 'drone', 'bowl', 'crystal', 'chime', 'gong', 'flow', 'lullaby', 'bath', 'spa'] as const

export function listBeds(): string[] {
  const nature = NATURE_SCENES.map((s) => s.id)
  const music = MUSIC_BED_IDS.filter((id) => nature.includes(id))
  const rest = nature.filter((id) => !MUSIC_BED_IDS.includes(id as (typeof MUSIC_BED_IDS)[number]))
  const tones = TONES.map((t) => t.id)
  return [SOS_DEFAULT_BED, ...music, ...tones, ...rest]
}

export function isBedId(id: string): boolean {
  return id === SOS_DEFAULT_BED || NATURE_SCENES.some((s) => s.id === id) || TONES.some((t) => t.id === id)
}

export function bedLabel(id: string, locale: LocaleId): string {
  if (id === SOS_DEFAULT_BED) return translate('sos_bed', locale)
  const tone = TONES.find((t) => t.id === id)
  if (tone) return tone.title
  return sceneName(id, locale)
}

export const TIMER_MINUTES = [5, 15, 30, 45, 60] as const
export const FREE_LISTEN_MINUTES = 5
export const PRO_LISTEN_MINUTES = 15

type StopHandle = () => void

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function fillNoise(data: Float32Array, kind: 'white' | 'pink' | 'brown') {
  let b0 = 0
  let b1 = 0
  let b2 = 0
  let b3 = 0
  let b4 = 0
  let b5 = 0
  let b6 = 0
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    if (kind === 'white') {
      data[i] = white
    } else if (kind === 'brown') {
      last = clamp(last + 0.02 * white, -1, 1)
      data[i] = last * 3.2
    } else {
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.969 * b2 + white * 0.153852
      b3 = 0.8665 * b3 + white * 0.3104856
      b4 = 0.55 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      b6 = white * 0.115926
    }
  }
}

/** One-sample WAV. HTMLAudio.play() in a gesture sets iOS playback category. */
const SILENT_WAV =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'

let htmlUnlock: HTMLAudioElement | null = null

function armHtmlUnlock() {
  try {
    if (!htmlUnlock) {
      htmlUnlock = new Audio(SILENT_WAV)
      htmlUnlock.loop = true
      htmlUnlock.volume = 0.0001
      htmlUnlock.setAttribute('playsinline', 'true')
      htmlUnlock.setAttribute('webkit-playsinline', 'true')
    }
    const p = htmlUnlock.play()
    if (p && typeof p.catch === 'function') void p.catch(() => undefined)
  } catch {
    /* ignore */
  }
}

function loopNoise(
  ctx: AudioContext,
  kind: 'white' | 'pink' | 'brown',
  seconds = 3,
  channels = 1,
): AudioBufferSourceNode {
  const length = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(channels, length, ctx.sampleRate)
  for (let c = 0; c < channels; c++) fillNoise(buffer.getChannelData(c), kind)
  const src = ctx.createBufferSource()
  src.buffer = buffer
  src.loop = true
  return src
}

function impulse(ctx: AudioContext, seconds = 2.2, decay = 3) {
  const length = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const data = buffer.getChannelData(c)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay
    }
  }
  return buffer
}

export class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private voiceBus: GainNode | null = null
  private space: ConvolverNode | null = null
  private stops: StopHandle[] = []
  private introStops: StopHandle[] = []
  private breathStops: StopHandle[] = []
  private timer: number | null = null
  private epoch = 0
  playing = false
  label = ''
  route = ''
  id = ''
  kind = ''
  now = { playing: false, label: '', route: '', id: '', kind: '' }
  private restGain = 0.4
  private bedLevel = 0.7
  private held = false
  /** Soften the bed under speech; never mute it. */
  private ducked = false
  private listeners = new Set<() => void>()
  /**
   * Claimed synchronously before the first await in playOnboard(), since `playing`
   * only flips true after one. Onboarding taps fire both onPointerDown and onClick
   * for the same gesture, so two calls can otherwise both pass the `playing` check
   * and race — the second's stop() cutting off the first's freshly started nodes.
   */
  private startingLabel = ''

  constructor() {
    try {
      const n = Number(localStorage.getItem('steady.bedLevel'))
      if (Number.isFinite(n)) this.bedLevel = clamp(n, 0, 1)
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.unlock()
      })
    }
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  private emit() {
    this.now = {
      playing: this.playing,
      label: this.label,
      route: this.route,
      id: this.id,
      kind: this.kind,
    }
    this.listeners.forEach((fn) => fn())
  }

  private bootGraph() {
    if (!this.ctx) {
      const Ctor = window.AudioContext || window.webkitAudioContext
      this.ctx = new Ctor()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.4
      this.master.connect(this.ctx.destination)
      this.voiceBus = this.ctx.createGain()
      this.voiceBus.gain.value = 1.55
      this.voiceBus.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
  }

  async ensure(): Promise<AudioContext> {
    this.bootGraph()
    if (this.ctx!.state === 'suspended') await this.ctx!.resume()
    return this.ctx!
  }

  /**
   * Must run in the same turn as a tap. iOS drops AudioContext.resume after await.
   * A tiny HTMLAudio play also flips the session past the silent switch.
   */
  unlock() {
    this.bootGraph()
    armHtmlUnlock()
  }

  /** One-shot dawn sting for the splash. No voice, no now-playing bar. */
  async playIntroSfx() {
    this.unlock()
    this.stopIntroSfx()
    const ctx = await this.ensure()
    const t0 = ctx.currentTime
    const bus = ctx.createGain()
    bus.gain.value = 0.85
    bus.connect(ctx.destination)

    const seconds = 1.2
    const length = Math.floor(ctx.sampleRate * seconds)
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    fillNoise(buffer.getChannelData(0), 'pink')
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.Q.value = 0.7
    bp.frequency.setValueAtTime(280, t0)
    bp.frequency.exponentialRampToValueAtTime(1400, t0 + 0.85)
    const ng = ctx.createGain()
    ng.gain.setValueAtTime(0.0001, t0)
    ng.gain.linearRampToValueAtTime(0.16, t0 + 0.1)
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.35)
    noise.connect(bp)
    bp.connect(ng)
    ng.connect(bus)
    noise.start(t0)

    const bells = [
      { f: 392, at: 0.06, g: 0.11 },
      { f: 523.25, at: 0.38, g: 0.13 },
      { f: 659.25, at: 0.72, g: 0.07 },
    ]
    const oscs: OscillatorNode[] = []
    for (const bell of bells) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = bell.f
      const g = ctx.createGain()
      const start = t0 + bell.at
      g.gain.setValueAtTime(0.0001, start)
      g.gain.linearRampToValueAtTime(bell.g, start + 0.035)
      g.gain.exponentialRampToValueAtTime(0.0001, start + 2.15)
      o.connect(g)
      g.connect(bus)
      o.start(start)
      o.stop(start + 2.3)
      oscs.push(o)
    }

    this.introStops.push(() => {
      try {
        noise.stop()
      } catch {
        /* already stopped */
      }
      oscs.forEach((o) => {
        try {
          o.stop()
        } catch {
          /* already stopped */
        }
      })
      try {
        bus.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  stopIntroSfx() {
    this.introStops.forEach((h) => h())
    this.introStops = []
  }

  stopBreath() {
    this.breathStops.forEach((h) => h())
    this.breathStops = []
  }

  /** Air in / air out, timed to the phase. Not speech. */
  async playBreathPhase(kind: 'in' | 'out', seconds: number) {
    this.unlock()
    this.stopBreath()
    const ctx = await this.ensure()
    const t0 = ctx.currentTime
    const dur = Math.max(0.7, seconds)
    const bus = ctx.createGain()
    bus.connect(ctx.destination)

    const noise = loopNoise(ctx, kind === 'in' ? 'pink' : 'brown', 2)
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = kind === 'in' ? 180 : 90
    const filter = ctx.createBiquadFilter()
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t0)
    if (kind === 'in') {
      filter.type = 'bandpass'
      filter.Q.value = 0.85
      filter.frequency.setValueAtTime(420, t0)
      filter.frequency.exponentialRampToValueAtTime(1680, t0 + dur * 0.78)
      g.gain.linearRampToValueAtTime(0.13, t0 + Math.min(0.28, dur * 0.2))
      g.gain.setValueAtTime(0.13, t0 + dur * 0.72)
    } else {
      filter.type = 'lowpass'
      filter.Q.value = 0.45
      filter.frequency.setValueAtTime(1500, t0)
      filter.frequency.exponentialRampToValueAtTime(240, t0 + dur * 0.88)
      g.gain.linearRampToValueAtTime(0.16, t0 + Math.min(0.22, dur * 0.12))
      g.gain.setValueAtTime(0.16, t0 + dur * 0.7)
    }
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 0.06)
    noise.connect(hp)
    hp.connect(filter)
    filter.connect(g)
    g.connect(bus)
    noise.start(t0)
    noise.stop(t0 + dur + 0.12)

    this.breathStops.push(() => {
      try {
        noise.stop()
      } catch {
        /* already stopped */
      }
      try {
        bus.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  ctxTime() {
    return this.ctx?.currentTime ?? 0
  }

  voiceGain() {
    return this.voiceBus
  }

  setVoiceLevel(n: number) {
    if (!this.voiceBus) return
    this.voiceBus.gain.value = clamp(n, 0, 1) * 1.55
  }

  private track(stop: StopHandle) {
    this.stops.push(stop)
  }

  private connect(node: AudioNode) {
    if (!this.master) return
    node.connect(this.master)
  }

  private startSpace(ctx: AudioContext, wet = 0.38) {
    const conv = ctx.createConvolver()
    conv.buffer = impulse(ctx)
    const g = ctx.createGain()
    g.gain.value = wet
    conv.connect(g)
    this.connect(g)
    this.space = conv
    this.track(() => {
      try {
        conv.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
      this.space = null
    })
  }

  private out(node: AudioNode, dry = 1, send = 0.5) {
    const ctx = this.ctx
    if (!ctx) return
    const d = ctx.createGain()
    d.gain.value = dry
    node.connect(d)
    this.connect(d)
    this.track(() => {
      try {
        d.disconnect()
      } catch {
        /* already stopped */
      }
    })
    if (!this.space) return
    const s = ctx.createGain()
    s.gain.value = send
    node.connect(s)
    s.connect(this.space)
    this.track(() => {
      try {
        s.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private warmPad(ctx: AudioContext, freqs: number[], gain = 0.055) {
    for (const f of freqs) {
      for (const cents of [-0.35, 0, 0.4]) {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = f * 2 ** (cents / 1200)
        const g = ctx.createGain()
        g.gain.value = gain / freqs.length
        o.connect(g)
        this.out(g, 0.65, 0.85)
        o.start()
        this.track(() => {
          try {
            o.stop()
            o.disconnect()
            g.disconnect()
          } catch {
            /* already stopped */
          }
        })
      }
    }
  }

  private fadeMaster(to: number, seconds: number) {
    if (!this.ctx || !this.master) return
    const g = this.master.gain
    const now = this.ctx.currentTime
    g.cancelScheduledValues(now)
    g.setValueAtTime(g.value, now)
    g.linearRampToValueAtTime(to, now + seconds)
  }

  stop(fade = 0.6, keepBreath = false) {
    if (!keepBreath) this.stopBreath()
    if (this.timer != null) {
      window.clearTimeout(this.timer)
      this.timer = null
    }
    const epoch = this.epoch
    this.fadeMaster(0.0001, fade)
    const ctx = this.ctx
    const handles = [...this.stops]
    this.stops = []
    this.playing = false
    this.label = ''
    this.route = ''
    this.id = ''
    this.kind = ''
    this.held = false
    this.ducked = false
    this.emit()
    window.setTimeout(() => {
      handles.forEach((h) => h())
      if (this.epoch === epoch && this.master && ctx) {
        this.master.gain.setValueAtTime(this.restGain * this.bedLevel, ctx.currentTime)
      }
    }, fade * 1000 + 40)
  }

  private beginPlay(
    label: string,
    targetGain: number,
    fadeIn: number,
    extra?: { route?: string; id?: string; kind?: string },
  ) {
    this.epoch += 1
    this.playing = true
    this.label = label
    this.route = extra?.route ?? ''
    this.id = extra?.id ?? ''
    this.kind = extra?.kind ?? ''
    this.restGain = targetGain
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(0.0001, now)
    this.fadeMaster(this.held ? 0.0008 : this.bedTarget(), fadeIn)
    this.emit()
  }

  private bedTarget() {
    const duck = this.kind === 'sos' ? 0.42 : 0.55
    return this.restGain * this.bedLevel * (this.ducked ? duck : 1)
  }

  duck(on: boolean) {
    this.ducked = on
    if (!this.playing || this.held) return
    this.fadeMaster(this.bedTarget(), 0.4)
  }

  hold(on: boolean) {
    this.held = on
    if (!this.playing) return
    if (on) this.fadeMaster(this.restGain * this.bedLevel * 0.62, 0.25)
    else this.fadeMaster(this.bedTarget(), 0.28)
  }

  getBedLevel() {
    return this.bedLevel
  }

  setBedLevel(n: number) {
    this.bedLevel = clamp(n, 0, 1)
    try {
      localStorage.setItem('steady.bedLevel', String(this.bedLevel))
    } catch {
      /* ignore */
    }
    if (!this.playing || this.held) return
    this.fadeMaster(this.bedTarget(), 0.18)
  }

  hushForVoice() {
    if (!this.playing) return
    if (this.kind === 'pad' || this.kind === 'onboard') return
    this.duck(true)
  }

  setTimer(minutes: number, onDone?: () => void) {
    if (this.timer != null) window.clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      this.stop(2.4)
      onDone?.()
    }, minutes * 60 * 1000)
  }

  async playSosBed() {
    this.unlock()
    const ctx = await this.ensure()
    this.stop(0.05, true)
    await this.ensure()
    this.beginPlay('SOS', 0.4, 1.6, { route: '/sos', id: 'sos', kind: 'sos' })
    this.startSpace(ctx, 0.42)
    this.warmPad(ctx, [87, 130.81, 174], 0.028)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 174
    const oscGain = ctx.createGain()
    oscGain.gain.value = 0.055
    osc.connect(oscGain)
    this.out(oscGain, 0.85, 0.4)
    osc.start()
    this.track(() => {
      try {
        osc.stop()
        osc.disconnect()
        oscGain.disconnect()
      } catch {
        /* already stopped */
      }
    })

    const brown = loopNoise(ctx, 'brown', 5, 2)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 180
    const brownGain = ctx.createGain()
    brownGain.gain.value = 0.08
    brown.connect(filter)
    filter.connect(brownGain)
    this.out(brownGain, 1, 0.22)
    brown.start()
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        filter.disconnect()
        brownGain.disconnect()
      } catch {
        /* already stopped */
      }
    })

    this.calmMusic(ctx)
  }

  async playTone(hz: number, label: string, id = String(hz)) {
    this.unlock()
    const ctx = await this.ensure()
    this.stop(0.08, true)
    await this.ensure()
    this.beginPlay(label, 0.34, 1.8, { route: `/session/tone/${id}`, id, kind: 'tone' })
    this.startSpace(ctx, 0.4)
    this.warmPad(ctx, [hz / 2, hz, hz * 1.5], 0.045)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = hz
    const oscGain = ctx.createGain()
    oscGain.gain.value = 0.14
    osc.connect(oscGain)
    this.out(oscGain, 0.8, 0.55)
    osc.start()
    this.track(() => {
      try {
        osc.stop()
        osc.disconnect()
        oscGain.disconnect()
      } catch {
        /* already stopped */
      }
    })

    const brown = loopNoise(ctx, 'brown', 5, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 200
    const g = ctx.createGain()
    g.gain.value = 0.1
    brown.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.3)
    brown.start()
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  async playOnboard() {
    this.unlock()
    if (this.playing && this.label === 'Onboard') return
    if (this.startingLabel === 'Onboard') return
    this.startingLabel = 'Onboard'
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
    this.startingLabel = ''
    this.beginPlay('Onboard', 0.4, 3.2, { kind: 'onboard' })
    this.startSpace(ctx, 0.58)
    this.warmPad(ctx, [98, 146.83, 196, 246.94], 0.038)

    const brown = loopNoise(ctx, 'brown', 7, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 140
    const g = ctx.createGain()
    g.gain.value = 0.07
    brown.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.45)
    brown.start()
    this.lfo(ctx, g.gain, 0.04, 0.018, 0.07)
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })

    const notes = [196, 220, 246.94, 293.66, 329.63, 261.63, 220, 196]
    let i = 0
    const motif = () => {
      if (!this.playing || this.label !== 'Onboard' || !this.ctx) return
      const f = notes[i % notes.length]!
      i += 1
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const og = ctx.createGain()
      const now = ctx.currentTime
      og.gain.setValueAtTime(0.0001, now)
      og.gain.linearRampToValueAtTime(0.042, now + 0.45)
      og.gain.exponentialRampToValueAtTime(0.0001, now + 3.6)
      o.connect(og)
      this.out(og, 0.45, 0.95)
      o.start(now)
      o.stop(now + 3.8)
    }
    motif()
    const id = window.setInterval(motif, 2600)
    this.track(() => window.clearInterval(id))
  }

  async playPad() {
    this.unlock()
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
    this.beginPlay('Yatak', 0.3, 2.6, { kind: 'pad' })
    this.startSpace(ctx, 0.48)
    this.warmPad(ctx, [110, 164.81, 220, 329.63], 0.05)
    const brown = loopNoise(ctx, 'brown', 6, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 160
    const g = ctx.createGain()
    g.gain.value = 0.08
    brown.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.4)
    brown.start()
    this.lfo(ctx, g.gain, 0.05, 0.02, 0.08)
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  async playBed(id: string) {
    this.unlock()
    if (id === SOS_DEFAULT_BED) return this.playSosBed()
    const tone = TONES.find((t) => t.id === id)
    if (tone) return this.playTone(tone.hz, tone.title, tone.id)
    return this.playNature(id)
  }

  async playNature(id: string, withMusic = false) {
    this.unlock()
    const ctx = await this.ensure()
    this.stop(0.08, true)
    await this.ensure()
    const scene = NATURE_SCENES.find((s) => s.id === id)
    this.beginPlay(scene?.title ?? 'Doğa', withMusic ? 0.44 : 0.4, 2, {
      route: `/session/nature/${id}`,
      id,
      kind: 'nature',
    })
    this.startSpace(ctx, withMusic ? 0.44 : 0.36)

    if (id === 'rain') this.rain(ctx)
    else if (id === 'ocean') this.ocean(ctx)
    else if (id === 'forest') this.forest(ctx)
    else if (id === 'fire') this.fire(ctx)
    else if (id === 'wind') this.wind(ctx)
    else if (id === 'storm') this.storm(ctx)
    else if (id === 'river') this.river(ctx)
    else if (id === 'birds') this.birds(ctx)
    else if (id === 'cafe') this.cafe(ctx)
    else if (id === 'snow') this.snow(ctx)
    else if (id === 'bowl') this.bowl(ctx)
    else if (id === 'fan') this.fan(ctx)
    else if (id === 'waves') this.waves(ctx)
    else if (id === 'piano') this.piano(ctx)
    else if (id === 'drone') this.drone(ctx)
    else if (id === 'ohm') this.ohm(ctx)
    else if (id === 'chime') this.chime(ctx)
    else if (id === 'crystal') this.crystal(ctx)
    else if (id === 'gong') this.gong(ctx)
    else if (id === 'swell') this.swell(ctx)
    else if (id === 'harp') this.harp(ctx)
    else if (id === 'white') this.noiseBed(ctx, 'white', 0.16)
    else if (id === 'pink') this.noiseBed(ctx, 'pink', 0.2)
    else if (id === 'brown') this.noiseBed(ctx, 'brown', 0.26)
    else if (id === 'radio') this.radio(ctx)
    else if (id === 'flow') this.flow(ctx)
    else if (id === 'dryer') this.dryer(ctx)
    else if (id === 'site') this.site(ctx)
    else if (id === 'lullaby') this.lullaby(ctx)
    else if (id === 'heart') this.heart(ctx)
    else if (id === 'cups') this.cups(ctx)
    else if (id === 'pages') this.pages(ctx)
    else if (id === 'grey') this.grey(ctx)
    else if (id === 'flight') this.flight(ctx)
    else if (id === 'bus') this.bus(ctx)
    else if (id === 'murmur') this.murmur(ctx)
    else if (id === 'yellow') this.yellow(ctx)
    else if (id === 'rumble') this.rumble(ctx)
    else if (id === 'wood') this.wood(ctx)
    else if (id === 'blue') this.blue(ctx)
    else if (id === 'bath') this.bath(ctx)
    else if (id === 'study') this.study(ctx)
    else if (id === 'spa') this.spa(ctx)
    else this.night(ctx)
    if (withMusic) this.calmMusic(ctx)
  }

  /** Slow piano and pad under SOS / guided sessions. Not a beep, not a toy loop. */
  private calmMusic(ctx: AudioContext) {
    this.warmPad(ctx, [110, 164.81, 220, 329.63], 0.042)
    const chords = [
      [110, 164.81, 220],
      [130.81, 196, 261.63],
      [87.31, 130.81, 174.61],
      [98, 146.83, 196],
    ]
    let c = 0
    const swell = () => {
      if (!this.playing || !this.ctx) return
      const now = ctx.currentTime
      const chord = chords[c % chords.length]!
      c += 1
      for (const f of chord) {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = f
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.0001, now)
        g.gain.linearRampToValueAtTime(0.068, now + 1.6)
        g.gain.setValueAtTime(0.068, now + 6.2)
        g.gain.exponentialRampToValueAtTime(0.0001, now + 11)
        o.connect(g)
        this.out(g, 0.55, 0.95)
        o.start(now)
        o.stop(now + 11.2)
      }
    }
    swell()
    const swellId = window.setInterval(swell, 10000)
    const melody = [220, 246.94, 261.63, 293.66, 329.63, 392, 329.63, 261.63]
    let m = 0
    const note = () => {
      if (!this.playing || !this.ctx) return
      const f = melody[m % melody.length]!
      m += 1
      const now = ctx.currentTime
      const o = ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.1, now + 0.16)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 4.8)
      o.connect(g)
      this.out(g, 0.52, 0.94)
      o.start(now)
      o.stop(now + 5.1)
      const air = ctx.createOscillator()
      air.type = 'sine'
      air.frequency.value = f * 2
      const ag = ctx.createGain()
      ag.gain.setValueAtTime(0.0001, now)
      ag.gain.linearRampToValueAtTime(0.028, now + 0.22)
      ag.gain.exponentialRampToValueAtTime(0.0001, now + 3.4)
      air.connect(ag)
      this.out(ag, 0.32, 0.9)
      air.start(now)
      air.stop(now + 3.6)
    }
    const first = window.setTimeout(note, 700)
    const noteId = window.setInterval(note, 4600)
    this.track(() => {
      window.clearTimeout(first)
      window.clearInterval(swellId)
      window.clearInterval(noteId)
    })
  }

  private lfo(ctx: AudioContext, param: AudioParam, rate: number, depth: number, base: number) {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = rate
    const g = ctx.createGain()
    g.gain.value = depth
    param.value = base
    osc.connect(g)
    g.connect(param)
    osc.start()
    this.track(() => {
      try {
        osc.stop()
        osc.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private rain(ctx: AudioContext) {
    this.warmPad(ctx, [98, 147], 0.02)
    const src = loopNoise(ctx, 'white', 3, 2)
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 700
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 2100
    bp.Q.value = 0.55
    const g = ctx.createGain()
    g.gain.value = 0.24
    src.connect(hp)
    hp.connect(bp)
    bp.connect(g)
    this.out(g, 0.9, 0.45)
    src.start()
    this.lfo(ctx, g.gain, 0.11, 0.05, 0.24)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        hp.disconnect()
        bp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const drip = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.15)
      const f = ctx.createBiquadFilter()
      f.type = 'bandpass'
      f.frequency.value = 1800 + Math.random() * 1600
      f.Q.value = 4
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.0001, ctx.currentTime)
      cg.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.02)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)
      n.connect(f)
      f.connect(cg)
      this.out(cg, 0.7, 0.6)
      n.start()
      n.stop(ctx.currentTime + 0.2)
    }
    const id = window.setInterval(drip, 1400)
    this.track(() => window.clearInterval(id))
  }

  private ocean(ctx: AudioContext) {
    this.warmPad(ctx, [55, 82.4, 110], 0.035)
    const src = loopNoise(ctx, 'brown', 6, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 480
    const g = ctx.createGain()
    g.gain.value = 0.3
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.5)
    src.start()
    this.lfo(ctx, g.gain, 0.06, 0.14, 0.28)
    this.lfo(ctx, lp.frequency, 0.045, 160, 460)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private forest(ctx: AudioContext) {
    this.warmPad(ctx, [123, 185], 0.045)
    const src = loopNoise(ctx, 'pink', 4, 2)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 900
    bp.Q.value = 0.4
    const g = ctx.createGain()
    g.gain.value = 0.3
    src.connect(bp)
    bp.connect(g)
    this.out(g, 0.9, 0.5)
    src.start()
    this.lfo(ctx, g.gain, 0.07, 0.06, 0.3)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        bp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const chirp = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'sine'
      const start = 1600 + Math.random() * 1200
      o.frequency.setValueAtTime(start, ctx.currentTime)
      o.frequency.exponentialRampToValueAtTime(start * 1.18, ctx.currentTime + 0.22)
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.0001, ctx.currentTime)
      cg.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28)
      o.connect(cg)
      this.out(cg, 0.55, 0.8)
      o.start()
      o.stop(ctx.currentTime + 0.3)
    }
    const id = window.setInterval(chirp, 2600)
    this.track(() => window.clearInterval(id))
  }

  private fire(ctx: AudioContext) {
    this.warmPad(ctx, [73, 110], 0.022)
    const src = loopNoise(ctx, 'pink', 3, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 720
    const g = ctx.createGain()
    g.gain.value = 0.2
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.3)
    src.start()
    this.lfo(ctx, g.gain, 0.7, 0.04, 0.2)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const crackle = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.18)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 1400
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.06, ctx.currentTime)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)
      n.connect(hp)
      hp.connect(cg)
      this.out(cg, 0.8, 0.25)
      n.start()
      n.stop(ctx.currentTime + 0.12)
    }
    const id = window.setInterval(crackle, 420)
    this.track(() => window.clearInterval(id))
  }

  private wind(ctx: AudioContext) {
    this.warmPad(ctx, [87, 130], 0.025)
    const src = loopNoise(ctx, 'pink', 5, 2)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 480
    bp.Q.value = 0.35
    const g = ctx.createGain()
    g.gain.value = 0.22
    src.connect(bp)
    bp.connect(g)
    this.out(g, 0.9, 0.55)
    src.start()
    this.lfo(ctx, g.gain, 0.05, 0.09, 0.2)
    this.lfo(ctx, bp.frequency, 0.035, 200, 500)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        bp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private night(ctx: AudioContext) {
    this.warmPad(ctx, [98, 147, 196], 0.04)
    const src = loopNoise(ctx, 'brown', 5, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 150
    const g = ctx.createGain()
    g.gain.value = 0.22
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.45)
    src.start()
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const cricket = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = 3800 + Math.random() * 500
      const cg = ctx.createGain()
      cg.gain.value = 0.018
      o.connect(cg)
      this.out(cg, 0.4, 0.7)
      o.start()
      o.stop(ctx.currentTime + 0.05)
    }
    const id = window.setInterval(cricket, 260)
    this.track(() => window.clearInterval(id))
  }

  private storm(ctx: AudioContext) {
    this.rain(ctx)
    const rumble = loopNoise(ctx, 'brown', 6, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 90
    const g = ctx.createGain()
    g.gain.value = 0.12
    rumble.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.35)
    rumble.start()
    this.track(() => {
      try {
        rumble.stop()
        rumble.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const crack = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.35, 2)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 900
      const cg = ctx.createGain()
      const now = ctx.currentTime
      cg.gain.setValueAtTime(0.0001, now)
      cg.gain.linearRampToValueAtTime(0.16, now + 0.04)
      cg.gain.exponentialRampToValueAtTime(0.0001, now + 0.55)
      n.connect(hp)
      hp.connect(cg)
      this.out(cg, 0.7, 0.5)
      n.start()
      n.stop(now + 0.6)
    }
    const id = window.setInterval(crack, 7200)
    this.track(() => window.clearInterval(id))
  }

  private river(ctx: AudioContext) {
    this.warmPad(ctx, [98, 147], 0.02)
    const src = loopNoise(ctx, 'pink', 4, 2)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 620
    bp.Q.value = 0.55
    const g = ctx.createGain()
    g.gain.value = 0.22
    src.connect(bp)
    bp.connect(g)
    this.out(g, 0.9, 0.5)
    src.start()
    this.lfo(ctx, g.gain, 0.09, 0.05, 0.22)
    this.lfo(ctx, bp.frequency, 0.07, 80, 640)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        bp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private birds(ctx: AudioContext) {
    this.forest(ctx)
    const chirp = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'sine'
      const start = 1800 + Math.random() * 1400
      o.frequency.setValueAtTime(start, ctx.currentTime)
      o.frequency.exponentialRampToValueAtTime(start * (1.1 + Math.random() * 0.2), ctx.currentTime + 0.18)
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.0001, ctx.currentTime)
      cg.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.04)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)
      o.connect(cg)
      this.out(cg, 0.45, 0.85)
      o.start()
      o.stop(ctx.currentTime + 0.24)
    }
    const id = window.setInterval(chirp, 1600)
    this.track(() => window.clearInterval(id))
  }

  private cafe(ctx: AudioContext) {
    this.warmPad(ctx, [110, 165], 0.018)
    const src = loopNoise(ctx, 'brown', 5, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 380
    const g = ctx.createGain()
    g.gain.value = 0.16
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.4)
    src.start()
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const clink = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = 1200 + Math.random() * 800
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.03, ctx.currentTime)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2)
      o.connect(cg)
      this.out(cg, 0.5, 0.6)
      o.start()
      o.stop(ctx.currentTime + 0.22)
    }
    const id = window.setInterval(clink, 3400)
    this.track(() => window.clearInterval(id))
  }

  private snow(ctx: AudioContext) {
    this.warmPad(ctx, [196, 247], 0.03)
    const src = loopNoise(ctx, 'white', 4, 2)
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 1800
    const g = ctx.createGain()
    g.gain.value = 0.06
    src.connect(hp)
    hp.connect(g)
    this.out(g, 0.7, 0.55)
    src.start()
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        hp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private bowl(ctx: AudioContext) {
    const strike = () => {
      if (!this.playing || !this.ctx) return
      const now = ctx.currentTime
      for (const f of [256, 384, 512]) {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = f
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.0001, now)
        g.gain.linearRampToValueAtTime(0.12, now + 0.08)
        g.gain.exponentialRampToValueAtTime(0.0001, now + 6.5)
        o.connect(g)
        this.out(g, 0.55, 0.95)
        o.start(now)
        o.stop(now + 6.8)
      }
    }
    strike()
    const id = window.setInterval(strike, 7800)
    this.track(() => window.clearInterval(id))
  }

  private fan(ctx: AudioContext) {
    const src = loopNoise(ctx, 'brown', 4, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 220
    const g = ctx.createGain()
    g.gain.value = 0.24
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.15)
    src.start()
    this.lfo(ctx, g.gain, 0.18, 0.02, 0.24)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private waves(ctx: AudioContext) {
    this.ocean(ctx)
    const src = loopNoise(ctx, 'brown', 7, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 280
    const g = ctx.createGain()
    g.gain.value = 0.18
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.55)
    src.start()
    this.lfo(ctx, g.gain, 0.035, 0.12, 0.18)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private piano(ctx: AudioContext) {
    this.warmPad(ctx, [110, 165, 220], 0.04)
    const notes = [220, 246.94, 261.63, 329.63, 392, 329.63, 261.63, 220]
    let i = 0
    const play = () => {
      if (!this.playing || !this.ctx) return
      const f = notes[i % notes.length]!
      i += 1
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const g = ctx.createGain()
      const now = ctx.currentTime
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.085, now + 0.12)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)
      o.connect(g)
      this.out(g, 0.5, 0.9)
      o.start(now)
      o.stop(now + 3)
    }
    play()
    const id = window.setInterval(play, 3200)
    this.track(() => window.clearInterval(id))
  }

  private drone(ctx: AudioContext) {
    this.warmPad(ctx, [65.41, 98, 130.81, 196], 0.055)
    const brown = loopNoise(ctx, 'brown', 7, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 120
    const g = ctx.createGain()
    g.gain.value = 0.07
    brown.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.45)
    brown.start()
    this.lfo(ctx, g.gain, 0.04, 0.02, 0.07)
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private ohm(ctx: AudioContext) {
    this.warmPad(ctx, [136.1, 272.2, 204.15], 0.05)
    for (const [f, detune] of [
      [136.1, -6],
      [136.1, 7],
      [272.2, 4],
    ] as const) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      o.detune.value = detune
      const g = ctx.createGain()
      g.gain.value = 0.07
      o.connect(g)
      this.out(g, 0.7, 0.85)
      o.start()
      this.track(() => {
        try {
          o.stop()
          o.disconnect()
          g.disconnect()
        } catch {
          /* already stopped */
        }
      })
    }
    const src = loopNoise(ctx, 'pink', 5, 2)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 520
    bp.Q.value = 2.4
    const g = ctx.createGain()
    g.gain.value = 0.06
    src.connect(bp)
    bp.connect(g)
    this.out(g, 0.8, 0.6)
    src.start()
    this.lfo(ctx, bp.frequency, 0.07, 40, 520)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        bp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private chime(ctx: AudioContext) {
    this.warmPad(ctx, [196, 247], 0.018)
    const notes = [1047, 1175, 1319, 1568, 1760, 2093]
    const ring = () => {
      if (!this.playing || !this.ctx) return
      const f = notes[Math.floor(Math.random() * notes.length)]!
      const now = ctx.currentTime
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.045, now + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 4.8)
      o.connect(g)
      this.out(g, 0.45, 0.95)
      o.start(now)
      o.stop(now + 5)
    }
    ring()
    const id = window.setInterval(ring, 2800)
    this.track(() => window.clearInterval(id))
  }

  private crystal(ctx: AudioContext) {
    this.warmPad(ctx, [264, 396], 0.03)
    for (const [f, cents] of [
      [528, -3],
      [528, 5],
      [792, 2],
      [1056, -4],
    ] as const) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      o.detune.value = cents
      const g = ctx.createGain()
      g.gain.value = 0.045
      o.connect(g)
      this.out(g, 0.55, 0.9)
      o.start()
      this.lfo(ctx, g.gain, 0.03, 0.016, 0.045)
      this.track(() => {
        try {
          o.stop()
          o.disconnect()
          g.disconnect()
        } catch {
          /* already stopped */
        }
      })
    }
  }

  private gong(ctx: AudioContext) {
    const brown = loopNoise(ctx, 'brown', 6, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 90
    const bed = ctx.createGain()
    bed.gain.value = 0.06
    brown.connect(lp)
    lp.connect(bed)
    this.out(bed, 1, 0.4)
    brown.start()
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        lp.disconnect()
        bed.disconnect()
      } catch {
        /* already stopped */
      }
    })
    const strike = () => {
      if (!this.playing || !this.ctx) return
      const now = ctx.currentTime
      for (const f of [55, 82.4, 110, 164.8]) {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = f
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.0001, now)
        g.gain.linearRampToValueAtTime(0.09, now + 0.04)
        g.gain.exponentialRampToValueAtTime(0.0001, now + 8.2)
        o.connect(g)
        this.out(g, 0.85, 0.7)
        o.start(now)
        o.stop(now + 8.5)
      }
    }
    strike()
    const id = window.setInterval(strike, 12000)
    this.track(() => window.clearInterval(id))
  }

  private swell(ctx: AudioContext) {
    this.warmPad(ctx, [110, 164.81, 220, 329.63], 0.06)
    const src = loopNoise(ctx, 'pink', 6, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 240
    const g = ctx.createGain()
    g.gain.value = 0.16
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.5)
    src.start()
    this.lfo(ctx, g.gain, 0.085, 0.06, 0.16)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private harp(ctx: AudioContext) {
    this.warmPad(ctx, [130.81, 196, 261.63], 0.028)
    const notes = [261.63, 293.66, 329.63, 392, 440, 392, 329.63]
    let i = 0
    const play = () => {
      if (!this.playing || !this.ctx) return
      const f = notes[i % notes.length]!
      i += 1
      const now = ctx.currentTime
      const o = ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.07, now + 0.06)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.4)
      o.connect(g)
      this.out(g, 0.5, 0.92)
      o.start(now)
      o.stop(now + 3.6)
    }
    play()
    const id = window.setInterval(play, 2400)
    this.track(() => window.clearInterval(id))
  }

  private noiseBed(ctx: AudioContext, kind: 'white' | 'pink' | 'brown', gain: number) {
    this.warmPad(ctx, kind === 'white' ? [196, 247] : [82.4, 110], kind === 'brown' ? 0.04 : 0.02)
    const src = loopNoise(ctx, kind, kind === 'brown' ? 6 : 3, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = kind === 'white' ? 'highpass' : 'lowpass'
    lp.frequency.value = kind === 'white' ? 400 : kind === 'pink' ? 1800 : 420
    const g = ctx.createGain()
    g.gain.value = gain
    src.connect(lp)
    lp.connect(g)
    this.out(g, 0.95, 0.45)
    src.start()
    this.lfo(ctx, g.gain, 0.05, gain * 0.12, gain)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        lp.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private radio(ctx: AudioContext) {
    this.warmPad(ctx, [110, 164.81, 220, 329.63], 0.038)
    const notes = [220, 246.94, 277.18, 329.63, 369.99, 329.63, 277.18]
    let i = 0
    const play = () => {
      if (!this.playing || !this.ctx) return
      const f = notes[i % notes.length]!
      i += 1
      const now = ctx.currentTime
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.035, now + 0.08)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)
      o.connect(g)
      this.out(g, 0.55, 0.88)
      o.start(now)
      o.stop(now + 3)
    }
    play()
    const id = window.setInterval(play, 3200)
    this.track(() => window.clearInterval(id))
    const brown = loopNoise(ctx, 'brown', 6, 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 280
    const ng = ctx.createGain()
    ng.gain.value = 0.06
    brown.connect(lp)
    lp.connect(ng)
    this.out(ng, 1, 0.4)
    brown.start()
    this.track(() => {
      try {
        brown.stop()
        brown.disconnect()
        lp.disconnect()
        ng.disconnect()
      } catch {
        /* already stopped */
      }
    })
  }

  private liveNoise(
    ctx: AudioContext,
    kind: 'white' | 'pink' | 'brown',
    type: BiquadFilterType,
    freq: number,
    gain: number,
    extra?: { q?: number; rate?: number; depth?: number; pad?: number[]; dry?: number; send?: number; peak?: number },
  ) {
    if (extra?.pad) this.warmPad(ctx, extra.pad, 0.02)
    const src = loopNoise(ctx, kind, kind === 'brown' ? 6 : 3.5, 2)
    const f = ctx.createBiquadFilter()
    f.type = type
    f.frequency.value = freq
    if (extra?.q != null) f.Q.value = extra.q
    if (type === 'peaking') f.gain.value = extra?.peak ?? 8
    const g = ctx.createGain()
    g.gain.value = gain
    src.connect(f)
    f.connect(g)
    this.out(g, extra?.dry ?? 0.95, extra?.send ?? 0.45)
    src.start()
    if (extra?.rate) this.lfo(ctx, g.gain, extra.rate, extra.depth ?? gain * 0.12, gain)
    this.track(() => {
      try {
        src.stop()
        src.disconnect()
        f.disconnect()
        g.disconnect()
      } catch {
        /* already stopped */
      }
    })
    return f
  }

  private flow(ctx: AudioContext) {
    this.warmPad(ctx, [146.83, 220, 293.66], 0.03)
    const water = this.liveNoise(ctx, 'pink', 'bandpass', 880, 0.2, { q: 0.7, rate: 0.08, depth: 0.05 })
    this.lfo(ctx, water.frequency, 0.05, 120, 880)
    this.liveNoise(ctx, 'white', 'highpass', 2400, 0.04, { q: 0.4 })
  }

  private dryer(ctx: AudioContext) {
    this.liveNoise(ctx, 'white', 'bandpass', 4200, 0.16, { q: 0.55, rate: 0.42, depth: 0.03 })
    this.liveNoise(ctx, 'brown', 'lowpass', 95, 0.14, { rate: 0.38, depth: 0.025 })
  }

  private site(ctx: AudioContext) {
    this.liveNoise(ctx, 'brown', 'lowpass', 110, 0.16, { rate: 0.07, depth: 0.03 })
    const hit = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.22, 2)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 700 + Math.random() * 900
      const cg = ctx.createGain()
      const now = ctx.currentTime
      cg.gain.setValueAtTime(0.0001, now)
      cg.gain.linearRampToValueAtTime(0.11, now + 0.012)
      cg.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)
      n.connect(hp)
      hp.connect(cg)
      this.out(cg, 0.7, 0.35)
      n.start()
      n.stop(now + 0.32)
    }
    const id = window.setInterval(hit, 2800)
    this.track(() => window.clearInterval(id))
  }

  private lullaby(ctx: AudioContext) {
    this.warmPad(ctx, [98, 147, 196], 0.038)
    const notes = [196, 220, 246.94, 261.63, 293.66, 261.63, 220]
    let i = 0
    const play = () => {
      if (!this.playing || !this.ctx) return
      const f = notes[i % notes.length]!
      i += 1
      const now = ctx.currentTime
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.055, now + 0.2)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 4.4)
      o.connect(g)
      this.out(g, 0.5, 0.92)
      o.start(now)
      o.stop(now + 4.6)
    }
    play()
    const id = window.setInterval(play, 4200)
    this.track(() => window.clearInterval(id))
  }

  private heart(ctx: AudioContext) {
    this.liveNoise(ctx, 'brown', 'lowpass', 70, 0.12)
    const beat = () => {
      if (!this.playing || !this.ctx) return
      const now = ctx.currentTime
      const thump = (delay: number, freq: number, peak: number) => {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.setValueAtTime(freq, now + delay)
        o.frequency.exponentialRampToValueAtTime(freq * 0.55, now + delay + 0.18)
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.0001, now + delay)
        g.gain.linearRampToValueAtTime(peak, now + delay + 0.03)
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.22)
        o.connect(g)
        this.out(g, 1, 0.2)
        o.start(now + delay)
        o.stop(now + delay + 0.24)
      }
      thump(0, 52, 0.22)
      thump(0.16, 40, 0.12)
    }
    beat()
    const id = window.setInterval(beat, 920)
    this.track(() => window.clearInterval(id))
  }

  private cups(ctx: AudioContext) {
    this.liveNoise(ctx, 'white', 'highpass', 3200, 0.07, { rate: 8.2, depth: 0.018, pad: [110, 165] })
    const clink = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = 2100 + Math.random() * 700
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.04, ctx.currentTime)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16)
      o.connect(cg)
      this.out(cg, 0.45, 0.55)
      o.start()
      o.stop(ctx.currentTime + 0.18)
    }
    const id = window.setInterval(clink, 5200)
    this.track(() => window.clearInterval(id))
  }

  private pages(ctx: AudioContext) {
    this.liveNoise(ctx, 'pink', 'highpass', 1400, 0.045, { q: 0.5 })
    const turn = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.45)
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 1600 + Math.random() * 900
      bp.Q.value = 1.4
      const cg = ctx.createGain()
      const now = ctx.currentTime
      cg.gain.setValueAtTime(0.0001, now)
      cg.gain.linearRampToValueAtTime(0.08, now + 0.05)
      cg.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)
      n.connect(bp)
      bp.connect(cg)
      this.out(cg, 0.6, 0.3)
      n.start()
      n.stop(now + 0.45)
    }
    const id = window.setInterval(turn, 3800)
    this.track(() => window.clearInterval(id))
  }

  private grey(ctx: AudioContext) {
    this.liveNoise(ctx, 'pink', 'peaking', 2500, 0.18, { q: 0.8, pad: [123, 185] })
  }

  private flight(ctx: AudioContext) {
    this.liveNoise(ctx, 'brown', 'lowpass', 140, 0.2, { rate: 0.04, depth: 0.025 })
    this.liveNoise(ctx, 'white', 'highpass', 2600, 0.035)
    const ding = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = 880
      const g = ctx.createGain()
      const now = ctx.currentTime
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.05, now + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4)
      o.connect(g)
      this.out(g, 0.4, 0.8)
      o.start(now)
      o.stop(now + 1.5)
    }
    const id = window.setInterval(ding, 18000)
    this.track(() => window.clearInterval(id))
  }

  private bus(ctx: AudioContext) {
    this.liveNoise(ctx, 'brown', 'lowpass', 88, 0.22, { rate: 1.35, depth: 0.04 })
    this.liveNoise(ctx, 'pink', 'bandpass', 210, 0.08, { q: 0.5 })
    const brake = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.7)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 1800
      const cg = ctx.createGain()
      const now = ctx.currentTime
      cg.gain.setValueAtTime(0.0001, now)
      cg.gain.linearRampToValueAtTime(0.06, now + 0.08)
      cg.gain.exponentialRampToValueAtTime(0.0001, now + 0.65)
      n.connect(hp)
      hp.connect(cg)
      this.out(cg, 0.7, 0.25)
      n.start()
      n.stop(now + 0.7)
    }
    const id = window.setInterval(brake, 11000)
    this.track(() => window.clearInterval(id))
  }

  private murmur(ctx: AudioContext) {
    this.warmPad(ctx, [110, 165], 0.016)
    this.liveNoise(ctx, 'pink', 'lowpass', 900, 0.12, { rate: 0.28, depth: 0.04 })
    const f = this.liveNoise(ctx, 'brown', 'bandpass', 520, 0.07, { q: 2.2 })
    this.lfo(ctx, f.frequency, 0.11, 90, 520)
  }

  private yellow(ctx: AudioContext) {
    this.liveNoise(ctx, 'pink', 'bandpass', 1100, 0.2, { q: 0.45, pad: [98, 147] })
  }

  private rumble(ctx: AudioContext) {
    this.liveNoise(ctx, 'brown', 'lowpass', 78, 0.2)
    const crack = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.4, 2)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 500
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 420
      const cg = ctx.createGain()
      const now = ctx.currentTime
      cg.gain.setValueAtTime(0.0001, now)
      cg.gain.linearRampToValueAtTime(0.18, now + 0.05)
      cg.gain.exponentialRampToValueAtTime(0.0001, now + 1.1)
      n.connect(hp)
      hp.connect(lp)
      lp.connect(cg)
      this.out(cg, 0.85, 0.45)
      n.start()
      n.stop(now + 1.15)
    }
    const id = window.setInterval(crack, 8000)
    this.track(() => window.clearInterval(id))
  }

  private wood(ctx: AudioContext) {
    this.liveNoise(ctx, 'brown', 'lowpass', 95, 0.08)
    const creak = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'triangle'
      const now = ctx.currentTime
      const start = 180 + Math.random() * 160
      o.frequency.setValueAtTime(start, now)
      o.frequency.exponentialRampToValueAtTime(start * 0.7, now + 0.32)
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(0.04, now + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.34)
      o.connect(g)
      this.out(g, 0.7, 0.4)
      o.start(now)
      o.stop(now + 0.36)
    }
    const id = window.setInterval(creak, 5400)
    this.track(() => window.clearInterval(id))
  }

  private blue(ctx: AudioContext) {
    this.liveNoise(ctx, 'white', 'highpass', 2200, 0.1, { q: 0.5, pad: [196, 247] })
  }

  private bath(ctx: AudioContext) {
    this.warmPad(ctx, [96, 144, 192], 0.028)
    const bowls = [192, 256, 288, 384, 432]
    let i = 0
    const strike = () => {
      if (!this.playing || !this.ctx) return
      const f = bowls[i % bowls.length]!
      i += 1
      const now = ctx.currentTime
      for (const mul of [1, 1.5, 2]) {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = f * mul
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.0001, now)
        g.gain.linearRampToValueAtTime(0.07 / mul, now + 0.1)
        g.gain.exponentialRampToValueAtTime(0.0001, now + 7.2)
        o.connect(g)
        this.out(g, 0.55, 0.95)
        o.start(now)
        o.stop(now + 7.4)
      }
    }
    strike()
    const id = window.setInterval(strike, 5200)
    this.track(() => window.clearInterval(id))
  }

  private study(ctx: AudioContext) {
    this.liveNoise(ctx, 'white', 'bandpass', 1600, 0.12, { q: 0.5, rate: 0.09, depth: 0.03, pad: [98, 147] })
    const lp = this.liveNoise(ctx, 'pink', 'lowpass', 1100, 0.08)
    this.lfo(ctx, lp.frequency, 0.06, 80, 1100)
    const tick = () => {
      if (!this.playing || !this.ctx) return
      const o = ctx.createOscillator()
      o.type = 'square'
      o.frequency.value = 1400
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.02, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)
      o.connect(g)
      this.out(g, 0.35, 0.15)
      o.start()
      o.stop(ctx.currentTime + 0.05)
    }
    const id = window.setInterval(tick, 1000)
    this.track(() => window.clearInterval(id))
  }

  private spa(ctx: AudioContext) {
    this.warmPad(ctx, [174, 220, 261.63], 0.04)
    this.liveNoise(ctx, 'pink', 'lowpass', 320, 0.07)
    const drip = () => {
      if (!this.playing || !this.ctx) return
      const n = loopNoise(ctx, 'white', 0.12)
      const f = ctx.createBiquadFilter()
      f.type = 'bandpass'
      f.frequency.value = 2400 + Math.random() * 800
      f.Q.value = 6
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.0001, ctx.currentTime)
      cg.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.015)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14)
      n.connect(f)
      f.connect(cg)
      this.out(cg, 0.5, 0.7)
      n.start()
      n.stop(ctx.currentTime + 0.16)
    }
    const id = window.setInterval(drip, 2100)
    this.track(() => window.clearInterval(id))
  }
}

export const audio = new AudioEngine()

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
