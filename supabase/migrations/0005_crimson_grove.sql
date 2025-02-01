/*
  # Update scores table schema

  1. Changes
    - Ensures scores table exists with correct schema
    - Adds RLS if not already enabled
    - Adds policies if they don't exist

  2. Security
    - Maintains existing RLS settings
    - Preserves existing policies if they exist
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'scores' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Add policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'scores' 
    AND policyname = 'Anyone can read scores'
  ) THEN
    CREATE POLICY "Anyone can read scores"
      ON scores
      FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'scores' 
    AND policyname = 'Anyone can insert scores'
  ) THEN
    CREATE POLICY "Anyone can insert scores"
      ON scores
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;