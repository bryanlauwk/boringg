import ClickerCanvas from "@/components/clicker/ClickerCanvas";
import ControlPanel from "@/components/clicker/ControlPanel";
import { useClickerConfig } from "@/hooks/useClickerConfig";

const Index = () => {
  const state = useClickerConfig();

  return (
    <div className="min-h-screen bg-background p-3 md:h-screen md:overflow-hidden md:p-4">
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        {/* Canvas */}
        <div className="relative h-[58vh] shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-card/20 md:h-full lg:w-[65%] lg:shrink">
          <ClickerCanvas
            config={state.config}
            pressTick={state.pressTick}
            onPress={state.press}
          />
          <div className="pointer-events-none absolute left-5 top-5">
            <h1 className="font-display text-3xl leading-none tracking-wide text-foreground md:text-4xl">
              CLICKER LAB
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Drag your cursor to tilt it. Click or hit space to press.
            </p>
          </div>
        </div>

        {/* Panel */}
        <div className="min-h-0 flex-1 lg:w-[35%]">
          <ControlPanel {...state} />
        </div>
      </div>
    </div>
  );
};

export default Index;
