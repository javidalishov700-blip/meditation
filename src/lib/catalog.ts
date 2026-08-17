import { NATURE_SCENES, TONES } from './audio'
import { packRecord, packTitle } from './copy'
import { R, type LocaleId } from './locales'
import { breaths, extras, meditations, pathMinutes, sleepLab, stories, writings } from './library'
import { quotes } from './quotes'
import { canAccess } from './entitlement'
import type { SessionKind } from './types'
import type { MoodId } from './mood'

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
    title: R('Panikte 7 gün|7 days with panic|Panikdə 7 gün|7 дней с паникой|7 días con pánico|7 giorni con il panico'),
    cover: `${C}/cover-mountain.png`,
    minutes: 12,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'story-lighthouse',
    kind: 'story',
    to: '/session/story/lighthouse',
    title: R('Kıyı Feneri|Coastal lighthouse|Sahil mayakı|Береговой маяк|Faro de costa|Faro sulla costa'),
    cover: `${C}/cover-lighthouse.png`,
    minutes: stories.find((s) => s.id === 'lighthouse')?.minutes,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-meadow',
    kind: 'story',
    to: '/session/story/meadow',
    title: R('Yıldız Çayırı|Star meadow|Ulduz çəmənliyi|Звёздный луг|Pradera de estrellas|Prato di stelle'),
    cover: `${C}/cover-moon.png`,
    minutes: 15,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-wagon',
    kind: 'story',
    to: '/session/story/wagon',
    title: R('Sessiz Vagon|Quiet carriage|Sakit vaqon|Тихий вагон|Vagón silencioso|Vagone silenzioso'),
    cover: `${C}/cover-clouds.png`,
    minutes: 15,
    badge: 'program',
    group: 'sleep',
  },
  {
    id: 'med-first',
    kind: 'meditation',
    to: '/session/meditation/first',
    title: R('İlk adım|First step|İlk adım|First step|Primer paso|Primo passo'),
    cover: `${C}/cover-palms.png`,
    minutes: 18,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'med-room',
    kind: 'meditation',
    to: '/session/meditation/room',
    title: R('Bilinen oda|Known room|Bilinen oda|Known room|Habitación conocida|Stanza nota'),
    cover: `${C}/cover-forest.png`,
    minutes: 18,
    badge: 'program',
    group: 'start',
  },
  {
    id: 'med-shore',
    kind: 'meditation',
    to: '/session/meditation/shore',
    title: R('Kıyıda|On the shore|Kıyıda|On the shore|En la orilla|Sulla riva'),
    cover: `${C}/cover-lake.png`,
    minutes: 18,
    badge: 'journey',
    group: 'viz',
  },
  {
    id: 'prog-anx',
    kind: 'program',
    to: '/session/program/anxiety?day=1',
    title: R('Kaygı · 7 gün|Anxiety · 7 days|Narahatlıq · 7 gün|Тревога · 7 дней|Ansiedad · 7 días|Ansia · 7 giorni'),
    cover: `${C}/cover-nebula.png`,
    minutes: 12,
    badge: 'program',
    group: 'programs',
  },
  {
    id: 'prog-dr',
    kind: 'program',
    to: '/session/program/derealization?day=1',
    title: R('Dünya kapısı · 7 gün|World door · 7 days|Dünya qapısı · 7 gün|Дверь мира · 7 дней|Puerta del mundo · 7 días|Porta del mondo · 7 giorni'),
    cover: `${C}/cover-moon.png`,
    minutes: 12,
    badge: 'program',
    group: 'programs',
  },
  {
    id: 'prog-dp',
    kind: 'program',
    to: '/session/program/depersonalization?day=1',
    title: R('Beden kapısı · 7 gün|Body door · 7 days|Bədən qapısı · 7 gün|Дверь тела · 7 дней|Puerta del cuerpo · 7 días|Porta del corpo · 7 giorni'),
    cover: `${C}/cover-forest.png`,
    minutes: 12,
    badge: 'program',
    group: 'programs',
  },
  {
    id: 'lab-1',
    kind: 'sleeplab',
    to: '/session/sleeplab/lab-1',
    title: R('Yatak bir iş yeri değil|The bed is not a workplace|Yataq iş yeri deyil|Кровать — не рабочее место|La cama no es un despacho|Il letto non è un ufficio'),
    cover: `${C}/cover-palms.png`,
    minutes: 12,
    badge: 'sleep',
    group: 'viz',
  },
  {
    id: 'nat-rain',
    kind: 'nature',
    to: '/session/nature/rain',
    title: R('Yağmur camı|Rain on glass|Yağış şüşəsi|Дождь по стеклу|Lluvia en el cristal|Pioggia sul vetro'),
    cover: `${C}/cover-lighthouse.png`,
    minutes: 5,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-ocean',
    kind: 'nature',
    to: '/session/nature/ocean',
    title: R('Gece koyu|Night cove|Gecə körfəzi|Ночная бухта|Cala nocturna|Cala notturna'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-wind',
    kind: 'nature',
    to: '/session/nature/wind',
    title: R('Bozkır rüzgârı|Steppe wind|Çöl küləyi|Степной ветер|Viento de estepa|Vento di steppa'),
    cover: `${C}/cover-mountain.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-night',
    kind: 'nature',
    to: '/session/nature/night',
    title: R('Kır gecesi|Country night|Kənd gecəsi|Сельская ночь|Noche de campo|Notte di campagna'),
    cover: `${C}/cover-moon.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-174',
    kind: 'tone',
    to: '/session/tone/174',
    title: R('174 Hz · zemin|174 Hz · ground|174 Hz · zəmin|174 Гц · земля|174 Hz · suelo|174 Hz · terra'),
    cover: `${C}/cover-nebula.png`,
    minutes: 3,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-528',
    kind: 'tone',
    to: '/session/tone/528',
    title: R('528 Hz · açık alan|528 Hz · open field|528 Hz · açıq sahə|528 Гц · открытое поле|528 Hz · campo abierto|528 Hz · campo aperto'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'breath-wave',
    kind: 'breath',
    to: '/session/breath/wave',
    title: R('Dalga 4-2-6|Wave 4-2-6|Dalğa 4-2-6|Волна 4-2-6|Ola 4-2-6|Onda 4-2-6'),
    cover: `${C}/cover-lake.png`,
    minutes: 4,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'write-wave',
    kind: 'writing',
    to: '/session/writing/after-wave',
    title: R('Dalga indikten sonra|After the wave|Dalğa enəndən sonra|После волны|Después de la ola|Dopo l’onda'),
    cover: `${C}/cover-forest.png`,
    minutes: 6,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'nat-forest',
    kind: 'nature',
    to: '/session/nature/forest',
    title: R('Çam altı|Under the pines|Çam altı|Under the pines|Bajo los pinos|Sotto i pini'),
    cover: `${C}/cover-forest.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-fire',
    kind: 'nature',
    to: '/session/nature/fire',
    title: R('Köz|Embers|Köz|Embers|Brasas|Braci'),
    cover: `${C}/cover-mountain.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-storm',
    kind: 'nature',
    to: '/session/nature/storm',
    title: R('Gök gürültüsü|Thunder|Gök gürültüsü|Thunder|Trueno|Tuono'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-river',
    kind: 'nature',
    to: '/session/nature/river',
    title: R('Dere|Stream|Dere|Stream|Arroyo|Ruscello'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-birds',
    kind: 'nature',
    to: '/session/nature/birds',
    title: R('Sabah kuşları|Morning birds|Sabah kuşları|Morning birds|Pájaros de mañana|Uccelli del mattino'),
    cover: `${C}/cover-forest.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-cafe',
    kind: 'nature',
    to: '/session/nature/cafe',
    title: R('Sessiz kafe|Quiet cafe|Sessiz kafe|Quiet cafe|Café silencioso|Caffè quieto'),
    cover: `${C}/cover-palms.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-snow',
    kind: 'nature',
    to: '/session/nature/snow',
    title: R('Kar|Snow|Kar|Snow|Nieve|Neve'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-bowl',
    kind: 'nature',
    to: '/session/nature/bowl',
    title: R('Çan kâsesi|Singing bowl|Çan kâsesi|Singing bowl|Cuenco tibetano|Campana tibetana'),
    cover: `${C}/cover-moon.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-fan',
    kind: 'nature',
    to: '/session/nature/fan',
    title: R('Vantilatör|Fan|Vantilatör|Fan|Ventilador|Ventilatore'),
    cover: `${C}/cover-nebula.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-waves',
    kind: 'nature',
    to: '/session/nature/waves',
    title: R('Açık deniz|Open sea|Açık deniz|Open sea|Mar abierto|Mare aperto'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-piano',
    kind: 'nature',
    to: '/session/nature/piano',
    title: R('Gece piyanosu|Night piano|Gece piyanosu|Night piano|Piano nocturno|Pianoforte notturno'),
    cover: `${C}/cover-palms.png`,
    minutes: 5,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-396',
    kind: 'tone',
    to: '/session/tone/396',
    title: R('396 Hz · alçak|396 Hz · low|396 Hz · alçak|396 Hz · low|396 Hz · grave|396 Hz · basso'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-417',
    kind: 'tone',
    to: '/session/tone/417',
    title: R('417 Hz · geçiş|417 Hz · shift|417 Hz · geçiş|417 Hz · shift|417 Hz · paso|417 Hz · passaggio'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-639',
    kind: 'tone',
    to: '/session/tone/639',
    title: R('639 Hz · göğüs|639 Hz · chest|639 Hz · göğüs|639 Hz · chest|639 Hz · pecho|639 Hz · petto'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-741',
    kind: 'tone',
    to: '/session/tone/741',
    title: R('741 Hz · net|741 Hz · clear|741 Hz · net|741 Hz · clear|741 Hz · nítido|741 Hz · nitido'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-852',
    kind: 'tone',
    to: '/session/tone/852',
    title: R('852 Hz · duru|852 Hz · bright|852 Hz · duru|852 Hz · bright|852 Hz · claro|852 Hz · chiaro'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-drone',
    kind: 'nature',
    to: '/session/nature/drone',
    title: R('Sıcak drone|Warm drone|Sıcak drone|Warm drone|Drone cálido|Drone caldo'),
    cover: `${C}/cover-nebula.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-ohm',
    kind: 'nature',
    to: '/session/nature/ohm',
    title: R('Om yatağı|Om bed|Om yatağı|Om bed|Cama de om|Letto di om'),
    cover: `${C}/cover-moon.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-chime',
    kind: 'nature',
    to: '/session/nature/chime',
    title: R('Rüzgâr çanı|Wind chime|Rüzgâr çanı|Wind chime|Campanilla de viento|Campanelle a vento'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-crystal',
    kind: 'nature',
    to: '/session/nature/crystal',
    title: R('Kristal|Crystal|Kristal|Crystal|Cristal|Cristallo'),
    cover: `${C}/cover-palms.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-gong',
    kind: 'nature',
    to: '/session/nature/gong',
    title: R('Gong|Gong|Gong|Gong|Gong|Gong'),
    cover: `${C}/cover-mountain.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-swell',
    kind: 'nature',
    to: '/session/nature/swell',
    title: R('Nefes yatağı|Breath bed|Nefes yatağı|Breath bed|Cama de aliento|Letto di respiro'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-harp',
    kind: 'nature',
    to: '/session/nature/harp',
    title: R('Seyrek arp|Sparse harp|Seyrek arp|Sparse harp|Arpa escasa|Arpa rada'),
    cover: `${C}/cover-forest.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'story-harbor',
    kind: 'story',
    to: '/session/story/harbor',
    title: R('Yağmur limanı|Rain harbor|Yağmur limanı|Rain harbor|Puerto de lluvia|Porto sotto la pioggia'),
    cover: `${C}/cover-lighthouse.png`,
    minutes: 14,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-bath',
    kind: 'story',
    to: '/session/story/bath',
    title: R('Hamam taşı|Bath stone|Hamam taşı|Bath stone|Piedra de baño|Pietra del bagno'),
    cover: `${C}/cover-palms.png`,
    minutes: 12,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-attic',
    kind: 'story',
    to: '/session/story/attic',
    title: R('Çatı katı yağmuru|Attic rain|Çatı katı yağmuru|Attic rain|Lluvia del desván|Pioggia in soffitta'),
    cover: `${C}/cover-clouds.png`,
    minutes: 13,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-coral',
    kind: 'story',
    to: '/session/story/coral',
    title: R('Mercan Kapısı|Coral gate|Mercan Kapısı|Coral gate|Puerta de coral|Porta di corallo'),
    cover: `${C}/cover-lake.png`,
    minutes: 16,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-library',
    kind: 'story',
    to: '/session/story/library',
    title: R('Cam Dağ Kütüphanesi|Glass mountain library|Cam Dağ Kütüphanesi|Glass mountain library|Biblioteca del monte de cristal|Biblioteca della montagna di vetro'),
    cover: `${C}/cover-forest.png`,
    minutes: 16,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'write-colors',
    kind: 'writing',
    to: '/session/writing/three-colors',
    title: R('Üç renk|Three colors|Üç renk|Three colors|Tres colores|Tre colori'),
    cover: `${C}/cover-palms.png`,
    minutes: 5,
    badge: 'program',
    group: 'daily',
  },
  {
    id: 'breath-equal',
    kind: 'breath',
    to: '/session/breath/equal',
    title: R('Eşit 5-5|Even 5-5|Eşit 5-5|Even 5-5|Igual 5-5|Uguale 5-5'),
    cover: `${C}/cover-lake.png`,
    minutes: 4,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'breath-count8',
    kind: 'breath',
    to: '/session/breath/count8',
    title: R('Sekize ver|Out to eight|Sekize ver|Out to eight|Hasta ocho|Fino a otto'),
    cover: `${C}/cover-lake.png`,
    minutes: 5,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'extra-objects',
    kind: 'extra',
    to: '/session/extra/three-objects',
    title: R('3 nesne|3 objects|3 nesne|3 objects|3 objetos|3 oggetti'),
    cover: `${C}/cover-mountain.png`,
    minutes: 4,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'extra-sound',
    kind: 'extra',
    to: '/session/extra/room-sound',
    title: R('Odadaki ses|Room sound|Odadaki ses|Room sound|Sonido de la habitación|Suono della stanza'),
    cover: `${C}/cover-nebula.png`,
    minutes: 3,
    badge: 'sound',
    group: 'daily',
  },
  {
    id: 'breath-box',
    kind: 'breath',
    to: '/session/breath/box',
    title: R('Kutu 4-4-4-4|Box 4-4-4-4|Kutu 4-4-4-4|Box 4-4-4-4|Caja 4-4-4-4|Scatola 4-4-4-4'),
    cover: `${C}/cover-lake.png`,
    minutes: 5,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'breath-478',
    kind: 'breath',
    to: '/session/breath/478',
    title: R('4-7-8|4-7-8|4-7-8|4-7-8|4-7-8|4-7-8'),
    cover: `${C}/cover-moon.png`,
    minutes: 4,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'breath-sigh',
    kind: 'breath',
    to: '/session/breath/sigh',
    title: R('İç çekiş|Physiological sigh|İç çekiş|Physiological sigh|Suspiro|Sospiro'),
    cover: `${C}/cover-clouds.png`,
    minutes: 3,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'story-boat',
    kind: 'story',
    to: '/session/story/paper-boat',
    title: R('Kâğıt tekne|Paper boat|Kâğıt tekne|Paper boat|Barco de papel|Barchetta di carta'),
    cover: `${C}/cover-kids.png`,
    minutes: 8,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-cat',
    kind: 'story',
    to: '/session/story/lamp-cat',
    title: R('Lamba ve kedi|Lamp and cat|Lamba ve kedi|Lamp and cat|Lámpara y gato|Lampada e gatto'),
    cover: `${C}/cover-kids.png`,
    minutes: 7,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-olive',
    kind: 'story',
    to: '/session/story/olive-gate',
    title: R('Zeytin kapısı|Olive gate|Zeytin kapısı|Olive gate|Puerta de olivo|Porta d’olivo'),
    cover: `${C}/cover-myth.png`,
    minutes: 12,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-well',
    kind: 'story',
    to: '/session/story/quiet-well',
    title: R('Sessiz kuyu|Quiet well|Sessiz kuyu|Quiet well|Pozo quieto|Pozzo quieto'),
    cover: `${C}/cover-myth.png`,
    minutes: 11,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'talk-evening',
    kind: 'extra',
    to: '/session/extra/slow-evening',
    title: R('Akşam yavaş|Slow evening|Akşam yavaş|Slow evening|Tarde lenta|Sera lenta'),
    cover: `${C}/cover-talk.png`,
    minutes: 9,
    badge: 'program',
    group: 'daily',
  },
  {
    id: 'talk-room',
    kind: 'extra',
    to: '/session/extra/room-enough',
    title: R('Oda yeter|The room is enough|Oda yeter|The room is enough|La habitación basta|La stanza basta'),
    cover: `${C}/cover-talk.png`,
    minutes: 7,
    badge: 'program',
    group: 'daily',
  },
  {
    id: 'work-desk',
    kind: 'extra',
    to: '/session/extra/desk-window',
    title: R('Masa ve pencere|Desk and window|Masa ve pencere|Desk and window|Mesa y ventana|Scrivania e finestra'),
    cover: `${C}/cover-work.png`,
    minutes: 6,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'work-task',
    kind: 'extra',
    to: '/session/extra/one-task',
    title: R('Tek iş|One task|Tek iş|One task|Una tarea|Un compito'),
    cover: `${C}/cover-work.png`,
    minutes: 5,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'news-week',
    kind: 'extra',
    to: '/session/extra/week-note',
    title: R('Bu haftanın notu|This week’s note|Bu haftanın notu|This week’s note|La nota de esta semana|La nota di questa settimana'),
    cover: `${C}/cover-news.png`,
    minutes: 6,
    badge: 'program',
    group: 'daily',
  },
  {
    id: 'guide-hour',
    kind: 'extra',
    to: '/session/extra/first-hour',
    title: R('İlk saat|First hour|İlk saat|First hour|La primera hora|La prima ora'),
    cover: `${C}/cover-guide.png`,
    minutes: 8,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'guide-sleep',
    kind: 'extra',
    to: '/session/extra/about-sleep',
    title: R('Uyku hakkında|More about sleep|Uyku hakkında|More about sleep|Más sobre el sueño|Di più sul sonno'),
    cover: `${C}/cover-guide.png`,
    minutes: 8,
    badge: 'sleep',
    group: 'viz',
  },
  {
    id: 'cast-table',
    kind: 'extra',
    to: '/session/extra/night-table',
    title: R('Gece masası|Night table|Gece masası|Night table|Mesa de noche|Tavolo di notte'),
    cover: `${C}/cover-podcast.png`,
    minutes: 10,
    badge: 'program',
    group: 'daily',
  },
  {
    id: 'extra-ground',
    kind: 'extra',
    to: '/session/extra/ground54321',
    title: R('5-4-3-2-1|5-4-3-2-1|5-4-3-2-1|5-4-3-2-1|5-4-3-2-1|5-4-3-2-1'),
    cover: `${C}/cover-mountain.png`,
    minutes: 4,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'extra-kind',
    kind: 'extra',
    to: '/session/extra/kind-friend',
    title: R('Nazik arkadaş|Kind friend|Nazik arkadaş|Kind friend|Amigo amable|Amico gentile'),
    cover: `${C}/cover-palms.png`,
    minutes: 6,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'extra-tension',
    kind: 'extra',
    to: '/session/extra/tension-drop',
    title: R('Gerilim bırakışı|Tension drop|Gerilim bırakışı|Tension drop|Soltar tensión|Rilasciare la tensione'),
    cover: `${C}/cover-path.png`,
    minutes: 5,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'nat-white',
    kind: 'nature',
    to: '/session/nature/white',
    title: R('Beyaz gürültü|White noise|Beyaz gürültü|White noise|Ruido blanco|Rumore bianco'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-pink',
    kind: 'nature',
    to: '/session/nature/pink',
    title: R('Pembe gürültü|Pink noise|Pembe gürültü|Pink noise|Ruido rosa|Rumore rosa'),
    cover: `${C}/cover-nebula.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-brown',
    kind: 'nature',
    to: '/session/nature/brown',
    title: R('Kahverengi gürültü|Brown noise|Kahverengi gürültü|Brown noise|Ruido marrón|Rumore bruno'),
    cover: `${C}/cover-mountain.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-radio',
    kind: 'nature',
    to: '/session/nature/radio',
    title: R('Gece radyosu|Night radio|Gece radyosu|Night radio|Radio nocturna|Radio notturna'),
    cover: `${C}/cover-radio.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
]

const UNIQUE_COVER: Record<string, string> = {
  'nat-rain': `${C}/snd-rain.png`,
  'nat-ocean': `${C}/snd-ocean.png`,
  'nat-forest': `${C}/snd-forest.png`,
  'nat-fire': `${C}/snd-fire.png`,
  'nat-wind': `${C}/snd-wind.png`,
  'nat-night': `${C}/snd-night.png`,
  'nat-storm': `${C}/snd-storm.png`,
  'nat-river': `${C}/snd-river.png`,
  'nat-birds': `${C}/snd-birds.png`,
  'nat-cafe': `${C}/snd-cafe.png`,
  'nat-snow': `${C}/snd-snow.png`,
  'nat-bowl': `${C}/snd-bowl.png`,
  'nat-fan': `${C}/snd-fan.png`,
  'nat-waves': `${C}/snd-waves.png`,
  'nat-piano': `${C}/snd-piano.png`,
  'nat-drone': `${C}/snd-drone.png`,
  'nat-ohm': `${C}/snd-ohm.png`,
  'nat-chime': `${C}/snd-chime.png`,
  'nat-crystal': `${C}/snd-crystal.png`,
  'nat-gong': `${C}/snd-gong.png`,
  'nat-swell': `${C}/snd-swell.png`,
  'nat-harp': `${C}/snd-harp.png`,
  'nat-white': `${C}/snd-white.png`,
  'nat-pink': `${C}/snd-pink.png`,
  'nat-brown': `${C}/snd-brown.png`,
  'nat-radio': `${C}/snd-radio.png`,
  'nat-flow': `${C}/snd-flow.png`,
  'nat-dryer': `${C}/snd-dryer.png`,
  'nat-site': `${C}/snd-site.png`,
  'nat-lullaby': `${C}/snd-lullaby.png`,
  'nat-heart': `${C}/snd-heart.png`,
  'nat-cups': `${C}/snd-cups.png`,
  'nat-pages': `${C}/snd-pages.png`,
  'nat-grey': `${C}/snd-grey.png`,
  'nat-flight': `${C}/snd-flight.png`,
  'nat-bus': `${C}/snd-bus.png`,
  'nat-murmur': `${C}/snd-murmur.png`,
  'nat-yellow': `${C}/snd-yellow.png`,
  'nat-rumble': `${C}/snd-rumble.png`,
  'nat-wood': `${C}/snd-wood.png`,
  'nat-blue': `${C}/snd-blue.png`,
  'nat-bath': `${C}/snd-bath.png`,
  'nat-study': `${C}/snd-study.png`,
  'nat-spa': `${C}/snd-spa.png`,
  'tone-174': `${C}/snd-174.png`,
  'tone-396': `${C}/snd-396.png`,
  'tone-417': `${C}/snd-417.png`,
  'tone-528': `${C}/snd-528.png`,
  'tone-639': `${C}/snd-639.png`,
  'tone-741': `${C}/snd-741.png`,
  'tone-852': `${C}/snd-852.png`,
  'tone-432': `${C}/snd-432.png`,
  'story-boat': `${C}/cover-kids.png`,
  'story-cat': `${C}/cover-cat.png`,
  'story-olive': `${C}/cover-myth.png`,
  'story-well': `${C}/cover-well.png`,
  'talk-evening': `${C}/cover-talk.png`,
  'talk-room': `${C}/cover-room.png`,
  'work-desk': `${C}/cover-work.png`,
  'work-task': `${C}/cover-task.png`,
  'guide-hour': `${C}/cover-guide.png`,
  'guide-sleep': `${C}/cover-about-sleep.png`,
  'extra-kind': `${C}/cover-kind.png`,
  'extra-ground': `${C}/cover-54321.png`,
  'extra-sound': `${C}/cover-roomsound.png`,
  'extra-objects': `${C}/cover-objects.png`,
  'extra-tension': `${C}/cover-tension.png`,
  'breath-wave': `${C}/cover-wave.png`,
  'breath-box': `${C}/cover-box.png`,
  'breath-478': `${C}/cover-478.png`,
  'breath-sigh': `${C}/cover-sigh.png`,
  'breath-equal': `${C}/cover-equal.png`,
  'breath-count8': `${C}/cover-count8.png`,
  'med-first': `${C}/cover-path.png`,
  'med-room': `${C}/cover-room.png`,
  'med-shore': `${C}/cover-wave.png`,
  'write-wave': `${C}/cover-wave.png`,
  'write-colors': `${C}/cover-objects.png`,
  'write-window': `${C}/snd-rain.png`,
  'write-edges': `${C}/cover-objects.png`,
  'write-weight': `${C}/cover-tension.png`,
  'write-gratitude': `${C}/cover-kind.png`,
  'write-seed': `${C}/cover-about-sleep.png`,
  'write-unsend': `${C}/cover-task.png`,
  'write-safe': `${C}/cover-well.png`,
}

function syncAudioCatalog() {
  const musicIds = new Set([
    'piano',
    'harp',
    'radio',
    'swell',
    'ohm',
    'drone',
    'bowl',
    'crystal',
    'chime',
    'gong',
    'flow',
    'lullaby',
    'bath',
    'spa',
  ])
  const haveNature = new Set(ITEMS.filter((i) => i.kind === 'nature').map((i) => i.to.split('/').pop()))
  for (const s of NATURE_SCENES) {
    if (haveNature.has(s.id)) continue
    const music = musicIds.has(s.id)
    ITEMS.push({
      id: `nat-${s.id}`,
      kind: 'nature',
      to: `/session/nature/${s.id}`,
      title: s.names,
      cover: `${C}/snd-${s.id}.png`,
      minutes: 30,
      badge: music ? 'music' : 'sound',
      group: music ? 'music' : 'sounds',
    })
  }
  const haveTone = new Set(ITEMS.filter((i) => i.kind === 'tone').map((i) => i.to.split('/').pop()))
  for (const s of TONES) {
    if (haveTone.has(s.id)) continue
    ITEMS.push({
      id: `tone-${s.id}`,
      kind: 'tone',
      to: `/session/tone/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}|${s.title}|${s.title}|${s.title}`),
      cover: `${C}/snd-${s.id}.png`,
      minutes: 15,
      badge: 'music',
      group: 'music',
    })
  }
}

syncAudioCatalog()

export const CLARITY_COVER = `${C}/cover-clarity.png`

export const MED_COVER: Record<string, string> = {
  first: `${C}/cover-path.png`,
  room: `${C}/cover-room.png`,
  shore: `${C}/cover-wave.png`,
}

export const WRITE_COVER: Record<string, string> = {
  'after-wave': `${C}/cover-wave.png`,
  'worry-window': `${C}/snd-rain.png`,
  edges: `${C}/cover-objects.png`,
  weight: `${C}/cover-tension.png`,
  'gratitude-small': `${C}/cover-kind.png`,
  'night-seed-note': `${C}/cover-about-sleep.png`,
  unsend: `${C}/cover-task.png`,
  'three-colors': `${C}/cover-objects.png`,
  'safe-list': `${C}/cover-well.png`,
}

export const BREATH_COVER: Record<string, string> = {
  wave: `${C}/cover-wave.png`,
  box: `${C}/cover-box.png`,
  '478': `${C}/cover-478.png`,
  sigh: `${C}/cover-sigh.png`,
  equal: `${C}/cover-equal.png`,
  count8: `${C}/cover-count8.png`,
}

for (const item of ITEMS) {
  const cover = UNIQUE_COVER[item.id]
  if (cover) item.cover = cover
}

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
      title: packRecord(s.id, s.title),
      cover: `${C}/cover-lighthouse.png`,
      minutes: s.minutes,
      badge: 'sleep' as const,
      group: 'sleep' as const,
    })),
    ...meditations.map((s) => ({
      id: `m-${s.id}`,
      kind: 'meditation' as const,
      to: `/session/meditation/${s.id}`,
      title: packRecord(s.id, s.title),
      cover: MED_COVER[s.id] ?? `${C}/cover-forest.png`,
      minutes: pathMinutes(s),
      badge: 'journey' as const,
      group: 'start' as const,
    })),
    ...sleepLab.map((s) => ({
      id: `l-${s.id}`,
      kind: 'sleeplab' as const,
      to: `/session/sleeplab/${s.id}`,
      title: packRecord(s.id, s.title),
      cover: `${C}/cover-palms.png`,
      minutes: s.minutes,
      badge: 'sleep' as const,
      group: 'viz' as const,
    })),
    ...breaths.map((s) => ({
      id: `b-${s.id}`,
      kind: 'breath' as const,
      to: `/session/breath/${s.id}`,
      title: packRecord(s.id, s.label),
      cover: BREATH_COVER[s.id] ?? `${C}/cover-wave.png`,
      minutes: s.minutes,
      badge: 'journey' as const,
      group: 'daily' as const,
    })),
    ...writings.map((s) => ({
      id: `w-${s.id}`,
      kind: 'writing' as const,
      to: `/session/writing/${s.id}`,
      title: packRecord(s.id, s.title),
      cover: WRITE_COVER[s.id] ?? `${C}/cover-room.png`,
      minutes: s.minutes,
      badge: 'program' as const,
      group: 'daily' as const,
    })),
    ...extras.map((s) => ({
      id: `x-${s.id}`,
      kind: 'extra' as const,
      to: `/session/extra/${s.id}`,
      title: packRecord(s.id, s.title),
      cover: `${C}/cover-mountain.png`,
      minutes: s.minutes,
      badge: 'journey' as const,
      group: 'start' as const,
    })),
    ...NATURE_SCENES.map((s) => ({
      id: `n-${s.id}`,
      kind: 'nature' as const,
      to: `/session/nature/${s.id}`,
      title: s.names,
      cover: `${C}/snd-${s.id}.png`,
      minutes: 30,
      badge: 'sound' as const,
      group: 'sounds' as const,
    })),
    ...TONES.map((s) => ({
      id: `t-${s.id}`,
      kind: 'tone' as const,
      to: `/session/tone/${s.id}`,
      title: R(`${s.title}|${s.title}|${s.title}`),
      cover: `${C}/snd-${s.id}.png`,
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
      itemTitle(i, locale).toLowerCase().includes(n) ||
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
  `${C}/cover-forest.png`,
  `${C}/cover-palms.png`,
] as const

export const TONIGHT_IDS = [
  'nat-night',
  'nat-rain',
  'nat-storm',
  'nat-piano',
  'nat-snow',
  'nat-fan',
  'nat-bowl',
  'nat-ocean',
] as const

export const FOR_YOU_IDS: Record<string, string[]> = {
  calm: ['nat-forest', 'nat-bowl', 'nat-piano', 'med-first', 'story-bath', 'extra-sound'],
  tense: ['breath-wave', 'extra-objects', 'nat-rain', 'nat-ocean', 'med-first', 'write-wave'],
  sleepless: ['story-lighthouse', 'story-harbor', 'nat-night', 'nat-snow', 'lab-1', 'story-attic'],
  wave: ['nat-waves', 'nat-ocean', 'write-wave', 'breath-wave', 'breath-count8', 'story-coral'],
  distant: ['med-room', 'extra-objects', 'nat-forest', 'nat-cafe', 'med-first', 'write-colors'],
}

export function itemsById(ids: string[]): CatalogItem[] {
  return ids.map((id) => ITEMS.find((i) => i.id === id)).filter((i): i is CatalogItem => Boolean(i))
}

const COPY_BY_CATALOG: Record<string, string> = {
  'story-lighthouse': 'lighthouse',
  'story-meadow': 'meadow',
  'story-wagon': 'wagon',
  'story-harbor': 'harbor',
  'story-bath': 'bath',
  'story-attic': 'attic',
  'story-coral': 'coral',
  'story-library': 'library',
  'med-first': 'first',
  'med-room': 'room',
  'med-shore': 'shore',
  'lab-1': 'lab-1',
  'breath-wave': 'wave',
  'breath-equal': 'equal',
  'breath-count8': 'count8',
  'write-wave': 'after-wave',
  'write-colors': 'three-colors',
  'extra-objects': 'three-objects',
  'extra-sound': 'room-sound',
  'breath-box': 'box',
  'breath-478': '478',
  'breath-sigh': 'sigh',
  'story-boat': 'paper-boat',
  'story-cat': 'lamp-cat',
  'story-olive': 'olive-gate',
  'story-well': 'quiet-well',
  'talk-evening': 'slow-evening',
  'talk-room': 'room-enough',
  'work-desk': 'desk-window',
  'work-task': 'one-task',
  'news-week': 'week-note',
  'guide-hour': 'first-hour',
  'guide-sleep': 'about-sleep',
  'cast-table': 'night-table',
  'extra-ground': 'ground54321',
  'extra-kind': 'kind-friend',
  'extra-tension': 'tension-drop',
}

export function itemTitle(item: CatalogItem, locale: LocaleId): string {
  const copyId = COPY_BY_CATALOG[item.id]
  if (copyId) return packTitle(copyId, locale, item.title[locale])
  return item.title[locale]
}

export function itemByPath(to: string): CatalogItem | undefined {
  const clean = to.split('?')[0]
  return ITEMS.find((i) => i.to === to || i.to.split('?')[0] === clean)
}

export function resolveFavorite(fav: { to: string; title: string; cover: string }, locale: LocaleId) {
  const item = itemByPath(fav.to)
  if (!item) {
    return {
      to: fav.to,
      title: fav.title || fav.to,
      cover: fav.cover || `${C}/cover-moon.png`,
    }
  }
  return { to: item.to, title: itemTitle(item, locale), cover: item.cover }
}

export function nowIds(mood: MoodId | null, hour: number): string[] {
  const night = hour >= 21 || hour < 6
  if (mood === 'tense' || mood === 'wave') {
    return ['extra-objects', 'breath-wave', 'med-first', 'write-wave', 'nat-rain', 'story-lighthouse', 'write-colors', 'nat-ocean']
  }
  if (mood === 'sleepless' || night) {
    return ['story-lighthouse', 'story-harbor', 'story-attic', 'nat-night', 'nat-rain', 'lab-1', 'nat-piano', 'med-shore']
  }
  if (mood === 'distant') {
    return ['extra-objects', 'med-room', 'med-first', 'nat-forest', 'story-bath', 'write-colors', 'nat-cafe', 'med-shore']
  }
  return ['story-lighthouse', 'breath-wave', 'med-first', 'extra-objects', 'story-harbor', 'write-colors', 'med-shore', 'nat-rain']
}

export const SOUND_RAIL_IDS = ['nat-rain', 'nat-flow', 'nat-heart', 'nat-bowl', 'nat-study', 'nat-ocean', 'nat-spa', 'nat-piano'] as const

export const EXPLORE_TAB_IDS = {
  start: ['med-first', 'med-room', 'med-shore', 'extra-objects', 'guide-hour', 'breath-wave', 'extra-ground'],
  programs: ['prog-panic', 'prog-anx', 'prog-dr', 'prog-dp'],
  trending: ['story-lighthouse', 'breath-wave', 'nat-rain', 'med-first', 'story-harbor', 'nat-bowl', 'work-desk', 'talk-evening'],
  quick: ['breath-wave', 'breath-equal', 'extra-objects', 'write-colors', 'med-first', 'extra-sound', 'extra-kind'],
  talks: ['talk-evening', 'talk-room', 'cast-table'],
  work: ['work-desk', 'work-task', 'breath-box', 'nat-cafe', 'nat-fan', 'extra-tension'],
  exercises: ['breath-wave', 'breath-box', 'breath-478', 'breath-sigh', 'breath-equal', 'breath-count8', 'extra-tension', 'extra-ground'],
  newsletter: ['news-week', 'guide-hour'],
  journeys: ['prog-panic', 'prog-anx', 'prog-dr', 'prog-dp', 'lab-1'],
  guide: ['guide-hour', 'guide-sleep', 'extra-objects', 'med-first'],
  podcast: ['cast-table', 'talk-evening', 'talk-room'],
} as const

export const SLEEP_TAB_IDS = {
  sleep_med: ['med-first', 'med-room', 'med-shore', 'lab-1'],
  viz: ['med-shore', 'med-room', 'lab-1', 'med-first'],
  stories: ['story-lighthouse', 'story-meadow', 'story-wagon', 'story-harbor', 'story-bath', 'story-attic', 'story-coral', 'story-library'],
  sleep_sounds: ['nat-night', 'nat-rain', 'nat-fan', 'nat-snow', 'nat-brown', 'nat-ocean', 'nat-heart', 'nat-grey', 'nat-dryer'],
  sleep_music: ['nat-piano', 'nat-bowl', 'nat-drone', 'nat-harp', 'nat-swell', 'nat-radio', 'nat-lullaby', 'nat-spa'],
  kids: ['story-boat', 'story-cat', 'nat-lullaby'],
  myth: ['story-olive', 'story-well', 'story-library', 'story-coral'],
  instrumental: ['nat-piano', 'nat-harp', 'nat-bowl', 'nat-radio', 'nat-flow'],
  noise: ['nat-white', 'nat-pink', 'nat-brown', 'nat-fan', 'nat-grey', 'nat-yellow', 'nat-blue'],
  rain: ['nat-rain', 'nat-storm', 'nat-study', 'nat-rumble', 'story-harbor', 'story-attic'],
  more: ['guide-sleep', 'lab-1', 'med-shore'],
} as const

export const SOUND_TAB_IDS = {
  all: [
    'nat-rain',
    'nat-ocean',
    'nat-forest',
    'nat-fire',
    'nat-wind',
    'nat-night',
    'nat-storm',
    'nat-river',
    'nat-birds',
    'nat-snow',
    'nat-waves',
    'nat-cafe',
    'nat-fan',
    'nat-white',
    'nat-pink',
    'nat-brown',
    'nat-flow',
    'nat-dryer',
    'nat-site',
    'nat-heart',
    'nat-cups',
    'nat-pages',
    'nat-grey',
    'nat-flight',
    'nat-bus',
    'nat-murmur',
    'nat-yellow',
    'nat-rumble',
    'nat-wood',
    'nat-blue',
    'nat-study',
  ],
  fresh: [
    'nat-flow',
    'nat-dryer',
    'nat-site',
    'nat-lullaby',
    'nat-heart',
    'nat-cups',
    'nat-pages',
    'tone-432',
    'nat-grey',
    'nat-flight',
    'nat-bus',
    'nat-murmur',
    'nat-yellow',
    'nat-rumble',
    'nat-wood',
    'nat-blue',
    'nat-bath',
    'nat-study',
    'nat-spa',
  ],
  music: ['nat-piano', 'nat-bowl', 'nat-drone', 'nat-ohm', 'nat-harp', 'nat-swell', 'nat-radio', 'nat-gong', 'nat-chime', 'nat-crystal', 'nat-flow', 'nat-lullaby', 'nat-bath', 'nat-spa', 'tone-432'],
  trending: ['nat-rain', 'nat-flow', 'nat-heart', 'nat-study', 'nat-bowl', 'nat-radio', 'nat-piano', 'tone-432'],
  focus: ['nat-flow', 'nat-cafe', 'nat-pages', 'nat-grey', 'nat-study', 'nat-cups', 'nat-fan', 'nat-drone', 'tone-528'],
  sleep_music: ['nat-piano', 'nat-bowl', 'nat-harp', 'nat-lullaby', 'nat-spa', 'nat-heart', 'nat-swell', 'nat-night'],
  rain: ['nat-rain', 'nat-storm', 'nat-study', 'nat-rumble', 'nat-ocean', 'nat-waves'],
  mystical: ['nat-ohm', 'nat-gong', 'nat-crystal', 'nat-bath', 'nat-chime', 'nat-bowl', 'tone-432'],
  radio: ['nat-radio', 'nat-piano', 'nat-harp', 'nat-swell'],
  meditative: ['nat-bowl', 'nat-ohm', 'nat-bath', 'nat-spa', 'nat-flow', 'nat-drone', 'tone-174'],
  nature: ['nat-rain', 'nat-ocean', 'nat-forest', 'nat-fire', 'nat-wind', 'nat-night', 'nat-storm', 'nat-river', 'nat-birds', 'nat-snow', 'nat-waves', 'nat-rumble'],
} as const

export const BREATH_RAIL_IDS = ['breath-wave', 'breath-equal', 'breath-box', 'breath-478', 'breath-sigh', 'breath-count8'] as const
