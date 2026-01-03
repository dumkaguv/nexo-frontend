import {
  type ManagerOptions,
  type Socket,
  type SocketOptions,
  io
} from 'socket.io-client'

export type SocketAuth = Record<string, unknown>

export type SocketInitOptions = {
  url?: string
  namespace?: string
  options?: Partial<ManagerOptions & SocketOptions>
}

const socketsByNamespace = new Map<string, Socket>()
const initializedUrlByNamespace = new Map<string, string>()

const resolveSocketUrl = (url?: string) => {
  const resolved =
    url ?? (import.meta.env.VITE_SOCKET_URL as string | undefined)

  if (!resolved || typeof resolved !== 'string') {
    throw new Error('Missing VITE_SOCKET_URL for Socket.IO client')
  }

  return resolved
}

const resolveNamespace = (namespace?: string) => {
  const envNamespace = import.meta.env.VITE_SOCKET_NAMESPACE as
    | string
    | undefined
  const resolved = namespace ?? envNamespace ?? '/messages'

  if (!resolved || typeof resolved !== 'string') {
    return '/'
  }

  if (resolved === '/') {
    return '/'
  }

  return resolved.startsWith('/') ? resolved : `/${resolved}`
}

export const initSocket = (init?: SocketInitOptions) => {
  const url = resolveSocketUrl(init?.url)
  const namespace = resolveNamespace(init?.namespace)

  const existingSocket = socketsByNamespace.get(namespace)

  if (existingSocket) {
    const initializedUrl = initializedUrlByNamespace.get(namespace)

    if (initializedUrl && initializedUrl !== url) {
      throw new Error(
        `Socket.IO namespace ${namespace} already initialized with a different url: ${initializedUrl}`
      )
    }

    return existingSocket
  }

  initializedUrlByNamespace.set(namespace, url)

  const fullUrl = namespace === '/' ? url : `${url}${namespace}`

  const socket = io(fullUrl, {
    autoConnect: false,
    transports: ['websocket'],
    ...init?.options
  })

  socketsByNamespace.set(namespace, socket)

  return socket
}

export const getSocket = (namespace?: string) => initSocket({ namespace })

export const setSocketAuth = (auth?: SocketAuth, namespace?: string) => {
  const socket = getSocket(namespace)

  socket.auth = auth ?? {}
}

export const connectSocket = (init?: SocketInitOptions) => {
  const socket = initSocket(init)

  if (!socket.connected) {
    socket.connect()
  }

  return socket
}

export const disconnectSocket = () => {
  socketsByNamespace.forEach((socket) => socket.disconnect())
}
