import { PERFORMANCE_CONFIG } from './performanceConfig';

interface InterpolationState {
  current: number;
  target: number;
}

export const interpolatePosition = (state: InterpolationState): number => {
  const alpha = PERFORMANCE_CONFIG.INTERPOLATION_ALPHA;
  return state.current + (state.target - state.current) * alpha;
};

export const createInterpolationState = (initial: number): InterpolationState => ({
  current: initial,
  target: initial
});

export const updateInterpolationState = (
  state: InterpolationState,
  newTarget: number
): InterpolationState => ({
  current: state.current + (state.target - state.current) * PERFORMANCE_CONFIG.INTERPOLATION_ALPHA,
  target: newTarget
});