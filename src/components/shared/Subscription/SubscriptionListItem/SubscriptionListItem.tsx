import { useMutation, useQuery } from '@tanstack/react-query'

import { X } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {
  type ResponseSubscriptionDto,
  conversationControllerFindOneByUserIdOptions,
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

import { paths } from '@/config'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

import type { MouseEvent } from 'react'

type Props = {
  data: ResponseSubscriptionDto
  isFollowersTab?: boolean
}

export const SubscriptionListItem = ({ data, isFollowersTab }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { refetch: fetchConversation, isFetching } = useQuery({
    ...conversationControllerFindOneByUserIdOptions({
      path: { userId: String(data.user.id) }
    }),
    enabled: false
  })

  const path = { path: { id: String(user?.id) } }
  const { mutate: unfollow, isPending: isPendingUnfollow } = useMutation({
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

  const onUnfollow = (event: MouseEvent) => {
    event.preventDefault()
    unfollow({ path: { id: String(data.user.id) } })
  }

  const onSendMessage = async (event: MouseEvent) => {
    event.preventDefault()

    const { data: conversation } = await fetchConversation()

    if (!conversation?.data.id) {
      void navigate(`${paths.conversations.new}?receiverId=${data.user.id}`)
    } else {
      void navigate(paths.conversations.byId(conversation.data.id))
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <AvatarWithColorInitials user={data.user} />

        <div className="flex flex-col items-start">
          <Person.Name name={data.user.profile.fullName} className="text-sm" />
          <Person.Nickname nickname={data.user.username} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isFollowersTab ? (
          <Button
            variant="secondary"
            onClick={onSendMessage}
            loading={isFetching}
          >
            {t('sendMessage')}
          </Button>
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
              <Button variant="link" onClick={onUnfollow} className="p-1!">
                <X />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
