/**
 * Pagination arguments
 */
export type Pagination = {
  /**
   * The current page
   */
  page: number;
  /**
   * The number of elements per page
   */
  pageSize: number;
};

/**
 * Generic type for a response that uses pagination
 */
export type Paginated<T> = {
  /**
   * The requested data
   */
  data: T[];
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Pagination parameters
   */
  pagination: Pagination;
};
