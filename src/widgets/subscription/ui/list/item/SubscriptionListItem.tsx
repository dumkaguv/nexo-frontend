import { useMutation, useQueryClient } from '@tanstack/react-query'

import { MessageSquareText, X } from 'lucide-react'

import { useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import {
  type ResponseSubscriptionDto,
  conversationControllerFindOneByUserIdOptions,
  profileControllerMeDetailedQueryKey,
  subscriptionControllerFindAllFollowersInfiniteQueryKey,
  subscriptionControllerFindAllFollowingInfiniteQueryKey,
  subscriptionControllerRemoveFollowerMutation,
  subscriptionControllerUnfollowMutation,
  userControllerFindAllInfiniteQueryKey
} from '@/shared/api'

import { paths } from '@/shared/config'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

type Props = {
  data: ResponseSubscriptionDto
  isFollowersTab?: boolean
}

export const SubscriptionListItem = ({ data, isFollowersTab }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const queryClient = useQueryClient()
  const [isFetchingConversation, setIsFetchingConversation] = useState(false)

  const path = { path: { id: String(user?.id) } }
  const invalidateQueriesFunction = async () => {
    await invalidateQueries([
      isFollowersTab
        ? subscriptionControllerFindAllFollowersInfiniteQueryKey(path)
        : subscriptionControllerFindAllFollowingInfiniteQueryKey(path),
      profileControllerMeDetailedQueryKey()
    ])
    void invalidateQueries([userControllerFindAllInfiniteQueryKey()])
  }
  const { mutate: unfollow, isPending: isPendingUnfollow } = useMutation({
    ...subscriptionControllerUnfollowMutation(),
    onSuccess: async () => {
      await invalidateQueriesFunction()
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const { mutate: unfollowFollower, isPending: isPendingUnfollowFollower } =
    useMutation({
      ...subscriptionControllerRemoveFollowerMutation(),
      onSuccess: async () => {
        await invalidateQueriesFunction()
        toast.success(t('success'))
      },
      onError: (e) => showApiErrors(e)
    })

  const onUnfollow = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const path = { id: String(data.user.id) }

    if (isFollowersTab) {
      unfollowFollower({ path })
    } else {
      unfollow({ path })
    }
  }

  const onSendMessage = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setIsFetchingConversation(true)

    try {
      const conversation = await queryClient.fetchQuery({
        ...conversationControllerFindOneByUserIdOptions({
          path: { userId: String(data.user.id) }
        }),
        retry: false
      })

      if (conversation?.data?.id) {
        void navigate(paths.conversations.byId(conversation.data.id))
      } else {
        void navigate(`${paths.conversations.new}?receiverId=${data.user.id}`)
      }
    } catch {
      showApiErrors({})
    } finally {
      setIsFetchingConversation(false)
    }
  }

  const isMine = id ? Number(user?.id) === Number(id) : true

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <UserAvatar user={data.user} />

        <div className="flex flex-col items-start">
          <UserFullName
            name={data.user.profile.fullName}
            className="text-sm max-lg:text-base"
          />
          <UserNickname nickname={data.user.username} />
        </div>
      </div>

      {isMine && (
        <div className="flex items-center gap-2">
          {isFollowersTab ? (
            <Button
              variant="secondary"
              onClick={onSendMessage}
              loading={isFetchingConversation}
            >
              <MessageSquareText className="sm:hidden" />
              <span className="max-sm:hidden">{t('sendMessage')}</span>
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
                <Button
                  variant="link"
                  onClick={onUnfollow}
                  loading={isPendingUnfollowFollower}
                  showChildrenWhenLoading={false}
                  className="p-1!"
                >
                  <X />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  )
}
