import { CANVAS, METEOR, ALPACA } from '../constants';
import { Obstacle } from '../../types/game';

export const createMeteor = (): Obstacle => {
  // Start from outside the visible area
  const startX = CANVAS.WIDTH + METEOR.WIDTH;
  const startY = METEOR.MIN_HEIGHT + Math.random() * (METEOR.MAX_HEIGHT - METEOR.MIN_HEIGHT);
  
  // Target area near the player with some variation
  const targetX = ALPACA.START_X + Math.random() * 100;
  const targetY = CANVAS.GROUND_Y - METEOR.HEIGHT;
  
  // Calculate angle and velocity for smooth trajectory
  const angle = Math.atan2(targetY - startY, targetX - startX);
  const speed = METEOR.SPEED_MULTIPLIER;
  
  return {
    x: startX,
    width: METEOR.WIDTH,
    height: startY,
    type: 'meteor' as const,
    angle,
    velocity: {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    }
  };
};