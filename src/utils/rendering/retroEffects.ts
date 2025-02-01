import { CANVAS } from '../constants';

export const drawRetroGrid = (ctx: CanvasRenderingContext2D, time: number) => {
  const GRID_SIZE = 40;
  const GRID_SPEED = 120;
  const gridOffset = (time * GRID_SPEED) % GRID_SIZE;
  
  ctx.save();
  ctx.lineWidth = 1;
  ctx.lineCap = 'square';
  
  // Draw vertical lines with white color
  for (let x = -GRID_SIZE; x <= CANVAS.WIDTH + GRID_SIZE; x += GRID_SIZE) {
    const xPos = Math.floor(x - gridOffset) + 0.5;
    const distanceFromCenter = Math.abs(xPos - CANVAS.WIDTH/2);
    const perspective = 1 - (distanceFromCenter / (CANVAS.WIDTH/2)) * 0.9;
    const opacity = 0.08 * perspective; // Reduced opacity for subtler effect
    
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos, CANVAS.HEIGHT);
    ctx.stroke();
  }
  
  // Draw horizontal lines with white color
  for (let y = 0; y <= CANVAS.HEIGHT; y += GRID_SIZE) {
    const yPos = Math.floor(y) + 0.5;
    const perspective = 1 - (y / CANVAS.HEIGHT) * 0.9;
    const opacity = 0.08 * perspective; // Reduced opacity for subtler effect
    
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.moveTo(0, yPos);
    ctx.lineTo(CANVAS.WIDTH, yPos);
    ctx.stroke();
  }

  // Enhanced glow effect with white color
  ctx.globalCompositeOperation = 'screen';
  
  const verticalGradient = ctx.createLinearGradient(0, 0, CANVAS.WIDTH, 0);
  verticalGradient.addColorStop(0, 'rgba(255, 255, 255, 0.01)');
  verticalGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
  verticalGradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)');
  ctx.fillStyle = verticalGradient;
  ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  
  const horizontalGradient = ctx.createLinearGradient(0, 0, 0, CANVAS.HEIGHT);
  horizontalGradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
  horizontalGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = horizontalGradient;
  ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  
  ctx.restore();
};