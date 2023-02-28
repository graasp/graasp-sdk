import { Metric, MetricContext } from './metric';

/**
 * The metrics service allows consumers to initiate and manage monitoring metrics
 * such as performance measurements, profiles, traces, error contexts, etc.
 */
export interface MetricsService {
  /**
   * Store of globally shared metrics
   * (e.g. store key "main" holds the top-level server listen)
   */
  store: Map<string, Metric>;

  /**
   * Start a Metric
   */
  start(context: MetricContext): Metric;
}
