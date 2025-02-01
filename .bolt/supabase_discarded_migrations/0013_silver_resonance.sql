/*
  # Reset Scores Table
  
  1. Changes
    - Truncates the scores table to remove all existing scores
    - Resets any associated sequences
    - Ensures RLS policies are in place
  
  2. Security
    - Maintains existing RLS policies
*/

-- Reset scores table
TRUNCATE TABLE scores;

-- Reset the sequence if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT FROM pg_class 
    WHERE relname = 'scores_id_seq'
  ) THEN
    ALTER SEQUENCE scores_id_seq RESTART WITH 1;
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

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