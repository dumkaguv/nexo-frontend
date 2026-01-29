import { useMutation } from '@tanstack/react-query'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  postCommentsControllerCreateCommentMutation,
  postCommentsControllerFindAllCommentsInfiniteQueryKey,
  postsControllerFindAllInfiniteQueryKey,
  postsControllerFindAllMyQueryKey
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

type Props = {
  postId: number
  onSuccessCallback?: () => void
}

export const useCreatePostComment = ({ postId, onSuccessCallback }: Props) => {
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const { t } = useTranslation()

  const { mutateAsync: createComment, isPending } = useMutation({
    ...postCommentsControllerCreateCommentMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        postCommentsControllerFindAllCommentsInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])

      void invalidateQueries([
        postsControllerFindAllInfiniteQueryKey(),
        postsControllerFindAllMyQueryKey()
      ])

      toast.success(t('success'))

      onSuccessCallback?.()
    },
    onError: (e) => showApiErrors(e)
  })

  return {
    createComment,
    isPending
  }
}
