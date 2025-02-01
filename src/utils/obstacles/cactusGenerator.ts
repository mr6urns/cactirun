import { CANVAS, OBSTACLE_SPAWN } from '../constants';
import { Obstacle } from '../../types/game';

export const generateCactus = (): Obstacle => {
  const height = OBSTACLE_SPAWN.CACTUS_HEIGHT.MIN + 
    Math.random() * (OBSTACLE_SPAWN.CACTUS_HEIGHT.MAX - OBSTACLE_SPAWN.CACTUS_HEIGHT.MIN);
  
  return {
    x: CANVAS.WIDTH + 50,
    width: 40,
    height,
    type: 'cactus'
  };
};