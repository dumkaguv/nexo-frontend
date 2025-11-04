import { useInfiniteQuery } from '@tanstack/react-query'

import { Ellipsis } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { postControllerFindAllCommentsInfiniteOptions } from '@/api'

import { Button } from '@/components/ui'

import { PostCommentsListItem } from './PostCommentsListItem'

import { PostCommentsListSkeleton } from './PostCommentsListSkeleton'

type Props = {
  postId: number
}

export const PostCommentsList = ({ postId }: Props) => {
  const { t } = useTranslation()

  const {
    data: allData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    ...postControllerFindAllCommentsInfiniteOptions({
      path: { id: String(postId) },
      query: { pageSize: 3 }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!postId
  })

  const data = allData?.pages.flatMap(({ data }) => data)
  const totalComments = allData?.pages?.[0].total

  const onFetchMore = () => fetchNextPage()

  if (isLoading) {
    return <PostCommentsListSkeleton />
  }

  return (
    <div className="flex flex-col gap-5">
      <ul className="grid gap-5">
        {data?.map((comment) => (
          <li key={comment.id}>
            <PostCommentsListItem comment={comment} postId={postId} />
          </li>
        ))}
      </ul>

      {totalComments > data?.length && (
        <Button
          variant="ghost"
          onClick={onFetchMore}
          loading={isLoading || isFetchingNextPage}
          className="w-fit justify-start"
        >
          <Ellipsis /> {t('viewMore')}
        </Button>
      )}
    </div>
  )
}
