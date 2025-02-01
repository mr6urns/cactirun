import React from 'react';
import { Flame } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  streak: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, streak }) => {
  return (
    <div className="relative bg-black text-white px-3 py-2 rounded-lg border-2 border-[#ea63c2] text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="font-['Press_Start_2P'] text-2xl sm:text-3xl lg:text-4xl">
          {Math.floor(score)}
        </span>
        {streak > 0 && (
          <div className="flex items-center gap-1">
            <Flame 
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff0000] animate-pulse" 
              style={{ filter: 'drop-shadow(0 0 5px #ff0000)' }} 
            />
            <span className="text-[#ff0000] text-sm sm:text-lg font-['Press_Start_2P']">
              x{streak}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};