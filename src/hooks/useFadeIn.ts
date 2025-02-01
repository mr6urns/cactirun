import { useState, useEffect } from 'react';

export const useFadeIn = (delay: number = 0, duration: number = 1000) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    style: {
      opacity,
      transition: `opacity ${duration}ms ease-in-out`
    },
    className: 'transition-opacity'
  };
};