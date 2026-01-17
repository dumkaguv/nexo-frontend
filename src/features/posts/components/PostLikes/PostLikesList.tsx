import { useInfiniteQuery } from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'

import { postControllerFindAllLikesInfiniteOptions } from '@/api'

import { Card } from '@/components/shared'

import { PostLikesListEmptySearch } from './PostLikesListEmptySearch'
import { PostLikesListItem } from './PostLikesListItem'
import { PostLikesListSkeleton } from './PostLikesListSkeleton'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  postId: number
  search?: string
  onOpenChange?: DialogProps['onOpenChange']
}

export const PostLikesList = ({ postId, search, onOpenChange }: Props) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    ...postControllerFindAllLikesInfiniteOptions({
      path: { id: String(postId) },
      query: { search }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!postId
  })

  const likes = data?.pages?.flatMap((page) => page?.data ?? [])

  const isEmptySearchResult =
    data?.pages?.[0].total === 0 && !isLoading && search

  if (isEmptySearchResult) {
    return <PostLikesListEmptySearch />
  }

  if (isLoading) {
    return <PostLikesListSkeleton />
  }

  return (
    <Card id="liked-users-scrollable-list">
      <InfiniteScroll
        dataLength={data?.pages?.[0]?.total ?? 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollThreshold={0.9}
        scrollableTarget="liked-users-scrollable-list"
        loader={<PostLikesListSkeleton />}
      >
        <ul className="grid gap-4">
          {likes.map((like) => (
            <li key={like.id}>
              <PostLikesListItem
                like={like}
                postId={postId}
                onOpenChange={onOpenChange}
              />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </Card>
  )
}
