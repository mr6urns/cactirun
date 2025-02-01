import React, { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../../utils/storage/constants';

interface TutorialOverlayProps {
  onComplete: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (step < 2) {
          setStep(s => s + 1);
        } else {
          completeTutorial();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step]);

  const completeTutorial = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEYS.TUTORIAL_COMPLETED, 'true');
    setTimeout(onComplete, 300);
  };

  const messages = [
    'PRESS SPACE TO JUMP',
    'DOUBLE JUMP FOR HIGHER OBSTACLES',
    'AVOID BEAMS AND METEORS'
  ];

  return (
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center transition-opacity duration-300 ${
      visible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-[#8ec7ff] font-['Press_Start_2P'] mb-8">
          HOW TO PLAY
        </h2>
        <p className="text-lg lg:text-2xl text-[#8ec7ff] font-['Press_Start_2P'] animate-pulse">
          {messages[step]}
        </p>
        <p className="text-sm lg:text-base text-[#8ec7ff]/60 font-['Press_Start_2P']">
          Press SPACE to {step < 2 ? 'continue' : 'start'}
        </p>
      </div>
    </div>
  );
};