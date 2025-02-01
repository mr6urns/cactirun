import React from 'react';
import { Settings } from 'lucide-react';

interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm p-2 rounded-lg border-2 border-[#31bc11] transition-all hover:scale-110 active:scale-95"
    aria-label="Settings"
  >
    <Settings className="w-6 h-6 text-[#31bc11]" />
  </button>
);