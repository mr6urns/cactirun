import React from 'react';
import { Leaderboard } from '../Leaderboard/Leaderboard';
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
    <div className="w-full max-w-[1920px] h-full flex flex-col p-2 sm:p-4">
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 min-h-0">
        {/* Game container */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <div className="relative w-full h-full lg:h-auto aspect-video max-h-full">
            <div className="absolute inset-0 rounded-lg border-2 border-[#31bc11] overflow-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="h-[180px] lg:h-auto lg:w-[320px] flex-shrink-0">
          <div className="h-full bg-black rounded-lg border-2 border-[#31bc11] overflow-hidden">
            <Leaderboard 
              scores={scores} 
              currentScore={score}
              streak={streak}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);