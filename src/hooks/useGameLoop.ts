import { useEffect, useRef, useCallback } from 'react';
import { FrameOptimizer } from '../utils/rendering/frameOptimizer';
import { PERFORMANCE_CONFIG } from '../utils/rendering/performanceConfig';

export const useGameLoop = (callback: (deltaTime: number) => void) => {
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const frameOptimizer = useRef(new FrameOptimizer());
  
  const animate = useCallback((currentTime: number) => {
    if (frameOptimizer.current.shouldRenderFrame(currentTime)) {
      if (lastTimeRef.current != null) {
        const deltaTime = Math.min(
          (currentTime - lastTimeRef.current) / 1000,
          PERFORMANCE_CONFIG.MAX_DELTA_TIME
        );
        
        // Run multiple physics steps per frame for stability
        const stepDelta = deltaTime / PERFORMANCE_CONFIG.PHYSICS_STEPS_PER_FRAME;
        for (let i = 0; i < PERFORMANCE_CONFIG.PHYSICS_STEPS_PER_FRAME; i++) {
          callback(stepDelta);
        }
      }
      lastTimeRef.current = currentTime;
    }
    
    frameRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameOptimizer.current.reset();
    };
  }, [animate]);
};