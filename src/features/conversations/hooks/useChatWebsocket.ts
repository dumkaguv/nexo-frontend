import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  conversationControllerFindAllConversationMessagesInfiniteQueryKey,
  type PaginatedResponseDto,
  type PostWsMessagesEventMessageDeletedResponse,
  type PostWsMessagesEventMessageNewResponse,
  type PostWsMessagesEventMessageSentResponse,
  type PostWsMessagesEventMessageUpdatedResponse,
  type ResponseConversationDto,
  type ResponseMessageDto
} from '@/api'

import { SERVER_TO_CLIENT_EVENTS, SOCKET_NAMESPACES } from '@/config'
import { useInvalidatePredicateQueries, useWebSocket } from '@/hooks'

import { isWsError } from '@/utils'

export type MessagesPage = Omit<PaginatedResponseDto, 'data'> & {
  data?: ResponseMessageDto[]
}

type Props = {
  conversation: ResponseConversationDto | undefined
}

export const useChatWebsocket = ({ conversation }: Props) => {
  const { socket } = useWebSocket(SOCKET_NAMESPACES.messages)
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const queryClient = useQueryClient()

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

  useEffect(() => {
    const queryKey =
      conversationControllerFindAllConversationMessagesInfiniteQueryKey({
        path: { id: String(conversation?.id) }
      })

    const addMessageToCache = (
      incomingMessage?: PostWsMessagesEventMessageNewResponse
    ) =>
      queryClient.setQueryData<InfiniteData<MessagesPage>>(queryKey, (old) => {
        if (!incomingMessage) {
          onException()

          return old
        }

        if (incomingMessage.conversationId !== conversation?.id) {
          return old
        }

        if (!old || old.pages.length === 0) {
          const firstPage: MessagesPage = {
            message: '',
            data: [incomingMessage],
            total: 1,
            page: 1,
            pageSize: 1,
            totalPages: 1,
            nextPage: null,
            prevPage: null
          }

          return { pages: [firstPage], pageParams: [undefined] }
        }

        const alreadyExists = old.pages.some(({ data }) =>
          (data ?? []).some(({ id }) => id === incomingMessage.id)
        )

        if (alreadyExists) {
          return old
        }

        const firstPage = old.pages[0]

        if (!firstPage) {
          return old
        }

        const firstPageData = Array.isArray(firstPage.data)
          ? firstPage.data
          : []

        const isMessageInCache = firstPageData.some(
          ({ id }) => id === incomingMessage.id
        )

        if (isMessageInCache) {
          return old
        }

        const nextFirstPage: MessagesPage = {
          ...firstPage,
          data: [incomingMessage, ...firstPageData],
          total: (firstPage.total ?? 0) + 1
        }

        return {
          ...old,
          pages: [nextFirstPage, ...old.pages.slice(1)]
        }
      })

    const onNew = (newMessage?: PostWsMessagesEventMessageNewResponse) =>
      addMessageToCache(newMessage)

    const onSent = (newMessage?: PostWsMessagesEventMessageSentResponse) =>
      addMessageToCache(newMessage)

    const onDelete = (dto?: PostWsMessagesEventMessageDeletedResponse) => {
      queryClient.setQueryData<InfiniteData<MessagesPage>>(queryKey, (old) => {
        if (!old || !dto?.deletedMessageId) {
          onException()

          return old
        }

        const nextPages = old.pages.map((page) => {
          const data = Array.isArray(page.data) ? page.data : []

          const nextData = data.filter(({ id }) => id !== dto.deletedMessageId)

          if (nextData.length === data.length) {
            return page
          }

          return {
            ...page,
            data: nextData,
            total: page.total ? page.total - 1 : page.total
          }
        })

        const changed = nextPages.some((page, i) => page !== old.pages[i])

        if (!changed) {
          return old
        }

        return {
          ...old,
          pages: nextPages
        }
      })
    }

    const onUpdate = (
      updatedMessage?: PostWsMessagesEventMessageUpdatedResponse
    ) => {
      queryClient.setQueryData<InfiniteData<MessagesPage>>(queryKey, (old) => {
        if (!old || !updatedMessage) {
          onException()

          return old
        }

        const nextPages = old.pages.map((page) => {
          const data = Array.isArray(page.data) ? page.data : []

          let changed = false

          const nextData = data.map((message) => {
            if (message.id === updatedMessage.id) {
              changed = true

              return updatedMessage
            }

            return message
          })

          if (!changed) {
            return page
          }

          return {
            ...page,
            data: nextData
          }
        })

        const changed = nextPages.some((page, i) => page !== old.pages[i])

        if (!changed) {
          return old
        }

        return {
          ...old,
          pages: nextPages
        }
      })
    }

    socket.on(SERVER_TO_CLIENT_EVENTS.message.new, onNew)
    socket.on(SERVER_TO_CLIENT_EVENTS.message.sent, onSent)
    socket.on(SERVER_TO_CLIENT_EVENTS.message.updated, onUpdate)
    socket.on(SERVER_TO_CLIENT_EVENTS.message.deleted, onDelete)
    socket.on(SERVER_TO_CLIENT_EVENTS.exception, onException)

    return () => {
      socket.off(SERVER_TO_CLIENT_EVENTS.message.new, onNew)
      socket.off(SERVER_TO_CLIENT_EVENTS.message.sent, onSent)
      socket.off(SERVER_TO_CLIENT_EVENTS.message.updated, onUpdate)
      socket.off(SERVER_TO_CLIENT_EVENTS.message.deleted, onDelete)
      socket.off(SERVER_TO_CLIENT_EVENTS.exception, onException)
    }
  }, [socket, queryClient, conversation?.id, t, onException, invalidateQueries])
}
