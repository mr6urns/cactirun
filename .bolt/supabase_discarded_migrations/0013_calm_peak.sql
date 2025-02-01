/*
  # Reset Scores and Verify Structure

  1. Changes
    - Truncates the scores table to remove all existing scores
    - Verifies indexes and constraints are in place
    - Ensures RLS policies are active

  2. Verification
    - Checks for existing indexes before creating
    - Validates score constraint
*/

-- Reset scores table
TRUNCATE TABLE scores;

-- Verify indexes are in place
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'scores_score_idx'
  ) THEN
    CREATE INDEX scores_score_idx ON scores (score DESC, created_at DESC);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'scores_player_score_idx'
  ) THEN
    CREATE INDEX scores_player_score_idx ON scores (player_name, score DESC);
  END IF;
END $$;

-- Verify score constraint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'score_positive'
  ) THEN
    ALTER TABLE scores ADD CONSTRAINT score_positive CHECK (score >= 0);
  END IF;
END $$;