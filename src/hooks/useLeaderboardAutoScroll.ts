import { useEffect, useRef, useState } from 'react';

interface UseLeaderboardAutoScrollProps {
  enabled: boolean;
  totalPairs: number;
  onScroll: (index: number) => void;
  interval: number;
}

export const useLeaderboardAutoScroll = ({
  enabled,
  totalPairs,
  onScroll,
  interval
}: UseLeaderboardAutoScrollProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const scroll = () => {
      setCurrentIndex(current => {
        const next = (current + 1) % totalPairs;
        onScroll(next);
        return next;
      });
    };

    // Initial scroll
    timeoutRef.current = window.setInterval(scroll, interval);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [enabled, totalPairs, onScroll, interval]);

  return currentIndex;
};