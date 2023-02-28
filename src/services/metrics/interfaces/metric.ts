import { Breadcrumb } from './breadcrumb';

/**
 * Provider-agnostic interface of a monitoring metric
 */
export interface Metric {
  /** Name of the measurement */
  name: string;
  /** Description of what is being measured */
  description: string;
  /** Provider-specific data (you probably don't want to use this) */
  extra?: { [provider: string]: unknown };

  /** Stops the current measurement */
  stop(): void;
  /** Captures an error in the scope of this measurement */
  capture(error: Error): this;
  /** Adds a breadcrumb to this measurement */
  addBreadcrumb(breadcrumb: Breadcrumb): this;
}

/**
 * Fields that must be known when creating a metric
 */
export type MetricContext = Pick<Metric, 'name' | 'description'>;
