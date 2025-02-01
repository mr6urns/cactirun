/*
  # Reset Game Data
  
  1. Changes
    - Truncates scores table to reset all scores
    - Resets sequence if it exists
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