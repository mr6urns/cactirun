/*
  # Reset for Launch

  1. Changes
    - Reset scores table for clean launch
    - Add index on score column for faster leaderboard queries
    - Add created_at index for chronological sorting
  
  2. Optimizations
    - Add indexes for better query performance
    - Ensure RLS policies are properly set
*/

-- Reset scores table
TRUNCATE TABLE scores;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS scores_score_idx ON scores (score DESC);
CREATE INDEX IF NOT EXISTS scores_created_at_idx ON scores (created_at DESC);

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