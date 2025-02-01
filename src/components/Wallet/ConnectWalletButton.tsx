import React from 'react';
import { Wallet } from 'lucide-react';

export const ConnectWalletButton: React.FC = () => (
  <button 
    disabled 
    className="w-full bg-black text-white px-3 py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 font-bold border-2 border-white font-['Press_Start_2P'] text-lg sm:text-xl transition-all duration-300"
  >
    <span className="flex items-center gap-2">
      COMING SOON <Wallet className="w-5 h-5 animate-pulse" />
    </span>
  </button>
);