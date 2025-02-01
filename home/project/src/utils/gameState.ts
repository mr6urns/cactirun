import { GameState } from '../types/game';
import { CANVAS, ALPACA } from './constants';
import { updateExplosion } from './effects/explosion';
import { updateScoreEffect } from './effects/scoreEffect';
import { MAX_JUMPS } from './player/playerState';

export const updateGameState = (state: GameState, deltaTime: number): void => {
  // Update player physics with smoother acceleration
  const gravityMultiplier = state.alpaca.velocity > 0 ? 1.1 : 0.95; // Faster fall, slower rise
  state.alpaca.velocity = Math.min(
    state.alpaca.velocity + ALPACA.GRAVITY * deltaTime * gravityMultiplier,
    ALPACA.MAX_FALL_SPEED
  );
  
  // Apply velocity with smoothing
  const newY = state.alpaca.y + state.alpaca.velocity * deltaTime;
  state.alpaca.y = Math.max(0, newY); // Prevent going above screen

  // Ground collision with bounce dampening
  if (state.alpaca.y > CANVAS.GROUND_Y - ALPACA.HEIGHT) {
    state.alpaca.y = CANVAS.GROUND_Y - ALPACA.HEIGHT;
    state.alpaca.velocity = 0;
    state.alpaca.isJumping = false;
    state.alpaca.jumpsRemaining = MAX_JUMPS;
  }

  // Update effects and other game state...
  state.explosions = state.explosions
    .map(explosion => updateExplosion(explosion, deltaTime))
    .filter(explosion => explosion.age < 0.5);

  state.scoreEffects = state.scoreEffects
    .map(effect => updateScoreEffect(effect, deltaTime))
    .filter(effect => effect.opacity > 0);

  // Smoother camera follow
  const targetY = Math.max(0, state.alpaca.y - CANVAS.HEIGHT * 0.4);
  const cameraSpeed = Math.abs(state.alpaca.velocity) > 400 ? 0.15 : 0.1;
  state.camera.y += (targetY - state.camera.y) * cameraSpeed;
};