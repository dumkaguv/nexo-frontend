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
      getNextPageParam: (response) => response.nextPage
    })

  if (isLoading) {
    return <WhoToFollowListSkeleton />
  }

  const onLoadMore = () => fetchNextPage()

  const users = data.pages.flatMap((page) => page.data)
  const isLoadingButtonState = isFetchingNextPage || isLoading

  return (
    <div className="flex w-full flex-col gap-5">
      <ul className="flex max-h-[270px] w-full flex-col gap-4 overflow-y-auto pr-1.5">
        {users.map((user) => (
          <li key={user.id}>
            <WhoToFollowListItem user={user} />
          </li>
        ))}

        {isFetchingNextPage && (
          <WhoToFollowListSkeleton showLoadMoreButton={false} />
        )}
      </ul>

      <Button
        onClick={onLoadMore}
        hidden={!hasNextPage}
        loading={isLoadingButtonState}
      >
        {t('viewMore')} <ArrowDown />
      </Button>
    </div>
  )
}
