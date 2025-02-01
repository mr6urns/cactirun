import { ALPACA } from './constants';
import { GameState } from '../types/game';
import { createJumpEffect } from './effects/jumpEffect';
import { MAX_JUMPS } from './player/playerState';

export const handleJump = (gameState: GameState) => {
  const { alpaca } = gameState;
  
  if (alpaca.jumpsRemaining > 0) {
    // Select jump force based on remaining jumps
    let jumpForce;
    switch (alpaca.jumpsRemaining) {
      case MAX_JUMPS: // First jump
        jumpForce = ALPACA.JUMP_FORCE;
        break;
      case MAX_JUMPS - 1: // Second jump
        jumpForce = ALPACA.SECOND_JUMP_FORCE;
        break;
      case MAX_JUMPS - 2: // Third jump
        jumpForce = ALPACA.THIRD_JUMP_FORCE;
        break;
      default:
        jumpForce = ALPACA.THIRD_JUMP_FORCE;
    }
    
    // Add momentum-based boost for more fluid jumps
    const upwardBoost = alpaca.velocity < 0 ? 
      Math.abs(alpaca.velocity) * 0.25 : 
      0;
    
    // Apply jump with enhanced control
    alpaca.velocity = jumpForce - upwardBoost;
    alpaca.isJumping = true;
    
    // Create jump effect, passing jumpsRemaining to control particles
    createJumpEffect(
      alpaca.x + ALPACA.WIDTH / 2,
      alpaca.y + ALPACA.HEIGHT,
      alpaca.jumpsRemaining
    );
    
    alpaca.jumpsRemaining--;
  }
};