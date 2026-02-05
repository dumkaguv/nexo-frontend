import { useInfiniteQuery } from '@tanstack/react-query'

import { useMemo, type Dispatch, type SetStateAction } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  conversationControllerFindAllConversationMessagesInfiniteOptions,
  type ResponseConversationDto,
  type ResponseMessageDto
} from '@/shared/api'

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

    return allMessages?.filter((message) => {
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
      className="mt-auto flex max-h-[55vh] flex-col-reverse gap-6 overflow-y-auto px-4 py-4 max-lg:px-3 max-lg:py-3 max-md:max-h-[60vh]"
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
