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
    <div className="relative min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <LiveIndicator />
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-border bg-card/30 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Current Era — Epoch {currentEra}
            </span>
          </div>
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
            <Info className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Left side - Button section */}
          <div className="flex flex-col items-center gap-6 lg:items-start lg:pt-8">
            <div className="text-center lg:text-left">
              <h1 className="font-display text-8xl leading-none tracking-tight text-foreground md:text-9xl">
                BORED<span className="text-boredom-cyan">.</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                The world is <span className="text-foreground font-medium">{boredomPercentage}%</span> bored right now.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <BoredomButton onClick={handleClick} disabled={isLoading} />
            </div>

            {/* Stats */}
            <div className="flex gap-3">
              <StatCard icon={Zap} label="Actions" value={totalClicks} />
              <StatCard icon={Users} label="Witnesses" value={activeUsers} />
            </div>

            {/* Color Wave */}
            <div className="w-full max-w-sm">
              <ColorWave currentEra={currentEra} />
            </div>
          </div>

          {/* Right side - Grid */}
          <div className="mx-auto w-full max-w-lg lg:max-w-none">
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