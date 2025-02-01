import { CANVAS } from '../../constants';
import { drawGate } from './drawGate';
import { drawVines } from './drawVines';
import { drawEnergy } from './drawEnergy';

export const drawPortal = (ctx: CanvasRenderingContext2D, time: number) => {
  const x = CANVAS.WIDTH * 0.33;
  
  // Draw in correct order: vines behind, then gate, then energy effects
  drawVines(ctx, x, time);
  drawGate(ctx, x, time);
  drawEnergy(ctx, x, time);
};