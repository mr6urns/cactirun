import { CANVAS } from '../../constants';
import { PORTAL } from './constants';

export const drawGate = (ctx: CanvasRenderingContext2D, x: number, time: number) => {
  const { WIDTH, HEIGHT, BORDER_WIDTH, COLORS } = PORTAL.GATE;
  const y = CANVAS.GROUND_Y;
  
  ctx.save();
  
  // Gate glow
  ctx.shadowColor = COLORS.GLOW;
  ctx.shadowBlur = 20;
  
  // Main arch structure
  ctx.beginPath();
  ctx.moveTo(x - WIDTH/2, y);
  ctx.lineTo(x - WIDTH/2, y - HEIGHT + WIDTH/2);
  ctx.arc(x, y - HEIGHT + WIDTH/2, WIDTH/2, Math.PI, 0);
  ctx.lineTo(x + WIDTH/2, y);
  
  // Create gradient for metallic effect
  const gradient = ctx.createLinearGradient(x - WIDTH/2, y - HEIGHT, x + WIDTH/2, y);
  gradient.addColorStop(0, COLORS.PRIMARY);
  gradient.addColorStop(0.5, COLORS.SECONDARY);
  gradient.addColorStop(1, COLORS.PRIMARY);
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();
  
  // Ornate details
  const detailY = y - HEIGHT/2;
  const detailSpacing = WIDTH/4;
  
  [-1, 1].forEach(side => {
    const detailX = x + (side * detailSpacing);
    ctx.beginPath();
    ctx.arc(detailX, detailY, 10, 0, Math.PI * 2);
    ctx.strokeStyle = COLORS.PRIMARY;
    ctx.lineWidth = 3;
    ctx.stroke();
  });
  
  ctx.restore();
};