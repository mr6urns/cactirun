/*
  # Optimize Scoreboard for Top 5 Scores

  1. Changes
    - Add function to maintain only top 5 scores per player
    - Add trigger to automatically clean up old scores
    - Reset scores table for clean start
  
  2. Optimizations
    - Keep only highest score per player
    - Maintain only top 5 scores overall
    - Add efficient indexing
*/

-- Reset scores table
TRUNCATE TABLE scores;

-- Create function to clean up old scores
CREATE OR REPLACE FUNCTION cleanup_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete all scores beyond top 5
  DELETE FROM scores
  WHERE id IN (
    SELECT id FROM scores
    ORDER BY score DESC
    OFFSET 5
  );
  
  -- Keep only highest score per player
  DELETE FROM scores
  WHERE id IN (
    SELECT id FROM (
      SELECT id,
        ROW_NUMBER() OVER (
          PARTITION BY player_name 
          ORDER BY score DESC
        ) as rn
      FROM scores
    ) s
    WHERE s.rn > 1
  );
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic cleanup
DROP TRIGGER IF EXISTS cleanup_scores_trigger ON scores;
CREATE TRIGGER cleanup_scores_trigger
  AFTER INSERT ON scores
  FOR EACH STATEMENT
  EXECUTE FUNCTION cleanup_scores();

-- Recreate indexes for optimal performance
DROP INDEX IF EXISTS scores_score_idx;
DROP INDEX IF EXISTS scores_created_at_idx;
CREATE INDEX scores_score_idx ON scores (score DESC);
CREATE INDEX scores_created_at_idx ON scores (created_at DESC);

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