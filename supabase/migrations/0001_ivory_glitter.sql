/*
  # Create scores table for global leaderboard

  1. New Tables
    - `scores`
      - `id` (uuid, primary key)
      - `player_name` (text)
      - `score` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `scores` table
    - Add policies for:
      - Anyone can read scores
      - Authenticated users can insert their own scores
*/

CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read scores
CREATE POLICY "Anyone can read scores"
  ON scores
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert scores (since this is a public game)
CREATE POLICY "Anyone can insert scores"
  ON scores
  FOR INSERT
  TO public
  WITH CHECK (true);