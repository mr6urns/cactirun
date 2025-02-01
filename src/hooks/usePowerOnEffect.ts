import { useState, useEffect } from 'react';

export const usePowerOnEffect = (delay: number = 0, duration: number = 8000) => {
  const [opacity, setOpacity] = useState(0);
  const [glow, setGlow] = useState(0);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      // Much slower flicker sequence with more stages
      const sequence = [
        { opacity: 0.05, glow: 0.1, delay: 0 },
        { opacity: 0, glow: 0, delay: 800 },
        { opacity: 0.1, glow: 0.15, delay: 1600 },
        { opacity: 0.05, glow: 0.05, delay: 2400 },
        { opacity: 0.2, glow: 0.25, delay: 3200 },
        { opacity: 0.1, glow: 0.15, delay: 4000 },
        { opacity: 0.3, glow: 0.35, delay: 4800 },
        { opacity: 0.15, glow: 0.2, delay: 5600 },
        { opacity: 0.4, glow: 0.45, delay: 6400 },
        { opacity: 0.3, glow: 0.35, delay: 7200 },
        { opacity: 0.6, glow: 0.65, delay: 8000 },
        { opacity: 0.4, glow: 0.45, delay: 8800 },
        { opacity: 0.8, glow: 0.85, delay: 9600 },
        { opacity: 0.6, glow: 0.65, delay: 10400 },
        { opacity: 1, glow: 1, delay: 11200 }
      ];

      sequence.forEach(({ opacity: targetOpacity, glow: targetGlow, delay: flickerDelay }) => {
        setTimeout(() => {
          setOpacity(targetOpacity);
          setGlow(targetGlow);
          setFlicker(true);
          
          // Longer flicker duration
          setTimeout(() => setFlicker(false), 400);
        }, flickerDelay);
      });
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  return {
    style: {
      opacity,
      transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      filter: `
        brightness(${1 + glow * 0.8})
        drop-shadow(0 0 ${glow * 20}px rgba(142, 199, 255, ${glow * 0.9}))
        ${flicker ? 'brightness(1.2)' : ''}
      `
    },
    className: 'transition-all'
  };
};