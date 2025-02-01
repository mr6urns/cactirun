import React from 'react';
import { useStartGame } from '../../hooks/useStartGame';
import { ConnectWalletButton } from '../Wallet/ConnectWalletButton';

interface GameOverlayProps {
  gameOver: boolean;
  isPlaying: boolean;
  playerName: string;
  score: number;
  highScore: number;
  onPlayAgain: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameOver,
  isPlaying,
  playerName,
  score,
  highScore,
  onPlayAgain
}) => {
  useStartGame({
    onStart: onPlayAgain,
    isEnabled: gameOver || !isPlaying
  });

  const handleShareScore = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const tweetText = `I just scored ${Math.floor(score)} on @cactirun 🌵\n\nhttps://cacti.run`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank', 'noopener,noreferrer');
  };

  if (!gameOver && isPlaying) return null;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 z-50 touch-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative bg-black/90 border-2 border-[#31bc11] rounded-lg p-4 text-center max-w-[90%] w-full sm:w-auto">
        <h2 className={`text-lg sm:text-xl font-bold mb-2 font-['Press_Start_2P'] ${
          gameOver 
            ? 'text-[#ff0000] [text-shadow:_0_0_10px_rgba(255,0,0,0.5)]' 
            : 'text-white [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]'
        }`}>
          {gameOver ? 'GAME OVER' : 'READY?'}
        </h2>
        <p className="text-sm sm:text-base text-white mb-3 font-['Press_Start_2P']">{playerName}</p>
        
        {gameOver && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl sm:text-2xl text-white font-['Press_Start_2P'] [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
                {Math.floor(score)}
              </p>
              <button
                onClick={handleShareScore}
                onTouchEnd={handleShareScore}
                className="p-1.5 transform hover:scale-110 active:scale-95 transition-transform duration-300"
                aria-label="Share score on X"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </button>
            </div>
            
            <div>
              <p className="text-sm sm:text-base text-white font-['Press_Start_2P'] mb-1">
                {Math.floor(highScore)}
              </p>
              <p className="text-xs text-white/80">BEST</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-3 w-[280px] mx-auto">
          <button
            id="start-button"
            type="button"
            className={`w-full px-3 py-1.5 sm:py-2 rounded-lg border-2 transition-all duration-300 text-lg sm:text-xl font-bold font-['Press_Start_2P'] touch-manipulation select-none ${
              gameOver
                ? 'bg-black text-white border-white hover:bg-white hover:text-black active:bg-white/90'
                : 'bg-white text-black border-white hover:bg-black hover:text-white active:bg-white/90'
            }`}
          >
            {gameOver ? 'RUN' : 'START'}
          </button>

          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
};