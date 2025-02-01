import { GameState } from '../types/game';
import { CANVAS, ALPACA } from './constants';
import { MAX_JUMPS } from './player/playerState';
import { createLandEffect } from './effects/jumpEffect';

export const updateGameState = (state: GameState, deltaTime: number): void => {
  const wasInAir = state.alpaca.y < CANVAS.GROUND_Y - ALPACA.HEIGHT;
  const hadDownwardVelocity = state.alpaca.velocity > 0;
  
  // Update physics
  const gravityMultiplier = state.alpaca.velocity > 0 ? 1.2 : 0.85;
  state.alpaca.velocity = Math.min(
    state.alpaca.velocity + ALPACA.GRAVITY * deltaTime * gravityMultiplier,
    ALPACA.MAX_FALL_SPEED
  );
  
  state.alpaca.y += state.alpaca.velocity * deltaTime;

  // Ground collision
  if (state.alpaca.y >= CANVAS.GROUND_Y - ALPACA.HEIGHT) {
    state.alpaca.y = CANVAS.GROUND_Y - ALPACA.HEIGHT;
    state.alpaca.velocity = 0;
    state.alpaca.isJumping = false;
    state.alpaca.jumpsRemaining = MAX_JUMPS;
    state.streak = 0;
    
    if (wasInAir && hadDownwardVelocity) {
      createLandEffect(
        ALPACA.START_X + ALPACA.WIDTH / 2,
        CANVAS.GROUND_Y
      );
    }
  }
};