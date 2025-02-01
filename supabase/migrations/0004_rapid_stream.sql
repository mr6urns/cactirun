/*
  # Reset scores and update game settings
  
  1. Changes
    - Reset all scores in the scores table
    - Clean up any existing data
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