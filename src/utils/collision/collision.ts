import { GameState } from '../../types/game';
import { getAlpacaHitbox, getCactusHitbox } from './hitboxes';
import { detectUFOCollision } from './detectors/ufoCollision';
import { handleUFOCollision } from './handlers/ufoCollision';
import { checkHitboxOverlap } from './detectors/collisionUtils';

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
        if (zoneType === 'dome' && gameState.alpaca.velocity > 0) {
          handleUFOCollision(gameState, obstacle);
          return false;
        }
        return true;
      }
      return false;
    }

    // Cactus collision
    return checkHitboxOverlap(alpacaBox, getCactusHitbox(obstacle));
  });
};