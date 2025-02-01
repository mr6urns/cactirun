import { UFO } from '../../constants';
import { CollisionZone } from '../hitboxTypes';
import { Obstacle } from '../../../types/game';

export const getUFOZones = (obstacle: Obstacle): CollisionZone[] => {
  const { x, height } = obstacle;
  
  return [
    // Top bounce zone - only the top part is bounceable
    {
      type: 'bounce',
      hitbox: {
        left: x + UFO.WIDTH * 0.2,
        right: x + UFO.WIDTH * 0.8,
        top: height,
        bottom: height + UFO.HEIGHT * 0.3
      }
    },
    // Body collision zone - the rest of the UFO is lethal
    {
      type: 'body',
      hitbox: {
        left: x + UFO.WIDTH * 0.1,
        right: x + UFO.WIDTH * 0.9,
        top: height + UFO.HEIGHT * 0.3,
        bottom: height + UFO.HEIGHT
      }
    }
  ];
};