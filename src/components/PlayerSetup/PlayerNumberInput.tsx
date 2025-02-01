import React, { useState, useEffect } from 'react';
import { RandomNumberButton } from './RandomNumberButton';
import { StartButton } from './StartButton';
import { generateRandomNumber } from '../../utils/random';

interface PlayerNumberInputProps {
  onSubmit: (playerNumber: string) => void;
}

export const PlayerNumberInput: React.FC<PlayerNumberInputProps> = ({ onSubmit }) => {
  const [number, setNumber] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowKeyboard(true);
  };

  const handleKeyPress = (n: number) => {
    if (number.length < 3) {
      setNumber(prev => prev + n);
    }
  };

  const handleRandomNumber = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newNumber = generateRandomNumber();
    setNumber(newNumber);
  };

  const handleSubmit = () => {
    if (number) {
      onSubmit(`CACTI ${number}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-black p-6 rounded-lg border-2 border-[#31bc11] max-w-sm w-full shadow-[0_0_20px_rgba(49,188,17,0.3)] transition-opacity duration-1000"
        style={{ opacity }}
      >
        <h2 className="text-[#31bc11] text-xl font-['Press_Start_2P'] mb-6 text-center">
          CHOOSE YOUR NUMBER
        </h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-[#31bc11] font-['Press_Start_2P']">CACTI</span>
              <button
                type="button"
                onTouchStart={handleInputClick}
                onClick={handleInputClick}
                className="bg-black border-2 border-[#31bc11] text-[#31bc11] px-3 py-2 rounded w-24 font-['Press_Start_2P'] text-center text-lg select-none active:bg-[#31bc11]/10"
              >
                {number || '___'}
              </button>
              <RandomNumberButton onPress={handleRandomNumber} />
            </div>
          </div>
          <StartButton onPress={handleSubmit} disabled={!number} />
        </div>
      </div>

      {showKeyboard && (
        <div className="fixed inset-0 bg-black/80 flex items-end z-50">
          <div className="w-full bg-black border-t-2 border-[#31bc11] p-4">
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
              {[1,2,3,4,5,6,7,8,9,0].map((n) => (
                <button
                  key={n}
                  type="button"
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleKeyPress(n);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleKeyPress(n);
                  }}
                  className="bg-[#31bc11] text-black p-4 rounded font-['Press_Start_2P'] text-xl select-none active:bg-[#31bc11]/80 shadow-[0_0_10px_rgba(49,188,17,0.3)]"
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onTouchStart={(e) => {
                  e.preventDefault();
                  setNumber(prev => prev.slice(0, -1));
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setNumber(prev => prev.slice(0, -1));
                }}
                className="bg-[#31bc11] text-black p-4 rounded font-['Press_Start_2P'] text-xl select-none active:bg-[#31bc11]/80 shadow-[0_0_10px_rgba(49,188,17,0.3)]"
              >
                ←
              </button>
              <button
                type="button"
                onTouchStart={(e) => {
                  e.preventDefault();
                  setShowKeyboard(false);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowKeyboard(false);
                }}
                className="bg-[#31bc11] text-black p-4 rounded font-['Press_Start_2P'] text-xl select-none active:bg-[#31bc11]/80 shadow-[0_0_10px_rgba(49,188,17,0.3)]"
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}