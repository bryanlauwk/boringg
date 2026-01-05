import { useState } from "react";

interface BoredomButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const BoredomButton = ({ onClick, disabled }: BoredomButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        group relative flex h-56 w-56 items-center justify-center rounded-full
        border-2 border-border bg-card/20 backdrop-blur-sm
        transition-all duration-200 ease-out
        hover:border-muted-foreground/50 hover:bg-card/30
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
        active:scale-95
        animate-pulse-glow
        md:h-64 md:w-64
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isPressed ? 'animate-button-press' : ''}
      `}
    >
      <span className="font-display text-5xl tracking-wider text-foreground transition-transform group-hover:scale-105 md:text-6xl">
        PUSH
      </span>
      
      {/* Outer ring effect on hover */}
      <span className="absolute inset-0 rounded-full border border-transparent transition-all duration-300 group-hover:border-muted-foreground/20 group-hover:scale-110" />
    </button>
  );
};

export default BoredomButton;