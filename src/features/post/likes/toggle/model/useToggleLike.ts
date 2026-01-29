import { useMutation } from '@tanstack/react-query'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postLikesControllerCreateLikeMutation,
  postLikesControllerFindAllLikesQueryKey,
  postLikesControllerRemoveLikeMutation,
  postsControllerFindAllInfiniteQueryKey,
  postsControllerFindAllMyQueryKey
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

type Props = {
  postId: number
  isLiked: boolean | undefined
}

export const useToggleLike = ({ postId, isLiked }: Props) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const path = { id: String(postId) }

  const mutationConfig = {
    onSuccess: async () => {
      void invalidateQueries([
        postLikesControllerFindAllLikesQueryKey({ path })
      ])

      await invalidateQueries([
        postsControllerFindAllInfiniteQueryKey(),
        postsControllerFindAllMyQueryKey()
      ])

      toast.success(t('success'))
    },
    onError: (e: unknown) => showApiErrors(e)
  }

  const { mutateAsync: likeAsync, isPending: isPendingLike } = useMutation({
    ...postLikesControllerCreateLikeMutation(),
    ...mutationConfig
  })

  const { mutateAsync: unlikeAsync, isPending: isPendingUnlike } = useMutation({
    ...postLikesControllerRemoveLikeMutation(),
    ...mutationConfig
  })

  const toggleLike = async () => {
    if (isLiked) {
      await unlikeAsync({ path })
    } else {
      await likeAsync({ path })
    }
  }

  return {
    toggleLike,
    isPending: isPendingLike || isPendingUnlike
  }
}
