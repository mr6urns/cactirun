import React from 'react';
import { VIEWPORT } from '../../utils/constants/viewport';

interface AspectRatioContainerProps {
  children: React.ReactNode;
}

export const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
      <div 
        className="relative"
        style={{
          width: '100%',
          maxWidth: `${VIEWPORT.TARGET_WIDTH}px`,
          maxHeight: '100vh',
          aspectRatio: `${VIEWPORT.ASPECT_RATIO}`,
          height: 'calc(var(--vh, 1vh) * 100)',
        }}
      >
        {children}
      </div>
    </div>
  );
};