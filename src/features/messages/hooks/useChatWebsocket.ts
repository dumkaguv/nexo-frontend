import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useEffect } from 'react'

import {
  conversationControllerFindAllConversationMessagesInfiniteQueryKey,
  type PaginatedResponseDto,
  type ResponseConversationDto,
  type ResponseMessageDto
} from '@/api'

import { useWebSocket } from '@/hooks'

type MessagesPage = Omit<PaginatedResponseDto, 'data'> & {
  data?: ResponseMessageDto[]
}

type Props = {
  conversation: ResponseConversationDto | undefined
}

export const useChatWebsocket = ({ conversation }: Props) => {
  const { socket } = useWebSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!conversation?.id) {
      return
    }

    const onSent = (newMessage: ResponseMessageDto) => {
      queryClient.setQueryData<InfiniteData<MessagesPage>>(
        conversationControllerFindAllConversationMessagesInfiniteQueryKey({
          path: { id: String(conversation.id) }
        }),
        (old) => {
          if (!old) {
            return old
          }

          const alreadyExists = old.pages.some(({ data }) =>
            (data ?? []).some(({ id }) => id === newMessage.id)
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
            ({ id }) => id === newMessage.id
          )

          if (isMessageInCache) {
            return old
          }

          const nextFirstPage: MessagesPage = {
            ...firstPage,
            data: [newMessage, ...firstPageData]
          }

          return {
            ...old,
            pages: [nextFirstPage, ...old.pages.slice(1)]
          }
        }
      )
    }

    socket.on('message:sent', onSent)

    return () => {
      socket.off('message:sent', onSent)
    }
  }, [socket, queryClient, conversation?.id])
}
