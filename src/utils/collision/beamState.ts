import { UFO } from '../constants';

export const isBeamActive = (beamTimer: number = 0): boolean => {
  // Beam is most dangerous in the middle of its duration
  const beamProgress = beamTimer / UFO.BEAM_DURATION;
  // The beam is active between 20% and 80% of its duration for better gameplay
  return beamProgress > 0.2 && beamProgress < 0.8;
};