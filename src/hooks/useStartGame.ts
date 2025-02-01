import { useEffect } from 'react';

interface UseStartGameProps {
  onStart: () => void;
  isEnabled: boolean;
}

export const useStartGame = ({ onStart, isEnabled }: UseStartGameProps) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleStart = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      onStart();
    };

    const startButton = document.getElementById('start-button');
    if (startButton) {
      startButton.addEventListener('touchend', handleStart, { passive: false });
      startButton.addEventListener('click', handleStart);
    }
    
    return () => {
      if (startButton) {
        startButton.removeEventListener('touchend', handleStart);
        startButton.removeEventListener('click', handleStart);
      }
    };
  }, [onStart, isEnabled]);
};