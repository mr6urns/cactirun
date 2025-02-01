import React, { useEffect, useState } from 'react';
import { COLORS } from '../../utils/constants';

interface MeteorWarningProps {
  onComplete: () => void;
}

export const MeteorWarning: React.FC<MeteorWarningProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${
      visible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold text-[#ff0000] font-['Press_Start_2P'] animate-pulse">
          WARNING!
        </h2>
        <p className="text-lg lg:text-xl text-[#ff0000] font-['Press_Start_2P']">
          METEOR SHOWER INCOMING
        </p>
      </div>
    </div>
  );
};