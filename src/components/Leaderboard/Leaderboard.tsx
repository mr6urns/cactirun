import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Score } from '../../services/leaderboard';
import { NeonGrid } from '../UI/NeonGrid';
import { getRankColor, getRankText } from '../../utils/leaderboard/rankUtils';

interface LeaderboardProps {
  scores: Score[];
  currentScore: number;
  streak: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, currentScore, streak }) => {
  const [currentPair, setCurrentPair] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Pad scores array
  const displayScores = [...scores];
  while (displayScores.length < 10) {
    displayScores.push({
      id: `empty-${displayScores.length}`,
      playerName: '---',
      score: 0,
      date: new Date().toISOString()
    });
  }

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentPair((prev) => (prev + 1) % Math.ceil(displayScores.length / 2));
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(cycleInterval);
  }, [displayScores.length]);

  const currentScores = displayScores.slice(currentPair * 2, currentPair * 2 + 2);

  return (
    <div className="relative h-full overflow-hidden rounded-lg border-2 border-[#31bc11] bg-black/80">
      <NeonGrid />
      
      <div className="relative h-full p-4 z-10">
        {/* Current Score */}
        <div className="relative bg-black/60 backdrop-blur-sm text-white px-4 py-3 rounded-lg border-2 border-[#31bc11] text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <span className="font-['Press_Start_2P'] text-2xl sm:text-3xl">
              {Math.floor(currentScore)}
            </span>
            {streak > 0 && (
              <div className="flex items-center gap-2">
                <Flame 
                  className="w-5 h-5 text-[#ff0000] animate-pulse" 
                  style={{ filter: 'drop-shadow(0 0 5px #ff0000)' }} 
                />
                <span className="text-[#ff0000] text-lg font-['Press_Start_2P']">
                  x{streak}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scores List */}
        <div 
          className="space-y-2 transition-opacity duration-500"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {currentScores.map((score, index) => (
            <div
              key={score.id}
              className={`grid grid-cols-[auto_1fr_auto] gap-3 items-center p-2 bg-black/60 backdrop-blur-sm border border-[#31bc11] rounded transition-all duration-300 hover:bg-black/80 ${
                score.id.startsWith('empty-') ? 'opacity-30' : ''
              }`}
            >
              <span className={`font-['Press_Start_2P'] text-xs ${getRankColor(currentPair * 2 + index)} w-12`}>
                {getRankText(currentPair * 2 + index)}
              </span>
              <span className={`font-['Press_Start_2P'] text-xs truncate ${getRankColor(currentPair * 2 + index)}`}>
                {score.playerName}
              </span>
              <span className="text-white font-['Press_Start_2P'] text-xs text-right min-w-[60px] [text-shadow:_0_0_5px_rgb(255_255_255_/_60%)]">
                {Math.floor(score.score)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};