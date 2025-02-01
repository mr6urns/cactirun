import { CANVAS, COLORS } from '../constants';

export const drawCactus = (ctx: CanvasRenderingContext2D, x: number, height: number) => {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  
  const roundedX = Math.floor(x);
  const roundedY = Math.floor(CANVAS.GROUND_Y - height);

  // Create gradient for cactus
  const gradient = ctx.createLinearGradient(roundedX, roundedY, roundedX + 20, roundedY + height);
  gradient.addColorStop(0, COLORS.CACTUS);
  gradient.addColorStop(1, COLORS.CACTUS_SHADOW);

  // Draw main stem
  ctx.fillStyle = gradient;
  ctx.fillRect(roundedX, roundedY, 20, height);
  
  // Left arm - at 30% height
  const leftArmY = roundedY + height * 0.3;
  ctx.fillRect(roundedX - 15, leftArmY, 15, 5);
  ctx.fillRect(roundedX - 15, leftArmY - 15, 5, 20);
  
  // Right arm - at 60% height
  const rightArmY = roundedY + height * 0.6;
  ctx.fillRect(roundedX + 20, rightArmY, 15, 5);
  ctx.fillRect(roundedX + 30, rightArmY - 15, 5, 20);

  ctx.restore();
};