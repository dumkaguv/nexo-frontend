import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  conversationControllerFindAllConversationMessagesInfiniteOptions,
  type ResponseConversationDto
} from '@/api'

import { ChatMessagesListItem } from './ChatMessagesListItem'

type Props = {
  conversation: ResponseConversationDto | undefined
}

export const ChatMessagesList = ({ conversation }: Props) => {
  const { t } = useTranslation()

  const {
    data: messagesResponse,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingMessages
  } = useInfiniteQuery({
    ...conversationControllerFindAllConversationMessagesInfiniteOptions({
      path: { id: String(conversation?.id) }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!conversation?.id
  })

  const messages = useMemo(() => {
    const allMessages =
      messagesResponse?.pages?.flatMap(({ data }) => data) ?? []
    const seenIds = new Set<number>()

    return allMessages.filter((message) => {
      if (!message || seenIds.has(message.id)) {
        return false
      }

      seenIds.add(message.id)

      return true
    })
  }, [messagesResponse])

  if (isLoadingMessages) {
    return <div>Loading...</div>
  }

  return (
    <div
      id="messages-scrollable-list"
      className="flex max-h-[50dvh] flex-1 flex-col-reverse gap-6 overflow-y-auto px-6 py-5"
    >
      <InfiniteScroll
        dataLength={messages?.length ?? 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="messages-scrollable-list"
        scrollThreshold="180px"
        inverse
        loader={
          <div className="text-muted-foreground py-2 text-center text-sm">
            {t('loading')}...
          </div>
        }
        className="flex flex-col-reverse gap-4 pr-2"
      >
        {messages?.map((message) => (
          <ChatMessagesListItem
            key={`${message.id}-${message.senderId}-${message.createdAt}`}
            message={message}
            conversation={conversation}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
