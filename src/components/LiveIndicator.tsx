const LiveIndicator = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live-red opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-live-red"></span>
      </span>
      <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        Live Global Feed
      </span>
    </div>
  );
};

export default LiveIndicator;
