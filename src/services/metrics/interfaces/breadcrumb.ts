/**
 * Represents a breadcrumb in a measurement trail
 * Loosely modeled from sentry's breadcrumb object
 */
export interface Breadcrumb {
  type?: string;
  level?: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
  category?: string;
  message?: string;
  data?: {
    [key: string]: any;
  };
}
