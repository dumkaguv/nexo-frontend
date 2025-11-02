import { useInfiniteQuery } from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, useParams } from 'react-router-dom'

import {
  subscriptionControllerFindAllFollowersInfiniteOptions,
  subscriptionControllerFindAllFollowingInfiniteOptions
} from '@/api'

import { Card } from '@/components/shared'
import { paths } from '@/config'
import { useAuthStore } from '@/stores'

import { SubscriptionListEmpty } from './SubscriptionListEmpty'
import { SubscriptionListEmptySearch } from './SubscriptionListEmptySearch'
import { SubscriptionListItem } from './SubscriptionListItem'
import { SubscriptionListSkeleton } from './SubscriptionListSkeleton'

type Props = {
  isFollowersTab?: boolean
  searchValue?: string
}

export const SubscriptionList = ({
  searchValue,
  isFollowersTab = true
}: Props) => {
  const { user } = useAuthStore()

  const { id: userIdParam } = useParams()

  const userId = userIdParam ? String(userIdParam) : String(user?.id)
  const queryConfig = { path: { id: userId }, query: { search: searchValue } }

  const {
    data: followers,
    isLoading: isLoadingFollowers,
    fetchNextPage: fetchNextPageFollowers,
    hasNextPage: hasNextPageFollowers
  } = useInfiniteQuery({
    ...subscriptionControllerFindAllFollowersInfiniteOptions(queryConfig),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: isFollowersTab
  })

  const {
    data: following,
    isLoading: isLoadingFollowing,
    fetchNextPage: fetchNextPageFollowing,
    hasNextPage: hasNextPageFollowing
  } = useInfiniteQuery({
    ...subscriptionControllerFindAllFollowingInfiniteOptions(queryConfig),
    getNextPageParam: (response) => response.nextPage,
    enabled: !isFollowersTab
  })

  const data = isFollowersTab
    ? followers?.pages.flatMap(({ data }) => data)
    : following?.pages.flatMap(({ data }) => data)
  const fetchNextPage = isFollowersTab
    ? fetchNextPageFollowers
    : fetchNextPageFollowing
  const hasNextPage = isFollowersTab
    ? hasNextPageFollowers
    : hasNextPageFollowing
  const isLoading = isLoadingFollowers || isLoadingFollowing

  if (isLoading) {
    return (
      <Card>
        <SubscriptionListSkeleton />
      </Card>
    )
  }

  if (searchValue && data.length === 0 && !isLoading) {
    return <SubscriptionListEmptySearch />
  }

  if (data.length === 0 && !isLoading) {
    return <SubscriptionListEmpty isFollowersTab={isFollowersTab} />
  }

  return (
    <Card id="users-scrollable-list" className="max-h-[60dvh] overflow-y-auto">
      <InfiniteScroll
        dataLength={data.length}
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
