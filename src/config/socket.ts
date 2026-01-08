import {
  type ManagerOptions,
  type Socket,
  type SocketOptions,
  io
} from 'socket.io-client'

export type SocketAuth = Record<string, unknown>

export const SOCKET_NAMESPACES = {
  messages: '/messages',
  conversations: '/conversations',
  users: '/users'
} as const

export type SocketNamespace =
  (typeof SOCKET_NAMESPACES)[keyof typeof SOCKET_NAMESPACES]

export const CLIENT_TO_SERVER_EVENTS = {
  user: {
    onlineListRequest: 'user:online:list:request'
  },

  message: {
    send: 'message:send',
    update: 'message:update',
    delete: 'message:delete'
  }
} as const

export const SERVER_TO_CLIENT_EVENTS = {
  exception: 'exception',

  user: {
    online: 'user:online',
    offline: 'user:offline',
    onlineList: 'user:online:list'
  },

  conversation: {
    new: 'conversation:new',
    deleted: 'conversation:deleted'
  },

  message: {
    new: 'message:new',
    sent: 'message:sent',
    updated: 'message:updated',
    deleted: 'message:deleted'
  }
} as const

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

const resolveNamespaces = () => {
  const raw = import.meta.env.VITE_SOCKET_NAMESPACES as string | undefined

  if (!raw || typeof raw !== 'string') {
    return [SOCKET_NAMESPACES.messages]
  }

  const entries = raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  return entries.length > 0 ? entries : [SOCKET_NAMESPACES.messages]
}

export const normalizeNamespace = (value: string) =>
  value.startsWith('/') ? value : `/${value}`

export const getAllowedNamespaces = () =>
  resolveNamespaces().map(normalizeNamespace)

const resolveNamespace = (namespace?: string) => {
  const namespaces = getAllowedNamespaces()
  const resolved = namespace ? normalizeNamespace(namespace) : namespaces[0]

  if (!resolved || resolved === '/') {
    return '/'
  }

  if (!namespaces.includes(resolved)) {
    throw new Error(`Namespace ${resolved} is not allowed`)
  }

  return resolved
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

export const disconnectSocket = () =>
  socketsByNamespace.forEach((socket) => socket.disconnect())
