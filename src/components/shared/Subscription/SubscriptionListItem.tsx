import { useMutation } from '@tanstack/react-query'

import { X } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  type ResponseSubscriptionDto,
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFindAllFollowersQueryKey,
  subscriptionControllerFindOneCountQueryKey,
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
import { showApiErrors } from '@/utils'

type Props = {
  data: ResponseSubscriptionDto
  isFollowersTab?: boolean
}

export const SubscriptionListItem = ({ data, isFollowersTab }: Props) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: unfollowAsync, isPending: isPendingUnfollow } =
    useMutation({
      ...subscriptionControllerUnfollowMutation(),
      onSuccess: async () => {
        await invalidateQueries([
          subscriptionControllerFindOneCountQueryKey({
            path: { id: '1' }
          }),
          subscriptionControllerFindAllFollowersQueryKey({ path: { id: '1' } }),
          profileControllerMeDetailedQueryKey()
        ])
        toast.success(t('success'))
      },
      onError: (e) => showApiErrors(e)
    })

  const onUnfollow = async () =>
    await unfollowAsync({ path: { id: String(data.user.id) } })

  const {
    user: { profile }
  } = data

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <AvatarWithColorInitials
          id={data.user.id}
          name={profile.fullName}
          src={profile.avatarUrl}
        />

        <div className="flex flex-col items-start">
          <Person.Name name={profile.fullName} className="text-sm" />
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
