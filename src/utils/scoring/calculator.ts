export const calculateBounceScore = (streak: number): number => {
  // Start with a lower base score and increase with streak
  const basePoints = 50;
  const multiplier = Math.min(1 + (streak * 0.5), 5); // Cap at 5x multiplier
  return Math.floor(basePoints * multiplier);
};