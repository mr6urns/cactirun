import React from 'react';
import { TopBar } from './TopBar';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import { RetroTitle } from '../UI/RetroTitle';
import { Score } from '../../services/leaderboard';
import { PowerOnElement } from '../UI/PowerOnElement';

interface GameLayoutProps {
  children?: React.ReactNode;
  score: number;
  highScore: number;
  streak: number;
  scores: Score[];
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  score,
  highScore,
  streak,
  scores
}) => (
  <div className="fixed inset-0 bg-black flex flex-col items-center">
    <div className="w-full max-w-[800px] h-full flex flex-col p-2 sm:p-4 gap-2 sm:gap-4">
      <PowerOnElement delay={4000} duration={8000} className="opacity-0">
        <div className="flex-none">
          <RetroTitle />
        </div>
      </PowerOnElement>
      
      <PowerOnElement delay={12000} duration={8000} className="opacity-0">
        <div className="flex-none">
          <TopBar score={score} highScore={highScore} streak={streak} />
        </div>
      </PowerOnElement>
      
      <PowerOnElement delay={20000} duration={8000} className="opacity-0">
        <div className="flex-1 relative min-h-0">
          <div className="relative h-full rounded-lg overflow-hidden border-2 border-[#8ec7ff] shadow-[0_0_30px_rgba(142,199,255,0.3)]">
            {children}
          </div>
        </div>
      </PowerOnElement>
      
      <PowerOnElement delay={28000} duration={8000} className="opacity-0">
        <div className="flex-none">
          <Leaderboard scores={scores} currentScore={score} streak={streak} />
        </div>
      </PowerOnElement>
    </div>
  </div>
);