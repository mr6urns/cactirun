import { CANVAS } from '../constants';

interface ScreenEffect {
  duration: number;
  intensity: number;
  startTime: number;
  color: string;
}

let currentEffect: ScreenEffect | null = null;

export const triggerScreenEffect = () => {
  currentEffect = {
    duration: 0.5, // Increased duration for smoother fade
    intensity: 1.0,
    startTime: Date.now(),
    color: '#39ff14' // Green color to match UFO dome
  };
  
  // Trigger device vibration if supported
  if (navigator.vibrate) {
    navigator.vibrate(50); // Reduced vibration time for better feel
  }
};

export const drawScreenEffect = (ctx: CanvasRenderingContext2D) => {
  if (!currentEffect) return;
  
  const elapsed = (Date.now() - currentEffect.startTime) / 1000;
  if (elapsed >= currentEffect.duration) {
    currentEffect = null;
    return;
  }
  
  // Calculate effect progress with smooth easing
  const progress = 1 - Math.pow(elapsed / currentEffect.duration, 2); // Quadratic easing
  const intensity = progress * currentEffect.intensity;
  
  // Draw screen glow with gradient
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  // Create radial gradient for more natural glow
  const gradient = ctx.createRadialGradient(
    CANVAS.WIDTH / 2, CANVAS.HEIGHT / 2, 0,
    CANVAS.WIDTH / 2, CANVAS.HEIGHT / 2, CANVAS.WIDTH / 2
  );
  
  gradient.addColorStop(0, `rgba(57, 255, 20, ${intensity * 0.3})`);
  gradient.addColorStop(0.5, `rgba(57, 255, 20, ${intensity * 0.15})`);
  gradient.addColorStop(1, `rgba(57, 255, 20, 0)`);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  
  // Apply subtle screen shake
  const shake = Math.sin(elapsed * 80) * 3 * intensity;
  ctx.translate(shake, shake);
  
  ctx.restore();
};