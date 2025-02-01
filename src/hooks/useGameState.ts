import { useState, useCallback } from 'react';
import { CANVAS, GAME_SPEED, ALPACA } from '../utils/constants';
import { GameState } from '../types/game';
import { getPlayerHighScore, updatePlayerHighScore } from '../services/playerScores';
import { createInitialPlayerState } from '../utils/player/playerState';
import { generateObstacle, shouldSpawnObstacle } from '../utils/obstacles/generateObstacle';

const createInitialState = (playerName: string): GameState => ({
  alpaca: createInitialPlayerState(CANVAS.GROUND_Y),
  obstacles: [],
  explosions: [],
  scoreEffects: [],
  score: 0,
  speed: GAME_SPEED.INITIAL,
  highScore: getPlayerHighScore(playerName),
  camera: { y: 0 },
  streak: 0
});

export const useGameState = (playerName: string) => {
  const [gameState, setGameState] = useState<GameState>(() => createInitialState(playerName));

  const updateState = useCallback((deltaTime: number, reset = false) => {
    if (reset) {
      setGameState(createInitialState(playerName));
      return;
    }

    setGameState(prev => {
      // Update obstacles with proper spacing
      const newObstacles = prev.obstacles
        .filter(obstacle => obstacle.x + obstacle.width > -100)
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x - prev.speed * deltaTime
        }));

      // Spawn new obstacles with proper timing
      if (newObstacles.length === 0 || 
          shouldSpawnObstacle(
            newObstacles[newObstacles.length - 1].x,
            prev.score
          )) {
        newObstacles.push(generateObstacle(prev.score));
      }

      // Update player physics
      const gravityMultiplier = prev.alpaca.velocity > 0 ? 1.1 : 0.95;
      const newVelocity = Math.min(
        prev.alpaca.velocity + ALPACA.GRAVITY * deltaTime * gravityMultiplier,
        ALPACA.MAX_FALL_SPEED
      );
      
      const newY = Math.max(
        0,
        Math.min(
          prev.alpaca.y + newVelocity * deltaTime,
          CANVAS.GROUND_Y - ALPACA.HEIGHT
        )
      );

      // Create new state
      const newState = {
        ...prev,
        obstacles: newObstacles,
        score: prev.score + deltaTime * 10,
        speed: Math.min(
          GAME_SPEED.INITIAL + prev.score * GAME_SPEED.ACCELERATION,
          GAME_SPEED.MAX
        ),
        alpaca: {
          ...prev.alpaca,
          y: newY,
          velocity: newVelocity,
          isJumping: newY < CANVAS.GROUND_Y - ALPACA.HEIGHT,
          jumpsRemaining: newY >= CANVAS.GROUND_Y - ALPACA.HEIGHT ? 2 : prev.alpaca.jumpsRemaining
        }
      };

      // Update high score if needed
      if (newState.score > prev.highScore) {
        newState.highScore = newState.score;
        updatePlayerHighScore(playerName, newState.score);
      }

      return newState;
    });
  }, [playerName]);

  return { gameState, updateGameState: updateState };
};