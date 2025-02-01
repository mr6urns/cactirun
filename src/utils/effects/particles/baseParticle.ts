export interface BaseParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  phase?: number;
}

export const createParticle = (
  x: number,
  y: number,
  angle: number,
  speed: number,
  size: number,
  lifetime: number,
  color: string
): BaseParticle => ({
  x,
  y,
  vx: Math.cos(angle) * speed,
  vy: Math.sin(angle) * speed,
  life: lifetime,
  size,
  color,
  phase: Math.random() * Math.PI * 2
});