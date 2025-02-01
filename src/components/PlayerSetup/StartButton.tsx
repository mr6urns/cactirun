import React from 'react';

interface StartButtonProps {
  onPress: (e: React.MouseEvent | React.TouchEvent) => void;
  disabled?: boolean;
}

export const StartButton: React.FC<StartButtonProps> = ({ onPress, disabled }) => {
  const handlePress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPress(e);
  };

  return (
    <button
      type="button"
      onTouchStart={handlePress}
      onClick={handlePress}
      disabled={disabled}
      className="w-full bg-[#31bc11] text-black border-2 border-[#31bc11] px-4 py-2 rounded font-['Press_Start_2P'] text-sm transition-colors active:bg-[#31bc11]/90 select-none disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(49,188,17,0.3)]"
    >
      START THE RUN
    </button>
  );
};