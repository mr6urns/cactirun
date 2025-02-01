import { CANVAS } from '../constants';

export const drawGrid = (ctx: CanvasRenderingContext2D, time: number) => {
  const GRID_SIZE = 40;
  const SCROLL_SPEED = 60;
  const offset = (time * SCROLL_SPEED) % GRID_SIZE;
  
  ctx.save();
  ctx.strokeStyle = 'rgba(142, 199, 255, 0.1)';
  ctx.lineWidth = 1;
  
  // Vertical lines
  for (let x = -GRID_SIZE + offset; x < CANVAS.WIDTH; x += GRID_SIZE) {
    const xPos = Math.floor(x);
    ctx.beginPath();
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos, CANVAS.HEIGHT);
    ctx.stroke();
  }
  
  ctx.restore();
};