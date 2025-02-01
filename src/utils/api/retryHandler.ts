// Retry configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 5000,
  JITTER: 200 // Add randomness to prevent thundering herd
} as const;

// Exponential backoff with jitter
export const calculateBackoff = (attempt: number): number => {
  const delay = Math.min(
    RETRY_CONFIG.INITIAL_DELAY * Math.pow(2, attempt) +
    Math.random() * RETRY_CONFIG.JITTER,
    RETRY_CONFIG.MAX_DELAY
  );
  return delay;
};

// Generic retry function with typing
export async function withRetry<T>(
  operation: () => Promise<T>,
  retries: number = RETRY_CONFIG.MAX_RETRIES
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      const delay = calculateBackoff(RETRY_CONFIG.MAX_RETRIES - retries);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}