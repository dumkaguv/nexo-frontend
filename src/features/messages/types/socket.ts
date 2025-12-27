import type { CreateMessageDto, ResponseMessageDto } from '@/api'
import type { Socket } from 'socket.io-client'

export const MESSAGE_NAMESPACE = '/messages' as const

export const MESSAGE_EVENTS = {
  SEND: 'message:send'
} as const

export type MessagesClientToServerEvents = {
  [MESSAGE_EVENTS.SEND]: (
    payload: CreateMessageDto,
    callback?: (message: ResponseMessageDto) => void
  ) => void
}

export type MessagesServerToClientEvents = {
  [MESSAGE_EVENTS.SEND]: (message: ResponseMessageDto) => void
}

export type MessagesSocket = Socket<
  MessagesServerToClientEvents,
  MessagesClientToServerEvents
>
