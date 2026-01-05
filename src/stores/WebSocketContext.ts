import { createContext } from 'react'

import type {
  CreateMessageDto,
  ResponseMessageDto,
  UpdateMessageDto
} from '@/api'
import type { WsError } from '@/types'

import type { Socket } from 'socket.io-client'

type ServerToClient = {
  'message:new': (dto?: ResponseMessageDto | WsError) => void
  'message:sent': (dto?: ResponseMessageDto | WsError) => void
  'message:updated': (dto?: ResponseMessageDto | WsError) => void
  'message:deleted': (dto?: { deletedMessageId: number } | WsError) => void
}

type ClientToServer = {
  'message:send': (dto: CreateMessageDto) => void
  'message:update': (dto: UpdateMessageDto) => void
  'message:delete': (dto: { id: number }) => void
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
