import { useInfiniteQuery } from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'

import { postControllerFindAllInfiniteOptions } from '@/api'

import { PostCard, PostCardListSkeleton } from './'

export const PostsList = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...postControllerFindAllInfiniteOptions(),
    getNextPageParam: (response) => response.nextPage
  })

  if (isLoading) {
    return <PostCardListSkeleton />
  }

  const posts = data.pages.flatMap(({ data }) => data)

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<PostCardListSkeleton />}
      scrollThreshold={0.9}
    >
      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}
