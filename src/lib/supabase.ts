import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Retry configuration
const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 5000,
  JITTER: 200
} as const;

// Enhanced fetch with retry logic
const fetchWithRetry = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt < RETRY_CONFIG.MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(input, init);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < RETRY_CONFIG.MAX_RETRIES - 1) {
        const delay = Math.min(
          RETRY_CONFIG.INITIAL_DELAY * Math.pow(2, attempt) +
          Math.random() * RETRY_CONFIG.JITTER,
          RETRY_CONFIG.MAX_DELAY
        );
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
};

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  global: {
    fetch: fetchWithRetry
  }
});

// Utility function for retrying operations
export async function retryOperation<T>(
  operation: () => Promise<T>,
  retries = RETRY_CONFIG.MAX_RETRIES
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      const delay = Math.min(
        RETRY_CONFIG.INITIAL_DELAY * Math.pow(2, RETRY_CONFIG.MAX_RETRIES - retries) +
        Math.random() * RETRY_CONFIG.JITTER,
        RETRY_CONFIG.MAX_DELAY
      );
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
}