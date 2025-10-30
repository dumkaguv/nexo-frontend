import { useMutation } from '@tanstack/react-query'
import { Plus, UserCheck } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { toast } from 'sonner'

import {
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFollowMutation,
  userControllerFindAllInfiniteQueryKey
} from '@/api'
import { AvatarWithColorInitials } from '@/components/shared'
import * as Person from '@/components/shared/Person'
import { Button } from '@/components/ui'
import { paths } from '@/config'

import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

import type { ResponseUserDto } from '@/api'

type Props = {
  user: ResponseUserDto
}

export const WhoToFollowListItem = ({ user }: Props) => {
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const { t } = useTranslation()

  const { mutateAsync: followAsync, isPending } = useMutation({
    ...subscriptionControllerFollowMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        profileControllerMeDetailedQueryKey(),
        userControllerFindAllInfiniteQueryKey()
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const onFollow = async () =>
    await followAsync({ path: { id: String(user.id) } })

  return (
    <div className="flex items-center justify-between gap-2">
      <Link to={paths.user.byId(user.id)}>
        <div className="flex items-center gap-1.5">
          <AvatarWithColorInitials
            id={user.id}
            name={user.username}
            src={user.profile.avatarUrl}
            size={40}
          />

          <div className="flex flex-col items-start">
            <Person.Name name={user.profile.fullName} className="text-sm" />
            <Person.Nickname nickname={user.username} className="text-xs" />
          </div>
        </div>
      </Link>

      <Button
        onClick={onFollow}
        loading={isPending}
        disabled={user.isFollowing}
        showChildrenWhenLoading={false}
        className="size-8 rounded-full"
      >
        {user.isFollowing ? <UserCheck /> : <Plus />}
      </Button>
    </div>
  )
}
