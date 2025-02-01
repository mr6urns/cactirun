export interface PowerState {
  level: number;
  maxLevel: number;
  glowIntensity: number;
}

const MAX_POWER_LEVEL = 5;
const GLOW_INTENSITY_INCREMENT = 0.2;

export const createInitialPowerState = (): PowerState => ({
  level: 0,
  maxLevel: MAX_POWER_LEVEL,
  glowIntensity: 0
});

export const increasePowerLevel = (state: PowerState): PowerState => ({
  ...state,
  level: Math.min(state.level + 1, state.maxLevel),
  glowIntensity: Math.min(state.glowIntensity + GLOW_INTENSITY_INCREMENT, 1)
});