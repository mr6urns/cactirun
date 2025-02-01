import React, { useState, useEffect } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [opacity, setOpacity] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);

  useEffect(() => {
    // Fade in background
    setTimeout(() => setOpacity(1), 100);
    
    // Fade in image with delay
    setTimeout(() => setImageOpacity(1), 300);

    // Start fade out sequence
    setTimeout(() => {
      setImageOpacity(0);
      setTimeout(() => {
        setOpacity(0);
        setTimeout(onComplete, 500);
      }, 500);
    }, 2000);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div 
        className="transition-opacity duration-1000"
        style={{ opacity: imageOpacity }}
      >
        <img
          src="https://i.ibb.co/J3wmg7c/Screenshot-2024-12-29-010733.png"
          alt="CACTI.RUN"
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};