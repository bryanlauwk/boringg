import { Voice, weightRatio } from "./clickerPresets";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;

function ensureContext() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);

    const length = Math.floor(ctx.sampleRate * 0.25);
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function setMasterVolume(v: number) {
  ensureContext();
  if (master && ctx) master.gain.setTargetAtTime(v, ctx.currentTime, 0.01);
}

function burst(
  audio: AudioContext,
  out: AudioNode,
  voice: Voice,
  at: number,
  pitch: number,
  amount: number,
) {
  // transient: filtered noise
  const src = audio.createBufferSource();
  src.buffer = noiseBuffer;
  const bp = audio.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = voice.click.freq * pitch;
  bp.Q.value = voice.click.q;
  const g = audio.createGain();
  const clickGain = voice.click.gain * amount;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, clickGain), at + 0.001);
  g.gain.exponentialRampToValueAtTime(0.0001, at + voice.click.decay);
  src.connect(bp).connect(g).connect(out);
  src.start(at);
  src.stop(at + voice.click.decay + 0.05);

  // body: damped tone
  const osc = audio.createOscillator();
  osc.type = voice.body.type;
  osc.frequency.setValueAtTime(voice.body.freq * pitch * 1.15, at);
  osc.frequency.exponentialRampToValueAtTime(
    voice.body.freq * pitch,
    at + voice.body.decay,
  );
  const og = audio.createGain();
  const bodyGain = voice.body.gain * amount;
  og.gain.setValueAtTime(0.0001, at);
  og.gain.exponentialRampToValueAtTime(Math.max(0.0002, bodyGain), at + 0.004);
  og.gain.exponentialRampToValueAtTime(0.0001, at + voice.body.decay);
  osc.connect(og).connect(out);
  osc.start(at);
  osc.stop(at + voice.body.decay + 0.05);
}

/** Play one press. Heavier springs sound lower, slower and louder. */
export function playClick(voice: Voice, weight: number, muted: boolean) {
  if (muted) return;
  const audio = ensureContext();
  if (!audio || !master) return;

  const r = weightRatio(weight);
  const pitch = 1.22 - r * 0.45;
  const amount = 0.75 + r * 0.4;
  const now = audio.currentTime + 0.001;

  burst(audio, master, voice, now, pitch, amount);
  if (voice.double) {
    burst(audio, master, voice, now + 0.012 + r * 0.02, pitch * 0.92, amount * 0.55);
  }
}

export function primeAudio() {
  ensureContext();
}
