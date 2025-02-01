import { CANVAS } from '../constants';

const MIN_SPACING = 300;

export const shouldSpawnObstacle = (lastObstacleX: number): boolean => {
  return lastObstacleX < CANVAS.WIDTH - MIN_SPACING;
};

export const getLastObstacleX = (obstacles: Array<{ x: number; width: number }>): number => {
  if (obstacles.length === 0) return -MIN_SPACING;
  return obstacles[obstacles.length - 1].x;
};