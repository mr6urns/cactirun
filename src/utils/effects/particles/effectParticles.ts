import { BaseParticle, createParticle } from './baseParticle';
import { EFFECT_CONFIG } from '../constants';

export const createJumpParticles = (x: number, y: number, isSecondJump: boolean = false): BaseParticle[] => {
  const particles: BaseParticle[] = [];
  const { PARTICLE_COUNT, MIN_SPEED, MAX_SPEED, MIN_SIZE, MAX_SIZE, LIFETIME, COLOR, SPREAD_ANGLE } = EFFECT_CONFIG.JUMP;

  const count = isSecondJump ? Math.floor(PARTICLE_COUNT / 2) : PARTICLE_COUNT;
  const sizeMultiplier = isSecondJump ? 0.6 : 1;
  const baseAngle = -Math.PI/2;
  const halfSpread = SPREAD_ANGLE/2;

  for (let i = 0; i < count; i++) {
    const angle = baseAngle + (Math.random() * SPREAD_ANGLE - halfSpread);
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const size = (MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE)) * sizeMultiplier;
    
    const particle = createParticle(x, y, angle, speed, size, LIFETIME, COLOR);
    particle.vx += (Math.random() - 0.5) * 50;
    particles.push(particle);
  }
  
  return particles;
};

export const createLandParticles = (x: number, y: number): BaseParticle[] => {
  const particles: BaseParticle[] = [];
  const { PARTICLE_COUNT, MIN_SPEED, MAX_SPEED, MIN_SIZE, MAX_SIZE, LIFETIME, VERTICAL_DAMPING, COLOR } = EFFECT_CONFIG.LAND;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.PI + (Math.random() * Math.PI - Math.PI/2);
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
    
    const particle = createParticle(x, y, angle, speed, size, LIFETIME, COLOR);
    particle.vy *= VERTICAL_DAMPING;
    particles.push(particle);
  }
  
  return particles;
};

export const createZapEffect = (x: number, y: number): BaseParticle[] => {
  const { PULSE_DURATION, PULSE_SIZE, COLOR } = EFFECT_CONFIG.UFO_ZAP;
  
  return [{
    x, y,
    vx: 0, vy: 0,
    size: PULSE_SIZE,
    life: PULSE_DURATION,
    color: COLOR,
    type: 'pulse'
  }];
};