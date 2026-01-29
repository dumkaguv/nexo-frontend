import { useContext } from 'react'

import { WebSocketContext, type WebSocketNamespaceValue } from '@/shared/model'

import type { SocketNamespace } from '@/shared/lib/api/socket'

export type WebSocketDefaultValue = WebSocketNamespaceValue & {
  connect: () => void
  disconnect: () => void
  namespaces: string[]
}

type WebSocketResult<Namespace extends SocketNamespace | undefined> =
  Namespace extends SocketNamespace
    ? WebSocketNamespaceValue
    : WebSocketDefaultValue

export const useWebSocket = <Namespace extends SocketNamespace | undefined>(
  namespace?: Namespace
): WebSocketResult<Namespace> => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider')
  }

  if (namespace) {
    return context.getSocket(namespace) as WebSocketResult<Namespace>
  }

  const socketValue = context.getSocket()

  return {
    ...socketValue,
    connect: context.connectAll,
    disconnect: context.disconnectAll,
    namespaces: context.namespaces
  } as WebSocketResult<Namespace>
}
