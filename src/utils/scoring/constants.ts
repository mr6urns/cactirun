export const SCORING = {
  BASE_POINTS: {
    UFO_BOUNCE: 1,     // Start with lower points
    CACTUS_JUMP: 1     // Base points for clearing cactus
  },
  STREAK: {
    MULTIPLIER: 1.5,   // Each streak level increases points by 50%
    MAX_MULTIPLIER: 10 // Cap at 10x multiplier
  }
} as const;