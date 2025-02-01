/*
  # Reset scores table and optimize indexes

  1. Changes
    - Reset all scores in the table
    - Optimize indexes for better query performance
    - Ensure RLS policies are correctly set
*/

-- Reset scores table
TRUNCATE TABLE scores;

-- Optimize indexes for better performance
DROP INDEX IF EXISTS scores_score_idx;
DROP INDEX IF EXISTS scores_created_at_idx;
CREATE INDEX scores_score_idx ON scores (score DESC);
CREATE INDEX scores_created_at_idx ON scores (created_at DESC);

-- Ensure RLS is enabled
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Refresh policies
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