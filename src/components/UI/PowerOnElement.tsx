import React, { useState, useEffect } from 'react';
import { usePowerOnEffect } from '../../hooks/usePowerOnEffect';

interface PowerOnElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const PowerOnElement: React.FC<PowerOnElementProps> = ({
  children,
  delay = 0,
  duration = 2000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const effect = usePowerOnEffect(delay, duration);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div 
      style={effect.style}
      className={`${effect.className} ${className} relative`}
    >
      {/* CRT scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan pointer-events-none" />
      {children}
    </div>
  );
};