interface PlayerScore {
  name: string;
  score: number;
}

const PLAYER_SCORES_KEY = 'player_scores';

export const getPlayerHighScore = (playerName: string): number => {
  const scores = getAllPlayerScores();
  return scores[playerName] || 0;
};

export const updatePlayerHighScore = (playerName: string, newScore: number): boolean => {
  const scores = getAllPlayerScores();
  const currentHighScore = scores[playerName] || 0;
  
  if (newScore > currentHighScore) {
    scores[playerName] = newScore;
    localStorage.setItem(PLAYER_SCORES_KEY, JSON.stringify(scores));
    return true;
  }
  return false;
};

const getAllPlayerScores = (): Record<string, number> => {
  try {
    return JSON.parse(localStorage.getItem(PLAYER_SCORES_KEY) || '{}');
  } catch {
    return {};
  }
};