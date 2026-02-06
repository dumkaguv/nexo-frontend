import { useInfiniteQuery } from '@tanstack/react-query'

import {
  storyControllerFindAllViewersInfiniteOptions,
  type ResponseStoryDto,
  type ResponseStoryViewerDto,
  type ResponseUserProfileDto
} from '@/shared/api'

type Props = {
  storyId?: number
  searchValue?: string
}

type ViewerRecord = ResponseStoryViewerDto | ResponseStoryDto

const toViewerUsers = (records: ViewerRecord[]) => {
  const map = new Map<number, ResponseUserProfileDto>()

  records.forEach((record) => {
    if (record?.user?.id) {
      map.set(record.user.id, record.user)
    }
  })

  return Array.from(map.values())
}

export const useStoryViewersList = ({ storyId, searchValue }: Props) => {
  const normalizedSearch = searchValue?.trim() || undefined

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...storyControllerFindAllViewersInfiniteOptions({
      path: { id: String(storyId ?? '') },
      query: normalizedSearch ? { search: normalizedSearch } : undefined
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!storyId
  })

  const records = data?.pages.flatMap((page) => page?.data ?? []) ?? []

  return {
    data: toViewerUsers(records as ViewerRecord[]),
    total: data?.pages?.[0]?.total ?? 0,
    isLoading,
    fetchNextPage,
    hasNextPage
  }
}
