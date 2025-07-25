export type ApiResponse<T = unknown> = {
  status?: number;
  data?: T;
  error?: string;
};
