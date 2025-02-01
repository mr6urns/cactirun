import { CANVAS } from '../constants';
import { generateUFO } from './ufoGenerator';
import { generateCactus } from './cactusGenerator';
import { calculateSpawnChance } from './spawnLogic';
import { Obstacle } from '../../types/game';

export const generateObstacle = (score: number): Obstacle => {
  const ufoChance = calculateSpawnChance(score);
  const obstacle = Math.random() < ufoChance ? generateUFO(score) : generateCactus();
  
  // Start obstacles just outside the right border
  obstacle.x = CANVAS.WIDTH + 2;
  
  return obstacle;
};

export { shouldSpawnObstacle } from './spawnLogic';