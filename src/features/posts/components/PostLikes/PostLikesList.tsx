import { useInfiniteQuery } from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'

import { postControllerFindAllLikesInfiniteOptions } from '@/api'

import { Card } from '@/components/shared'

import { PostLikesListEmptySearch } from './PostLikesListEmptySearch'
import { PostLikesListItem } from './PostLikesListItem'
import { PostLikesListSkeleton } from './PostLikesListSkeleton'

type Props = {
  postId: number
  search?: string
}

export const PostLikesList = ({ postId, search }: Props) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    ...postControllerFindAllLikesInfiniteOptions({
      path: { id: String(postId) },
      query: { search }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!postId
  })

  const likes = data?.pages?.flatMap(({ data }) => data)

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
        dataLength={data?.pages?.[0].total}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollThreshold={0.9}
        scrollableTarget="liked-users-scrollable-list"
        loader={<PostLikesListSkeleton />}
      >
        <ul className="grid gap-2">
          {likes.map((like) => (
            <li key={like.id}>
              <PostLikesListItem like={like} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </Card>
  )
}
