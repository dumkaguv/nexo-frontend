import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  postControllerFindAllLikesInfiniteQueryKey,
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFollowMutation,
  subscriptionControllerUnfollowMutation,
  type ResponsePostLikeDto
} from '@/api'
import { AvatarWithColorInitials } from '@/components/shared'

import * as Person from '@/components/shared/Person'
import { Button } from '@/components/ui'

import { paths } from '@/config'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  like: ResponsePostLikeDto
  postId: number
  onOpenChange?: DialogProps['onOpenChange']
}

export const PostLikesListItem = ({ like, postId, onOpenChange }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const mutationConfig = {
    onSuccess: async () => {
      await invalidateQueries([
        profileControllerMeDetailedQueryKey(),
        postControllerFindAllLikesInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])
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
      <Link
        to={paths.user.byId(like.user.id)}
        onClick={() => onOpenChange?.(false)}
      >
        <div className="flex items-center gap-2">
          <AvatarWithColorInitials user={like.user} size={40} />
          <div className="flex flex-col items-start">
            <Person.Name
              name={like.user.profile?.fullName}
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
        <Button
          variant={like.user.isFollowing ? 'secondary' : 'default'}
          onClick={onToggleFollow}
          loading={isLoadingButtonState}
        >
          {t(like.user.isFollowing ? 'unfollow' : 'follow')}
        </Button>
      )}
    </div>
  )
}
