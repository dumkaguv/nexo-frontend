import { useMutation } from '@tanstack/react-query'
import { Plus, UserCheck } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { toast } from 'sonner'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import {
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFindAllFollowingInfiniteQueryKey,
  subscriptionControllerFollowMutation,
  userControllerFindAllInfiniteQueryKey,
  type ResponseUserDto
} from '@/shared/api'
import { paths } from '@/shared/config'

import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn'

type Props = {
  user: ResponseUserDto
}

export const WhoToFollowListItem = ({ user }: Props) => {
  const { user: userStore } = useAuthStore()

  const { invalidateQueries } = useInvalidatePredicateQueries()
  const { t } = useTranslation()

  const { mutate: followAsync, isPending } = useMutation({
    ...subscriptionControllerFollowMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        profileControllerMeDetailedQueryKey(),
        userControllerFindAllInfiniteQueryKey(),
        subscriptionControllerFindAllFollowingInfiniteQueryKey({
          path: { id: String(userStore?.id) }
        })
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const onFollow = () => followAsync({ path: { id: String(user.id) } })

  return (
    <div className="flex items-center justify-between gap-2">
      <Link to={paths.user.byId(user.id)}>
        <div className="flex items-center gap-1.5">
          <UserAvatar user={user} size={40} className="size-10" />

          <div className="flex flex-col items-start">
            <UserFullName name={user.profile.fullName} className="text-sm" />
            <UserNickname nickname={user.username} className="text-xs" />
          </div>
        </div>
      </Link>

      <Button
        onClick={onFollow}
        loading={isPending}
        disabled={user.isFollowing}
        showChildrenWhenLoading={false}
        aria-label={t(user.isFollowing ? 'unfollow' : 'follow')}
        className="size-8 rounded-full"
      >
        {user.isFollowing ? <UserCheck /> : <Plus />}
      </Button>
    </div>
  )
}
