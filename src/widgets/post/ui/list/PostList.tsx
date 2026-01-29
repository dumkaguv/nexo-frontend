import { useInfiniteQuery } from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'

import {
  postsControllerFindAllInfiniteOptions,
  type ResponsePostDto
} from '@/shared/api'

import { PostCard } from './PostCard'
import { PostListSkeleton } from './PostListSkeleton'

type Props = {
  posts?: ResponsePostDto[]
  isLoading?: boolean
}

export const PostList = ({
  posts: postsProps,
  isLoading: isLoadingProps
}: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...postsControllerFindAllInfiniteOptions(),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !postsProps?.length
  })

  const posts = postsProps || data?.pages?.flatMap((page) => page?.data ?? [])

  if (isLoadingProps || isLoading) {
    return <PostListSkeleton />
  }

  return (
    <InfiniteScroll
      dataLength={posts?.length ?? 0}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<PostListSkeleton className="mt-5" />}
      scrollThreshold={0.6}
    >
      <ul className="flex flex-col gap-8">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}
