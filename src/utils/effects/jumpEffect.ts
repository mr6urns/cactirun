import { BaseParticle } from './particles/baseParticle';
import { createJumpParticles, createLandParticles } from './particles/effectParticles';
import { MAX_JUMPS } from '../player/playerState';

const particles: BaseParticle[] = [];

export const createJumpEffect = (x: number, y: number, jumpsRemaining: number) => {
  // Only create particles if this is the first jump
  if (jumpsRemaining === MAX_JUMPS - 1) {
    particles.push(...createJumpParticles(x, y));
  }
};

export const createLandEffect = (x: number, y: number) => {
  particles.push(...createLandParticles(x, y));
};

export const updateJumpEffects = (deltaTime: number) => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    particle.vy += 800 * deltaTime;
    particle.life -= deltaTime;
    
    if (particle.life <= 0) {
      particles.splice(i, 1);
    }
  }
};

export const drawJumpEffects = (ctx: CanvasRenderingContext2D) => {
  if (particles.length === 0) return;

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  particles.forEach(particle => {
    const alpha = particle.life * 2;
    ctx.fillStyle = particle.color.replace('{alpha}', alpha.toString());
    ctx.shadowColor = particle.color.replace('{alpha}', '1');
    ctx.shadowBlur = particle.size * 2;
    
    ctx.beginPath();
    ctx.arc(
      Math.round(particle.x),
      Math.round(particle.y),
      particle.size,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
  
  ctx.restore();
};