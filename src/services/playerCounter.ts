import { STORAGE_KEYS } from '../utils/storage/constants';

// Reset counter on page load
localStorage.setItem(STORAGE_KEYS.PLAYER_COUNTER, '0');

export const getNextPlayerNumber = (): number => {
  const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.PLAYER_COUNTER) || '0', 10);
  const nextCount = currentCount + 1;
  localStorage.setItem(STORAGE_KEYS.PLAYER_COUNTER, nextCount.toString());
  return nextCount;
};

export const generatePlayerName = (): string => {
  const playerNumber = getNextPlayerNumber();
  return `CACTI ${playerNumber}`;
};