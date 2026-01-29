import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

import { paths } from '@/shared/config'
import { Card } from '@/shared/ui'

import { useSubscriptionList } from '@/widgets/subscription/model/'

import { SubscriptionListEmpty } from './empty'
import { SubscriptionListEmptySearch } from './empty-search'
import { SubscriptionListItem } from './item'
import { SubscriptionListSkeleton } from './skeleton'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  isFollowersTab?: boolean
  searchValue?: string
  onOpenChange?: DialogProps['onOpenChange']
}

export const SubscriptionList = ({
  searchValue,
  onOpenChange,
  isFollowersTab = true
}: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useSubscriptionList({
    isFollowersTab,
    searchValue
  })

  if (isLoading) {
    return (
      <Card>
        <SubscriptionListSkeleton />
      </Card>
    )
  }

  if (searchValue && data?.length === 0 && !isLoading) {
    return <SubscriptionListEmptySearch />
  }

  if (data?.length === 0 && !isLoading) {
    return <SubscriptionListEmpty isFollowersTab={isFollowersTab} />
  }

  return (
    <Card id="users-scrollable-list" className="max-h-[60dvh] overflow-y-auto">
      <InfiniteScroll
        dataLength={data?.length ?? 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="users-scrollable-list"
        scrollThreshold={0.65}
        loader={<SubscriptionListSkeleton count={3} className="mt-5" />}
      >
        <ul className="flex flex-col gap-4">
          {data?.map((record) => (
            <Link
              key={record.user.id}
              to={paths.user.byId(record.user.id)}
              onClick={() => onOpenChange?.(false)}
              className="hover:cursor-pointer"
            >
              <SubscriptionListItem
                data={record}
                isFollowersTab={isFollowersTab}
              />
            </Link>
          ))}
        </ul>
      </InfiniteScroll>
    </Card>
  )
}
