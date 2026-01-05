interface Pixel {
  id: number;
  color: string;
  isNew?: boolean;
}

interface BoredomGridProps {
  pixels: Pixel[];
  gridSize: number;
  saturation: number;
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

const BoredomGrid = ({ pixels, gridSize, saturation }: BoredomGridProps) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between rounded-lg bg-card/50 px-3 py-2 backdrop-blur-sm">
        <h2 className="font-display text-xl tracking-wide text-foreground">THE BOREDOM GRID</h2>
        <span className="text-xs text-muted-foreground tracking-widest">
          {gridSize}×{gridSize}
        </span>
      </div>

      {/* Grid */}
      <div 
        className="relative aspect-square w-full rounded-lg border border-border bg-card/20 p-1 backdrop-blur-sm"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '1px',
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const pixel = pixels.find(p => p.id === index);
          return (
            <div
              key={index}
              className={`
                aspect-square transition-colors duration-200
                ${pixel ? colorClasses[pixel.color] : 'bg-muted/20'}
                ${pixel?.isNew ? 'animate-pixel-pop' : ''}
              `}
            />
          );
        })}
      </div>

      {/* Saturation indicator */}
      <div className="flex items-center justify-between rounded-lg bg-card/50 px-3 py-2 backdrop-blur-sm">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Saturation
        </span>
        <div className="flex items-center gap-2">
          <div className="h-1 w-20 overflow-hidden rounded-full bg-muted/30">
            <div 
              className="h-full rounded-full bg-boredom-cyan transition-all duration-500"
              style={{ width: `${saturation}%` }}
            />
          </div>
          <span className="font-display text-sm text-foreground">{saturation}%</span>
        </div>
      </div>
    </div>
  );
};

export default BoredomGrid;