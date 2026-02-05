import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  storyControllerFindAllByUserIdQueryKey,
  storyControllerFindAllQueryKey,
  storyControllerRemoveMutation
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

type Props = {
  userId?: number
}

export const useDeleteStory = ({ userId }: Props = {}) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: deleteStory, isPending } = useMutation({
    ...storyControllerRemoveMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        storyControllerFindAllQueryKey({ query: { ordering: '-createdAt' } }),
        ...(userId
          ? [
              storyControllerFindAllByUserIdQueryKey({
                path: { userId: String(userId) },
                query: { ordering: '-createdAt' }
              })
            ]
          : [])
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  return {
    deleteStory,
    isPending
  }
}
