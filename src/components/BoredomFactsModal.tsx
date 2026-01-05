import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface BoredomFactsModalProps {
  totalClicks: number;
  activeUsers: number;
  saturation: number;
  currentEra: number;
}

const BoredomFactsModal = ({ totalClicks, activeUsers, saturation, currentEra }: BoredomFactsModalProps) => {
  const facts = [
    {
      stat: `${(totalClicks * 0.3).toFixed(0)}`,
      label: "seconds of human life wasted here",
    },
    {
      stat: `${Math.floor(totalClicks / 42)}`,
      label: "existential crises averted",
    },
    {
      stat: `${(activeUsers * 7.3).toFixed(1)}%`,
      label: "of viewers questioning their life choices",
    },
    {
      stat: `${Math.floor(totalClicks * 0.001)}`,
      label: "cups of coffee consumed while staring at this",
    },
    {
      stat: `${currentEra}`,
      label: "eras of collective ennui",
    },
    {
      stat: `${(saturation * 0.73).toFixed(1)}°`,
      label: "global boredom temperature",
    },
  ];

  const absurdFacts = [
    "The average user stares at the button for 4.7 seconds before tapping.",
    "73% of taps occur during work hours. We see you.",
    "The most taps in one session: 847. They need help.",
    "Peak boredom hours: 2-4 PM on Tuesdays.",
    "Someone in Finland has been here for 6 hours straight.",
    "The grid has been fully saturated 0 times. Keep trying.",
    "3 users have bookmarked this. Why?",
    "This button has been pressed more times than your ex texted you back.",
  ];

  const randomFact = absurdFacts[Math.floor(Math.random() * absurdFacts.length)];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
          <Info className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wide text-foreground">
            THE BOREDOM REPORT
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {facts.map((fact, index) => (
              <div 
                key={index}
                className="rounded-lg border border-border bg-background/50 p-3"
              >
                <div className="font-display text-xl text-boredom-cyan">
                  {fact.stat}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>

          {/* Random absurd fact */}
          <div className="rounded-lg border border-border bg-boredom-purple/10 p-3">
            <div className="text-xs font-medium tracking-widest text-boredom-purple uppercase mb-1">
              Did you know?
            </div>
            <p className="text-sm text-foreground">
              {randomFact}
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            These statistics are 100% made up. Just like your productivity today.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoredomFactsModal;
