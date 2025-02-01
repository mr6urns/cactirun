import React, { useState, useEffect, useRef } from 'react';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useGameState } from '../../hooks/useGameState';
import { drawGame } from '../../utils/gameRenderer';
import { handleJump } from '../../utils/gameControls';
import { checkCollision } from '../../utils/collision';
import { GameOverlay } from './GameOverlay';
import { GameCanvas } from './GameCanvas';
import { GameLayout } from '../Layout/GameLayout';
import { TutorialOverlay } from '../Tutorial/TutorialOverlay';
import { StreakIndicator } from './StreakIndicator';
import { saveScore, getScores, Score } from '../../services/leaderboard';
import { generatePlayerName } from '../../services/playerCounter';
import { useGameControls } from '../../hooks/useGameControls';

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScores, setHighScores] = useState<Score[]>([]);
  const scoreRef = useRef(0);
  
  const { gameState, updateGameState } = useGameState(playerName);

  useEffect(() => {
    const generatedName = generatePlayerName();
    setPlayerName(generatedName);
    setShowNameInput(false);
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const scores = await getScores();
      setHighScores(scores);
    } catch (error) {
      console.error('Error fetching scores:', error);
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
    try {
      await saveScore(playerName, scoreRef.current);
      await loadScores();
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };

  useGameLoop((deltaTime) => {
    if (isGameOver || !isPlaying || showNameInput || showTutorial) return;
    
    const canvas = canvasRef.current;
    if (!canvas || !gameState) return;
    
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
      if (!gameState || isGameOver || !isPlaying || showNameInput || showTutorial) return;
      handleJump(gameState);
    }
  });

  return (
    <GameLayout score={gameState?.score || 0} highScore={gameState?.highScore || 0} scores={highScores}>
      <div className="relative">
        <GameCanvas canvasRef={canvasRef} />
        <GameOverlay
          gameOver={isGameOver}
          isPlaying={isPlaying}
          showNameInput={showNameInput}
          playerName={playerName}
          score={scoreRef.current}
          highScore={gameState?.highScore || 0}
          onNameSubmit={handleStartGame}
          onPlayAgain={handleStartGame}
        />
        {showTutorial && (
          <TutorialOverlay onComplete={() => setShowTutorial(false)} />
        )}
        <StreakIndicator streak={gameState?.streak || 0} />
      </div>
    </GameLayout>
  );
};