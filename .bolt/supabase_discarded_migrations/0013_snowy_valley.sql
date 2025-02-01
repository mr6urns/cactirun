/*
  # Fix leaderboard duplicates

  1. Changes
    - Optimize cleanup function to properly handle duplicates
    - Ensure only one score per player in top scores
    - Keep exactly top 3 scores overall
    - Add index for better query performance
*/

-- Drop existing cleanup function and recreate
CREATE OR REPLACE FUNCTION cleanup_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- First remove duplicates keeping only highest score per player
  WITH ranked_duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY player_name 
             ORDER BY score DESC, created_at DESC
           ) as rn
    FROM scores
  )
  DELETE FROM scores 
  WHERE id IN (
    SELECT id FROM ranked_duplicates WHERE rn > 1
  );

  -- Then keep only top 3 scores
  WITH ranked_scores AS (
    SELECT id,
           ROW_NUMBER() OVER (ORDER BY score DESC, created_at DESC) as rn
    FROM scores
  )
  DELETE FROM scores 
  WHERE id IN (
    SELECT id FROM ranked_scores WHERE rn > 3
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

-- Add index for better performance
DROP INDEX IF EXISTS idx_scores_leaderboard;
CREATE INDEX idx_scores_leaderboard ON scores (score DESC, created_at DESC);

-- Clean up existing data
SELECT cleanup_scores();