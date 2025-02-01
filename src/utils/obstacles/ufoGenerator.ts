import { CANVAS, UFO } from '../constants';
import { Obstacle } from '../../types/game';

export const generateUFO = (score: number): Obstacle => {
  // Simplified height calculation - directly use the height values
  const height = UFO.SPAWN_HEIGHT.MIN + 
    Math.random() * (UFO.SPAWN_HEIGHT.MAX - UFO.SPAWN_HEIGHT.MIN);
  
  return {
    x: CANVAS.WIDTH + 50,
    width: UFO.WIDTH,
    height,
    type: 'ufo',
    isBeaming: true,
    beamTimer: UFO.BEAM_DURATION
  };
};