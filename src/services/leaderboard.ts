import { supabase, retryOperation } from '../lib/supabase';

export interface Score {
  id: string;
  playerName: string;
  score: number;
  date: string;
}

// Cache configuration
const CACHE_CONFIG = {
  MAX_AGE: 2000,
  MAX_SCORES: 10
} as const;

let cachedScores: Score[] = [];
let lastCacheTime = 0;

const isCacheValid = () => {
  return (
    cachedScores.length > 0 &&
    Date.now() - lastCacheTime < CACHE_CONFIG.MAX_AGE
  );
};

const getFallbackScores = (): Score[] => {
  return cachedScores.length > 0 ? cachedScores : [];
};

export const getScores = async (): Promise<Score[]> => {
  try {
    if (isCacheValid()) {
      return cachedScores;
    }

    const { data, error } = await retryOperation(async () => 
      supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(CACHE_CONFIG.MAX_SCORES)
    );

    if (error) {
      console.error('Supabase error:', error);
      return getFallbackScores();
    }

    if (!data || data.length === 0) {
      return getFallbackScores();
    }

    const scores = data.map(score => ({
      id: score.id,
      playerName: score.player_name,
      score: score.score,
      date: score.created_at
    }));

    cachedScores = scores;
    lastCacheTime = Date.now();
    
    return scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    return getFallbackScores();
  }
};

export const saveScore = async (playerName: string, score: number): Promise<Score | null> => {
  if (!playerName || score <= 0) return null;

  try {
    // Immediately invalidate cache to ensure fresh data
    lastCacheTime = 0;
    
    const { data, error } = await retryOperation(async () =>
      supabase
        .from('scores')
        .insert([{ 
          player_name: playerName, 
          score: Math.floor(score) 
        }])
        .select()
        .single()
    );

    if (error) {
      console.error('Error saving score:', error);
      return null;
    }

    if (!data) return null;

    // Force cache refresh
    await getScores();

    return {
      id: data.id,
      playerName: data.player_name,
      score: data.score,
      date: data.created_at
    };
  } catch (error) {
    console.error('Error saving score:', error);
    return null;
  }
};