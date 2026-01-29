import { useMutation } from '@tanstack/react-query'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  postCommentsControllerFindAllCommentsInfiniteQueryKey,
  postCommentsControllerRemoveCommentMutation,
  postsControllerFindAllInfiniteQueryKey
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

type Props = {
  postId: number
}

export const useDeletePostComment = ({ postId }: Props) => {
  const { t } = useTranslation()

  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: deleteComment, isPending } = useMutation({
    ...postCommentsControllerRemoveCommentMutation(),
    onSuccess: async () => {
      void invalidateQueries([postsControllerFindAllInfiniteQueryKey()])

      await invalidateQueries([
        postCommentsControllerFindAllCommentsInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  return {
    deleteComment,
    isPending
  }
}
