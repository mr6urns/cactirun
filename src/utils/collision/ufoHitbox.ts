import { UFO } from '../constants';
import { Obstacle } from '../../types/game';
import { CollisionZone } from './hitboxTypes';

export const getUFOCollisionZones = (obstacle: Obstacle): CollisionZone[] => {
  const { x, height } = obstacle;
  
  return [
    // Main body hitbox
    {
      type: 'body',
      hitbox: {
        left: x + UFO.WIDTH * 0.2,
        right: x + UFO.WIDTH * 0.8,
        top: height + UFO.HEIGHT * 0.3,
        bottom: height + UFO.HEIGHT * 0.7
      }
    },
    // Dome hitbox (for bouncing)
    {
      type: 'dome',
      hitbox: {
        left: x + UFO.WIDTH * 0.3,
        right: x + UFO.WIDTH * 0.7,
        top: height + UFO.HEIGHT * 0.1,
        bottom: height + UFO.HEIGHT * 0.4
      }
    },
    // Base hitbox
    {
      type: 'base',
      hitbox: {
        left: x + UFO.WIDTH * 0.15,
        right: x + UFO.WIDTH * 0.85,
        top: height + UFO.HEIGHT * 0.6,
        bottom: height + UFO.HEIGHT * 0.9
      }
    }
  ];
};