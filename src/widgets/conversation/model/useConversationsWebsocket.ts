import { useCallback, useEffect, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {
  conversationControllerFindAllInfiniteQueryKey,
  conversationControllerFindAllSuggestionsInfiniteQueryKey
} from '@/shared/api'

import { paths } from '@/shared/config'
import { useInvalidatePredicateQueries, useWebSocket } from '@/shared/hooks'

import { isWsError } from '@/shared/lib'
import {
  SOCKET_NAMESPACES,
  SERVER_TO_CLIENT_EVENTS
} from '@/shared/lib/api/socket'

export const useConversationsWebsocket = () => {
  const { socket } = useWebSocket(SOCKET_NAMESPACES.conversations)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const onException = useCallback(
    (payload?: unknown) => {
      if (!isWsError(payload)) {
        toast.error(t('somethingWentWrong'))

        return
      }

      toast.error(payload.message || t('somethingWentWrong'))
    },
    [t]
  )

  const queryKeys = useMemo(
    () => [
      conversationControllerFindAllInfiniteQueryKey(),
      conversationControllerFindAllSuggestionsInfiniteQueryKey()
    ],
    []
  )

  useEffect(() => {
    const onNew = () => void invalidateQueries(queryKeys)

    const onDelete = () => {
      void invalidateQueries(queryKeys)
      void navigate(paths.conversations.root)
    }

    socket.on(SERVER_TO_CLIENT_EVENTS.conversation.new, onNew)
    socket.on(SERVER_TO_CLIENT_EVENTS.conversation.deleted, onDelete)
    socket.on(SERVER_TO_CLIENT_EVENTS.exception, onException)

    return () => {
      socket.off(SERVER_TO_CLIENT_EVENTS.conversation.new, onNew)
      socket.off(SERVER_TO_CLIENT_EVENTS.conversation.deleted, onDelete)
      socket.off(SERVER_TO_CLIENT_EVENTS.exception, onException)
    }
  }, [socket, t, onException, invalidateQueries, queryKeys, navigate])
}
