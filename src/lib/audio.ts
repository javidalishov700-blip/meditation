import { R, type LocaleId } from './locales'
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
    names: R('Yağmur camı|Rain on glass|Lluvia en el cristal|Pluie sur la vitre|Regen am Glas|Pioggia sul vetro'),
    blurbs: R('Camdaki damla ve uzak gök|Drops on glass, distant sky|Gotas en el cristal|Gouttes sur la vitre|Tropfen am Glas|Gocce sul vetro'),
  },
  {
    id: 'ocean',
    title: 'Gece koyu',
    subtitle: 'Yavaş dalga, çakıl, tuz',
    names: R('Gece koyu|Night cove|Cala nocturna|Anse de nuit|Nachtbucht|Cala notturna'),
    blurbs: R('Yavaş dalga, çakıl, tuz|Slow wave, pebble, salt|Ola lenta, guijarro, sal|Vague lente, galet, sel|Langsame Welle, Kiesel, Salz|Onda lenta, ciottolo, sale'),
  },
  {
    id: 'forest',
    title: 'Çam altı',
    subtitle: 'Yaprak, uzak kuş, rüzgâr',
    names: R('Çam altı|Under the pines|Bajo los pinos|Sous les pins|Unter den Kiefern|Sotto i pini'),
    blurbs: R('Yaprak, uzak kuş, rüzgâr|Leaves, distant bird, wind|Hojas, pájaro lejano, viento|Feuilles, oiseau lointain, vent|Blätter, ferner Vogel, Wind|Foglie, uccello lontano, vento'),
  },
  {
    id: 'fire',
    title: 'Köz',
    subtitle: 'Çıtırtı ve alçak ısı',
    names: R('Köz|Embers|Brasas|Braises|Glut|Braci'),
    blurbs: R('Çıtırtı ve alçak ısı|Crackling and low heat|Crepitar y calor bajo|Crépitement et chaleur basse|Knistern und niedrige Wärme|Scoppiettio e calore basso'),
  },
  {
    id: 'wind',
    title: 'Bozkır rüzgârı',
    subtitle: 'Geniş, boş, yavaş',
    names: R('Bozkır rüzgârı|Steppe wind|Viento de estepa|Vent de steppe|Steppenwind|Vento di steppa'),
    blurbs: R('Geniş, boş, yavaş|Wide, empty, slow|Amplio, vacío, lento|Large, vide, lent|Weit, leer, langsam|Ampio, vuoto, lento'),
  },
  {
    id: 'night',
    title: 'Kır gecesi',
    subtitle: 'Cırcır ve uzak ova',
    names: R('Kır gecesi|Country night|Noche de campo|Nuit des champs|Landnacht|Notte di campagna'),
    blurbs: R('Cırcır ve uzak ova|Crickets and a far field|Grillos y campo lejano|Grillons et plaine lointaine|Grillen und fernes Feld|Grilli e campo lontano'),
  },
  {
    id: 'storm',
    title: 'Gök gürültüsü',
    subtitle: 'Uzak gürleme, yağmur',
    names: R('Gök gürültüsü|Thunder|Trueno|Tonnerre|Donner|Tuono'),
    blurbs: R('Uzak gürleme, yağmur|Distant rumble, rain|Rumores lejanos, lluvia|Rumeur lointaine, pluie|Fernes Grollen, Regen|Rombo lontano, pioggia'),
  },
  {
    id: 'river',
    title: 'Dere',
    subtitle: 'Taş, su, sürekli akış',
    names: R('Dere|Stream|Arroyo|Ruisseau|Bach|Ruscello'),
    blurbs: R('Taş, su, sürekli akış|Stone, water, steady flow|Piedra, agua, flujo constante|Pierre, eau, flux continu|Stein, Wasser, stetiger Fluss|Pietra, acqua, flusso costante'),
  },
  {
    id: 'birds',
    title: 'Sabah kuşları',
    subtitle: 'Uzak ötüş, yaprak',
    names: R('Sabah kuşları|Morning birds|Pájaros de mañana|Oiseaux du matin|Morgenvögel|Uccelli del mattino'),
    blurbs: R('Uzak ötüş, yaprak|Distant song, leaves|Canto lejano, hojas|Chant lointain, feuilles|Ferner Gesang, Blätter|Canto lontano, foglie'),
  },
  {
    id: 'cafe',
    title: 'Sessiz kafe',
    subtitle: 'Uzak mırıltı, fincan',
    names: R('Sessiz kafe|Quiet cafe|Café silencioso|Café calme|Stilles Café|Caffè quieto'),
    blurbs: R('Uzak mırıltı, fincan|Distant murmur, cup|Murmullo lejano, taza|Murmure lointain, tasse|Fernes Gemurmel, Tasse|Mormorio lontano, tazza'),
  },
  {
    id: 'snow',
    title: 'Kar',
    subtitle: 'Yumuşak, yüksek, boş',
    names: R('Kar|Snow|Nieve|Neige|Schnee|Neve'),
    blurbs: R('Yumuşak, yüksek, boş|Soft, high, empty|Suave, alto, vacío|Doux, aigu, vide|Weich, hoch, leer|Morbido, acuto, vuoto'),
  },
  {
    id: 'bowl',
    title: 'Çan kâsesi',
    subtitle: 'Tek ton, yavaş sönüş',
    names: R('Çan kâsesi|Singing bowl|Cuenco tibetano|Bol chantant|Klangschale|Campana tibetana'),
    blurbs: R('Tek ton, yavaş sönüş|One tone, slow fade|Un tono, desvanecer lento|Un ton, fade lent|Ein Ton, langsames Ausklingen|Un tono, fade lento'),
  },
  {
    id: 'fan',
    title: 'Vantilatör',
    subtitle: 'Düz, kapalı oda',
    names: R('Vantilatör|Fan|Ventilador|Ventilateur|Ventilator|Ventilatore'),
    blurbs: R('Düz, kapalı oda|Flat, closed room|Plano, habitación cerrada|Plat, pièce fermée|Flach, geschlossener Raum|Piatto, stanza chiusa'),
  },
  {
    id: 'waves',
    title: 'Açık deniz',
    subtitle: 'Daha büyük dalga',
    names: R('Açık deniz|Open sea|Mar abierto|Mer ouverte|Offenes Meer|Mare aperto'),
    blurbs: R('Daha büyük dalga|A larger wave|Una ola más grande|Une vague plus large|Eine größere Welle|Un’onda più grande'),
  },
  {
    id: 'piano',
    title: 'Gece piyanosu',
    subtitle: 'Seyrek nota, pad',
    names: R('Gece piyanosu|Night piano|Piano nocturno|Piano de nuit|Nachtklavier|Pianoforte notturno'),
    blurbs: R('Seyrek nota, pad|Sparse notes, pad|Notas escasas, fondo|Notes rares, nappe|Spärliche Töne, Pad|Note rade, pad'),
  },
  {
    id: 'drone',
    title: 'Sıcak drone',
    subtitle: 'Alçak beşli, yavaş salınım',
    names: R('Sıcak drone|Warm drone|Drone cálido|Drone chaud|Warmer Drohn|Drone caldo'),
    blurbs: R('Alçak beşli, yavaş salınım|Low fifth, slow sway|Quinta baja, vaivén lento|Quinte grave, lente oscillation|Tiefe Quinte, langsames Schwanken|Quinta bassa, oscillazione lenta'),
  },
  {
    id: 'ohm',
    title: 'Om yatağı',
    subtitle: 'Tek ünlü, hafif detune',
    names: R('Om yatağı|Om bed|Cama de om|Lit d’om|Om-Bett|Letto di om'),
    blurbs: R('Tek ünlü, hafif detune|One vowel, slight detune|Una vocal, desafinación leve|Une voyelle, léger désaccord|Ein Vokal, leichte Verstimmung|Una vocale, lieve stonatura'),
  },
  {
    id: 'chime',
    title: 'Rüzgâr çanı',
    subtitle: 'Seyrek metal, uzun sönüş',
    names: R('Rüzgâr çanı|Wind chime|Campanilla de viento|Carillon|Windspiel|Campanelle a vento'),
    blurbs: R('Seyrek metal, uzun sönüş|Sparse metal, long fade|Metal escaso, fade largo|Métal rare, long fade|Spärliches Metall, langes Ausklingen|Metallo rado, fade lungo'),
  },
  {
    id: 'crystal',
    title: 'Kristal',
    subtitle: 'İnce katman, yavaş vuruş',
    names: R('Kristal|Crystal|Cristal|Cristal|Kristall|Cristallo'),
    blurbs: R('İnce katman, yavaş vuruş|Thin layer, slow beat|Capa fina, pulso lento|Couche fine, battement lent|Dünne Schicht, langsamer Schlag|Strato sottile, battito lento'),
  },
  {
    id: 'gong',
    title: 'Gong',
    subtitle: 'Derin vuruş, uzun oda',
    names: R('Gong|Gong|Gong|Gong|Gong|Gong'),
    blurbs: R('Derin vuruş, uzun oda|Deep strike, long room|Golpe hondo, sala larga|Frappe grave, pièce longue|Tiefer Schlag, langer Raum|Colpo profondo, stanza lunga'),
  },
  {
    id: 'swell',
    title: 'Nefes yatağı',
    subtitle: 'Al-ver gibi şişer, iner',
    names: R('Nefes yatağı|Breath bed|Cama de aliento|Lit de souffle|Atem-Bett|Letto di respiro'),
    blurbs: R('Al-ver gibi şişer, iner|Swells like in and out|Crece como inhalar y soltar|Gonfle comme inspirer et expirer|Schwillt wie ein und aus|Si gonfia come dentro e fuori'),
  },
  {
    id: 'harp',
    title: 'Seyrek arp',
    subtitle: 'Beş nota, geniş boşluk',
    names: R('Seyrek arp|Sparse harp|Arpa escasa|Harpe rare|Spärliche Harfe|Arpa rada'),
    blurbs: R('Beş nota, geniş boşluk|Five notes, wide space|Cinco notas, espacio amplio|Cinq notes, large espace|Fünf Töne, weiter Raum|Cinque note, spazio ampio'),
  },
  {
    id: 'white',
    title: 'Beyaz gürültü',
    subtitle: 'Düz, açık, örtü',
    names: R('Beyaz gürültü|White noise|Ruido blanco|Bruit blanc|Weißes Rauschen|Rumore bianco'),
    blurbs: R('Düz, açık, örtü|Flat, open, a cover|Plano, abierto, una cubierta|Plat, ouvert, une couverture|Flach, offen, eine Decke|Piatto, aperto, una coperta'),
  },
  {
    id: 'pink',
    title: 'Pembe gürültü',
    subtitle: 'Yumuşak, orta, oda',
    names: R('Pembe gürültü|Pink noise|Ruido rosa|Bruit rose|Rosa Rauschen|Rumore rosa'),
    blurbs: R('Yumuşak, orta, oda|Soft, mid, a room|Suave, medio, una habitación|Doux, médium, une pièce|Weich, mittel, ein Raum|Morbido, medio, una stanza'),
  },
  {
    id: 'brown',
    title: 'Kahverengi gürültü',
    subtitle: 'Alçak, kalın, zemin',
    names: R('Kahverengi gürültü|Brown noise|Ruido marrón|Bruit brun|Braunes Rauschen|Rumore bruno'),
    blurbs: R('Alçak, kalın, zemin|Low, thick, ground|Bajo, espeso, suelo|Grave, épais, sol|Tief, dick, Boden|Basso, spesso, terra'),
  },
  {
    id: 'radio',
    title: 'Gece radyosu',
    subtitle: 'Yavaş nota, ılık pad',
    names: R('Gece radyosu|Night radio|Radio nocturna|Radio de nuit|Nachtradio|Radio notturna'),
    blurbs: R('Yavaş nota, ılık pad|Slow notes, warm pad|Notas lentas, fondo cálido|Notes lentes, nappe chaude|Langsame Töne, warmes Pad|Note lente, pad caldo'),
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

export const TIMER_MINUTES = [15, 30, 45, 60] as const

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
  private space: ConvolverNode | null = null
  private stops: StopHandle[] = []
  private timer: number | null = null
  private epoch = 0
  playing = false
  label = ''
  route = ''
  id = ''
  kind = ''
  now = { playing: false, label: '', route: '', id: '', kind: '' }
  private restGain = 0.55
  private listeners = new Set<() => void>()

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
      this.master.gain.value = 0.7
      this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    return this.ctx
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

  stop(fade = 0.6) {
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
    this.emit()
    window.setTimeout(() => {
      handles.forEach((h) => h())
      if (this.epoch === epoch && this.master && ctx) {
        this.master.gain.setValueAtTime(this.restGain, ctx.currentTime)
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
    this.fadeMaster(targetGain, fadeIn)
    this.emit()
  }

  duck(on: boolean) {
    if (!this.playing) return
    this.fadeMaster(on ? 0.14 : this.restGain, 0.2)
  }

  hushForVoice() {
    if (this.kind === 'pad' || this.kind === 'onboard' || !this.playing) {
      if (this.playing) this.stop(0.22)
      return
    }
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
    this.stop(0.05)
    await this.ensure()
    this.beginPlay('SOS', 0.5, 1.4, { route: '/sos', id: 'sos', kind: 'sos' })
    this.startSpace(ctx, 0.22)
    this.warmPad(ctx, [87, 174], 0.03)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 174
    const oscGain = ctx.createGain()
    oscGain.gain.value = 0.1
    osc.connect(oscGain)
    this.out(oscGain, 0.9, 0.35)
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
    filter.frequency.value = 240
    const brownGain = ctx.createGain()
    brownGain.gain.value = 0.22
    brown.connect(filter)
    filter.connect(brownGain)
    this.out(brownGain, 1, 0.25)
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
  }

  async playTone(hz: number, label: string, id = String(hz)) {
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
    this.beginPlay(label, 0.58, 1.8, { route: `/session/tone/${id}`, id, kind: 'tone' })
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
    this.beginPlay('Yatak', 0.52, 2.6, { kind: 'pad' })
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

  async playNature(id: string) {
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
    const scene = NATURE_SCENES.find((s) => s.id === id)
    this.beginPlay(scene?.title ?? 'Doğa', 0.62, 2, {
      route: `/session/nature/${id}`,
      id,
      kind: 'nature',
    })
    this.startSpace(ctx, 0.36)

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
    this.warmPad(ctx, [123, 185], 0.028)
    const src = loopNoise(ctx, 'pink', 4, 2)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 900
    bp.Q.value = 0.4
    const g = ctx.createGain()
    g.gain.value = 0.16
    src.connect(bp)
    bp.connect(g)
    this.out(g, 0.85, 0.5)
    src.start()
    this.lfo(ctx, g.gain, 0.07, 0.04, 0.16)
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
      cg.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28)
      o.connect(cg)
      this.out(cg, 0.5, 0.8)
      o.start()
      o.stop(ctx.currentTime + 0.3)
    }
    const id = window.setInterval(chirp, 3800)
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
    g.gain.value = 0.14
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
      cg.gain.value = 0.008
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
        g.gain.linearRampToValueAtTime(0.07, now + 0.08)
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
      g.gain.linearRampToValueAtTime(0.05, now + 0.12)
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
      g.gain.value = 0.045
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
    g.gain.value = 0.035
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
      g.gain.value = 0.028
      o.connect(g)
      this.out(g, 0.55, 0.9)
      o.start()
      this.lfo(ctx, g.gain, 0.03, 0.01, 0.028)
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
    g.gain.value = 0.08
    src.connect(lp)
    lp.connect(g)
    this.out(g, 1, 0.5)
    src.start()
    this.lfo(ctx, g.gain, 0.085, 0.05, 0.08)
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
      g.gain.linearRampToValueAtTime(0.04, now + 0.06)
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
