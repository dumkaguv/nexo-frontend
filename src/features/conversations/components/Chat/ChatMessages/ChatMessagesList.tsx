import { useInfiniteQuery } from '@tanstack/react-query'

import { useMemo, type Dispatch, type SetStateAction } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  conversationControllerFindAllConversationMessagesInfiniteOptions,
  type ResponseConversationDto,
  type ResponseMessageDto
} from '@/api'

import { ChatMessagesEmpty } from './ChatMessagesEmpty'
import { ChatMessagesListItem } from './ChatMessagesListItem'
import { ChatMessagesListSkeleton } from './ChatMessagesListSkeleton'

type Props = {
  conversation: ResponseConversationDto | undefined
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const ChatMessagesList = ({
  conversation,
  setEditingMessage
}: Props) => {
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
    const allMessages = messagesResponse?.pages?.flatMap(
      (page) => page?.data ?? []
    )
    const seenIds = new Set<number>()

    return allMessages.filter((message) => {
      if (!message || seenIds.has(message.id)) {
        return false
      }

      seenIds.add(message.id)

      return true
    })
  }, [messagesResponse])

  const isEmpty =
    !!conversation?.id &&
    !isLoadingMessages &&
    (messagesResponse?.pages?.[0]?.total ?? 0) === 0

  if (isEmpty) {
    return <ChatMessagesEmpty />
  }

  if (isLoadingMessages) {
    return <ChatMessagesListSkeleton />
  }

  return (
    <div
      id="messages-scrollable-list"
      className="flex max-h-[65dvh] flex-1 flex-col-reverse gap-6 overflow-y-auto px-4 py-4 sm:max-h-[70dvh] sm:px-6 sm:py-5"
    >
      <InfiniteScroll
        dataLength={messages?.length ?? 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="messages-scrollable-list"
        inverse
        loader={<ChatMessagesListSkeleton count={3} />}
        className="flex flex-col-reverse gap-4 pr-1 sm:pr-2"
      >
        {messages?.map((message) => (
          <ChatMessagesListItem
            key={`${message.id}-${message.senderId}-${message.createdAt}`}
            message={message}
            conversation={conversation}
            setEditingMessage={setEditingMessage}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
