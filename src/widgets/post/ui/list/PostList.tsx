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
  disableInfinite?: boolean
}

export const PostList = ({
  posts: postsProps,
  isLoading: isLoadingProps,
  disableInfinite
}: Props) => {
  const shouldUseInfinite = !disableInfinite && !postsProps?.length
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...postsControllerFindAllInfiniteOptions(),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: shouldUseInfinite
  })

  const posts =
    postsProps ||
    (shouldUseInfinite ? data?.pages?.flatMap((page) => page?.data ?? []) : [])

  if (isLoadingProps || (shouldUseInfinite && isLoading)) {
    return <PostListSkeleton />
  }

  if (disableInfinite) {
    return (
      <ul className="flex flex-col gap-8 max-lg:gap-6">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <InfiniteScroll
      dataLength={posts?.length ?? 0}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<PostListSkeleton className="mt-5" />}
      scrollThreshold={0.6}
    >
      <ul className="flex flex-col gap-8 max-lg:gap-6">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}
