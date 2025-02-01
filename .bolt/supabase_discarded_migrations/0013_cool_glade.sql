/*
  # Add game counter functionality
  
  1. New Tables
    - `games_counter` table to track total games played
      - `id` (integer, primary key, fixed to 1)
      - `total_games` (bigint, default 0)
  
  2. Security
    - Enable RLS on `games_counter` table
    - Add policy for public read access
  
  3. Functions
    - `increment_games_counter()` for atomic counter updates
*/

-- Create games counter table
CREATE TABLE IF NOT EXISTS games_counter (
  id integer PRIMARY KEY CHECK (id = 1),
  total_games bigint NOT NULL DEFAULT 0
);

-- Insert initial counter
INSERT INTO games_counter (id, total_games) 
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE games_counter ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can read games counter" ON games_counter;

-- Allow anyone to read the counter
CREATE POLICY "Anyone can read games counter"
  ON games_counter
  FOR SELECT
  TO public
  USING (true);

-- Function to increment counter
CREATE OR REPLACE FUNCTION increment_games_counter()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count bigint;
BEGIN
  UPDATE games_counter
  SET total_games = total_games + 1
  WHERE id = 1
  RETURNING total_games INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$;