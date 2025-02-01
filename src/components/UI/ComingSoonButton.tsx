import React from 'react';
import { Wallet } from 'lucide-react';

export const ComingSoonButton: React.FC = () => (
  <button 
    disabled 
    className="group relative flex-1 bg-black text-[#be7e9c] px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-bold border-2 border-[#be7e9c] font-['Press_Start_2P'] text-xs sm:text-sm transition-all duration-300 overflow-hidden"
  >
    {/* Glitch effect layers */}
    <span className="absolute inset-0 bg-[#ff00ff] translate-x-[2px] translate-y-[2px] opacity-0 group-hover:opacity-0 transition-opacity"></span>
    <span className="absolute inset-0 bg-[#00ffff] translate-x-[-2px] translate-y-[-2px] opacity-0 group-hover:opacity-0 transition-opacity"></span>
    
    {/* Button content */}
    <span className="relative flex items-center gap-2">
      COMING SOON <Wallet size={16} className="animate-pulse" />
    </span>
  </button>
);