export interface ListParams {
  pagination: {
    count: number;
    page: number;
  };
  sort?: Record<string, string>;
  search?: string;
  queryParams?: Record<string, string | string[]>;
}
