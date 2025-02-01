import { UFO } from '../constants';

interface LightConfig {
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  glowSize: number;
  blinkSpeed: number;
  phase: number;
}

export const drawUFOLight = (
  ctx: CanvasRenderingContext2D,
  light: LightConfig,
  time: number
) => {
  const isOn = Math.sin(time * light.blinkSpeed + light.phase) > 0;
  
  if (isOn) {
    // Outer glow
    ctx.shadowColor = light.glowColor;
    ctx.shadowBlur = light.glowSize * 1.5;
    ctx.fillStyle = light.color;
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2);
    ctx.fill();

    // Inner bright core
    ctx.shadowBlur = light.glowSize;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.size * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Additional glow ring
    ctx.strokeStyle = `${light.color}66`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.size * 1.5, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Dim state
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#660000';
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.size * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
};

export const getUFOLights = (x: number, y: number): LightConfig[] => [
  // Bottom center lights
  ...[0.25, 0.5, 0.75].map((pos, i) => ({
    x: Math.round(x + UFO.WIDTH * pos),
    y: Math.round(y + UFO.HEIGHT - 10),
    size: 3,
    color: 'rgba(255, 0, 0, 0.8)',
    glowColor: '#ff0000',
    glowSize: 15,
    blinkSpeed: 5,
    phase: i * 2
  })),
  
  // Side lights (larger and brighter)
  {
    x: Math.round(x + 5),
    y: Math.round(y + UFO.HEIGHT - 15),
    size: 4,
    color: 'rgba(255, 0, 0, 0.9)',
    glowColor: '#ff0000',
    glowSize: 20,
    blinkSpeed: 3,
    phase: 0
  },
  {
    x: Math.round(x + UFO.WIDTH - 5),
    y: Math.round(y + UFO.HEIGHT - 15),
    size: 4,
    color: 'rgba(255, 0, 0, 0.9)',
    glowColor: '#ff0000',
    glowSize: 20,
    blinkSpeed: 3,
    phase: Math.PI
  }
];