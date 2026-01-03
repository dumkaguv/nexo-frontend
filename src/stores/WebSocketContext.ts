import { createContext } from 'react'

import type { CreateMessageDto, ResponseMessageDto } from '@/api'

import type { Socket } from 'socket.io-client'

type ServerToClient = {
  'message:new': (msg: ResponseMessageDto) => void
  'message:sent': (msg: ResponseMessageDto) => void
}

type ClientToServer = {
  'message:send': (dto: CreateMessageDto) => void
}

export type WebSocketContextValue = {
  socket: Socket<ServerToClient, ClientToServer>
  isConnected: boolean
  isConnecting: boolean
  lastError: string | null

  connect: () => void
  disconnect: () => void
  emit: Socket<ServerToClient, ClientToServer>['emit']
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null
)
