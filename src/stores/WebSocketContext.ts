import { createContext } from 'react'

import type {
  PostWsConversationsEventConversationDeletedResponse,
  PostWsConversationsEventConversationNewResponse,
  PostWsMessagesEventMessageDeletedResponse,
  PostWsMessagesEventMessageNewResponse,
  PostWsMessagesEventMessageSentResponse,
  PostWsMessagesEventMessageUpdatedResponse,
  PostWsMessagesMessageDeleteData,
  PostWsMessagesMessageSendData,
  PostWsMessagesMessageUpdateData,
  PostWsUsersEventUserOfflineResponse,
  PostWsUsersEventUserOnlineListResponse,
  PostWsUsersEventUserOnlineResponse
} from '@/api'
import type { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from '@/config'

import type { WsError } from '@/types'

import type { Socket } from 'socket.io-client'

type ServerToClient = {
  [SERVER_TO_CLIENT_EVENTS.exception]: (error: WsError) => void

  [SERVER_TO_CLIENT_EVENTS.user.online]: (
    payload: PostWsUsersEventUserOnlineResponse
  ) => void
  [SERVER_TO_CLIENT_EVENTS.user.offline]: (
    payload: PostWsUsersEventUserOfflineResponse
  ) => void
  [SERVER_TO_CLIENT_EVENTS.user.onlineList]: (
    payload: PostWsUsersEventUserOnlineListResponse
  ) => void

  [SERVER_TO_CLIENT_EVENTS.conversation.new]: (
    payload: PostWsConversationsEventConversationNewResponse
  ) => void
  [SERVER_TO_CLIENT_EVENTS.conversation.deleted]: (
    payload: PostWsConversationsEventConversationDeletedResponse
  ) => void

  [SERVER_TO_CLIENT_EVENTS.message.new]: (
    payload: PostWsMessagesEventMessageNewResponse
  ) => void
  [SERVER_TO_CLIENT_EVENTS.message.sent]: (
    payload: PostWsMessagesEventMessageSentResponse
  ) => void
  [SERVER_TO_CLIENT_EVENTS.message.updated]: (
    payload: PostWsMessagesEventMessageUpdatedResponse
  ) => void
  [SERVER_TO_CLIENT_EVENTS.message.deleted]: (
    payload: PostWsMessagesEventMessageDeletedResponse
  ) => void
}

type ClientToServer = {
  [CLIENT_TO_SERVER_EVENTS.user.onlineListRequest]: () => void
  [CLIENT_TO_SERVER_EVENTS.message.send]: (
    dto: PostWsMessagesMessageSendData['body']
  ) => void
  [CLIENT_TO_SERVER_EVENTS.message.update]: (
    dto: PostWsMessagesMessageUpdateData['body']
  ) => void
  [CLIENT_TO_SERVER_EVENTS.message.delete]: (
    dto: PostWsMessagesMessageDeleteData['body']
  ) => void
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
