import { useInfiniteQuery } from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'

import {
  postControllerFindAllInfiniteOptions,
  type ResponsePostDto
} from '@/api'

import { PostCard, PostCardListSkeleton } from '@/features/posts/components'

type Props = {
  posts?: ResponsePostDto[]
  isLoading?: boolean
}

export const PostList = ({
  posts: postsProps,
  isLoading: isLoadingProps
}: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...postControllerFindAllInfiniteOptions(),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !postsProps?.length
  })

  const posts = postsProps || data?.pages.flatMap(({ data }) => data)

  if (isLoadingProps || isLoading) {
    return <PostCardListSkeleton />
  }

  return (
    <InfiniteScroll
      dataLength={posts?.length ?? 0}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<PostCardListSkeleton className="mt-5" />}
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
