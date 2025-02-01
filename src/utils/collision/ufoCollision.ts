import { GameState, Obstacle } from '../../types/game';
import { calculateBounceScore } from '../scoring/calculator';
import { createCollisionParticles } from '../effects/collisionParticles';
import { MAX_JUMPS } from '../player/playerState';
import { ALPACA } from '../constants';

export const handleUFOCollision = (gameState: GameState, ufo: Obstacle): void => {
  // Calculate score based on streak
  const bounceScore = calculateBounceScore(gameState.streak);
  
  // Update score and streak
  gameState.score += bounceScore;
  gameState.streak += 1;

  // Create particle effect at collision point
  createCollisionParticles(
    ufo.x + ufo.width / 2,
    ufo.height + 30
  );

  // Apply bounce effect
  gameState.alpaca.velocity = ALPACA.BOUNCE_FORCE;
  gameState.alpaca.jumpsRemaining = MAX_JUMPS;
  gameState.alpaca.isJumping = true;

  // Convert UFO to falling state
  const fallingUFO = {
    ...ufo,
    isFalling: true,
    velocity: -300,
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 12,
    horizontalSpeed: (gameState.speed * -0.5) + (Math.random() - 0.5) * 100
  };
  
  // Replace the original UFO
  const index = gameState.obstacles.indexOf(ufo);
  if (index > -1) {
    gameState.obstacles[index] = fallingUFO;
  }
};