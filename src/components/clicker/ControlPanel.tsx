import { Shuffle, Volume2, VolumeX } from "lucide-react";
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
  weightBlurb,
  weightName,
} from "@/lib/clickerPresets";

const Step = ({
  index,
  title,
  subtitle,
  children,
}: {
  index: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <section className="border-b border-border/60 px-5 py-5 last:border-b-0">
    <header className="mb-3 flex items-baseline gap-2">
      <span className="font-display text-sm tracking-widest text-primary">0{index}</span>
      <div>
        <h2 className="font-display text-xl leading-none tracking-wide text-foreground">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </header>
    {children}
  </section>
);

const ControlPanel = (state: ClickerState) => {
  const { config, set, volume, setVolume, muted, setMuted, presses, bestStreak, preview, randomize } =
    state;

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div>
          <h1 className="font-display text-2xl leading-none tracking-wide text-foreground">
            SENSORY CONTROL
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Kopitiam comfort, engineered for your fingertips.
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={randomize} aria-label="Surprise me">
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Step 1 */}
        <Step index={1} title="THE ACOUSTIC ENGINE" subtitle="Pick a switch voice. Every one is synthesised live.">
          <div className="grid gap-2">
            {VOICES.map((v) => {
              const active = config.voice === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    set("voice", v.id);
                    preview(v.id, config.weight);
                  }}
                  className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                    active
                      ? "border-primary/70 bg-primary/10"
                      : "border-border/60 bg-background/30 hover:border-muted-foreground/50"
                  }`}
                >
                  <span className="block text-sm font-medium text-foreground">{v.name}</span>
                  <span className="block text-xs text-muted-foreground">{v.character}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMuted(!muted)}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[muted ? 0 : volume * 100]}
              onValueChange={([v]) => {
                setVolume(v / 100);
                if (muted && v > 0) setMuted(false);
              }}
              max={100}
              step={1}
              aria-label="Volume"
            />
          </div>
        </Step>

        {/* Step 2 */}
        <Step index={2} title="TACTILE RESISTANCE" subtitle="Spring weight changes the feel, the sound and the thud.">
          <div className="mb-3 flex items-end justify-between">
            <span className="font-display text-3xl leading-none text-foreground">
              {config.weight}
              <span className="ml-1 text-base text-muted-foreground">g</span>
            </span>
            <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              {weightName(config.weight)}
            </span>
          </div>
          <Slider
            value={[config.weight]}
            onValueChange={([v]) => set("weight", v)}
            onValueCommit={([v]) => preview(config.voice, v)}
            min={WEIGHT_MIN}
            max={WEIGHT_MAX}
            step={1}
            aria-label="Spring weight"
          />
          <p className="mt-3 text-xs text-muted-foreground">{weightBlurb(config.weight)}</p>
        </Step>

        {/* Step 3 */}
        <Step index={3} title="KOPITIAM COLLECTION" subtitle="Pick your breakfast. No queue, no crumbs, all click.">
          <div className="mb-5 grid grid-cols-2 gap-2">
            {TOPPERS.map((topper) => (
              <Button
                key={topper.id}
                type="button"
                variant="outline"
                onClick={() => set("topper", topper.id)}
                className={`h-auto min-h-16 items-start justify-start whitespace-normal px-3 py-2 text-left ${
                  config.topper === topper.id
                    ? "border-primary/70 bg-primary/10 text-foreground"
                    : "border-border/60 bg-background/30 text-muted-foreground"
                }`}
              >
                <span>
                  <span className="block text-xs font-medium text-foreground">{topper.name}</span>
                  <span className="mt-1 block text-[10px] leading-tight text-muted-foreground">
                    {topper.character}
                  </span>
                </span>
              </Button>
            ))}
          </div>

          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Shell finish</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                onClick={() => set("finish", f.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                  config.finish === f.id
                    ? "border-primary/70 bg-primary/10 text-foreground"
                    : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {config.topper === "classic" && (
            <div className="animate-fade-in">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Keycap colour</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {KEYCAP_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => set("keycap", c)}
                    aria-label={`Keycap ${c}`}
                    style={{ backgroundColor: c }}
                    className={`h-7 w-7 rounded-full border-2 transition-transform ${
                      config.keycap === c ? "scale-110 border-primary" : "border-border/60"
                    }`}
                  />
                ))}
              </div>

              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Keycap profile</p>
              <div className="mb-4 flex gap-2">
                {PROFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => set("profile", p.id)}
                    className={`flex-1 rounded-lg border px-2 py-1.5 text-xs transition-colors ${
                      config.profile === p.id
                        ? "border-primary/70 bg-primary/10 text-foreground"
                        : "border-border/60 bg-background/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Underglow</span>
            <Switch checked={config.glow} onCheckedChange={(v) => set("glow", v)} />
          </div>
          {config.glow && (
            <div className="mt-3 flex gap-2">
              {GLOW_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => set("glowColor", c)}
                  aria-label={`Glow ${c}`}
                  style={{ backgroundColor: c }}
                  className={`h-6 w-6 rounded-full border-2 transition-transform ${
                    config.glowColor === c ? "scale-110 border-primary" : "border-border/60"
                  }`}
                />
              ))}
            </div>
          )}
        </Step>
      </div>

      <footer className="grid grid-cols-2 gap-3 border-t border-border/60 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Presses</p>
          <p className="font-display text-2xl leading-none text-foreground">{presses}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Best / 10s</p>
          <p className="font-display text-2xl leading-none text-foreground">{bestStreak}</p>
        </div>
      </footer>
    </aside>
  );
};

export default ControlPanel;
