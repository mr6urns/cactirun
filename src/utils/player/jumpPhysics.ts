import { ALPACA } from '../constants';

export const calculateJumpForce = (jumpNumber: number): number => {
  switch (jumpNumber) {
    case 1: return ALPACA.JUMP_FORCE;      // -800 (stronger first jump)
    case 2: return ALPACA.SECOND_JUMP_FORCE; // -700 (still powerful second jump)
    default: return 0;
  }
};

export const calculateGravity = (velocity: number, deltaTime: number): number => {
  // Asymmetric gravity: faster fall, slower rise
  const gravityMultiplier = velocity > 0 ? 1.2 : 0.9;
  return ALPACA.GRAVITY * deltaTime * gravityMultiplier;
};

export const applyJumpPhysics = (
  currentVelocity: number,
  deltaTime: number
): number => {
  // Apply gravity with terminal velocity
  return Math.min(
    currentVelocity + calculateGravity(currentVelocity, deltaTime),
    ALPACA.MAX_FALL_SPEED
  );
};