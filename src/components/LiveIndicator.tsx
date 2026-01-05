const LiveIndicator = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live-green opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-live-green"></span>
      </span>
      <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Global Sync Active
      </span>
    </div>
  );
};

export default LiveIndicator;