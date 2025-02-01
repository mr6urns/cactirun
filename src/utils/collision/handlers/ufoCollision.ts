import { GameState, Obstacle } from '../../../types/game';
import { ALPACA } from '../../constants';
import { MAX_JUMPS } from '../../player/playerState';
import { calculateBounceScore } from '../../scoring/calculator';

export const handleUFOCollision = (gameState: GameState, ufo: Obstacle): void => {
  // Calculate and add score
  const bounceScore = calculateBounceScore(gameState.streak);
  gameState.score += bounceScore;
  gameState.streak += 1;
  
  // Apply stronger bounce effect
  gameState.alpaca.velocity = ALPACA.BOUNCE_FORCE * 1.2; // Increased bounce force
  gameState.alpaca.jumpsRemaining = MAX_JUMPS;
  gameState.alpaca.isJumping = true;

  // Convert UFO to falling state with enhanced effects
  Object.assign(ufo, {
    isFalling: true,
    velocity: -400, // Faster initial upward velocity
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 12, // More rotation
    horizontalSpeed: (gameState.speed * -0.6) + (Math.random() - 0.5) * 150, // More horizontal movement
    crackTime: 0,
    crackIntensity: 1 + Math.random() * 0.5 // Random intensity variation
  });
};