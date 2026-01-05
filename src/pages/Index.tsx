import { Zap, Users, Info } from "lucide-react";
import LiveIndicator from "@/components/LiveIndicator";
import BoredomButton from "@/components/BoredomButton";
import StatCard from "@/components/StatCard";
import BoredomGrid from "@/components/BoredomGrid";
import Ticker from "@/components/Ticker";
import ColorWave from "@/components/ColorWave";
import { useBoredomData } from "@/hooks/useBoredomData";

const Index = () => {
  const { 
    totalClicks, 
    activeUsers, 
    pixels, 
    isLoading, 
    handleClick, 
    saturation, 
    currentEra, 
    boredomPercentage,
    gridSize 
  } = useBoredomData();

  return (
    <div className="relative min-h-screen bg-background pb-14">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 md:px-8">
        <LiveIndicator />
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-border bg-card/30 px-3 py-1 backdrop-blur-sm">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Era {currentEra}
            </span>
          </div>
          <button className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-start">
          {/* Left side - Button section */}
          <div className="flex flex-col items-center gap-4 lg:items-start lg:pt-4">
            <div className="text-center lg:text-left">
              <h1 className="font-display text-7xl leading-none tracking-tight text-foreground md:text-8xl">
                I'M BORED<span className="text-boredom-cyan">.</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                humanity is <span className="text-foreground font-medium">{boredomPercentage}%</span> over it.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <BoredomButton onClick={handleClick} disabled={isLoading} />
            </div>

            {/* Stats */}
            <div className="flex gap-2">
              <StatCard icon={Zap} label="Taps" value={totalClicks} />
              <StatCard icon={Users} label="Watching" value={activeUsers} />
            </div>

            {/* Color Wave */}
            <div className="w-full max-w-xs">
              <ColorWave currentEra={currentEra} />
            </div>
          </div>

          {/* Right side - Grid */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <BoredomGrid pixels={pixels} gridSize={gridSize} saturation={saturation} />
          </div>
        </div>
      </main>

      {/* Ticker */}
      <Ticker totalClicks={totalClicks} />
    </div>
  );
};

export default Index;
