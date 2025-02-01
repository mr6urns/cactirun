export const PERFORMANCE_CONFIG = {
  TARGET_FPS: 60,
  FRAME_TIME: 1000 / 60,
  MAX_DELTA_TIME: 1 / 30,
  
  // Core rendering optimizations
  ENABLE_RAF_THROTTLING: true,
  RAF_THROTTLE_THRESHOLD: 1000 / 120, // Reduced to 120Hz max
  USE_IMAGE_BITMAP: true,
  ENABLE_OFFSCREEN_CANVAS: true,
  
  // Physics and state updates
  PHYSICS_STEPS_PER_FRAME: 1, // Single physics step for consistency
  INTERPOLATION_ALPHA: 0.1,
  
  // Memory management
  OBJECT_POOL_SIZE: 30,
  PARTICLE_POOL_SIZE: 50,
  MAX_PARTICLES: 20,
  
  // Performance optimizations
  BATCH_RENDERING: true,
  FRAME_SKIP_THRESHOLD: 16.67, // Skip heavy effects below 60fps
  GRADIENT_CACHE_SIZE: 10,
  
  // GPU optimizations
  USE_HARDWARE_ACCELERATION: true,
  ENABLE_COMPOSITE_OPERATIONS: false
} as const;