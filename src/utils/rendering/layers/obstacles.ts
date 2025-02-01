import { Obstacle } from '../../../types/game';
import { drawUFO } from '../../drawObstacles/drawUFO';
import { drawCactus } from '../../drawObstacles/drawCactus';

export const drawObstacles = (
  ctx: CanvasRenderingContext2D,
  obstacles: Obstacle[],
  deltaTime: number
) => {
  ctx.save();
  
  // Sort obstacles by type to minimize state changes
  const sorted = [...obstacles].sort((a, b) => 
    a.type.localeCompare(b.type)
  );

  // Batch render by type
  let currentType = '';
  sorted.forEach(obstacle => {
    if (obstacle.type !== currentType) {
      currentType = obstacle.type;
      // Reset context only when type changes
      ctx.restore();
      ctx.save();
    }

    if (obstacle.type === 'ufo') {
      drawUFO(ctx, obstacle);
    } else {
      drawCactus(ctx, obstacle.x, obstacle.height);
    }
  });

  ctx.restore();
};