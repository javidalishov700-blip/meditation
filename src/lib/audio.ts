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
  { id: 'rain', title: 'Yağmur camı', subtitle: 'Camdaki damla ve uzak gök' },
  { id: 'ocean', title: 'Gece koyu', subtitle: 'Yavaş dalga, çakıl, tuz' },
  { id: 'forest', title: 'Çam altı', subtitle: 'Yaprak, uzak kuş, rüzgâr' },
  { id: 'fire', title: 'Köz', subtitle: 'Çıtırtı ve alçak ısı' },
  { id: 'wind', title: 'Bozkır rüzgârı', subtitle: 'Geniş, boş, yavaş' },
  { id: 'night', title: 'Kır gecesi', subtitle: 'Cırcır ve uzak ova' },
]

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
  private restGain = 0.55

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
    window.setTimeout(() => {
      handles.forEach((h) => h())
      if (this.epoch === epoch && this.master && ctx) {
        this.master.gain.setValueAtTime(this.restGain, ctx.currentTime)
      }
    }, fade * 1000 + 40)
  }

  private beginPlay(label: string, targetGain: number, fadeIn: number) {
    this.epoch += 1
    this.playing = true
    this.label = label
    this.restGain = targetGain
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(0.0001, now)
    this.fadeMaster(targetGain, fadeIn)
  }

  duck(on: boolean) {
    if (!this.playing) return
    this.fadeMaster(on ? 0.14 : this.restGain, 0.2)
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
    this.beginPlay('SOS', 0.5, 1.4)
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

  async playTone(hz: number, label: string) {
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
    this.beginPlay(label, 0.58, 1.8)
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
    this.beginPlay('Onboard', 0.4, 3.2)
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
    this.beginPlay('Yatak', 0.52, 2.6)
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
    this.beginPlay(scene?.title ?? 'Doğa', 0.62, 2)
    this.startSpace(ctx, 0.36)

    if (id === 'rain') this.rain(ctx)
    else if (id === 'ocean') this.ocean(ctx)
    else if (id === 'forest') this.forest(ctx)
    else if (id === 'fire') this.fire(ctx)
    else if (id === 'wind') this.wind(ctx)
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
}

export const audio = new AudioEngine()

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
