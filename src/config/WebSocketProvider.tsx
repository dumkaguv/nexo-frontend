import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'

import { WebSocketContext } from '@/stores'
import { getAccessToken, AUTH_TOKEN_CHANGED_EVENT } from '@/utils'

import { type SocketAuth, initSocket, setSocketAuth } from './socket'

import type { Socket } from 'socket.io-client'

type WebSocketContextValue = {
  socket: Socket
  isConnected: boolean
  isConnecting: boolean
  lastError: string | null

  connect: () => void
  disconnect: () => void
  emit: Socket['emit']
}

type WebSocketProviderProps = {
  children: ReactNode
  enabled?: boolean
  auth?: SocketAuth
  url?: string
  namespace?: string
}

export const WebSocketProvider = ({
  children,
  enabled = true,
  auth,
  url,
  namespace
}: WebSocketProviderProps) => {
  const socket = useMemo(() => initSocket({ url, namespace }), [namespace, url])
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [isConnecting, setIsConnecting] = useState(false)
  const [lastError, setLastError] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessToken()
  )

  const previousTokenRef = useRef<string | null>(null)

  const resolvedAuth = useMemo(() => {
    if (auth) {
      return auth
    }
    if (!accessToken) {
      return undefined
    }

    return { token: accessToken } satisfies SocketAuth
  }, [accessToken, auth])

  const connect = useCallback(() => {
    if (!enabled) {
      return
    }
    if (!resolvedAuth) {
      return
    }
    if (socket.connected) {
      return
    }

    setIsConnecting(true)
    try {
      socket.connect()
    } catch (error) {
      setIsConnecting(false)
      setLastError(error instanceof Error ? error.message : String(error))
    }
  }, [enabled, resolvedAuth, socket])

  const disconnect = useCallback(() => {
    setIsConnecting(false)
    socket.disconnect()
    setIsConnected(false)
  }, [socket])

  useEffect(() => {
    const handleTokenChanged = (event: Event) => {
      const token = (event as CustomEvent<string | null>).detail

      setAccessToken(token ?? getAccessToken())
    }

    window.addEventListener(AUTH_TOKEN_CHANGED_EVENT, handleTokenChanged)

    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGED_EVENT, handleTokenChanged)
    }
  }, [])

  useEffect(() => {
    setSocketAuth(resolvedAuth, namespace)

    if (!enabled) {
      previousTokenRef.current =
        typeof resolvedAuth?.token === 'string' ? resolvedAuth.token : null

      disconnect()

      return
    }

    const nextToken =
      typeof resolvedAuth?.token === 'string' ? resolvedAuth.token : null
    const previousToken = previousTokenRef.current

    previousTokenRef.current = nextToken

    if (!nextToken) {
      disconnect()

      return
    }

    connect()

    if (socket.connected && previousToken && previousToken !== nextToken) {
      socket.disconnect()
      socket.connect()
    }
  }, [connect, disconnect, enabled, namespace, resolvedAuth, socket])

  useEffect(() => () => disconnect(), [disconnect])

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true)
      setIsConnecting(false)
      setLastError(null)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      setIsConnecting(false)
    }

    const handleConnectError = (error: unknown) => {
      setIsConnected(false)
      setIsConnecting(false)
      setLastError(error instanceof Error ? error.message : String(error))
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
    }
  }, [socket])

  const emit: Socket['emit'] = useCallback(
    (...args) => socket.emit(...args),
    [socket]
  )

  const value: WebSocketContextValue = useMemo(
    () => ({
      socket,
      isConnected,
      isConnecting,
      lastError,
      connect,
      disconnect,
      emit
    }),
    [connect, disconnect, emit, isConnected, isConnecting, lastError, socket]
  )

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}
