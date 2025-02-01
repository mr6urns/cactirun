export const EFFECT_CONFIG = {
  JUMP: {
    PARTICLE_COUNT: 12,
    MIN_SPEED: 150,
    MAX_SPEED: 250,
    MIN_SIZE: 2,
    MAX_SIZE: 4,
    LIFETIME: 0.6,
    COLOR: 'rgba(57, 255, 20, {alpha})',
    SPREAD_ANGLE: Math.PI * 0.3
  },
  LAND: {
    PARTICLE_COUNT: 12,
    MIN_SPEED: 250,
    MAX_SPEED: 350,
    MIN_SIZE: 2,
    MAX_SIZE: 4,
    LIFETIME: 0.4,
    VERTICAL_DAMPING: 0.4,
    COLOR: 'rgba(57, 255, 20, {alpha})'
  },
  UFO_ZAP: {
    PULSE_DURATION: 0.3,
    PULSE_SIZE: 30,
    GLOW_INTENSITY: 0.8,
    COLOR: 'rgba(57, 255, 20, {alpha})'
  }
} as const;