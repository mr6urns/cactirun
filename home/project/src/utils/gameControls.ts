import { ALPACA } from './constants';
import { GameState } from '../types/game';
import { MAX_JUMPS } from './player/playerState';

export const handleJump = (gameState: GameState) => {
  const { alpaca } = gameState;
  
  // Only allow jumping if we have jumps remaining
  if (alpaca.jumpsRemaining > 0) {
    // Use full jump force for first jump, reduced for second
    const jumpForce = alpaca.jumpsRemaining === MAX_JUMPS ? 
      ALPACA.JUMP_FORCE : 
      ALPACA.SECOND_JUMP_FORCE;
    
    // Add a small boost if jumping while moving upward
    const upwardBoost = alpaca.velocity < 0 ? 0.1 : 0;
    const finalForce = jumpForce * (1 + upwardBoost);
    
    alpaca.velocity = finalForce;
    alpaca.isJumping = true;
    alpaca.jumpsRemaining--;
  }
};