import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  conversationControllerFindAllConversationMessagesInfiniteQueryKey,
  type PaginatedResponseDto,
  type ResponseConversationDto,
  type ResponseMessageDto
} from '@/api'

import { useWebSocket } from '@/hooks'

import { isWsError } from '@/utils'

import type { WsError } from '@/types'

export type MessagesPage = Omit<PaginatedResponseDto, 'data'> & {
  data?: ResponseMessageDto[]
}

type Props = {
  conversation: ResponseConversationDto | undefined
}

export const useChatWebsocket = ({ conversation }: Props) => {
  const { socket } = useWebSocket()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const onException = useCallback(
    (payload?: unknown) => {
      if (!isWsError(payload)) {
        toast.error(t('error.somethingWentWrong'))

        return
      }

      toast.error(payload.message || t('error.somethingWentWrong'))
    },
    [t]
  )

  useEffect(() => {
    if (!conversation?.id) {
      return
    }

    const queryKey =
      conversationControllerFindAllConversationMessagesInfiniteQueryKey({
        path: { id: String(conversation.id) }
      })

    const addMessageToCache = (
      incomingMessage?: ResponseMessageDto | WsError
    ) =>
      queryClient.setQueryData<InfiniteData<MessagesPage>>(queryKey, (old) => {
        if (!incomingMessage || isWsError(incomingMessage)) {
          onException()

          return old
        }

        if (incomingMessage.conversationId !== conversation.id) {
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

    const onNew = (newMessage?: ResponseMessageDto | WsError) => {
      addMessageToCache(newMessage)
    }

    const onSent = (newMessage?: ResponseMessageDto | WsError) => {
      addMessageToCache(newMessage)
    }

    const onDelete = (dto?: { deletedMessageId?: number } | WsError) => {
      queryClient.setQueryData<InfiniteData<MessagesPage>>(queryKey, (old) => {
        if (!old || isWsError(dto) || !dto?.deletedMessageId) {
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

    const onUpdate = (updatedMessage?: ResponseMessageDto | WsError) => {
      queryClient.setQueryData<InfiniteData<MessagesPage>>(queryKey, (old) => {
        if (!old || !updatedMessage || isWsError(updatedMessage)) {
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

    socket.on('message:new', onNew)
    socket.on('message:sent', onSent)
    socket.on('message:updated', onUpdate)
    socket.on('message:deleted', onDelete)

    return () => {
      socket.off('message:new', onNew)
      socket.off('message:sent', onSent)
      socket.off('message:updated', onUpdate)
      socket.off('message:deleted', onDelete)
    }
  }, [socket, queryClient, conversation?.id, t, onException])
}
