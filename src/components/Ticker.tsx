interface TickerProps {
  totalClicks: number;
}

const Ticker = ({ totalClicks }: TickerProps) => {
  const messages = [
    "NOTHING TO DO? SAME.",
    `${totalClicks.toLocaleString()} TAPS AND COUNTING`,
    "THE VOID STARES BACK",
    "TAP TAP TAP TAP",
    "SOMEONE JUST GAVE UP",
    "YOU'RE NOT SPECIAL. EVERYONE'S BORED.",
    "JOIN THE COLLECTIVE SIGH",
    "TIME IS A FLAT CIRCLE",
  ];

  const tickerContent = messages.join(" • ");

  return (
    <div className="fixed bottom-0 left-0 right-0 overflow-hidden border-t border-border bg-card/80 py-2 backdrop-blur-sm">
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        <span className="text-xs font-medium tracking-widest text-muted-foreground">
          {tickerContent} • {tickerContent} •&nbsp;
        </span>
        <span className="text-xs font-medium tracking-widest text-muted-foreground">
          {tickerContent} • {tickerContent} •&nbsp;
        </span>
      </div>
    </div>
  );
};

export default Ticker;
