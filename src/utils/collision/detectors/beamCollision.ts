import { UFO, CANVAS } from '../../constants';
import { Hitbox } from '../hitboxTypes';
import { Obstacle } from '../../../types/game';

export const checkBeamCollision = (
  alpacaBox: Hitbox,
  obstacle: Obstacle
): boolean => {
  if (!obstacle.isBeaming || !obstacle.beamTimer) return false;

  const totalDuration = UFO.BEAM_DURATION;
  const warningPhase = UFO.BEAM_PHASES.WARNING * totalDuration;
  const activePhase = UFO.BEAM_PHASES.ACTIVE * totalDuration;

  // Only check collision during active beam phase
  if (obstacle.beamTimer > warningPhase + activePhase) return false;
  if (obstacle.beamTimer < totalDuration - warningPhase - activePhase) return false;

  const beamCenterX = obstacle.x + UFO.WIDTH / 2;
  
  // Calculate expanding beam width at player's height
  const distanceFromUFO = alpacaBox.top - (obstacle.height + UFO.HEIGHT);
  const totalBeamHeight = CANVAS.GROUND_Y - (obstacle.height + UFO.HEIGHT);
  const beamProgress = distanceFromUFO / totalBeamHeight;
  
  const baseWidth = UFO.BEAM.BASE_WIDTH;
  const maxExpansion = UFO.BEAM.MAX_WIDTH - baseWidth;
  const currentWidth = baseWidth + (maxExpansion * beamProgress);
  
  // Calculate beam boundaries
  const beamLeft = beamCenterX - (currentWidth / 2);
  const beamRight = beamCenterX + (currentWidth / 2);
  
  // Any overlap with the beam is lethal
  return alpacaBox.right > beamLeft && 
         alpacaBox.left < beamRight && 
         alpacaBox.top > obstacle.height + UFO.HEIGHT;
};