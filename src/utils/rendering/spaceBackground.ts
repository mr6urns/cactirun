import { CANVAS } from '../constants';

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

// Reduced number of stars for better performance
const stars: Star[] = Array.from({ length: 100 }, () => ({
  x: Math.random() * CANVAS.WIDTH,
  y: Math.random() * (CANVAS.GROUND_Y - 50),
  size: 0.5 + Math.random() * 1,
  twinkleSpeed: 0.3 + Math.random() * 1.5,
  twinklePhase: Math.random() * Math.PI * 2
}));

export const drawSpaceBackground = (ctx: CanvasRenderingContext2D, time: number) => {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  stars.forEach(star => {
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.2;
    const alpha = 0.2 + twinkle * 0.3; // Reduced brightness
    
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.restore();

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, CANVAS.GROUND_Y, CANVAS.WIDTH, CANVAS.HEIGHT - CANVAS.GROUND_Y);
};