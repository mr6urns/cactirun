// Canvas and game dimensions
export const CANVAS = {
  WIDTH: 800,
  HEIGHT: 450,
  GROUND_Y: 449,
  MAX_HEIGHT: 2000,
  ASPECT_RATIO: 16/9,
  MIN_SCALE: 0.5,
  MAX_SCALE: 1.0
} as const;

// Player constants - Tuned for three jumps
export const ALPACA = {
  WIDTH: 60,
  HEIGHT: 60,
  START_X: 266,
  JUMP_FORCE: -900,         // First jump
  SECOND_JUMP_FORCE: -800,  // Second jump
  THIRD_JUMP_FORCE: -700,   // Third jump (new)
  GRAVITY: 2200,           // Higher gravity for snappier feel
  MAX_FALL_SPEED: 1200,    // Higher fall speed
  BOUNCE_FORCE: -400       // Bounce force
} as const;

export const GAME_SPEED = {
  INITIAL: 200,
  MAX: 400,
  ACCELERATION: 0.05
} as const;