import React from 'react';
import { Flame } from 'lucide-react';
import { Score } from '../../services/leaderboard';
import { RetroTitle } from '../UI/RetroTitle';

interface LeaderboardProps {
  scores: Score[];
  currentScore: number;
  streak: number;
}

const getRankColor = (index: number): string => {
  switch (index) {
    case 0: return 'text-[#ffd700]'; // Gold
    case 1: return 'text-[#c0c0c0]'; // Silver
    case 2: return 'text-[#cd7f32]'; // Bronze
    default: return 'text-white';
  }
};

const getRankText = (index: number): string => {
  switch (index) {
    case 0: return '1ST';
    case 1: return '2ND';
    case 2: return '3RD';
    default: return `${index + 1}TH`;
  }
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, currentScore, streak }) => {
  // Show top 3 on mobile, top 10 on desktop
  const isMobile = window.innerWidth < 1024;
  const displayCount = isMobile ? 3 : 10;
  const displayScores = [...scores].slice(0, displayCount);
  
  // Pad with empty scores if needed
  while (displayScores.length < displayCount) {
    displayScores.push({
      id: `empty-${displayScores.length}`,
      playerName: '---',
      score: 0,
      date: new Date().toISOString()
    });
  }

  return (
    <div className="h-full p-2 flex flex-col">
      {/* Current Score */}
      <div className="relative bg-black text-white px-2 py-1.5 rounded-lg border-2 border-[#ea63c2] text-center mb-2">
        <div className="flex items-center justify-center gap-2">
          <span className="font-['Press_Start_2P'] text-xl sm:text-2xl">
            {Math.floor(currentScore)}
          </span>
          {streak > 0 && (
            <div className="flex items-center gap-1">
              <Flame 
                className="w-4 h-4 text-[#ff0000] animate-pulse" 
                style={{ filter: 'drop-shadow(0 0 5px #ff0000)' }} 
              />
              <span className="text-[#ff0000] text-sm font-['Press_Start_2P']">
                x{streak}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Leaderboard */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <h2 className="text-sm font-bold text-[#ea63c2] font-['Press_Start_2P'] mb-1">
          LEADERBOARD
        </h2>
        <div className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
          {displayScores.map((score, index) => (
            <div
              key={score.id}
              className={`flex justify-between items-center p-1 bg-black border border-[#ea63c2] rounded ${
                score.id.startsWith('empty-') ? 'opacity-30' : ''
              }`}
            >
              <div className="flex items-center gap-1">
                <span className={`font-['Press_Start_2P'] text-xs ${getRankColor(index)}`}>
                  {getRankText(index)}
                </span>
                <span className={`font-medium font-['Press_Start_2P'] text-xs ml-1 ${getRankColor(index)}`}>
                  {score.playerName}
                </span>
              </div>
              <span className="text-white font-['Press_Start_2P'] text-xs [text-shadow:_0_0_5px_rgb(255_255_255_/_60%)]">
                {Math.floor(score.score)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Title at bottom */}
        <div className="mt-2">
          <RetroTitle small />
        </div>
      </div>
    </div>
  );
};