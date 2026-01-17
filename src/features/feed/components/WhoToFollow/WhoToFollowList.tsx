import { useInfiniteQuery } from '@tanstack/react-query'

import { ArrowDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { userControllerFindAllInfiniteOptions } from '@/api'

import { Button } from '@/components/ui'

import { WhoToFollowListItem } from './WhoToFollowListItem'
import { WhoToFollowListSkeleton } from './WhoToFollowListSkeleton'

export const WhoToFollowList = () => {
  const { t } = useTranslation()

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      ...userControllerFindAllInfiniteOptions({ query: { pageSize: 5 } }),
      getNextPageParam: ({ nextPage }) => nextPage
    })

  const onLoadMore = () => fetchNextPage()

  const users = data?.pages.flatMap((page) => page?.data ?? [])
  const isLoadingButtonState = isFetchingNextPage || isLoading

  if (isLoading) {
    return <WhoToFollowListSkeleton />
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <ul className="flex max-h-67.5 w-full flex-col gap-4 overflow-y-auto pr-1.5">
        {users?.map((user) => (
          <li key={user.id}>
            <WhoToFollowListItem user={user} />
          </li>
        ))}

        {isFetchingNextPage && (
          <WhoToFollowListSkeleton showLoadMoreButton={false} />
        )}
      </ul>

      {hasNextPage && (
        <Button onClick={onLoadMore} loading={isLoadingButtonState}>
          {t('viewMore')} <ArrowDown />
        </Button>
      )}
    </div>
  )
}
