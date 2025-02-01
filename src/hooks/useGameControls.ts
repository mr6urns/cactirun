import { useEffect } from 'react';

interface GameControlsProps {
  onJump: () => void;
}

export const useGameControls = ({ onJump }: GameControlsProps) => {
  useEffect(() => {
    const TOUCH_COOLDOWN = 200;
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
      const now = Date.now();
      if (now - lastTouch > TOUCH_COOLDOWN) {
        onJump();
        lastTouch = now;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    // Prevent default touch behavior to avoid scrolling
    document.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', (e) => e.preventDefault());
      document.removeEventListener('touchmove', (e) => e.preventDefault());
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onJump]);
};