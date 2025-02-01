import React from 'react';
import { useFadeIn } from '../../hooks/useFadeIn';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 1000,
  className = ''
}) => {
  const fade = useFadeIn(delay, duration);

  return (
    <div 
      style={fade.style}
      className={`${fade.className} ${className}`}
    >
      {children}
    </div>
  );
};