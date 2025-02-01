// Canvas and game dimensions
export const CANVAS = {
  WIDTH: 800,
  HEIGHT: 400,
  GROUND_Y: 350,
  MAX_HEIGHT: 2000
} as const;

// Player constants - Adjusted for smoother jumping
export const ALPACA = {
  WIDTH: 60,
  HEIGHT: 60,
  START_X: 266,
  JUMP_FORCE: -750,      // Increased initial jump force
  SECOND_JUMP_FORCE: -650, // Stronger second jump
  GRAVITY: 1800,         // Higher gravity for snappier feel
  MAX_FALL_SPEED: 1000   // Higher fall speed cap
} as const;

// UFO constants - Adjusted for better gameplay
export const UFO = {
  WIDTH: 60,
  HEIGHT: 30,
  BEAM_WIDTH: 40,
  BEAM_DURATION: 2.0,
  BEAM_CHANCE: 0.5,
  MIN_HEIGHT: 100,
  MAX_HEIGHT: 200,
  SPAWN_HEIGHT: {
    MIN: 180,  // Higher minimum for better jump targets
    MAX: 280   // Higher maximum for challenging jumps
  },
  HITBOX: {
    PADDING: 15,    // Wider hitbox for better collision feel
    TOP_OFFSET: 8,  // Adjusted for better dome bounces
    BOTTOM_OFFSET: 5
  }
} as const;

// Cactus constants
export const CACTUS = {
  WIDTH: 20,
  HEIGHT: {
    MIN: 40,
    MAX: 70
  },
  HITBOX: {
    PADDING: 5,     // Smaller hitbox for fairer collisions
    TOP_OFFSET: 5,
    SIDE_PADDING: 8 // More forgiving side collisions
  }
} as const;

// Game speed settings
export const GAME_SPEED = {
  INITIAL: 200,
  MAX: 400,
  ACCELERATION: 0.05 // Slower speed increase for better control
} as const;