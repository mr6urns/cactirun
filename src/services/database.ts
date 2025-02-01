import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/database.types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function retryOperation<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, attempt)));
    }
  }
  
  throw lastError;
}