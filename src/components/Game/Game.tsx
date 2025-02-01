import React, { useState, useEffect, useRef } from 'react';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useGameState } from '../../hooks/useGameState';
import { useGameControls } from '../../hooks/useGameControls';
import { drawGame } from '../../utils/gameRenderer';
import { handleJump } from '../../utils/gameControls';
import { checkCollision } from '../../utils/collision';
import { GameOverlay } from './GameOverlay';
import { GameCanvas } from './GameCanvas';
import { GameLayout } from '../Layout/GameLayout';
import { saveScore, getScores, Score } from '../../services/leaderboard';

interface GameProps {
  initialPlayerName: string;
}

export const Game: React.FC<GameProps> = ({ initialPlayerName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScores, setHighScores] = useState<Score[]>([]);
  const scoreRef = useRef(0);
  
  const { gameState, updateGameState } = useGameState(initialPlayerName);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const scores = await getScores();
      setHighScores(scores);
    } catch (error) {
      console.error('Error loading scores:', error);
    }
  };

  const handleStartGame = () => {
    setIsGameOver(false);
    setIsPlaying(true);
    updateGameState(0, true);
  };

  const handleGameOver = async () => {
    setIsGameOver(true);
    setIsPlaying(false);
    
    if (scoreRef.current > 0) {
      try {
        const savedScore = await saveScore(initialPlayerName, scoreRef.current);
        if (savedScore) {
          await loadScores();
        }
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  useGameLoop((deltaTime) => {
    if (!gameState || isGameOver || !isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    updateGameState(deltaTime);
    scoreRef.current = gameState.score;
    
    if (checkCollision(gameState)) {
      handleGameOver();
      return;
    }
    
    drawGame(canvas, gameState, isPlaying);
  });

  useGameControls({
    onJump: () => {
      if (!gameState || isGameOver || !isPlaying) return;
      handleJump(gameState);
    }
  });

  return (
    <GameLayout 
      score={gameState?.score || 0} 
      highScore={gameState?.highScore || 0}
      streak={gameState?.streak || 0}
      scores={highScores}
    >
      <GameCanvas canvasRef={canvasRef} />
      {(isGameOver || !isPlaying) && (
        <GameOverlay
          gameOver={isGameOver}
          isPlaying={isPlaying}
          playerName={initialPlayerName}
          score={scoreRef.current}
          highScore={gameState?.highScore || 0}
          onPlayAgain={handleStartGame}
        />
      )}
    </GameLayout>
  );
};