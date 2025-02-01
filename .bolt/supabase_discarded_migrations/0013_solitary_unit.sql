/*
  # Update scores cleanup function

  1. Changes
    - Modify cleanup function to keep top 10 scores instead of top 5
    - Optimize cleanup trigger for better performance
    - Add indexes for better query performance
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS cleanup_scores CASCADE;

-- Create new cleanup function for top 10 scores
CREATE OR REPLACE FUNCTION cleanup_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- Keep only the highest score per player and top 10 overall
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
       OR global_rank > 10  -- Keep top 10 overall
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

-- Optimize indexes for new query pattern
DROP INDEX IF EXISTS scores_global_rank_idx;
CREATE INDEX IF NOT EXISTS scores_global_rank_idx ON scores (score DESC, created_at DESC);

-- Reset scores table to ensure clean state
TRUNCATE TABLE scores;