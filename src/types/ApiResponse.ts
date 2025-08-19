export type ApiResponse<T = unknown> = {
  data?: T
  message?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>
}
