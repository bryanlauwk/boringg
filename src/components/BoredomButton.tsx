import { useState } from "react";

interface BoredomButtonProps {
  onClick: () => void;
}

const BoredomButton = ({ onClick }: BoredomButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative flex h-64 w-64 items-center justify-center rounded-full
        border-4 border-border bg-card/30 backdrop-blur-sm
        transition-all duration-200 ease-out
        hover:border-muted-foreground hover:bg-card/50
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
        active:scale-95
        animate-pulse-glow
        md:h-80 md:w-80
        ${isPressed ? 'animate-button-press' : ''}
      `}
    >
      <span className="font-display text-5xl tracking-wider text-foreground transition-transform group-hover:scale-105 md:text-6xl">
        PRESS
      </span>
      
      {/* Outer ring effect on hover */}
      <span className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-muted-foreground/30 group-hover:scale-110" />
    </button>
  );
};

export default BoredomButton;
