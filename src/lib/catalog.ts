import { NATURE_SCENES, TONES } from './audio'
import { R, type LocaleId } from './locales'
import { breaths, meditations, sleepLab, stories, writings } from './library'
import { quotes } from './quotes'
import { canAccess } from './entitlement'
import type { SessionKind } from './types'

export type BadgeKind = 'journey' | 'program' | 'sleep' | 'music' | 'sound'

export type CatalogItem = {
  id: string
  kind: SessionKind | 'quotes'
  to: string
  title: Record<LocaleId, string>
  cover: string
  minutes?: number
  badge: BadgeKind
  group: 'start' | 'programs' | 'sleep' | 'viz' | 'sounds' | 'music' | 'daily'
}

const C = '/covers'

export const ITEMS: CatalogItem[] = [
  {
    id: 'prog-panic',
    kind: 'program',
    to: '/session/program/panic?day=1',
    title: R('Panikte 7 gün|7 days with panic|Panikdə 7 gün|7 дней с паникой|7 días con pánico|7 jours avec la panique|7 Tage mit Panik|7 giorni con il panico|7 dias com o pânico|7 أيام مع الذعر|7 dagen met paniek|7 dni z paniką|7 днів із панікою|パニックの7日|پانیک با ۷ روز|与恐慌相处的7天'),
    cover: `${C}/cover-mountain.png`,
    minutes: 12,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'story-lighthouse',
    kind: 'story',
    to: '/session/story/lighthouse',
    title: R('Kıyı Feneri|Coastal lighthouse|Sahil mayakı|Береговой маяк|Faro de costa|Phare du rivage|Küstenleuchtturm|Faro sulla costa|Farol da costa|منارة الساحل|Vuurtoren aan de kust|Latarnia na brzegu|Береговий маяк|岸の灯台|فانوس ساحل|岸边灯塔'),
    cover: `${C}/cover-lighthouse.png`,
    minutes: stories.find((s) => s.id === 'lighthouse')?.minutes,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-meadow',
    kind: 'story',
    to: '/session/story/meadow',
    title: R('Yıldız Çayırı|Star meadow|Ulduz çəmənliyi|Звёздный луг|Pradera de estrellas|Prairie d’étoiles|Sternenwiese|Prato di stelle|Prado de estrelas|مرج النجوم|Sterrenweide|Łąka gwiazd|Зоряний луг|星の草原|چمنزار ستاره|星空草地'),
    cover: `${C}/cover-moon.png`,
    minutes: 15,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-wagon',
    kind: 'story',
    to: '/session/story/wagon',
    title: R('Sessiz Vagon|Quiet carriage|Sakit vaqon|Тихий вагон|Vagón silencioso|Wagon silencieux|Stiller Wagen|Vagone silenzioso|Carruagem silenciosa|عربة هادئة|Stille wagon|Cichy wagon|Тихий вагон|静かな車両|واگن آرام|安静车厢'),
    cover: `${C}/cover-clouds.png`,
    minutes: 15,
    badge: 'program',
    group: 'sleep',
  },
  {
    id: 'med-body',
    kind: 'meditation',
    to: '/session/meditation/body-drop',
    title: R('Beden bırakışı|Body release|Bədən buraxılışı|Отпускание тела|Soltar el cuerpo|Lâcher le corps|Körper loslassen|Rilascio del corpo|Soltar o corpo|إفلات الجسد|Lichaam loslaten|Puszczenie ciała|Відпускання тіла|体を手放す|رها کردن بدن|放下身体'),
    cover: `${C}/cover-palms.png`,
    minutes: 12,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'med-room',
    kind: 'meditation',
    to: '/session/meditation/known-room',
    title: R('Bilinen oda|Known room|Tanış otaq|Знакомая комната|Habitación conocida|Pièce connue|Bekannter Raum|Stanza nota|Quarto conhecido|غرفة مألوفة|Bekende kamer|Znany pokój|Знайома кімната|知っている部屋|اتاق آشنا|熟悉的房间'),
    cover: `${C}/cover-forest.png`,
    minutes: 10,
    badge: 'program',
    group: 'start',
  },
  {
    id: 'med-shore',
    kind: 'meditation',
    to: '/session/meditation/shore-sit',
    title: R('Kıyıda oturuş|Sitting on the shore|Sahildə oturuş|Сидя на берегу|Sentado en la orilla|Assis sur le rivage|Am Ufer sitzen|Seduto sulla riva|Sentado na margem|جلوس على الشاطئ|Zitten aan de oever|Siedzenie na brzegu|Сидіння на березі|岸に座る|نشستن در ساحل|坐在岸边'),
    cover: `${C}/cover-lake.png`,
    minutes: 11,
    badge: 'journey',
    group: 'viz',
  },
  {
    id: 'med-window',
    kind: 'meditation',
    to: '/session/meditation/window-light',
    title: R('Pencere ışığı|Window light|Pəncərə işığı|Свет из окна|Luz de la ventana|Lumière de fenêtre|Fensterlicht|Luce della finestra|Luz da janela|ضوء النافذة|Raamlicht|Światło okna|Світло вікна|窓の光|نور پنجره|窗光'),
    cover: `${C}/cover-clouds.png`,
    minutes: 8,
    badge: 'program',
    group: 'viz',
  },
  {
    id: 'prog-anx',
    kind: 'program',
    to: '/session/program/anxiety?day=1',
    title: R('Kaygı · 7 gün|Anxiety · 7 days|Narahatlıq · 7 gün|Тревога · 7 дней|Ansiedad · 7 días|Anxiété · 7 jours|Angst · 7 Tage|Ansia · 7 giorni|Ansiedade · 7 dias|قلق · 7 أيام|Angst · 7 dagen|Lęk · 7 dni|Тривога · 7 днів|不安 · 7日|اضطراب · ۷ روز|焦虑 · 7天'),
    cover: `${C}/cover-nebula.png`,
    minutes: 12,
    badge: 'program',
    group: 'programs',
  },
  {
    id: 'prog-dr',
    kind: 'program',
    to: '/session/program/derealization?day=1',
    title: R('Dünya kapısı · 7 gün|World door · 7 days|Dünya qapısı · 7 gün|Дверь мира · 7 дней|Puerta del mundo · 7 días|Porte du monde · 7 jours|Welt-Tür · 7 Tage|Porta del mondo · 7 giorni|Porta do mundo · 7 dias|باب العالم · 7 أيام|Werelddeur · 7 dagen|Drzwi świata · 7 dni|Двері світу · 7 днів|世界の扉 · 7日|در جهان · ۷ روز|世界之门 · 7天'),
    cover: `${C}/cover-moon.png`,
    minutes: 12,
    badge: 'program',
    group: 'programs',
  },
  {
    id: 'prog-dp',
    kind: 'program',
    to: '/session/program/depersonalization?day=1',
    title: R('Beden kapısı · 7 gün|Body door · 7 days|Bədən qapısı · 7 gün|Дверь тела · 7 дней|Puerta del cuerpo · 7 días|Porte du corps · 7 jours|Körper-Tür · 7 Tage|Porta del corpo · 7 giorni|Porta do corpo · 7 dias|باب الجسد · 7 أيام|Lichaamsdeur · 7 dagen|Drzwi ciała · 7 dni|Двері тіла · 7 днів|身体の扉 · 7日|در بدن · ۷ روز|身体之门 · 7天'),
    cover: `${C}/cover-forest.png`,
    minutes: 12,
    badge: 'program',
    group: 'programs',
  },
  {
    id: 'lab-1',
    kind: 'sleeplab',
    to: '/session/sleeplab/lab-1',
    title: R('Yatak bir iş yeri değil|The bed is not a workplace|Yataq iş yeri deyil|Кровать — не рабочее место|La cama no es un despacho|Le lit n’est pas un bureau|Das Bett ist kein Arbeitsplatz|Il letto non è un ufficio|A cama não é um escritório|السرير ليس مكان عمل|Het bed is geen werkplek|Łóżko to nie biuro|Ліжко — не робоче місце|ベッドは仕事場ではない|تخت محل کار نیست|床不是办公桌'),
    cover: `${C}/cover-palms.png`,
    minutes: 12,
    badge: 'sleep',
    group: 'viz',
  },
  {
    id: 'nat-rain',
    kind: 'nature',
    to: '/session/nature/rain',
    title: R('Yağmur camı|Rain on glass|Yağış şüşəsi|Дождь по стеклу|Lluvia en el cristal|Pluie sur la vitre|Regen am Glas|Pioggia sul vetro|Chuva no vidro|مطر على الزجاج|Regen op glas|Deszcz na szybie|Дощ по склу|ガラスの雨|باران روی شیشه|玻璃上的雨'),
    cover: `${C}/cover-lighthouse.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-ocean',
    kind: 'nature',
    to: '/session/nature/ocean',
    title: R('Gece koyu|Night cove|Gecə körfəzi|Ночная бухта|Cala nocturna|Anse de nuit|Nachtbucht|Cala notturna|Enseada noturna|خليج ليلي|Nachtinham|Nocna zatoka|Нічна бухта|夜の入り江|خلیج شب|夜间海湾'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-wind',
    kind: 'nature',
    to: '/session/nature/wind',
    title: R('Bozkır rüzgârı|Steppe wind|Çöl küləyi|Степной ветер|Viento de estepa|Vent de steppe|Steppenwind|Vento di steppa|Vento da estepe|ريح السهوب|Steppewind|Wiatr stepu|Степовий вітер|草原の風|باد استپ|草原风'),
    cover: `${C}/cover-mountain.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-night',
    kind: 'nature',
    to: '/session/nature/night',
    title: R('Kır gecesi|Country night|Kənd gecəsi|Сельская ночь|Noche de campo|Nuit des champs|Landnacht|Notte di campagna|Noite no campo|ليلة الريف|Plattelandsnacht|Noc na wsi|Сільська ніч|野の夜|شب روستا|乡野之夜'),
    cover: `${C}/cover-moon.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-174',
    kind: 'tone',
    to: '/session/tone/174',
    title: R('174 Hz · zemin|174 Hz · ground|174 Hz · zəmin|174 Гц · земля|174 Hz · suelo|174 Hz · sol|174 Hz · Boden|174 Hz · terra|174 Hz · chão|174 هرتز · أرض|174 Hz · grond|174 Hz · grunt|174 Гц · земля|174Hz · 地|۱۷۴ هرتز · زمین|174 Hz · 地面'),
    cover: `${C}/cover-nebula.png`,
    minutes: 3,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-528',
    kind: 'tone',
    to: '/session/tone/528',
    title: R('528 Hz · açık alan|528 Hz · open field|528 Hz · açıq sahə|528 Гц · открытое поле|528 Hz · campo abierto|528 Hz · champ ouvert|528 Hz · offenes Feld|528 Hz · campo aperto|528 Hz · campo aberto|528 هرتز · حقل مفتوح|528 Hz · open veld|528 Hz · otwarte pole|528 Гц · відкрите поле|528Hz · 開いた場|۵۲۸ هرتز · میدان باز|528 Hz · 开阔地'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'breath-wave',
    kind: 'breath',
    to: '/session/breath/wave',
    title: R('Dalga 4-2-6|Wave 4-2-6|Dalğa 4-2-6|Волна 4-2-6|Ola 4-2-6|Vague 4-2-6|Welle 4-2-6|Onda 4-2-6|Onda 4-2-6|موجة 4-2-6|Golf 4-2-6|Fala 4-2-6|Хвиля 4-2-6|波 4-2-6|موج ۴-۲-۶|浪 4-2-6'),
    cover: `${C}/cover-lake.png`,
    minutes: 4,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'write-wave',
    kind: 'writing',
    to: '/session/writing/after-wave',
    title: R('Dalga indikten sonra|After the wave|Dalğa enəndən sonra|После волны|Después de la ola|Après la vague|Nach der Welle|Dopo l’onda|Depois da onda|بعد الموجة|Na de golf|Po fali|Після хвилі|波のあと|بعد از موج|浪过之后'),
    cover: `${C}/cover-forest.png`,
    minutes: 6,
    badge: 'journey',
    group: 'daily',
  },
]

export function groupItems(group: CatalogItem['group']): CatalogItem[] {
  return ITEMS.filter((i) => i.group === group)
}

export function hrefFor(item: CatalogItem): string {
  if (item.kind === 'quotes') return item.to
  const id = item.to.split('/').pop()!.split('?')[0]!
  const kind = item.kind
  if (kind === 'program') {
    const door = item.to.includes('panic')
      ? 'panic'
      : item.to.includes('anxiety')
        ? 'anxiety'
        : item.to.includes('derealization')
          ? 'derealization'
          : 'depersonalization'
    return canAccess('program', door, { day: 1 }) ? item.to : '/paywall'
  }
  return canAccess(kind, id) ? item.to : '/paywall'
}

export function searchCatalog(q: string, locale: LocaleId): CatalogItem[] {
  const n = q.trim().toLowerCase()
  if (!n) return []
  const extra: CatalogItem[] = [
    ...stories.map((s) => ({
      id: `s-${s.id}`,
      kind: 'story' as const,
      to: `/session/story/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/cover-lighthouse.png`,
      minutes: s.minutes,
      badge: 'sleep' as const,
      group: 'sleep' as const,
    })),
    ...meditations.map((s) => ({
      id: `m-${s.id}`,
      kind: 'meditation' as const,
      to: `/session/meditation/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/cover-forest.png`,
      minutes: s.minutes,
      badge: 'journey' as const,
      group: 'start' as const,
    })),
    ...sleepLab.map((s) => ({
      id: `l-${s.id}`,
      kind: 'sleeplab' as const,
      to: `/session/sleeplab/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/cover-palms.png`,
      minutes: s.minutes,
      badge: 'sleep' as const,
      group: 'viz' as const,
    })),
    ...breaths.map((s) => ({
      id: `b-${s.id}`,
      kind: 'breath' as const,
      to: `/session/breath/${s.id}`,
      title: R(`${s.label}|${s.label}|${s.label}`),
      cover: `${C}/cover-lake.png`,
      minutes: s.minutes,
      badge: 'journey' as const,
      group: 'daily' as const,
    })),
    ...writings.map((s) => ({
      id: `w-${s.id}`,
      kind: 'writing' as const,
      to: `/session/writing/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/cover-forest.png`,
      minutes: s.minutes,
      badge: 'program' as const,
      group: 'daily' as const,
    })),
    ...NATURE_SCENES.map((s) => ({
      id: `n-${s.id}`,
      kind: 'nature' as const,
      to: `/session/nature/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/cover-mountain.png`,
      minutes: 30,
      badge: 'sound' as const,
      group: 'sounds' as const,
    })),
    ...TONES.map((s) => ({
      id: `t-${s.id}`,
      kind: 'tone' as const,
      to: `/session/tone/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/cover-nebula.png`,
      minutes: 15,
      badge: 'music' as const,
      group: 'music' as const,
    })),
  ]
  const pool = [...ITEMS, ...extra]
  const seen = new Set<string>()
  return pool.filter((i) => {
    if (seen.has(i.to)) return false
    const hit =
      i.title[locale].toLowerCase().includes(n) ||
      i.title.en.toLowerCase().includes(n) ||
      i.title.tr.toLowerCase().includes(n)
    if (!hit) return false
    seen.add(i.to)
    return true
  })
}

export function searchQuotes(q: string, locale: LocaleId) {
  const n = q.trim().toLowerCase()
  if (!n) return []
  return quotes.filter((quote) => quote.text[locale].toLowerCase().includes(n) || quote.author.toLowerCase().includes(n))
}

export const HERO_COVERS = [
  `${C}/cover-lake.png`,
  `${C}/cover-mountain.png`,
  `${C}/cover-clouds.png`,
] as const
