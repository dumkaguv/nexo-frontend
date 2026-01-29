import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postsControllerFindAllInfiniteQueryKey,
  postsControllerFindAllMyQueryKey,
  postsControllerRemoveMutation
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

export const useDeletePost = () => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: deletePost, isPending } = useMutation({
    ...postsControllerRemoveMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        postsControllerFindAllInfiniteQueryKey(),
        postsControllerFindAllMyQueryKey()
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  return {
    deletePost,
    isPending
  }
}
