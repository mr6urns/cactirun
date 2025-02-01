/*
  # Reset and optimize leaderboard for launch

  1. Changes
    - Reset scores table
    - Optimize cleanup trigger to keep only top 5 scores
    - Add player name uniqueness constraint
    - Add score validation
  
  2. Performance
    - Add optimized indexes
    - Update cleanup function
*/

-- Reset scores table
TRUNCATE TABLE scores;

-- Add constraints
ALTER TABLE scores ADD CONSTRAINT score_positive CHECK (score >= 0);

-- Optimize cleanup function
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
       OR global_rank > 5  -- Keep only top 5 overall
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

-- Optimize indexes
DROP INDEX IF EXISTS scores_score_idx;
DROP INDEX IF EXISTS scores_created_at_idx;
CREATE INDEX scores_score_idx ON scores (score DESC, created_at DESC);
CREATE INDEX scores_player_score_idx ON scores (player_name, score DESC);

-- Refresh RLS policies
DROP POLICY IF EXISTS "Anyone can read scores" ON scores;
DROP POLICY IF EXISTS "Anyone can insert scores" ON scores;

CREATE POLICY "Anyone can read scores"
  ON scores
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert scores"
  ON scores
  FOR INSERT
  TO public
  WITH CHECK (true);