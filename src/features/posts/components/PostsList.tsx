import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/config'
import { Api } from '@/services/apiClient'

import { PostCard, PostCardListSkeleton } from './'

export const PostsList = () => {
  const { data: posts, isPending } = useQuery({
    queryKey: [QueryKeys.Users.root],
    queryFn: Api.posts.fetchAllPosts
  })

  if (isPending) {
    return <PostCardListSkeleton />
  }

  return (
    <ul className="flex flex-col gap-8">
      {posts?.data?.map((post) => (
        <li key={post.postId}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
