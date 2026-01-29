import { useInfiniteQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import {
  subscriptionControllerFindAllFollowersInfiniteOptions,
  subscriptionControllerFindAllFollowingInfiniteOptions
} from '@/shared/api'

type Props = {
  isFollowersTab?: boolean
  searchValue?: string
}

export const useSubscriptionList = ({ searchValue, isFollowersTab }: Props) => {
  const { user } = useAuthStore()

  const { id: userIdParam } = useParams()

  const userId = userIdParam ? String(userIdParam) : String(user?.id)

  const normalizedSearch = searchValue?.trim() || undefined
  const queryConfig = {
    path: { id: userId },
    query: normalizedSearch ? { search: normalizedSearch } : undefined
  }

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
    ? followers?.pages.flatMap((page) => page?.data ?? [])
    : following?.pages.flatMap((page) => page?.data ?? [])
  const fetchNextPage = isFollowersTab
    ? fetchNextPageFollowers
    : fetchNextPageFollowing
  const hasNextPage = isFollowersTab
    ? hasNextPageFollowers
    : hasNextPageFollowing
  const isLoading = isLoadingFollowers || isLoadingFollowing

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  }
}
