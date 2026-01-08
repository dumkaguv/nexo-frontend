import { useEffect } from 'react'

import {
  CLIENT_TO_SERVER_EVENTS,
  SERVER_TO_CLIENT_EVENTS,
  SOCKET_NAMESPACES
} from '@/config/socket'
import { useOnlineUsersStore } from '@/stores'

import { useWebSocket } from './useWebSocket'

export const useUsersPresenceSocket = () => {
  const { socket, isConnecting } = useWebSocket(SOCKET_NAMESPACES.users)

  const setOnlineUsers = useOnlineUsersStore((state) => state.setOnlineUsers)
  const setOnline = useOnlineUsersStore((state) => state.setOnline)
  const setOffline = useOnlineUsersStore((state) => state.setOffline)

  useEffect(() => {
    if (isConnecting) {
      return
    }

    const onOnline = (userId: number) => setOnline(userId)
    const onOffline = (userId: number) => setOffline(userId)
    const onOnlineList = (userIds: number[]) => setOnlineUsers(userIds)
    const requestOnlineList = () =>
      socket.emit(CLIENT_TO_SERVER_EVENTS.user.onlineListRequest)

    socket.on(SERVER_TO_CLIENT_EVENTS.user.online, onOnline)
    socket.on(SERVER_TO_CLIENT_EVENTS.user.offline, onOffline)
    socket.on(SERVER_TO_CLIENT_EVENTS.user.onlineList, onOnlineList)
    socket.on('connect', requestOnlineList)

    if (socket.connected) {
      requestOnlineList()
    }

    return () => {
      socket.off(SERVER_TO_CLIENT_EVENTS.user.online, onOnline)
      socket.off(SERVER_TO_CLIENT_EVENTS.user.offline, onOffline)
      socket.off(SERVER_TO_CLIENT_EVENTS.user.onlineList, onOnlineList)
      socket.off('connect', requestOnlineList)
    }
  }, [isConnecting, setOffline, setOnline, setOnlineUsers, socket])
}
