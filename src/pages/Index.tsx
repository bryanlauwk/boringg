import { useState, useCallback } from "react";
import { Zap, Users, Info } from "lucide-react";
import LiveIndicator from "@/components/LiveIndicator";
import BoredomButton from "@/components/BoredomButton";
import StatCard from "@/components/StatCard";
import BoredomGrid from "@/components/BoredomGrid";
import Ticker from "@/components/Ticker";

const GRID_SIZE = 20;
const COLORS = ["coral", "yellow", "green", "cyan", "purple", "pink", "white"];

interface Pixel {
  id: number;
  color: string;
  isNew?: boolean;
}

const Index = () => {
  const [totalClicks, setTotalClicks] = useState(8);
  const [activeUsers] = useState(142);
  const [pixels, setPixels] = useState<Pixel[]>([
    { id: 42, color: "green" },
    { id: 189, color: "purple" },
    { id: 256, color: "white" },
    { id: 312, color: "pink" },
    { id: 78, color: "green" },
    { id: 395, color: "coral" },
  ]);

  const handleButtonClick = useCallback(() => {
    setTotalClicks(prev => prev + 1);
    
    // Add a new random pixel
    const randomPosition = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    setPixels(prev => {
      // Remove isNew from previous pixels and add new one
      const updated = prev.map(p => ({ ...p, isNew: false }));
      
      // Check if position exists, update color if so
      const existingIndex = updated.findIndex(p => p.id === randomPosition);
      if (existingIndex >= 0) {
        updated[existingIndex] = { id: randomPosition, color: randomColor, isNew: true };
      } else {
        updated.push({ id: randomPosition, color: randomColor, isNew: true });
      }
      
      return updated;
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <LiveIndicator />
        <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
          <Info className="h-5 w-5" />
        </button>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left side - Button section */}
          <div className="flex flex-col items-center gap-8 lg:items-start">
            <div className="text-center lg:text-left">
              <h1 className="font-display text-7xl leading-none tracking-tight text-foreground md:text-8xl lg:text-9xl">
                I'M BORED.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Click to contribute to the global boredom.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <BoredomButton onClick={handleButtonClick} />
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <StatCard icon={Zap} label="Total Clicks" value={totalClicks} />
              <StatCard icon={Users} label="Active Users" value={activeUsers} />
            </div>
          </div>

          {/* Right side - Grid */}
          <div className="mx-auto w-full max-w-lg lg:max-w-none">
            <BoredomGrid pixels={pixels} gridSize={GRID_SIZE} />
          </div>
        </div>
      </main>

      {/* Ticker */}
      <Ticker totalClicks={totalClicks} />
    </div>
  );
};

export default Index;
