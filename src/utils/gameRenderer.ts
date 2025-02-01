import { CANVAS, COLORS, ALPACA } from './constants';
import { drawAlpaca } from './drawAlpaca';
import { drawUFO } from './drawObstacles/drawUFO';
import { drawCactus } from './drawObstacles/drawCactus';
import { GameState } from '../types/game';
import { drawSpaceBackground } from './rendering/spaceBackground';
import { updateJumpEffects, drawJumpEffects } from './effects/jumpEffect';
import { setupPixelPerfectRendering } from './rendering/pixelPerfect';

// Create offscreen canvas for better performance
const offscreenCanvas = new OffscreenCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);
const offscreenCtx = offscreenCanvas.getContext('2d', { 
  alpha: false,
  willReadFrequently: false
})!;

export const drawGame = (canvas: HTMLCanvasElement, gameState: GameState, isPlaying: boolean) => {
  const ctx = canvas.getContext('2d', { 
    alpha: false,
    desynchronized: true
  })!;
  
  if (!ctx || !offscreenCtx) return;

  // Set up pixel-perfect rendering
  setupPixelPerfectRendering(offscreenCtx);

  // Clear with solid color (faster than clearRect)
  offscreenCtx.fillStyle = '#000000';
  offscreenCtx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  // Draw background
  drawSpaceBackground(offscreenCtx, performance.now() / 1000);

  // Batch similar draw operations
  offscreenCtx.save();

  // Update and draw effects
  updateJumpEffects(1/60);
  drawJumpEffects(offscreenCtx);

  // Draw all obstacles
  gameState.obstacles?.forEach(obstacle => {
    if (obstacle.type === 'ufo') {
      drawUFO(offscreenCtx, obstacle);
    } else {
      drawCactus(offscreenCtx, obstacle.x, obstacle.height);
    }
  });

  // Draw floor with shadow
  const gradient = offscreenCtx.createLinearGradient(0, CANVAS.GROUND_Y, 0, CANVAS.GROUND_Y + 20);
  gradient.addColorStop(0, 'rgba(234, 99, 194, 0.4)');
  gradient.addColorStop(1, 'rgba(234, 99, 194, 0)');
  offscreenCtx.fillStyle = gradient;
  offscreenCtx.fillRect(0, CANVAS.GROUND_Y + 1, CANVAS.WIDTH, 20);

  // Draw floor line
  offscreenCtx.fillStyle = COLORS.PRIMARY;
  offscreenCtx.fillRect(-4, Math.floor(CANVAS.GROUND_Y), CANVAS.WIDTH + 8, 1);

  // Draw player with pixel-perfect positioning
  drawAlpaca(offscreenCtx, ALPACA.START_X, Math.floor(gameState.alpaca.y));

  offscreenCtx.restore();

  // Scale and draw the offscreen canvas
  const scale = Math.min(
    canvas.width / CANVAS.WIDTH,
    canvas.height / CANVAS.HEIGHT
  );
  
  const scaledWidth = CANVAS.WIDTH * scale;
  const scaledHeight = CANVAS.HEIGHT * scale;
  const x = (canvas.width - scaledWidth) / 2;
  const y = (canvas.height - scaledHeight) / 2;

  // Ensure crisp rendering when drawing to main canvas
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    offscreenCanvas,
    x, y, scaledWidth, scaledHeight
  );
};