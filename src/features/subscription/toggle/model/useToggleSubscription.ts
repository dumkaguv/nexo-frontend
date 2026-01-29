import { useMutation, type QueryKey } from '@tanstack/react-query'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFollowMutation,
  subscriptionControllerUnfollowMutation
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks/use-invalidate-queries'
import { showApiErrors } from '@/shared/lib'

type Props = {
  queryKeys?: QueryKey[]
}

export const useToggleSubscription = ({ queryKeys = [] }: Props = {}) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const mutationConfig = {
    onSuccess: async () => {
      await invalidateQueries([
        profileControllerMeDetailedQueryKey(),
        ...queryKeys
      ])
      toast.success(t('success'))
    },
    onError: (e: unknown) => showApiErrors(e)
  }
  const { mutateAsync: follow, isPending: isPendingFollow } = useMutation({
    ...subscriptionControllerFollowMutation(),
    ...mutationConfig
  })

  const { mutateAsync: unfollow, isPending: isPendingUnfollow } = useMutation({
    ...subscriptionControllerUnfollowMutation(),
    ...mutationConfig
  })

  return {
    follow,
    unfollow,
    isPendingFollow,
    isPendingUnfollow
  }
}
