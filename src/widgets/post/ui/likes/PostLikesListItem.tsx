import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { useToggleSubscription } from '@/features/subscription'
import {
  postLikesControllerFindAllLikesInfiniteQueryKey,
  type ResponsePostLikeDto
} from '@/shared/api'

import { paths } from '@/shared/config'
import { Button } from '@/shared/ui/shadcn'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  like: ResponsePostLikeDto
  postId: number
  onOpenChange?: DialogProps['onOpenChange']
}

export const PostLikesListItem = ({ like, postId, onOpenChange }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()

  const { follow, unfollow, isPendingFollow, isPendingUnfollow } =
    useToggleSubscription({
      queryKeys: [
        postLikesControllerFindAllLikesInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ]
    })

  const onToggleFollow = async () => {
    const path = { id: String(like.user.id) }

    if (like.user.isFollowing) {
      await unfollow({ path })
    } else {
      await follow({ path: { id: String(like.user.id) } })
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
          <UserAvatar user={like.user} size={40} className="size-10" />
          <div className="flex flex-col items-start">
            <UserFullName
              name={like.user.profile?.fullName}
              className="text-base"
            />
            <UserNickname nickname={like.user.username} className="text-xs" />
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
