import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import InfiniteScroll from 'react-infinite-scroll-component'

import { conversationControllerFindAllInfiniteOptions } from '@/api'
import { InputSearch, Typography } from '@/components/shared'
import { Badge, Separator, Sidebar as SidebarUi } from '@/components/ui'

import { ConversationList } from './Conversation'
import { ConversationListSkeleton } from './Conversation/ConversationListSkeleton'

export const Sidebar = () => {
  const { t } = useTranslation()

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...conversationControllerFindAllInfiniteOptions(),
    getNextPageParam: ({ nextPage }) => nextPage
  })

  const conversations = data?.pages.flatMap(({ data }) => data)

  return (
    <SidebarUi className="w-full max-w-92.5" bodyClassName="items-start">
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center gap-2">
          <Typography.Title level={3} className="text-base">
            {t('activeChats')}
          </Typography.Title>
          <Badge
            variant="outline"
            className="border-0 bg-green-50 text-green-500"
          >
            {data?.pages?.[0]?.total}
          </Badge>
        </div>

        <Separator className="-ml-5 w-[calc(100%+40px)]!" />

        <InputSearch disabled={isLoading} />

        {isLoading ? (
          <ConversationListSkeleton />
        ) : (
          <div
            id="conversations-scrollable-list"
            className="max-h-[60dvh] overflow-y-auto"
          >
            <InfiniteScroll
              dataLength={conversations?.length ?? 0}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              scrollableTarget="conversations-scrollable-list"
              scrollThreshold={0.65}
              loader={<ConversationListSkeleton count={3} className="mt-5" />}
            >
              <ConversationList conversations={conversations} />
            </InfiniteScroll>
          </div>
        )}
      </div>
    </SidebarUi>
  )
}
