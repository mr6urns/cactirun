import { CANVAS, COLORS } from '../constants';

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

const clouds: Cloud[] = Array.from({ length: 5 }, (_, i) => ({
  x: Math.random() * CANVAS.WIDTH,
  y: 50 + Math.random() * 100,
  width: 60 + Math.random() * 40,
  height: 30 + Math.random() * 20,
  speed: 0.2 + Math.random() * 0.3
}));

export const drawClouds = (ctx: CanvasRenderingContext2D, score: number) => {
  ctx.save();
  ctx.fillStyle = 'rgba(190, 126, 156, 0.1)';

  clouds.forEach(cloud => {
    // Update cloud position with parallax
    cloud.x -= cloud.speed;
    if (cloud.x + cloud.width < 0) {
      cloud.x = CANVAS.WIDTH;
      cloud.y = 50 + Math.random() * 100;
    }

    // Draw cloud
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.height/2, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width/3, cloud.y - cloud.height/4, cloud.height/2, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width/2, cloud.y, cloud.height/2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
};