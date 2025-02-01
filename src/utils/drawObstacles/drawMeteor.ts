import { COLORS, METEOR } from '../constants';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export const drawMeteor = (ctx: CanvasRenderingContext2D, obstacle: { x: number; height: number; angle?: number }) => {
  const { x, height, angle = -Math.PI / 4 } = obstacle;
  
  // Generate trail particles going to the right
  const particles: Particle[] = [];
  for (let i = 0; i < METEOR.TRAIL_PARTICLES; i++) {
    const distance = (i / METEOR.TRAIL_PARTICLES) * METEOR.WIDTH * 3;
    const spread = Math.sin(i / 2) * 5; // Add slight wave effect
    particles.push({
      x: x - Math.cos(angle) * distance,
      y: height - Math.sin(angle) * distance + spread,
      alpha: 1 - (i / METEOR.TRAIL_PARTICLES),
      size: METEOR.WIDTH / 2 * (1 - i / METEOR.TRAIL_PARTICLES)
    });
  }

  // Draw trail with smooth gradient
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  particles.forEach((particle, index) => {
    const colorIndex = Math.floor((index / METEOR.TRAIL_PARTICLES) * COLORS.METEOR_TRAIL.length);
    const color = COLORS.METEOR_TRAIL[colorIndex];
    
    // Create gradient for each particle
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size
    );
    gradient.addColorStop(0, `${color}ff`);
    gradient.addColorStop(1, `${color}00`);
    
    ctx.globalAlpha = particle.alpha * 0.7;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.restore();

  // Draw meteor body with glow effect
  ctx.save();
  ctx.translate(x, height);
  
  // Outer glow
  const glowSize = METEOR.WIDTH * 1.2;
  const glow = ctx.createRadialGradient(0, 0, METEOR.WIDTH / 3, 0, 0, glowSize / 2);
  glow.addColorStop(0, COLORS.METEOR_CORE);
  glow.addColorStop(0.5, COLORS.METEOR);
  glow.addColorStop(1, 'rgba(255, 68, 0, 0)');
  
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, glowSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Core with gradient
  const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, METEOR.WIDTH / 2);
  coreGradient.addColorStop(0, '#ffffff');
  coreGradient.addColorStop(0.3, COLORS.METEOR_CORE);
  coreGradient.addColorStop(1, COLORS.METEOR);
  
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(0, 0, METEOR.WIDTH / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};