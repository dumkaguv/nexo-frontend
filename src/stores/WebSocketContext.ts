import { createContext } from 'react'

import type { Socket } from 'socket.io-client'

export type WebSocketContextValue = {
  socket: Socket
  isConnected: boolean
  isConnecting: boolean
  lastError: string | null

  connect: () => void
  disconnect: () => void
  emit: Socket['emit']
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null
)
