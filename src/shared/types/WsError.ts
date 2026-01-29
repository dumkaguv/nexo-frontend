export type WsError = {
  status: 'error'
  message: string
  cause?: {
    pattern?: string
    data?: unknown
  }
}
