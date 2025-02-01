import { CANVAS } from '../../constants';
import { PORTAL } from './constants';

export const drawEnergy = (ctx: CanvasRenderingContext2D, x: number, time: number) => {
  const y = CANVAS.GROUND_Y;
  const { PARTICLES, COLORS } = PORTAL.ENERGY;
  
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  for (let i = 0; i < PARTICLES; i++) {
    const angle = (i / PARTICLES) * Math.PI;
    const radius = 30 + Math.sin(time * 5 + i) * 10;
    const particleX = x + Math.cos(angle + time * 2) * radius;
    const particleY = y - PORTAL.GATE.HEIGHT/2 + Math.sin(angle + time * 3) * radius;
    
    ctx.beginPath();
    ctx.arc(
      particleX,
      particleY,
      2 + Math.sin(time * 8 + i) * 2,
      0,
      Math.PI * 2
    );
    
    const color = COLORS[i % COLORS.length];
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
  
  ctx.restore();
};