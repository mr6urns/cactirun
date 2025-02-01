export const OBSTACLE_SPAWN = {
  UFO_CHANCE_INITIAL: 0.4,    
  UFO_CHANCE_GROWTH: 0.0002,  
  UFO_CHANCE_MAX: 0.7,        
  
  CACTUS_HEIGHT: {
    MIN: 40,
    MAX: 70
  },
  
  MIN_DISTANCE: 350,
  DISTANCE_REDUCTION: 40,
  MIN_SAFE_DISTANCE: 250
} as const;

export const UFO = {
  WIDTH: 60,
  HEIGHT: 30,
  BEAM_WIDTH: 30,
  BEAM_DURATION: 2.0,
  BEAM_COOLDOWN: 1.5,
  BEAM_PHASES: {
    WARNING: 0.4,
    ACTIVE: 0.6,
    COOLDOWN: 1.0
  },
  SPAWN_HEIGHT: {
    MIN: 180,
    MAX: 280
  },
  BEAM: {
    WARNING_COLOR: '#ff0000',
    ACTIVE_COLOR: '#ff3333',
    GLOW_COLOR: '#ff6666',
    PARTICLE_COUNT: 30,
    EXPANSION_RATE: 1.5,
    BASE_WIDTH: 30,
    MAX_WIDTH: 60
  },
  HITBOX: {
    DOME: {
      TOP_OFFSET: 0,     // Start from very top
      BOTTOM_OFFSET: 0.5 // Half height for dome
    },
    CORE: {
      TOP_OFFSET: 0.5,   // Start from middle
      BOTTOM_OFFSET: 0.1 // Almost to bottom
    }
  }
} as const;