/*
  # Add streak tracking and optimize scoring system

  1. Schema Changes
    - Add `streak` column to scores table
    - Add constraint to ensure non-negative streak values
  
  2. Performance Optimizations
    - Update cleanup function to consider streaks
    - Optimize indexes for streak-based queries
    
  3. Maintenance
    - Add conditional index creation/dropping
    - Update trigger for new scoring system
*/

-- Add streak column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'scores' AND column_name = 'streak'
  ) THEN
    ALTER TABLE scores ADD COLUMN streak integer DEFAULT 0;
  END IF;
END $$;

-- Add constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'scores' AND constraint_name = 'streak_non_negative'
  ) THEN
    ALTER TABLE scores ADD CONSTRAINT streak_non_negative CHECK (streak >= 0);
  END IF;
END $$;

-- Update cleanup function to consider streak
CREATE OR REPLACE FUNCTION cleanup_scores()
RETURNS TRIGGER AS $$
BEGIN
  -- Keep only the highest score per player, considering streak as tiebreaker
  WITH ranked_scores AS (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY player_name 
             ORDER BY score DESC, streak DESC, created_at DESC
           ) as player_rank,
           ROW_NUMBER() OVER (
             ORDER BY score DESC, streak DESC, created_at DESC
           ) as global_rank
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

-- Drop and recreate indexes conditionally
DO $$ 
BEGIN
  -- Drop old indexes if they exist
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'scores_score_idx') THEN
    DROP INDEX scores_score_idx;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'scores_player_score_idx') THEN
    DROP INDEX scores_player_score_idx;
  END IF;
  
  -- Create new indexes if they don't exist
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'scores_score_streak_idx') THEN
    CREATE INDEX scores_score_streak_idx ON scores (score DESC, streak DESC, created_at DESC);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'scores_player_score_streak_idx') THEN
    CREATE INDEX scores_player_score_streak_idx ON scores (player_name, score DESC, streak DESC);
  END IF;
END $$;