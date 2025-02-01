import React, { useState, useEffect } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    // Fade in
    setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);

    // Start fade out after animation
    setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 1000);
    }, 2500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <img
          src="https://i.ibb.co/J3wmg7c/Screenshot-2024-12-29-010733.png"
          alt="PACA.RUN"
          className="w-64 h-64 object-contain"
        />
      </div>
    </div>
  );
};