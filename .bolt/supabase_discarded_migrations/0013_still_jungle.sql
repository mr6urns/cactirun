/*
  # Reset Scores and Optimize Tables

  1. Changes
    - Reset all scores
    - Optimize indexes
    - Update sequence
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

-- Refresh indexes
REINDEX TABLE scores;