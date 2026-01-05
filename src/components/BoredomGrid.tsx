import { Globe } from "lucide-react";

interface Pixel {
  id: number;
  color: string;
  isNew?: boolean;
}

interface BoredomGridProps {
  pixels: Pixel[];
  gridSize: number;
}

const colorClasses: Record<string, string> = {
  coral: "bg-boredom-coral",
  yellow: "bg-boredom-yellow",
  green: "bg-boredom-green",
  cyan: "bg-boredom-cyan",
  purple: "bg-boredom-purple",
  pink: "bg-boredom-pink",
  white: "bg-boredom-white",
};

const BoredomGrid = ({ pixels, gridSize }: BoredomGridProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div>
            <h2 className="font-display text-xl text-foreground">The Boredom Grid</h2>
            <p className="text-xs text-muted-foreground">Every click changes a random pixel globally.</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground tracking-wide">
          RESOLUTION: {gridSize}x{gridSize}
        </span>
      </div>

      {/* Grid */}
      <div 
        className="relative aspect-square w-full rounded-lg border border-border bg-card/30 p-2 backdrop-blur-sm"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '2px',
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const pixel = pixels.find(p => p.id === index);
          return (
            <div
              key={index}
              className={`
                aspect-square rounded-sm transition-colors duration-200
                ${pixel ? colorClasses[pixel.color] : 'bg-transparent'}
                ${pixel?.isNew ? 'animate-pixel-pop' : ''}
              `}
            />
          );
        })}
      </div>

      {/* Color palette legend */}
      <div className="flex items-center justify-center gap-3">
        {Object.keys(colorClasses).map((color) => (
          <span
            key={color}
            className={`h-4 w-4 rounded-full ${colorClasses[color]}`}
          />
        ))}
        <span className="ml-2 text-xs text-muted-foreground tracking-widest uppercase">
          Global Palette
        </span>
      </div>
    </div>
  );
};

export default BoredomGrid;
