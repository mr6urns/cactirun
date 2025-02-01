import { CANVAS, OBSTACLE_SPAWN } from '../constants';

export const calculateSpawnChance = (score: number): number => {
  return Math.min(
    OBSTACLE_SPAWN.UFO_CHANCE_INITIAL + 
    (score * OBSTACLE_SPAWN.UFO_CHANCE_GROWTH),
    OBSTACLE_SPAWN.UFO_CHANCE_MAX
  );
};

export const calculateMinSpacing = (score: number): number => {
  return Math.max(
    OBSTACLE_SPAWN.MIN_DISTANCE - (score / 1000) * OBSTACLE_SPAWN.DISTANCE_REDUCTION,
    OBSTACLE_SPAWN.MIN_SAFE_DISTANCE
  );
};

export const shouldSpawnObstacle = (lastObstacleX: number, score: number): boolean => {
  const minSpacing = calculateMinSpacing(score);
  return lastObstacleX < CANVAS.WIDTH - minSpacing;
};