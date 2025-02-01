import { CANVAS } from '../constants';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

const particles: Particle[] = [];
const PARTICLE_COUNT = 12;
const PARTICLE_LIFETIME = 1; // 1 second duration
const MIN_SPEED = 100;
const MAX_SPEED = 300;

export const createCollisionParticles = (x: number, y: number) => {
  // Clear existing particles
  particles.length = 0;
  
  // Create new particle burst
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: PARTICLE_LIFETIME,
      size: 2 + Math.random() * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }
};

export const updateCollisionParticles = (deltaTime: number) => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    
    // Update position
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    
    // Add gravity effect
    particle.vy += 500 * deltaTime;
    
    // Update rotation
    particle.rotation += particle.rotationSpeed * deltaTime;
    
    // Update lifetime
    particle.life -= deltaTime;
    
    // Remove dead particles
    if (particle.life <= 0) {
      particles.splice(i, 1);
    }
  }
};

export const drawCollisionParticles = (ctx: CanvasRenderingContext2D) => {
  if (particles.length === 0) return;

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  particles.forEach(particle => {
    const alpha = particle.life / PARTICLE_LIFETIME;
    ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
    
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    
    // Draw diamond shape
    ctx.beginPath();
    ctx.moveTo(0, -particle.size);
    ctx.lineTo(particle.size, 0);
    ctx.lineTo(0, particle.size);
    ctx.lineTo(-particle.size, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });
  
  ctx.restore();
};