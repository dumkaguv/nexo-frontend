import { useInfiniteQuery } from '@tanstack/react-query'

import { Ellipsis } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { postCommentsControllerFindAllCommentsInfiniteOptions } from '@/shared/api'

import { Button } from '@/shared/ui/shadcn'

import { PostCommentListSkeleton } from './PostCommentListSkeleton'
import { PostCommentsListItem } from './PostCommentsListItem'

type Props = {
  postId: number
}

export const PostCommentList = ({ postId }: Props) => {
  const { t } = useTranslation()

  const {
    data: allData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    ...postCommentsControllerFindAllCommentsInfiniteOptions({
      path: { id: String(postId) },
      query: { pageSize: 3 }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!postId
  })

  const data = allData?.pages.flatMap((page) => page?.data ?? [])
  const totalComments = allData?.pages?.[0].total

  const onFetchMore = () => fetchNextPage()

  if (isLoading) {
    return <PostCommentListSkeleton />
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
