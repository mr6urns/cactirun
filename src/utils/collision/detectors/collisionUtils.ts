import { Hitbox } from '../hitboxTypes';

export const checkHitboxOverlap = (box1: Hitbox, box2: Hitbox): boolean => {
  return !(
    box1.right < box2.left ||
    box1.left > box2.right ||
    box1.bottom < box2.top ||
    box1.top > box2.bottom
  );
};

export const isMovingDownward = (velocity: number): boolean => {
  return velocity > 0;
};