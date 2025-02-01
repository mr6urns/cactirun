/*
  # Add Player Counter Function

  1. Function
    - Creates increment_player_counter() function
    - Atomically increments and returns next player number
    - Includes security and error handling
  
  2. Security
    - Function runs with SECURITY DEFINER
    - Protected from concurrent access
*/

-- Create function to atomically increment counter
CREATE OR REPLACE FUNCTION increment_player_counter()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  next_number integer;
BEGIN
  -- Atomically update and return next number
  UPDATE player_counter
  SET counter = counter + 1
  WHERE id = 1
  RETURNING counter INTO next_number;
  
  -- Handle case where no rows were updated
  IF next_number IS NULL THEN
    -- Try to insert initial row
    INSERT INTO player_counter (id, counter)
    VALUES (1, 1)
    ON CONFLICT (id) DO UPDATE
    SET counter = player_counter.counter + 1
    RETURNING counter INTO next_number;
  END IF;
  
  RETURN COALESCE(next_number, 1);
END;
$$;