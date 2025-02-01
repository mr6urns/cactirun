import React from 'react';
import { TopBar } from './TopBar';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import { RetroTitle } from '../UI/RetroTitle';
import { Score } from '../../services/leaderboard';

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
      <div className="flex-none">
        <RetroTitle />
      </div>
      <div className="flex-none">
        <TopBar score={score} highScore={highScore} streak={streak} />
      </div>
      <div className="flex-1 relative min-h-0">
        <div className="relative h-full rounded-lg overflow-hidden border-2 border-[#8ec7ff] shadow-[0_0_30px_rgba(142,199,255,0.3)]">
          {children}
        </div>
      </div>
      <div className="flex-none">
        <Leaderboard scores={scores.slice(0, 3)} />
      </div>
    </div>
  </div>
);