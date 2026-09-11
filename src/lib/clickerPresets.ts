export type VoiceId =
  | "blue"
  | "brown"
  | "red"
  | "marble"
  | "silver"
  | "buckling";

export interface Voice {
  id: VoiceId;
  name: string;
  character: string;
  /** transient click burst */
  click: { freq: number; q: number; decay: number; gain: number };
  /** resonant body */
  body: { freq: number; decay: number; gain: number; type: OscillatorType };
  /** second tick shortly after the first */
  double?: boolean;
}

export const VOICES: Voice[] = [
  {
    id: "blue",
    name: "Clicky Blue",
    character: "sharp double click, bright leaf snap",
    click: { freq: 4200, q: 1.4, decay: 0.045, gain: 0.9 },
    body: { freq: 780, decay: 0.07, gain: 0.35, type: "triangle" },
    double: true,
  },
  {
    id: "brown",
    name: "Tactile Brown",
    character: "rounded thock, muted bump",
    click: { freq: 2200, q: 1.1, decay: 0.05, gain: 0.6 },
    body: { freq: 320, decay: 0.13, gain: 0.6, type: "sine" },
  },
  {
    id: "red",
    name: "Linear Red",
    character: "soft smooth press, almost no top end",
    click: { freq: 1400, q: 0.8, decay: 0.04, gain: 0.35 },
    body: { freq: 260, decay: 0.1, gain: 0.45, type: "sine" },
  },
  {
    id: "marble",
    name: "Creamy Marble",
    character: "deep low thock, long body",
    click: { freq: 1600, q: 1.2, decay: 0.05, gain: 0.45 },
    body: { freq: 180, decay: 0.24, gain: 0.8, type: "sine" },
  },
  {
    id: "silver",
    name: "Snappy Silver",
    character: "fast high-pitch tick",
    click: { freq: 6200, q: 2.2, decay: 0.028, gain: 0.85 },
    body: { freq: 1100, decay: 0.045, gain: 0.22, type: "triangle" },
  },
  {
    id: "buckling",
    name: "Vintage Buckling",
    character: "loud metallic spring ping",
    click: { freq: 3400, q: 3.2, decay: 0.09, gain: 1 },
    body: { freq: 1450, decay: 0.4, gain: 0.5, type: "square" },
    double: true,
  },
];

export interface Finish {
  id: string;
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  transmission?: number;
}

export const FINISHES: Finish[] = [
  { id: "aluminium", name: "Brushed Aluminium", color: "#b9bec4", metalness: 1, roughness: 0.32 },
  { id: "charcoal", name: "Matte Charcoal", color: "#2a2c31", metalness: 0.25, roughness: 0.78 },
  { id: "brass", name: "Polished Brass", color: "#c9962f", metalness: 1, roughness: 0.14 },
  { id: "smoke", name: "Translucent Smoke", color: "#8e93a3", metalness: 0, roughness: 0.12, transmission: 0.85 },
  { id: "cherry", name: "Glossy Cherry", color: "#9c1728", metalness: 0.35, roughness: 0.12 },
];

export const KEYCAP_COLORS = [
  "#f2f0eb",
  "#e8b13c",
  "#e0533d",
  "#3fa7d6",
  "#5bc47a",
  "#8b6ff2",
  "#f37fb5",
  "#232629",
];

export type ProfileId = "flat" | "domed" | "dish";

export const PROFILES: { id: ProfileId; name: string }[] = [
  { id: "flat", name: "Flat" },
  { id: "domed", name: "Domed" },
  { id: "dish", name: "Deep Dish" },
];

export const GLOW_COLORS = ["#ff8a3d", "#38d6ff", "#8b6ff2", "#5bc47a", "#ff4d6d"];

export const WEIGHT_MIN = 35;
export const WEIGHT_MAX = 120;

export function weightName(g: number) {
  if (g < 50) return "Feather";
  if (g < 65) return "Light";
  if (g < 85) return "Standard";
  if (g < 105) return "Heavy";
  return "Brick";
}

export function weightBlurb(g: number) {
  if (g < 50) return "Barely there. Machine-gun tapping territory.";
  if (g < 65) return "Quick and forgiving, easy on the thumb.";
  if (g < 85) return "The reliable middle. Nothing to complain about.";
  if (g < 105) return "You feel every press. Deliberate and grounded.";
  return "A workout disguised as a toy. Full commitment required.";
}

/** 0 (lightest) → 1 (heaviest) */
export function weightRatio(g: number) {
  return (g - WEIGHT_MIN) / (WEIGHT_MAX - WEIGHT_MIN);
}
