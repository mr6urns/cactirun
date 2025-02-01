import { CANVAS, COLORS } from '../constants';

export const drawPortal = (ctx: CanvasRenderingContext2D, time: number) => {
  const x = CANVAS.WIDTH * 0.33; // Portal position
  const y = CANVAS.GROUND_Y;
  const radius = 35;
  
  ctx.save();
  
  // Portal glow effect
  ctx.globalCompositeOperation = 'screen';
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(0, 157, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
  
  // Animate portal
  const pulseSize = Math.sin(time * 5) * 5;
  
  // Draw portal rings
  for (let i = 3; i >= 0; i--) {
    const size = radius - i * 8 + pulseSize;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI, true);
    ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + i * 0.2})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  // Add central glow
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius + pulseSize, 0, Math.PI, true);
  ctx.fill();
  
  ctx.restore();
};