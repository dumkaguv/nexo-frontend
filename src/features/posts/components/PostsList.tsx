import { useQuery } from '@tanstack/react-query'

import { postControllerFindAllOptions } from '@/api'

import { PostCard, PostCardListSkeleton } from './'

export const PostsList = () => {
  const { data, isPending } = useQuery(postControllerFindAllOptions())

  if (isPending) {
    return <PostCardListSkeleton />
  }

  return (
    <ul className="flex flex-col gap-8">
      {data?.data.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
