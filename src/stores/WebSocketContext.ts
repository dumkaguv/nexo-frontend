import { createContext } from 'react'

import type {
  CreateMessageDto,
  ResponseConversationDto,
  ResponseMessageDto,
  UpdateMessageDto
} from '@/api'
import type { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from '@/config'

import type { WsError } from '@/types'

import type { Socket } from 'socket.io-client'

type ServerToClient = {
  [SERVER_TO_CLIENT_EVENTS.exception]: (error: WsError) => void

  [SERVER_TO_CLIENT_EVENTS.user.online]: (userId: number) => void
  [SERVER_TO_CLIENT_EVENTS.user.offline]: (userId: number) => void
  [SERVER_TO_CLIENT_EVENTS.user.onlineList]: (userIds: number[]) => void

  [SERVER_TO_CLIENT_EVENTS.conversation.new]: (
    dto?: ResponseConversationDto
  ) => void
  [SERVER_TO_CLIENT_EVENTS.conversation.deleted]: (dto?: {
    deletedConversationId?: number
  }) => void

  [SERVER_TO_CLIENT_EVENTS.message.new]: (dto?: ResponseMessageDto) => void
  [SERVER_TO_CLIENT_EVENTS.message.sent]: (dto?: ResponseMessageDto) => void
  [SERVER_TO_CLIENT_EVENTS.message.updated]: (dto?: ResponseMessageDto) => void
  [SERVER_TO_CLIENT_EVENTS.message.deleted]: (dto?: {
    deletedMessageId: number
  }) => void
}

type ClientToServer = {
  [CLIENT_TO_SERVER_EVENTS.user.onlineListRequest]: () => void
  [CLIENT_TO_SERVER_EVENTS.message.send]: (dto: CreateMessageDto) => void
  [CLIENT_TO_SERVER_EVENTS.message.update]: (dto: UpdateMessageDto) => void
  [CLIENT_TO_SERVER_EVENTS.message.delete]: (dto: { id: number }) => void
}

export type WebSocketNamespaceValue = {
  socket: Socket<ServerToClient, ClientToServer>
  isConnected: boolean
  isConnecting: boolean
  lastError: string | null

  connect: () => void
  disconnect: () => void
  emit: Socket<ServerToClient, ClientToServer>['emit']
}

export type WebSocketContextValue = {
  getSocket: (namespace?: string) => WebSocketNamespaceValue
  namespaces: string[]
  connectAll: () => void
  disconnectAll: () => void
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null
)
