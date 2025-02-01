import React from 'react';
import { Flame } from 'lucide-react';

interface StreakIndicatorProps {
  streak: number;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({ streak }) => {
  if (streak === 0) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full border-2 border-[#ff4400]">
      <Flame className="w-6 h-6 text-[#ff4400] animate-pulse" 
        style={{ 
          filter: `drop-shadow(0 0 8px #ff4400)`,
          animation: 'pulse 1s ease-in-out infinite'
        }} 
      />
      <span className="text-[#ff4400] font-bold font-['Press_Start_2P'] text-sm">
        x{streak}
      </span>
    </div>
  );
};