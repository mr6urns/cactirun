export const EFFECTS = {
  EXPLOSION: {
    PARTICLE_COUNT: 12,
    DURATION: 0.3,
    MIN_SPEED: 100,
    MAX_SPEED: 300,
    MIN_SIZE: 2,
    MAX_SIZE: 4
  },
  SCORE: {
    FLOAT_SPEED: 100,
    FADE_RATE: 2,
    DURATION: 1.0
  }
} as const;