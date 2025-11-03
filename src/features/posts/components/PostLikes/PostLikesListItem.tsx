import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFollowMutation,
  subscriptionControllerUnfollowMutation
} from '@/api'
import { AvatarWithColorInitials } from '@/components/shared'

import * as Person from '@/components/shared/Person'
import { Button } from '@/components/ui'

import { paths } from '@/config'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

import type { ResponsePostLikeDto } from '@/api'

type Props = {
  like: ResponsePostLikeDto
}

export const PostLikesListItem = ({ like }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const mutationConfig = {
    onSuccess: async () => {
      await invalidateQueries([profileControllerMeDetailedQueryKey()])
      toast.success(t('success'))
    },
    onError: (e: unknown) => showApiErrors(e)
  }
  const { mutateAsync: followAsync, isPending: isPendingFollow } = useMutation({
    ...subscriptionControllerFollowMutation(),
    ...mutationConfig
  })

  const { mutateAsync: unfollowAsync, isPending: isPendingUnfollow } =
    useMutation({
      ...subscriptionControllerUnfollowMutation(),
      ...mutationConfig
    })

  const onToggleFollow = async () => {
    const path = { id: String(like.user.id) }

    if (like.user.isFollowing) {
      await unfollowAsync({ path })
    } else {
      await followAsync({ path: { id: String(like.user.id) } })
    }
  }

  const isMe = like.user.id === user?.id
  const isLoadingButtonState = isPendingFollow || isPendingUnfollow

  return (
    <div className="flex items-center justify-between gap-5">
      <Link to={paths.user.byId(like.user.id)}>
        <div className="flex items-center gap-2">
          <AvatarWithColorInitials
            name={like.user.profile.fullName}
            id={like.id}
            size={40}
            src={like.user.profile.avatarUrl}
          />
          <div className="flex flex-col items-start">
            <Person.Name
              name={like.user.profile.fullName}
              className="text-base"
            />
            <Person.Nickname
              nickname={like.user.username}
              className="text-xs"
            />
          </div>
        </div>
      </Link>

      {!isMe && (
        <Button onClick={onToggleFollow} loading={isLoadingButtonState}>
          {t(like.user.isFollowing ? 'unfollow' : 'follow')}
        </Button>
      )}
    </div>
  )
}
