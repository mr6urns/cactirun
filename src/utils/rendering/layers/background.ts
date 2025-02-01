import { CANVAS } from '../../constants';
import { drawSpaceBackground } from '../spaceBackground';
import { drawGrid } from '../grid';

export const drawBackground = (ctx: CanvasRenderingContext2D, time: number) => {
  // Clear with solid color (faster than clearRect)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  // Draw background elements
  drawSpaceBackground(ctx, time / 1000);
  drawGrid(ctx, time / 1000);
  
  // Draw ground line exactly at the border
  ctx.fillStyle = '#ea63c2';
  ctx.fillRect(0, CANVAS.GROUND_Y, CANVAS.WIDTH, 1);
};