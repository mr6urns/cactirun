import { GameState } from '../types/game';
import { getAlpacaHitbox } from './collision/hitboxes';
import { detectUFOCollision } from './collision/detectors/ufoCollision';
import { handleUFOCollision } from './collision/handlers/ufoCollision';
import { checkHitboxOverlap } from './collision/detectors/collisionUtils';
import { getCactusHitbox } from './collision/hitboxes';

export const checkCollision = (gameState: GameState): boolean => {
  const alpacaBox = getAlpacaHitbox(gameState.alpaca.x, gameState.alpaca.y);

  return gameState.obstacles.some(obstacle => {
    if (obstacle.type === 'ufo') {
      const { collided, zoneType } = detectUFOCollision(
        alpacaBox, 
        obstacle,
        gameState.alpaca.velocity
      );
      
      if (collided) {
        if (zoneType === 'bounce') {
          handleUFOCollision(gameState, obstacle);
          return false; // Don't end game on bounce
        }
        return zoneType === 'beam'; // Only end game on beam collision
      }
      return false;
    }

    // Cactus collision
    return checkHitboxOverlap(alpacaBox, getCactusHitbox(obstacle));
  });
};