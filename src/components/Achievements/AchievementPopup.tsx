import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

interface AchievementPopupProps {
  title: string;
  description: string;
  onComplete: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  title,
  description,
  onComplete
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed top-4 right-4 bg-black border-2 border-[#39ff14] rounded-lg p-4 shadow-lg transition-all duration-300 ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className="flex items-center gap-3">
        <Trophy className="w-6 h-6 text-[#39ff14]" />
        <div>
          <h3 className="text-[#39ff14] font-bold font-['Press_Start_2P'] text-sm">
            {title}
          </h3>
          <p className="text-[#39ff14]/80 text-xs font-['Press_Start_2P']">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};