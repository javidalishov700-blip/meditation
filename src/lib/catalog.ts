import { NATURE_SCENES, TONES } from './audio'
import { packRecord, packTitle } from './copy'
import { R, type LocaleId } from './locales'
import { breaths, extras, meditations, sleepLab, stories, writings } from './library'
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
  {
    id: 'nat-forest',
    kind: 'nature',
    to: '/session/nature/forest',
    title: R('Çam altı|Under the pines|Bajo los pinos|Sous les pins|Unter den Kiefern|Sotto i pini'),
    cover: `${C}/cover-forest.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-fire',
    kind: 'nature',
    to: '/session/nature/fire',
    title: R('Köz|Embers|Brasas|Braises|Glut|Braci'),
    cover: `${C}/cover-mountain.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-storm',
    kind: 'nature',
    to: '/session/nature/storm',
    title: R('Gök gürültüsü|Thunder|Trueno|Tonnerre|Donner|Tuono'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-river',
    kind: 'nature',
    to: '/session/nature/river',
    title: R('Dere|Stream|Arroyo|Ruisseau|Bach|Ruscello'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-birds',
    kind: 'nature',
    to: '/session/nature/birds',
    title: R('Sabah kuşları|Morning birds|Pájaros de mañana|Oiseaux du matin|Morgenvögel|Uccelli del mattino'),
    cover: `${C}/cover-forest.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-cafe',
    kind: 'nature',
    to: '/session/nature/cafe',
    title: R('Sessiz kafe|Quiet cafe|Café silencioso|Café calme|Stilles Café|Caffè quieto'),
    cover: `${C}/cover-palms.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-snow',
    kind: 'nature',
    to: '/session/nature/snow',
    title: R('Kar|Snow|Nieve|Neige|Schnee|Neve'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-bowl',
    kind: 'nature',
    to: '/session/nature/bowl',
    title: R('Çan kâsesi|Singing bowl|Cuenco tibetano|Bol chantant|Klangschale|Campana tibetana'),
    cover: `${C}/cover-moon.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-fan',
    kind: 'nature',
    to: '/session/nature/fan',
    title: R('Vantilatör|Fan|Ventilador|Ventilateur|Ventilator|Ventilatore'),
    cover: `${C}/cover-nebula.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-waves',
    kind: 'nature',
    to: '/session/nature/waves',
    title: R('Açık deniz|Open sea|Mar abierto|Mer ouverte|Offenes Meer|Mare aperto'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'sound',
    group: 'sounds',
  },
  {
    id: 'nat-piano',
    kind: 'nature',
    to: '/session/nature/piano',
    title: R('Gece piyanosu|Night piano|Piano nocturno|Piano de nuit|Nachtklavier|Pianoforte notturno'),
    cover: `${C}/cover-palms.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-396',
    kind: 'tone',
    to: '/session/tone/396',
    title: R('396 Hz · alçak|396 Hz · low|396 Hz · grave|396 Hz · grave|396 Hz · tief|396 Hz · basso'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-417',
    kind: 'tone',
    to: '/session/tone/417',
    title: R('417 Hz · geçiş|417 Hz · shift|417 Hz · paso|417 Hz · passage|417 Hz · Übergang|417 Hz · passaggio'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-639',
    kind: 'tone',
    to: '/session/tone/639',
    title: R('639 Hz · göğüs|639 Hz · chest|639 Hz · pecho|639 Hz · poitrine|639 Hz · Brust|639 Hz · petto'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-741',
    kind: 'tone',
    to: '/session/tone/741',
    title: R('741 Hz · net|741 Hz · clear|741 Hz · nítido|741 Hz · net|741 Hz · klar|741 Hz · nitido'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'tone-852',
    kind: 'tone',
    to: '/session/tone/852',
    title: R('852 Hz · duru|852 Hz · bright|852 Hz · claro|852 Hz · clair|852 Hz · hell|852 Hz · chiaro'),
    cover: `${C}/cover-nebula.png`,
    minutes: 15,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-drone',
    kind: 'nature',
    to: '/session/nature/drone',
    title: R('Sıcak drone|Warm drone|Drone cálido|Drone chaud|Warmer Drohn|Drone caldo'),
    cover: `${C}/cover-nebula.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-ohm',
    kind: 'nature',
    to: '/session/nature/ohm',
    title: R('Om yatağı|Om bed|Cama de om|Lit d’om|Om-Bett|Letto di om'),
    cover: `${C}/cover-moon.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-chime',
    kind: 'nature',
    to: '/session/nature/chime',
    title: R('Rüzgâr çanı|Wind chime|Campanilla de viento|Carillon|Windspiel|Campanelle a vento'),
    cover: `${C}/cover-clouds.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-crystal',
    kind: 'nature',
    to: '/session/nature/crystal',
    title: R('Kristal|Crystal|Cristal|Cristal|Kristall|Cristallo'),
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
    title: R('Nefes yatağı|Breath bed|Cama de aliento|Lit de souffle|Atem-Bett|Letto di respiro'),
    cover: `${C}/cover-lake.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'nat-harp',
    kind: 'nature',
    to: '/session/nature/harp',
    title: R('Seyrek arp|Sparse harp|Arpa escasa|Harpe rare|Spärliche Harfe|Arpa rada'),
    cover: `${C}/cover-forest.png`,
    minutes: 30,
    badge: 'music',
    group: 'music',
  },
  {
    id: 'story-harbor',
    kind: 'story',
    to: '/session/story/harbor',
    title: R('Yağmur limanı|Rain harbor|Puerto de lluvia|Port sous la pluie|Regen-Hafen|Porto sotto la pioggia'),
    cover: `${C}/cover-lighthouse.png`,
    minutes: 14,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-bath',
    kind: 'story',
    to: '/session/story/bath',
    title: R('Hamam taşı|Bath stone|Piedra de baño|Pierre de bain|Badstein|Pietra del bagno'),
    cover: `${C}/cover-palms.png`,
    minutes: 12,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-attic',
    kind: 'story',
    to: '/session/story/attic',
    title: R('Çatı katı yağmuru|Attic rain|Lluvia del desván|Pluie des combles|Dachkammerregen|Pioggia in soffitta'),
    cover: `${C}/cover-clouds.png`,
    minutes: 13,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-coral',
    kind: 'story',
    to: '/session/story/coral',
    title: R('Mercan Kapısı|Coral gate|Puerta de coral|Porte de corail|Korallentor|Porta di corallo'),
    cover: `${C}/cover-lake.png`,
    minutes: 16,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'story-library',
    kind: 'story',
    to: '/session/story/library',
    title: R('Cam Dağ Kütüphanesi|Glass mountain library|Biblioteca del monte de cristal|Bibliothèque de la montagne de verre|Glasberg-Bibliothek|Biblioteca della montagna di vetro'),
    cover: `${C}/cover-forest.png`,
    minutes: 16,
    badge: 'sleep',
    group: 'sleep',
  },
  {
    id: 'med-stone',
    kind: 'meditation',
    to: '/session/meditation/warm-stone',
    title: R('Avuçta taş|Stone in the palm|Piedra en la palma|Pierre dans la paume|Stein in der Handfläche|Pietra nel palmo'),
    cover: `${C}/cover-mountain.png`,
    minutes: 8,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'med-feet',
    kind: 'meditation',
    to: '/session/meditation/feet-press',
    title: R('Taban basışı|Feet press|Presión de plantas|Pression des plantes|Sohlendruck|Pressione delle piante'),
    cover: `${C}/cover-forest.png`,
    minutes: 7,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'write-colors',
    kind: 'writing',
    to: '/session/writing/three-colors',
    title: R('Üç renk|Three colors|Tres colores|Trois couleurs|Drei Farben|Tre colori'),
    cover: `${C}/cover-palms.png`,
    minutes: 5,
    badge: 'program',
    group: 'daily',
  },
  {
    id: 'breath-equal',
    kind: 'breath',
    to: '/session/breath/equal',
    title: R('Eşit 5-5|Even 5-5|Igual 5-5|Égal 5-5|Gleich 5-5|Uguale 5-5'),
    cover: `${C}/cover-lake.png`,
    minutes: 4,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'breath-count8',
    kind: 'breath',
    to: '/session/breath/count8',
    title: R('Sekize ver|Out to eight|Hasta ocho|Jusqu’à huit|Bis acht|Fino a otto'),
    cover: `${C}/cover-lake.png`,
    minutes: 5,
    badge: 'journey',
    group: 'daily',
  },
  {
    id: 'extra-objects',
    kind: 'extra',
    to: '/session/extra/three-objects',
    title: R('3 nesne|3 objects|3 objetos|3 objets|3 Dinge|3 oggetti'),
    cover: `${C}/cover-mountain.png`,
    minutes: 4,
    badge: 'journey',
    group: 'start',
  },
  {
    id: 'extra-sound',
    kind: 'extra',
    to: '/session/extra/room-sound',
    title: R('Odadaki ses|Room sound|Sonido de la habitación|Son de la pièce|Raumklang|Suono della stanza'),
    cover: `${C}/cover-nebula.png`,
    minutes: 3,
    badge: 'sound',
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
      cover: `${C}/cover-forest.png`,
      minutes: s.minutes,
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
      cover: `${C}/cover-lake.png`,
      minutes: s.minutes,
      badge: 'journey' as const,
      group: 'daily' as const,
    })),
    ...writings.map((s) => ({
      id: `w-${s.id}`,
      kind: 'writing' as const,
      to: `/session/writing/${s.id}`,
      title: packRecord(s.id, s.title),
      cover: `${C}/cover-forest.png`,
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
  calm: ['nat-forest', 'nat-bowl', 'nat-piano', 'med-body', 'story-bath', 'extra-sound'],
  tense: ['breath-wave', 'extra-objects', 'nat-rain', 'nat-ocean', 'med-feet', 'write-wave'],
  sleepless: ['story-lighthouse', 'story-harbor', 'nat-night', 'nat-snow', 'lab-1', 'story-attic'],
  wave: ['nat-waves', 'nat-ocean', 'write-wave', 'breath-wave', 'breath-count8', 'story-coral'],
  distant: ['med-room', 'extra-objects', 'nat-forest', 'nat-cafe', 'med-feet', 'write-colors'],
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
  'med-body': 'body-drop',
  'med-room': 'known-room',
  'med-shore': 'shore-sit',
  'med-window': 'window-light',
  'med-stone': 'warm-stone',
  'med-feet': 'feet-press',
  'lab-1': 'lab-1',
  'breath-wave': 'wave',
  'breath-equal': 'equal',
  'breath-count8': 'count8',
  'write-wave': 'after-wave',
  'write-colors': 'three-colors',
  'extra-objects': 'three-objects',
  'extra-sound': 'room-sound',
}

export function itemTitle(item: CatalogItem, locale: LocaleId): string {
  const copyId = COPY_BY_CATALOG[item.id]
  if (copyId) return packTitle(copyId, locale, item.title[locale])
  return item.title[locale]
}

export function nowIds(mood: MoodId | null, hour: number): string[] {
  const night = hour >= 21 || hour < 6
  if (mood === 'tense' || mood === 'wave') {
    return ['extra-objects', 'breath-wave', 'med-feet', 'write-wave', 'nat-rain', 'story-lighthouse', 'write-colors', 'nat-ocean']
  }
  if (mood === 'sleepless' || night) {
    return ['story-lighthouse', 'story-harbor', 'story-attic', 'nat-night', 'nat-rain', 'lab-1', 'nat-piano', 'med-stone']
  }
  if (mood === 'distant') {
    return ['extra-objects', 'med-room', 'med-feet', 'nat-forest', 'story-bath', 'write-colors', 'nat-cafe', 'med-window']
  }
  return ['story-lighthouse', 'breath-wave', 'med-body', 'extra-objects', 'story-harbor', 'write-colors', 'med-feet', 'nat-rain']
}

export const SOUND_RAIL_IDS = ['nat-rain', 'nat-drone', 'nat-bowl', 'nat-ocean', 'nat-swell', 'nat-forest', 'nat-ohm', 'nat-piano'] as const

export const SOUND_TAB_IDS = {
  natural: ['nat-rain', 'nat-ocean', 'nat-forest', 'nat-fire', 'nat-wind', 'nat-night', 'nat-storm', 'nat-river', 'nat-birds', 'nat-snow', 'nat-waves'],
  meditation: ['nat-bowl', 'nat-drone', 'nat-ohm', 'nat-chime', 'nat-crystal', 'nat-gong', 'nat-swell', 'nat-harp'],
  tones: ['tone-174', 'tone-396', 'tone-417', 'tone-528', 'tone-639', 'tone-741', 'tone-852'],
  indoor: ['nat-cafe', 'nat-fan', 'nat-piano'],
} as const
