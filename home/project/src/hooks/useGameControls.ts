import { useEffect } from 'react';

interface GameControlsProps {
  onJump: () => void;
}

export const useGameControls = ({ onJump }: GameControlsProps) => {
  useEffect(() => {
    const TOUCH_COOLDOWN = 50; // Reduced cooldown for more responsive touch
    let lastTouch = 0;
    let touchStartY = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        onJump();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      touchStartY = e.touches[0].clientY;
      
      const now = Date.now();
      if (now - lastTouch > TOUCH_COOLDOWN) {
        onJump();
        lastTouch = now;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onJump]);
};