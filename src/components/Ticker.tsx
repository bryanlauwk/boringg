interface TickerProps {
  totalClicks: number;
}

const Ticker = ({ totalClicks }: TickerProps) => {
  const messages = [
    "GLOBAL BOREDOM LEVELS ARE RISING",
    `${totalClicks} CLICKS AND COUNTING`,
    "JOIN THE VOID",
    "PUSH THE BUTTON",
    "A USER JUST CLICKED",
    "EMBRACE THE BOREDOM",
    "YOU ARE NOT ALONE",
  ];

  const tickerContent = messages.join(" • ");

  return (
    <div className="fixed bottom-0 left-0 right-0 overflow-hidden border-t border-border bg-card/80 py-3 backdrop-blur-sm">
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        <span className="text-sm font-medium tracking-widest text-muted-foreground">
          {tickerContent} • {tickerContent} •&nbsp;
        </span>
        <span className="text-sm font-medium tracking-widest text-muted-foreground">
          {tickerContent} • {tickerContent} •&nbsp;
        </span>
      </div>
    </div>
  );
};

export default Ticker;
