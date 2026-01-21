/**
 * Error Tracking & Monitoring Utilities
 * Centraliza el manejo de errores y logging
 */

interface ErrorContext {
  userId?: string;
  correlationId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

interface ErrorData {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  context?: ErrorContext;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private isProduction = process.env.NODE_ENV === 'production';

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  /**
   * Log error to console and external service
   */
  logError(error: Error, context?: ErrorContext): void {
    const errorData: ErrorData = {
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      timestamp: new Date().toISOString(),
      context,
    };

    // Always log to console
    console.error('🚨 Error tracked:', errorData);

    // In production, send to external service
    if (this.isProduction && typeof window !== 'undefined') {
      this.sendToExternalService(errorData);
    }
  }

  /**
   * Log performance issues
   */
  logPerformance(metric: string, value: number, context?: ErrorContext): void {
    const perfData = {
      metric,
      value,
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      timestamp: new Date().toISOString(),
      context,
    };

    console.warn('⚡ Performance metric:', perfData);

    if (this.isProduction && typeof window !== 'undefined') {
      this.sendToExternalService(perfData, 'performance');
    }
  }

  /**
   * Send to external monitoring service (Sentry, LogRocket, etc.)
   */
  private async sendToExternalService(data: any, type: 'error' | 'performance' = 'error'): Promise<void> {
    try {
      // TODO: Replace with actual service endpoint
      const endpoint = process.env.NEXT_PUBLIC_ERROR_TRACKING_ENDPOINT;
      
      if (!endpoint) {
        console.warn('No error tracking endpoint configured');
        return;
      }

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          project: 'fireforgerd',
        }),
      });
    } catch (err) {
      console.error('Failed to send error to tracking service:', err);
    }
  }
}

export const errorTracker = ErrorTracker.getInstance();

/**
 * Retry utility with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    context?: ErrorContext;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    context,
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        errorTracker.logError(lastError, {
          ...context,
          action: 'retry_exhausted',
          metadata: { attempts: maxAttempts },
        });
        throw lastError;
      }

      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      
      errorTracker.logError(lastError, {
        ...context,
        action: 'retry_attempt',
        metadata: { attempt, nextDelay: delay },
      });

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Circuit breaker pattern for external services
 */
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}

  async execute<T>(fn: () => Promise<T>, context?: ErrorContext): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure(error as Error, context);
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure(error: Error, context?: ErrorContext): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      errorTracker.logError(error, {
        ...context,
        action: 'circuit_breaker_opened',
        metadata: { failures: this.failures },
      });
    }
  }
}

export const emailCircuitBreaker = new CircuitBreaker(3, 30000); // 3 failures, 30s timeout