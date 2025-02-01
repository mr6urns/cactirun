/*
  # Update leaderboard cleanup logic

  1. Changes
    - Modify cleanup function to keep top 9 scores
    - Optimize indexes for better query performance
    - Clean up existing scores to maintain top 9

  2. Indexes
    - scores_score_idx: For efficient leaderboard queries
    - scores_player_score_idx: For player-specific score lookups
*/

-- First clean up existing scores to keep top 9
DELETE FROM scores
WHERE id NOT IN (
  SELECT id FROM scores
  ORDER BY score DESC, created_at DESC
  LIMIT 9
);

-- Update cleanup function to keep 9 scores
CREATE OR REPLACE FUNCTION cleanup_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- Keep only the highest score per player
  WITH ranked_scores AS (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY player_name ORDER BY score DESC) as player_rank,
           ROW_NUMBER() OVER (ORDER BY score DESC) as global_rank
    FROM scores
  )
  DELETE FROM scores
  WHERE id IN (
    SELECT id FROM ranked_scores
    WHERE player_rank > 1  -- Keep only best score per player
       OR global_rank > 9  -- Keep only top 9 overall
  );
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
DROP TRIGGER IF EXISTS cleanup_scores_trigger ON scores;
CREATE TRIGGER cleanup_scores_trigger
  AFTER INSERT ON scores
  FOR EACH STATEMENT
  EXECUTE FUNCTION cleanup_scores();

-- Optimize indexes for 9-score queries
DROP INDEX IF EXISTS scores_score_idx;
DROP INDEX IF EXISTS scores_player_score_idx;
CREATE INDEX scores_score_idx ON scores (score DESC, created_at DESC);
CREATE INDEX scores_player_score_idx ON scores (player_name, score DESC);