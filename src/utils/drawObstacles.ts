import { CANVAS, COLORS, UFO } from './constants';
import { Obstacle } from '../types/game';
import { drawBeamParticles } from './rendering/particles';

export const drawCactus = (ctx: CanvasRenderingContext2D, x: number, height: number) => {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  
  const roundedX = Math.floor(x);
  const roundedY = Math.floor(CANVAS.GROUND_Y - height);

  // Create gradient for cactus
  const gradient = ctx.createLinearGradient(roundedX, roundedY, roundedX + 20, roundedY + height);
  gradient.addColorStop(0, COLORS.CACTUS);
  gradient.addColorStop(1, COLORS.CACTUS_SHADOW);

  // Draw main stem with integer coordinates
  ctx.fillStyle = gradient;
  ctx.fillRect(roundedX, roundedY, 20, height);
  
  // Left arm - ensure integer coordinates
  const leftArmY = Math.floor(roundedY + height * 0.3) - 20;
  ctx.fillRect(roundedX - 15, leftArmY, 5, 20);
  ctx.fillRect(roundedX - 15, leftArmY + 15, 15, 5);
  
  // Right arm - ensure integer coordinates
  const rightArmY = Math.floor(roundedY + height * 0.6) - 20;
  ctx.fillRect(roundedX + 30, rightArmY, 5, 20);
  ctx.fillRect(roundedX + 20, rightArmY + 15, 15, 5);

  ctx.restore();
};