import React from 'react';
import { RotateCcw } from 'lucide-react';

interface RandomNumberButtonProps {
  onPress: (e: React.MouseEvent | React.TouchEvent) => void;
}

export const RandomNumberButton: React.FC<RandomNumberButtonProps> = ({ onPress }) => {
  return (
    <button
      type="button"
      onTouchStart={onPress}
      onClick={onPress}
      className="bg-[#31bc11] text-black p-2 rounded border-2 border-[#31bc11] select-none active:bg-[#31bc11]/80 shadow-[0_0_10px_rgba(49,188,17,0.3)]"
      aria-label="Generate random number"
    >
      <RotateCcw className="w-6 h-6 text-black" />
    </button>
  );
};