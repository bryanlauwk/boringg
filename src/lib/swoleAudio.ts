let context: AudioContext | undefined;
export function playPress(growth: number, squeak: boolean) {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume().catch(() => { /* Audio permission can be denied. */ });
  const now = context.currentTime;
  const tone = context.createOscillator();
  const gain = context.createGain();
  tone.connect(gain).connect(context.destination);
  tone.type = squeak ? "sine" : "triangle";
  tone.frequency.setValueAtTime(squeak ? 1500 : 260 - Math.min(1, growth) * 170, now);
  tone.frequency.exponentialRampToValueAtTime(squeak ? 2400 : 45, now + (squeak ? .065 : .11));
  if (squeak) tone.frequency.exponentialRampToValueAtTime(650, now + .23);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(squeak ? .12 : .2, now + .006);
  gain.gain.exponentialRampToValueAtTime(.001, now + (squeak ? .25 : .18));
  tone.start(now);
  tone.stop(now + .3);
  tone.onended = () => { tone.disconnect(); gain.disconnect(); };
}
