export type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
  meta?: Record<string, any>;
};
