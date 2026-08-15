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

function fillNoise(
  data: Float32Array,
  kind: 'white' | 'pink' | 'brown',
) {
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
): AudioBufferSourceNode {
  const length = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  fillNoise(buffer.getChannelData(0), kind)
  const src = ctx.createBufferSource()
  src.buffer = buffer
  src.loop = true
  return src
}

export class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
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
    this.fadeMaster(on ? 0.1 : this.restGain, 0.16)
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
    this.beginPlay('SOS', 0.48, 1.2)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 174
    const oscGain = ctx.createGain()
    oscGain.gain.value = 0.12
    osc.connect(oscGain)
    this.connect(oscGain)
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

    const brown = loopNoise(ctx, 'brown', 4)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 280
    const brownGain = ctx.createGain()
    brownGain.gain.value = 0.26
    brown.connect(filter)
    filter.connect(brownGain)
    this.connect(brownGain)
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
    this.beginPlay(label, 0.64, 1)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = hz
    const oscGain = ctx.createGain()
    oscGain.gain.value = 0.22
    osc.connect(oscGain)
    this.connect(oscGain)
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

    const brown = loopNoise(ctx, 'brown', 4)
    const g = ctx.createGain()
    g.gain.value = 0.12
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 220
    brown.connect(lp)
    lp.connect(g)
    this.connect(g)
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

  async playNature(id: string) {
    const ctx = await this.ensure()
    this.stop(0.08)
    await this.ensure()
    const scene = NATURE_SCENES.find((s) => s.id === id)
    this.beginPlay(scene?.title ?? 'Doğa', 0.7, 1.4)

    if (id === 'rain') this.rain(ctx)
    else if (id === 'ocean') this.ocean(ctx)
    else if (id === 'forest') this.forest(ctx)
    else if (id === 'fire') this.fire(ctx)
    else if (id === 'wind') this.wind(ctx)
    else this.night(ctx)
  }

  private lfo(
    ctx: AudioContext,
    param: AudioParam,
    rate: number,
    depth: number,
    base: number,
  ) {
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
    const src = loopNoise(ctx, 'white', 2.5)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 2400
    bp.Q.value = 0.7
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 900
    const g = ctx.createGain()
    g.gain.value = 0.28
    src.connect(hp)
    hp.connect(bp)
    bp.connect(g)
    this.connect(g)
    src.start()
    this.lfo(ctx, g.gain, 0.13, 0.06, 0.28)
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
  }

  private ocean(ctx: AudioContext) {
    const src = loopNoise(ctx, 'brown', 5)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 520
    const g = ctx.createGain()
    g.gain.value = 0.36
    src.connect(lp)
    lp.connect(g)
    this.connect(g)
    src.start()
    this.lfo(ctx, g.gain, 0.07, 0.16, 0.32)
    this.lfo(ctx, lp.frequency, 0.05, 140, 500)
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
    const src = loopNoise(ctx, 'pink', 3)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1100
    bp.Q.value = 0.5
    const g = ctx.createGain()
    g.gain.value = 0.18
    src.connect(bp)
    bp.connect(g)
    this.connect(g)
    src.start()
    this.lfo(ctx, g.gain, 0.08, 0.05, 0.18)
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
      const start = 1800 + Math.random() * 1400
      o.frequency.setValueAtTime(start, ctx.currentTime)
      o.frequency.exponentialRampToValueAtTime(start * 1.25, ctx.currentTime + 0.18)
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.0001, ctx.currentTime)
      cg.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.04)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)
      o.connect(cg)
      this.connect(cg)
      o.start()
      o.stop(ctx.currentTime + 0.24)
    }
    const id = window.setInterval(chirp, 4200)
    this.track(() => window.clearInterval(id))
  }

  private fire(ctx: AudioContext) {
    const src = loopNoise(ctx, 'pink', 2)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 800
    const g = ctx.createGain()
    g.gain.value = 0.22
    src.connect(lp)
    lp.connect(g)
    this.connect(g)
    src.start()
    this.lfo(ctx, g.gain, 0.9, 0.05, 0.22)
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
      const n = loopNoise(ctx, 'white', 0.2)
      const hp = ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 1500
      const cg = ctx.createGain()
      cg.gain.setValueAtTime(0.08, ctx.currentTime)
      cg.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09)
      n.connect(hp)
      hp.connect(cg)
      this.connect(cg)
      n.start()
      n.stop(ctx.currentTime + 0.1)
    }
    const id = window.setInterval(crackle, 380)
    this.track(() => window.clearInterval(id))
  }

  private wind(ctx: AudioContext) {
    const src = loopNoise(ctx, 'pink', 4)
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 500
    bp.Q.value = 0.4
    const g = ctx.createGain()
    g.gain.value = 0.24
    src.connect(bp)
    bp.connect(g)
    this.connect(g)
    src.start()
    this.lfo(ctx, g.gain, 0.06, 0.1, 0.22)
    this.lfo(ctx, bp.frequency, 0.04, 180, 520)
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
    const src = loopNoise(ctx, 'brown', 4)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 180
    const g = ctx.createGain()
    g.gain.value = 0.16
    src.connect(lp)
    lp.connect(g)
    this.connect(g)
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
      o.type = 'square'
      o.frequency.value = 4200 + Math.random() * 400
      const cg = ctx.createGain()
      cg.gain.value = 0.012
      o.connect(cg)
      this.connect(cg)
      o.start()
      o.stop(ctx.currentTime + 0.045)
    }
    const id = window.setInterval(cricket, 220)
    this.track(() => window.clearInterval(id))
  }
}

export const audio = new AudioEngine()

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
