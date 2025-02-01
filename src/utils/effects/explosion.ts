import { EFFECTS } from '../constants';
import { Explosion, Particle } from '../../types/game';

const createParticles = (x: number, y: number, count: number): Particle[] => {
  const particles: Particle[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = EFFECTS.EXPLOSION.MIN_SPEED + 
      Math.random() * (EFFECTS.EXPLOSION.MAX_SPEED - EFFECTS.EXPLOSION.MIN_SPEED);
    const size = EFFECTS.EXPLOSION.MIN_SIZE + 
      Math.random() * (EFFECTS.EXPLOSION.MAX_SIZE - EFFECTS.EXPLOSION.MIN_SIZE);
    
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: `rgba(255, ${68 + Math.random() * 100}, 0, ${1 + Math.random() * 0.2})`,
      alpha: 1
    });
  }

  return particles;
};

export const createExplosion = (x: number, y: number): Explosion => ({
  x,
  y,
  age: 0,
  particles: createParticles(x, y, EFFECTS.EXPLOSION.PARTICLE_COUNT)
});

export const updateExplosion = (explosion: Explosion, deltaTime: number): Explosion => ({
  ...explosion,
  age: explosion.age + deltaTime,
  particles: explosion.particles.map(particle => ({
    ...particle,
    x: particle.x + particle.vx * deltaTime,
    y: particle.y + particle.vy * deltaTime,
    vy: particle.vy + 800 * deltaTime,
    alpha: Math.max(0, 1 - (explosion.age / EFFECTS.EXPLOSION.DURATION) * 2)
  }))
});

export const drawExplosion = (ctx: CanvasRenderingContext2D, explosion: Explosion) => {
  if (explosion.age >= EFFECTS.EXPLOSION.DURATION) return;

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  explosion.particles.forEach(particle => {
    if (particle.alpha <= 0) return;
    
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(
      Math.round(particle.x),
      Math.round(particle.y),
      particle.size * (1 - explosion.age / EFFECTS.EXPLOSION.DURATION),
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
  
  ctx.restore();
};