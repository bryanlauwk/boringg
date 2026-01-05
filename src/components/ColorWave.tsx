interface ColorWaveProps {
  currentEra: number;
}

const colors = [
  { name: 'coral', className: 'bg-boredom-coral' },
  { name: 'yellow', className: 'bg-boredom-yellow' },
  { name: 'green', className: 'bg-boredom-green' },
  { name: 'cyan', className: 'bg-boredom-cyan' },
  { name: 'purple', className: 'bg-boredom-purple' },
  { name: 'pink', className: 'bg-boredom-pink' },
  { name: 'white', className: 'bg-boredom-white' },
];

const ColorWave = ({ currentEra }: ColorWaveProps) => {
  return (
    <div className="rounded-lg border border-border bg-card/30 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Current Color Wave
        </span>
        <span className="text-xs text-muted-foreground">
          ERA {currentEra}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`h-6 w-6 rounded-full ${color.className} ring-1 ring-border/50`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorWave;