// Manage persistent player data
export const PLAYER_NAME_KEY = 'game_player_name';

export const savePlayerName = (name: string): void => {
  localStorage.setItem(PLAYER_NAME_KEY, name);
};

export const getPlayerName = (): string => {
  return localStorage.getItem(PLAYER_NAME_KEY) || '';
};