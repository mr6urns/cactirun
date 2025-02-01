import { GameState } from '../../types/game';
import { drawBackground } from './layers/background';
import { drawObstacles } from './layers/obstacles';
import { drawPlayer } from './layers/player';
import { drawEffects } from './layers/effects';
import { setupContext } from './context';
import { PERFORMANCE_CONFIG } from './performanceConfig';

let lastFrameTime = 0;

export const render = (
  canvas: HTMLCanvasElement, 
  gameState: GameState, 
  isPlaying: boolean
) => {
  const ctx = canvas.getContext('2d', { 
    alpha: false,
    desynchronized: true // Enable low-latency rendering
  })!;
  
  if (!ctx) return;

  const currentTime = performance.now(); // More precise timing
  const deltaTime = Math.min(
    (currentTime - lastFrameTime) / 1000,
    PERFORMANCE_CONFIG.MAX_DELTA_TIME
  );

  // Set up optimized context
  setupContext(ctx);

  // Draw layers in order
  drawBackground(ctx, currentTime);
  drawObstacles(ctx, gameState.obstacles, deltaTime);
  drawPlayer(ctx, gameState.alpaca);
  drawEffects(ctx, gameState, deltaTime);

  lastFrameTime = currentTime;
};