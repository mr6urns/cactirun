/*
  # Player Counter System

  1. Tables
    - Ensures player_counter table exists
    - Initializes counter value
  
  2. Security
    - Enables RLS
    - Refreshes policies for read/update access
*/

-- Create player counter table
CREATE TABLE IF NOT EXISTS player_counter (
  id integer PRIMARY KEY,
  counter integer NOT NULL DEFAULT 0
);

-- Insert initial counter value if not exists
INSERT INTO player_counter (id, counter)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE player_counter ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read player counter" ON player_counter;
DROP POLICY IF EXISTS "Anyone can update player counter" ON player_counter;

-- Create new policies
CREATE POLICY "Anyone can read player counter"
  ON player_counter
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update player counter"
  ON player_counter
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);