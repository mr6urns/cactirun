/*
  # Optimize leaderboard queries and cleanup

  1. Changes
    - Remove duplicate scores per player, keeping only highest score
    - Keep only top 3 scores overall
    - Add optimized index for leaderboard queries

  2. Performance
    - Add composite index on score and created_at for faster sorting
    - Remove old indexes to avoid overhead
*/

-- First clean up duplicate scores, keeping only highest score per player
DELETE FROM scores a USING scores b
WHERE a.player_name = b.player_name 
  AND a.score <= b.score 
  AND a.created_at < b.created_at;

-- Then keep only top 3 scores
DELETE FROM scores
WHERE id NOT IN (
  SELECT id FROM scores
  ORDER BY score DESC, created_at DESC
  LIMIT 3
);

-- Drop old index if exists
DROP INDEX IF EXISTS idx_scores_leaderboard;

-- Create optimized index for leaderboard queries
CREATE INDEX idx_scores_leaderboard ON scores (score DESC, created_at DESC);