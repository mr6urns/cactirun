import { Hitbox, ZoneType } from '../hitboxTypes';
import { getUFOZones } from '../zones/ufoZones';
import { Obstacle } from '../../../types/game';
import { checkHitboxOverlap } from './collisionUtils';
import { checkBeamCollision } from './beamCollision';

interface CollisionResult {
  collided: boolean;
  zoneType: ZoneType | null;
}

export const detectUFOCollision = (
  alpacaBox: Hitbox,
  obstacle: Obstacle,
  velocity: number
): CollisionResult => {
  if (obstacle.isFalling) {
    return { collided: false, zoneType: null };
  }

  // Check beam collision first - this is always lethal
  if (obstacle.isBeaming && checkBeamCollision(alpacaBox, obstacle)) {
    return { collided: true, zoneType: 'beam' };
  }

  // Get all collision zones
  const zones = getUFOZones(obstacle);
  
  // Check for collisions with UFO body
  for (const zone of zones) {
    if (checkHitboxOverlap(alpacaBox, zone.hitbox)) {
      // If moving upward, allow bounce only on top zone
      if (velocity <= 0 && zone.type === 'bounce') {
        return { collided: false, zoneType: null };
      }
      // If moving downward, allow bounce on top zone
      if (velocity > 0 && zone.type === 'bounce') {
        return { collided: true, zoneType: 'bounce' };
      }
      // Any other collision is lethal
      return { collided: true, zoneType: 'body' };
    }
  }

  return { collided: false, zoneType: null };
};