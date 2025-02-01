import React from 'react';
import { X } from 'lucide-react';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-[#31bc11] rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#31bc11] hover:text-white transition-colors"
          aria-label="Close settings"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-[#31bc11] text-xl font-['Press_Start_2P'] mb-6">
          SETTINGS
        </h2>
        
        <div className="space-y-4">
          {/* Settings will be added here */}
        </div>
      </div>
    </div>
  );
};