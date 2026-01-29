import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'

import { getAccessToken, AUTH_TOKEN_CHANGED_EVENT } from '@/shared/lib'

import {
  type SocketAuth,
  getAllowedNamespaces,
  initSocket,
  normalizeNamespace,
  setSocketAuth
} from '@/shared/lib/api/socket'
import { WebSocketContext, type WebSocketNamespaceValue } from '@/shared/model'

type NamespaceState = {
  isConnected: boolean
  isConnecting: boolean
  lastError: string | null
}

type Props = {
  children: ReactNode
  enabled?: boolean
  auth?: SocketAuth
  url?: string
  namespace?: string
  namespaces?: string[]
}

export const WebSocketProvider = ({
  children,
  enabled = true,
  auth,
  url,
  namespace,
  namespaces
}: Props) => {
  const allowedNamespaces = useMemo(() => getAllowedNamespaces(), [])
  const resolvedNamespaces = useMemo(() => {
    let requested = allowedNamespaces

    if (namespace) {
      requested = [namespace]
    }

    if (namespaces && namespaces.length > 0) {
      requested = namespaces
    }

    const normalized = requested.map(normalizeNamespace)
    const unique = [...new Set(normalized)]
    const invalid = unique.filter((value) => !allowedNamespaces.includes(value))

    if (invalid.length > 0) {
      throw new Error(`Unknown namespace(s): ${invalid.join(', ')}`)
    }

    return unique.length > 0 ? unique : allowedNamespaces
  }, [allowedNamespaces, namespace, namespaces])

  const socketsByNamespace = useMemo(
    () =>
      new Map(
        resolvedNamespaces.map((value) => [
          value,
          initSocket({ url, namespace: value })
        ])
      ),
    [resolvedNamespaces, url]
  )

  const [stateByNamespace, setStateByNamespace] = useState<
    Record<string, NamespaceState>
  >(() => {
    const initial: Record<string, NamespaceState> = {}

    socketsByNamespace.forEach((socket, value) => {
      initial[value] = {
        isConnected: socket.connected,
        isConnecting: false,
        lastError: null
      }
    })

    return initial
  })
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessToken()
  )

  const previousTokenRef = useRef<string | null>(null)

  const getDefaultNamespaceState = useCallback(
    (namespaceValue: string): NamespaceState => {
      const socket = socketsByNamespace.get(namespaceValue)

      return {
        isConnected: socket?.connected ?? false,
        isConnecting: false,
        lastError: null
      }
    },
    [socketsByNamespace]
  )

  const updateNamespaceState = useCallback(
    (namespaceValue: string, patch: Partial<NamespaceState>) => {
      setStateByNamespace((prev) => {
        const current =
          prev[namespaceValue] ?? getDefaultNamespaceState(namespaceValue)

        return {
          ...prev,
          [namespaceValue]: {
            ...current,
            ...patch
          }
        }
      })
    },
    [getDefaultNamespaceState]
  )

  const resolvedAuth = useMemo(() => {
    if (auth) {
      return auth
    }

    if (!accessToken) {
      return undefined
    }

    return { token: accessToken } satisfies SocketAuth
  }, [accessToken, auth])

  const connectNamespace = useCallback(
    (namespaceValue: string) => {
      const socket = socketsByNamespace.get(namespaceValue)

      if (!socket || !enabled || !resolvedAuth || socket.connected) {
        return
      }

      updateNamespaceState(namespaceValue, { isConnecting: true })
      try {
        socket.connect()
      } catch (error) {
        updateNamespaceState(namespaceValue, {
          isConnecting: false,
          lastError: error instanceof Error ? error.message : String(error)
        })
      }
    },
    [enabled, resolvedAuth, socketsByNamespace, updateNamespaceState]
  )

  const disconnectNamespace = useCallback(
    (namespaceValue: string) => {
      const socket = socketsByNamespace.get(namespaceValue)

      if (!socket) {
        return
      }

      updateNamespaceState(namespaceValue, { isConnecting: false })
      socket.disconnect()
      updateNamespaceState(namespaceValue, { isConnected: false })
    },
    [socketsByNamespace, updateNamespaceState]
  )

  const connectAll = useCallback(() => {
    resolvedNamespaces.forEach((namespaceValue) =>
      connectNamespace(namespaceValue)
    )
  }, [connectNamespace, resolvedNamespaces])

  const disconnectAll = useCallback(() => {
    resolvedNamespaces.forEach((namespaceValue) =>
      disconnectNamespace(namespaceValue)
    )
  }, [disconnectNamespace, resolvedNamespaces])

  useEffect(() => {
    setStateByNamespace((prev) => {
      const next: Record<string, NamespaceState> = {}

      resolvedNamespaces.forEach((value) => {
        const socket = socketsByNamespace.get(value)

        next[value] = prev[value] ?? {
          isConnected: socket?.connected ?? false,
          isConnecting: false,
          lastError: null
        }
      })

      return next
    })
  }, [resolvedNamespaces, socketsByNamespace])

  useEffect(() => {
    const entries = Array.from(socketsByNamespace.entries())
    const handlers = entries.map(([namespaceValue, socket]) => {
      const onConnect = () => {
        updateNamespaceState(namespaceValue, {
          isConnected: true,
          isConnecting: false,
          lastError: null
        })
      }

      const onDisconnect = () => {
        updateNamespaceState(namespaceValue, {
          isConnected: false,
          isConnecting: false
        })
      }

      const onConnectError = (error: unknown) => {
        updateNamespaceState(namespaceValue, {
          isConnected: false,
          isConnecting: false,
          lastError: error instanceof Error ? error.message : String(error)
        })
      }

      socket.on('connect', onConnect)
      socket.on('disconnect', onDisconnect)
      socket.on('connect_error', onConnectError)

      return { socket, onConnect, onDisconnect, onConnectError }
    })

    return () => {
      handlers.forEach(
        ({ socket, onConnect, onDisconnect, onConnectError }) => {
          socket.off('connect', onConnect)
          socket.off('disconnect', onDisconnect)
          socket.off('connect_error', onConnectError)
        }
      )
    }
  }, [socketsByNamespace, updateNamespaceState])

  useEffect(() => {
    const onTokenChanged = (event: Event) => {
      const token = (event as CustomEvent<string | null>).detail

      setAccessToken(token ?? getAccessToken())
    }

    window.addEventListener(AUTH_TOKEN_CHANGED_EVENT, onTokenChanged)

    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGED_EVENT, onTokenChanged)
    }
  }, [])

  useEffect(() => {
    resolvedNamespaces.forEach((namespaceValue) => {
      setSocketAuth(resolvedAuth, namespaceValue)
    })

    if (!enabled) {
      previousTokenRef.current =
        typeof resolvedAuth?.token === 'string' ? resolvedAuth.token : null

      disconnectAll()

      return
    }

    const nextToken =
      typeof resolvedAuth?.token === 'string' ? resolvedAuth.token : null
    const previousToken = previousTokenRef.current

    previousTokenRef.current = nextToken

    if (!nextToken) {
      disconnectAll()

      return
    }

    connectAll()

    if (previousToken && previousToken !== nextToken) {
      resolvedNamespaces.forEach((namespaceValue) => {
        const socket = socketsByNamespace.get(namespaceValue)

        if (socket?.connected) {
          socket.disconnect()
          socket.connect()
        }
      })
    }
  }, [
    connectAll,
    disconnectAll,
    enabled,
    resolvedAuth,
    resolvedNamespaces,
    socketsByNamespace
  ])

  useEffect(() => {
    return () => {
      disconnectAll()
    }
  }, [disconnectAll])

  const namespaceValues = useMemo(() => {
    const values: Record<string, WebSocketNamespaceValue> = {}

    resolvedNamespaces.forEach((value) => {
      const socket = socketsByNamespace.get(value)

      if (!socket) {
        return
      }

      const state = stateByNamespace[value] ?? {
        isConnected: socket.connected,
        isConnecting: false,
        lastError: null
      }

      values[value] = {
        socket,
        isConnected: state.isConnected,
        isConnecting: state.isConnecting,
        lastError: state.lastError,
        connect: () => connectNamespace(value),
        disconnect: () => disconnectNamespace(value),
        emit: (...args) => socket.emit(...args)
      }
    })

    return values
  }, [
    connectNamespace,
    disconnectNamespace,
    resolvedNamespaces,
    socketsByNamespace,
    stateByNamespace
  ])

  const getSocket = useCallback(
    (value?: string) => {
      const namespaceValue = value
        ? normalizeNamespace(value)
        : resolvedNamespaces[0]

      if (!namespaceValue) {
        throw new Error('No WebSocket namespaces configured')
      }

      const socketValue = namespaceValues[namespaceValue]

      if (!socketValue) {
        throw new Error(`Socket namespace ${namespaceValue} is not initialized`)
      }

      return socketValue
    },
    [namespaceValues, resolvedNamespaces]
  )

  const contextValue = useMemo(
    () => ({
      getSocket,
      namespaces: resolvedNamespaces,
      connectAll,
      disconnectAll
    }),
    [connectAll, disconnectAll, getSocket, resolvedNamespaces]
  )

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  )
}
