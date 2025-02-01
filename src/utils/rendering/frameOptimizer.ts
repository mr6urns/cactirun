import { PERFORMANCE_CONFIG } from './performanceConfig';

export class FrameOptimizer {
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private fpsTime: number = 0;
  private currentFPS: number = 0;
  private accumulatedTime: number = 0;
  
  shouldRenderFrame(currentTime: number): boolean {
    // Calculate accurate delta time
    const deltaTime = currentTime - this.lastFrameTime;
    
    // Update FPS counter
    this.frameCount++;
    if (currentTime - this.fpsTime >= 1000) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.fpsTime = currentTime;
    }
    
    // Throttle high refresh rates
    if (PERFORMANCE_CONFIG.ENABLE_RAF_THROTTLING && 
        deltaTime < PERFORMANCE_CONFIG.RAF_THROTTLE_THRESHOLD) {
      return false;
    }
    
    // Accumulate time for fixed timestep updates
    this.accumulatedTime += deltaTime;
    if (this.accumulatedTime >= PERFORMANCE_CONFIG.FRAME_TIME) {
      this.accumulatedTime -= PERFORMANCE_CONFIG.FRAME_TIME;
      this.lastFrameTime = currentTime;
      return true;
    }
    
    return false;
  }
  
  getInterpolationAlpha(): number {
    return this.accumulatedTime / PERFORMANCE_CONFIG.FRAME_TIME;
  }
  
  getCurrentFPS(): number {
    return this.currentFPS;
  }
  
  reset(): void {
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.fpsTime = 0;
    this.currentFPS = 60;
    this.accumulatedTime = 0;
  }
}