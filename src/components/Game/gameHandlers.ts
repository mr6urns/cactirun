import { GameState } from '../../types/game';

export interface GameHandlers {
  setGameOver: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
  updateGameState: (deltaTime: number, reset?: boolean) => void;
  setShowNameInput: (value: boolean) => void;
}

export const handleGameOver = (
  score: number,
  handlers: GameHandlers,
  hasPlayerName: boolean
) => {
  handlers.setGameOver(true);
  handlers.setIsPlaying(false);
  
  if (!hasPlayerName) {
    handlers.setShowNameInput(true);
  }
};

export const handleStartGame = (handlers: GameHandlers) => {
  handlers.setGameOver(false);
  handlers.setIsPlaying(true);
  handlers.updateGameState(0, true); // Reset game state
};