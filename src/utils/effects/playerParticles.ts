import { CANVAS } from '../constants';

interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

const particles: Particle[] = [];

export const createParticle = (x: number, y: number): Particle => ({
  x: x + 30,
  y: y + 30,
  life: 1,
  maxLife: 2 // Longer life for better visibility
});

export const updateParticles = (deltaTime: number, powerLevel: number) => {
  // Remove dead particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].life -= deltaTime / particles[i].maxLife;
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  // Keep only powerLevel number of particles
  while (particles.length > powerLevel) {
    particles.shift();
  }

  // Add new particle if needed
  if (powerLevel > particles.length) {
    particles.push(createParticle(CANVAS.WIDTH * 0.33, CANVAS.GROUND_Y - 60));
  }
};

export const drawParticles = (ctx: CanvasRenderingContext2D) => {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  particles.forEach(particle => {
    const alpha = particle.life;
    ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      2, // Fixed small size for dots
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
  
  ctx.restore();
};