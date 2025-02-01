import React from 'react';
import { Flame } from 'lucide-react';

interface StreakIndicatorProps {
  streak: number;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({ streak }) => {
  if (streak === 0) return null;

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#00ffff]/30 z-50">
      <Flame 
        className="w-4 h-4 text-[#00ffff] animate-pulse" 
        style={{ 
          filter: 'drop-shadow(0 0 8px #00ffff)',
          animation: 'pulse 0.75s ease-in-out infinite'
        }} 
      />
      <span className="text-[#00ffff] font-bold font-['Press_Start_2P'] text-xs">
        x{streak}
      </span>
    </div>
  );
};