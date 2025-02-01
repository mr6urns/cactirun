import { GameState } from '../../types/game';
import { calculateJumpForce, applyJumpPhysics } from './jumpPhysics';
import { CANVAS, ALPACA } from '../constants';
import { createJumpEffect, createLandEffect } from '../effects/jumpEffect';

export const handleJump = (gameState: GameState): void => {
  const { alpaca } = gameState;
  
  if (alpaca.jumpsRemaining > 0) {
    // Calculate jump force based on jump number
    const jumpForce = calculateJumpForce(3 - alpaca.jumpsRemaining);
    
    // Store jump start position for effects
    alpaca.jumpStartY = alpaca.y;
    
    // Apply jump force with upward momentum bonus
    const upwardBonus = alpaca.velocity < 0 ? Math.abs(alpaca.velocity) * 0.15 : 0;
    alpaca.velocity = jumpForce - upwardBonus;
    
    // Create jump effect
    createJumpEffect(
      ALPACA.START_X + ALPACA.WIDTH / 2,
      alpaca.y + ALPACA.HEIGHT
    );
    
    // Update state
    alpaca.isJumping = true;
    alpaca.jumpsRemaining--;
  }
};

export const updateJumpState = (gameState: GameState, deltaTime: number): void => {
  const { alpaca } = gameState;
  const wasInAir = alpaca.y < CANVAS.GROUND_Y - ALPACA.HEIGHT;
  
  // Apply physics
  alpaca.velocity = applyJumpPhysics(alpaca.velocity, deltaTime);
  alpaca.y += alpaca.velocity * deltaTime;
  
  // Ground collision
  if (alpaca.y >= CANVAS.GROUND_Y - ALPACA.HEIGHT) {
    alpaca.y = CANVAS.GROUND_Y - ALPACA.HEIGHT;
    alpaca.velocity = 0;
    alpaca.isJumping = false;
    alpaca.jumpsRemaining = 2;
    
    // Create landing effect only if we were falling
    if (wasInAir && alpaca.velocity > 0) {
      createLandEffect(
        ALPACA.START_X + ALPACA.WIDTH / 2,
        CANVAS.GROUND_Y
      );
    }
  }
};