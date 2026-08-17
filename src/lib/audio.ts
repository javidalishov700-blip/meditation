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

const MUSIC_BED_IDS = ['piano', 'harp', 'radio', 'swell', 'ohm', 'drone', 'bowl', 'crystal', 'chime', 'gong'] as const

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

  constructor() {
    try {
      const n = Number(localStorage.getItem('steady.bedLevel'))
      if (Number.isFinite(n)) this.bedLevel = clamp(n, 0, 1)
    } catch {
      /* ignore */
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

  async ensure(): Promise<AudioContext> {
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
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    return this.ctx
  }

  /** Resume the graph in the same turn as a tap. Voice then plays through this context, not HTMLAudio. */
  unlock() {
    void this.ensure()
  }

  /** One-shot dawn sting for the splash. No voice, no now-playing bar. */
  async playIntroSfx() {
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
    this.fadeMaster(0, fade)
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
    if (this.playing && this.label === 'Onboard') return
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
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
    if (id === SOS_DEFAULT_BED) return this.playSosBed()
    const tone = TONES.find((t) => t.id === id)
    if (tone) return this.playTone(tone.hz, tone.title, tone.id)
    return this.playNature(id)
  }

  async playNature(id: string, withMusic = false) {
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
}

export const audio = new AudioEngine()

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
