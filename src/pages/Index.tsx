import ClickerCanvas from "@/components/clicker/ClickerCanvas";
import ControlPanel from "@/components/clicker/ControlPanel";
import { useClickerConfig } from "@/hooks/useClickerConfig";
import { TOPPERS } from "@/lib/clickerPresets";

const Index = () => {
  const state = useClickerConfig();
  const selected = TOPPERS.find((topper) => topper.id === state.config.topper) ?? TOPPERS[0];

  return (
    <main className="min-h-screen bg-background p-3 md:h-screen md:overflow-hidden md:p-5">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-4 lg:flex-row lg:gap-5">
        <section className="toy-machine relative h-[62vh] min-h-[500px] shrink-0 overflow-hidden rounded-[2rem] border-[10px] border-machine-frame bg-machine md:h-full lg:w-[65%] lg:shrink">
          <ClickerCanvas
            config={state.config}
            pressTick={state.pressTick}
            onPress={state.press}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 md:p-6">
            <div className="rounded-xl bg-machine-frame px-4 py-2 text-machine-label shadow-toy-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Now serving</p>
              <h1 className="font-display text-2xl leading-none md:text-3xl">{selected.name}</h1>
            </div>
            <div className="rounded-xl bg-machine-glass px-3 py-2 text-right text-machine-ink backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Total taps</p>
              <p className="font-display text-2xl leading-none">{state.presses.toLocaleString()}</p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 text-center md:bottom-6">
            <p className="font-display text-4xl uppercase leading-none text-machine-label drop-shadow-toy md:text-6xl">
              {selected.badge} CLICKER
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-machine-label/80">
              Click the toy or hit space. Breakfast fights back.
            </p>
          </div>
        </section>

        <div className="min-h-0 flex-1 lg:w-[35%]">
          <ControlPanel {...state} />
        </div>
      </div>
    </main>
  );
};

export default Index;
