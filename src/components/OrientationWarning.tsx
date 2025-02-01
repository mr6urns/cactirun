import React from 'react';
import { RotateCcw } from 'lucide-react';

export const OrientationWarning: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-8 text-center">
      <div className="space-y-6">
        <RotateCcw className="w-16 h-16 text-[#8ec7ff] mx-auto animate-spin" />
        <p className="text-[#8ec7ff] text-xl font-['Press_Start_2P']">
          ROTATE DEVICE
        </p>
        <p className="text-[#8ec7ff]/80 font-['Press_Start_2P'] text-sm">
          Please rotate your device to landscape mode
        </p>
      </div>
    </div>
  );
}