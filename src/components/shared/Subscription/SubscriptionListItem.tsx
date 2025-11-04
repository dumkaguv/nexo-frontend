import { useMutation } from '@tanstack/react-query'

import { X } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  type ResponseSubscriptionDto,
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFindAllFollowersInfiniteQueryKey,
  subscriptionControllerFindAllFollowingInfiniteQueryKey,
  subscriptionControllerUnfollowMutation
} from '@/api'
import { AvatarWithColorInitials } from '@/components/shared'
import * as Person from '@/components/shared/Person'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'

import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

type Props = {
  data: ResponseSubscriptionDto
  isFollowersTab?: boolean
}

export const SubscriptionListItem = ({ data, isFollowersTab }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const path = { path: { id: String(user?.id) } }
  const { mutateAsync: unfollowAsync, isPending: isPendingUnfollow } =
    useMutation({
      ...subscriptionControllerUnfollowMutation(),
      onSuccess: async () => {
        await invalidateQueries([
          isFollowersTab
            ? subscriptionControllerFindAllFollowersInfiniteQueryKey(path)
            : subscriptionControllerFindAllFollowingInfiniteQueryKey(path),
          profileControllerMeDetailedQueryKey()
        ])
        toast.success(t('success'))
      },
      onError: (e) => showApiErrors(e)
    })

  const onUnfollow = async () =>
    await unfollowAsync({ path: { id: String(data.user.id) } })

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <AvatarWithColorInitials user={data.user} />

        <div className="flex flex-col items-start">
          <Person.Name name={data.user.profile.fullName} className="text-sm" />
          <Person.Nickname nickname={data.user.username} />
        </div>
      </div>

      <div
        className="flex items-center gap-2"
        onClick={(e) => e.preventDefault()}
      >
        {isFollowersTab ? (
          <Button variant="secondary">{t('sendMessage')}</Button>
        ) : (
          <Button
            variant="secondary"
            onClick={onUnfollow}
            loading={isPendingUnfollow}
          >
            {t('unfollow')}
          </Button>
        )}

        {isFollowersTab && (
          <Tooltip>
            <TooltipContent>{t('unfollow')}</TooltipContent>
            <TooltipTrigger asChild>
              <Button variant="link" className="!p-1">
                <X />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
