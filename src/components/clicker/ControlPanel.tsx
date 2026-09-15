import { Shuffle, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ClickerState } from "@/hooks/useClickerConfig";
import {
  FINISHES,
  GLOW_COLORS,
  KEYCAP_COLORS,
  PROFILES,
  TOPPERS,
  VOICES,
  WEIGHT_MAX,
  WEIGHT_MIN,
  weightName,
} from "@/lib/clickerPresets";

const shelfColors = [
  "bg-primary text-primary-foreground",
  "bg-accent text-accent-foreground",
  "bg-popover text-popover-foreground",
];

const ControlPanel = (state: ClickerState) => {
  const { config, set, volume, setVolume, muted, setMuted, presses, bestStreak, preview, randomize } =
    state;
  const selected = TOPPERS.find((topper) => topper.id === config.topper) ?? TOPPERS[0];

  return (
    <aside className="toy-machine flex h-full flex-col overflow-hidden rounded-[2rem] border-[10px] border-machine-frame bg-card text-card-foreground">
      <header className="flex shrink-0 items-center justify-between border-b-4 border-machine-frame bg-machine px-4 py-3 md:px-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">Clicker Lab presents</p>
          <h2 className="font-display text-2xl leading-none md:text-3xl">MAKAN MACHINE</h2>
        </div>
        <Button
          variant="default"
          size="icon"
          onClick={randomize}
          aria-label="Surprise me"
          title="Surprise me"
          className="shrink-0 rounded-xl border-2 border-machine-frame shadow-toy-sm active:translate-y-1 active:shadow-none"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <section className="border-b-4 border-machine-frame bg-machine px-4 py-4 md:px-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">Your tray</p>
              <h3 className="font-display text-xl leading-none">PICK YOUR SNACK</h3>
            </div>
            <span className="rounded-full bg-machine-frame px-3 py-1 text-[10px] font-black uppercase tracking-widest text-machine-label">
              {TOPPERS.length} served
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {TOPPERS.map((topper, index) => {
              const active = config.topper === topper.id;
              return (
                <Button
                  key={topper.id}
                  type="button"
                  variant="ghost"
                  onClick={() => set("topper", topper.id)}
                  aria-pressed={active}
                  className={`group h-[74px] flex-col gap-1 rounded-xl border-2 px-1 py-2 shadow-toy-sm transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none ${
                    active
                      ? "border-primary bg-machine-frame text-machine-label"
                      : `border-machine-frame ${shelfColors[index % shelfColors.length]}`
                  }`}
                >
                  <span className="font-display text-lg leading-none">{topper.badge}</span>
                  <span className="max-w-full truncate text-[9px] font-black uppercase">{topper.name}</span>
                </Button>
              );
            })}
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-machine-glass px-3 py-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-xs font-semibold leading-snug">{selected.character}</p>
          </div>
        </section>

        <section className="border-b-4 border-machine-frame bg-popover px-4 py-4 md:px-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">Switch sound</p>
              <h3 className="font-display text-xl leading-none">CHOOSE YOUR THOCK</h3>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMuted(!muted)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="rounded-xl border-2 border-machine-frame"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {VOICES.map((voice) => (
              <Button
                key={voice.id}
                variant="outline"
                onClick={() => {
                  set("voice", voice.id);
                  preview(voice.id, config.weight);
                }}
                className={`h-9 rounded-full border-2 px-2 text-[10px] font-black uppercase ${
                  config.voice === voice.id
                    ? "border-machine-frame bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground"
                }`}
              >
                {voice.name.replace(/\s(Blue|Brown|Red|Marble|Silver|Buckling)$/, "")}
              </Button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Volume2 className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Slider
              value={[muted ? 0 : volume * 100]}
              onValueChange={([value]) => {
                setVolume(value / 100);
                if (muted && value > 0) setMuted(false);
              }}
              max={100}
              step={1}
              aria-label="Volume"
            />
          </div>
        </section>

        <section className="border-b-4 border-machine-frame bg-secondary px-4 py-4 text-secondary-foreground md:px-5">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">Spring resistance</p>
              <h3 className="font-display text-xl leading-none">CRANK THE WEIGHT</h3>
            </div>
            <div className="text-right">
              <span className="font-display text-3xl leading-none">{config.weight}g</span>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{weightName(config.weight)}</p>
            </div>
          </div>
          <Slider
            value={[config.weight]}
            onValueChange={([value]) => set("weight", value)}
            onValueCommit={([value]) => preview(config.voice, value)}
            min={WEIGHT_MIN}
            max={WEIGHT_MAX}
            step={1}
            aria-label="Spring weight"
          />
        </section>

        <section className="bg-popover px-4 py-4 md:px-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">Machine body</p>
              <h3 className="font-display text-xl leading-none">DRESS THE BASE</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase">Glow</span>
              <Switch checked={config.glow} onCheckedChange={(value) => set("glow", value)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {FINISHES.map((finish) => (
              <Button
                key={finish.id}
                variant="outline"
                onClick={() => set("finish", finish.id)}
                className={`h-8 rounded-lg border-2 px-2 text-[10px] font-black uppercase ${
                  config.finish === finish.id
                    ? "border-machine-frame bg-machine-frame text-machine-label"
                    : "border-border bg-background"
                }`}
              >
                {finish.name.replace(/^(Brushed|Matte|Polished|Translucent|Glossy) /, "")}
              </Button>
            ))}
          </div>

          {config.topper === "classic" && (
            <div className="mt-3 grid gap-3 border-t-2 border-border pt-3">
              <div className="flex flex-wrap gap-2">
                {KEYCAP_COLORS.map((color, index) => (
                  <Button
                    key={color}
                    variant={config.keycap === color ? "default" : "outline"}
                    size="icon"
                    onClick={() => set("keycap", color)}
                    aria-label={`Keycap colour ${index + 1}`}
                    className="h-7 w-7 rounded-full border-2 border-machine-frame"
                  >
                    <span className="text-[8px]">{index + 1}</span>
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PROFILES.map((profile) => (
                  <Button
                    key={profile.id}
                    variant={config.profile === profile.id ? "default" : "outline"}
                    onClick={() => set("profile", profile.id)}
                    className="h-8 rounded-lg border-2 text-[10px] uppercase"
                  >
                    {profile.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {config.glow && (
            <div className="mt-3 flex gap-2 border-t-2 border-border pt-3">
              {GLOW_COLORS.map((color, index) => (
                <Button
                  key={color}
                  variant={config.glowColor === color ? "default" : "outline"}
                  size="icon"
                  onClick={() => set("glowColor", color)}
                  aria-label={`Glow colour ${index + 1}`}
                  className="h-7 w-7 rounded-full border-2 border-machine-frame"
                >
                  <span className="text-[8px]">{index + 1}</span>
                </Button>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="grid shrink-0 grid-cols-2 border-t-4 border-machine-frame bg-machine-frame text-machine-label">
        <div className="border-r border-machine-label/20 px-5 py-3">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] opacity-70">Total taps</p>
          <p className="font-display text-2xl leading-none">{presses.toLocaleString()}</p>
        </div>
        <div className="px-5 py-3">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] opacity-70">Best in 10s</p>
          <p className="font-display text-2xl leading-none">{bestStreak}</p>
        </div>
      </footer>
    </aside>
  );
};

export default ControlPanel;