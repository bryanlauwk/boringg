import { useCallback, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

const MILESTONES = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

export const useConfetti = (totalClicks: number, currentEra: number) => {
  const previousClicks = useRef(totalClicks);
  const previousEra = useRef(currentEra);

  const fireConfetti = useCallback((type: 'milestone' | 'era') => {
    if (type === 'era') {
      // Epic confetti for new era
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      // Quick burst for milestone
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD'],
      });
    }
  }, []);

  useEffect(() => {
    // Check for new era
    if (currentEra > previousEra.current && previousEra.current > 0) {
      fireConfetti('era');
    }
    previousEra.current = currentEra;
  }, [currentEra, fireConfetti]);

  useEffect(() => {
    // Check for milestones
    for (const milestone of MILESTONES) {
      if (previousClicks.current < milestone && totalClicks >= milestone) {
        fireConfetti('milestone');
        break;
      }
    }
    previousClicks.current = totalClicks;
  }, [totalClicks, fireConfetti]);

  return { fireConfetti };
};
