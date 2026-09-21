import { useCallback, useEffect, useRef, useState } from "react";
import {
  FINISHES,
  GLOW_COLORS,
  KEYCAP_COLORS,
  PROFILES,
  ProfileId,
  VOICES,
  VoiceId,
  WEIGHT_MAX,
  WEIGHT_MIN,
} from "@/lib/clickerPresets";
import { playClick, primeAudio, setMasterVolume } from "@/lib/clickerAudio";

export interface ClickerConfig {
  voice: VoiceId;
  weight: number;
  finish: string;
  keycap: string;
  profile: ProfileId;
  glow: boolean;
  glowColor: string;
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const useClickerConfig = () => {
  const [config, setConfig] = useState<ClickerConfig>({
    voice: "brown",
    weight: 67,
    finish: "cream",
    keycap: "#e0533d",
    profile: "domed",
    glow: false,
    glowColor: GLOW_COLORS[0],
  });
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [presses, setPresses] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  /** bumped on every press so the 3D scene can react */
  const [pressTick, setPressTick] = useState(0);

  const stamps = useRef<number[]>([]);

  useEffect(() => {
    setMasterVolume(muted ? 0 : volume);
  }, [volume, muted]);

  const set = useCallback(<K extends keyof ClickerConfig>(key: K, value: ClickerConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }));
  }, []);

  const preview = useCallback(
    (voiceId: VoiceId, weight: number) => {
      primeAudio();
      const voice = VOICES.find((v) => v.id === voiceId) ?? VOICES[0];
      playClick(voice, weight, muted);
    },
    [muted],
  );

  const press = useCallback(() => {
    primeAudio();
    const voice = VOICES.find((v) => v.id === config.voice) ?? VOICES[0];
    playClick(voice, config.weight, muted);
    setPresses((p) => p + 1);
    setPressTick((t) => t + 1);

    const now = performance.now();
    stamps.current = [...stamps.current, now].filter((t) => now - t <= 10000);
    setBestStreak((b) => Math.max(b, stamps.current.length));
  }, [config.voice, config.weight, muted]);

  const randomize = useCallback(() => {
    const next: ClickerConfig = {
      voice: pick(VOICES).id,
      weight: Math.round(WEIGHT_MIN + Math.random() * (WEIGHT_MAX - WEIGHT_MIN)),
      finish: pick(FINISHES).id,
      keycap: pick(KEYCAP_COLORS),
      profile: pick(PROFILES).id,
      glow: Math.random() > 0.5,
      glowColor: pick(GLOW_COLORS),
    };
    setConfig(next);
    preview(next.voice, next.weight);
  }, [preview]);

  return {
    config,
    set,
    volume,
    setVolume,
    muted,
    setMuted,
    presses,
    bestStreak,
    pressTick,
    press,
    preview,
    randomize,
  };
};

export type ClickerState = ReturnType<typeof useClickerConfig>;
