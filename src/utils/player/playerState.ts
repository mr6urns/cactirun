import { ALPACA, CANVAS } from '../constants';
import { createInitialPowerState } from './playerPowerState';

export const MAX_JUMPS = 3; // Increased to 3

export const createInitialPlayerState = (groundY: number) => ({
  x: ALPACA.START_X,
  y: groundY - ALPACA.HEIGHT,
  velocity: 0,
  isJumping: false,
  jumpsRemaining: MAX_JUMPS,
  tiltAngle: 0,
  tiltTimer: 0,
  powerState: createInitialPowerState()
});