import { CANVAS, ALPACA, UFO, CACTUS } from '../constants';
import { Obstacle } from '../../types/game';

export interface Hitbox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const getAlpacaHitbox = (x: number, y: number): Hitbox => ({
  left: Math.round(x) + ALPACA.WIDTH * 0.25,
  right: Math.round(x) + ALPACA.WIDTH * 0.75,
  top: Math.round(y) + ALPACA.HEIGHT * 0.25,
  bottom: Math.round(y) + ALPACA.HEIGHT * 0.85
});

export const getObstacleHitbox = (obstacle: Obstacle): Hitbox => {
  const x = Math.round(obstacle.x);
  
  if (obstacle.type === 'cactus') {
    return {
      left: x + CACTUS.HITBOX.SIDE_PADDING,
      right: x + obstacle.width - CACTUS.HITBOX.SIDE_PADDING,
      top: Math.round(CANVAS.GROUND_Y - obstacle.height + CACTUS.HITBOX.TOP_OFFSET),
      bottom: CANVAS.GROUND_Y - CACTUS.HITBOX.PADDING
    };
  }
  
  // UFO hitbox
  return {
    left: x + UFO.HITBOX.PADDING,
    right: x + UFO.WIDTH - UFO.HITBOX.PADDING,
    top: obstacle.height + UFO.HITBOX.TOP_OFFSET,
    bottom: obstacle.height + UFO.HEIGHT - UFO.HITBOX.BOTTOM_OFFSET
  };
};