import { CANVAS, ALPACA } from '../constants';
import { Obstacle } from '../../types/game';
import { Hitbox } from './hitboxTypes';

// More precise alpaca hitbox with tighter bounds
export const getAlpacaHitbox = (x: number, y: number): Hitbox => ({
  left: x + ALPACA.WIDTH * 0.3,
  right: x + ALPACA.WIDTH * 0.7,
  top: y + ALPACA.HEIGHT * 0.2,
  bottom: y + ALPACA.HEIGHT * 0.85
});

// Cactus hitbox
export const getCactusHitbox = (obstacle: Obstacle): Hitbox => ({
  left: obstacle.x + 10,
  right: obstacle.x + obstacle.width - 10,
  top: CANVAS.GROUND_Y - obstacle.height + 8,
  bottom: CANVAS.GROUND_Y - 5
});