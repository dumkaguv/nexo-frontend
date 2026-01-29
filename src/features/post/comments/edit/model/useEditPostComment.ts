import { useMutation } from '@tanstack/react-query'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postCommentsControllerFindAllCommentsInfiniteQueryKey,
  postCommentsControllerUpdateCommentMutation,
  postsControllerFindAllInfiniteQueryKey
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

type Props = {
  postId: number
  onSuccessCallback?: () => void
}

export const useEditPostComment = ({ postId, onSuccessCallback }: Props) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: updateComment, isPending } = useMutation({
    ...postCommentsControllerUpdateCommentMutation(),
    onSuccess: async () => {
      void invalidateQueries([postsControllerFindAllInfiniteQueryKey()])
      await invalidateQueries([
        postCommentsControllerFindAllCommentsInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])
      toast.success(t('success'))
      onSuccessCallback?.()
    },
    onError: (e) => showApiErrors(e)
  })

  return {
    updateComment,
    isPending
  }
}
