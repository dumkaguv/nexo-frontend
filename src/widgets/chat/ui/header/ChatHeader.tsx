import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  useOnlineUsersStore,
  UserAvatar,
  UserFullName,
  UserLastActivity,
  UserNickname
} from '@/entities/user'
import { Breakpoints, BreakpointsMax, paths } from '@/shared/config'

import { useMaxWidth } from '@/shared/hooks'

import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn'

import { ChatHeaderMoreActions } from './ChatHeaderMoreActions'

import type { ResponseConversationDto, ResponseUserDto } from '@/shared/api'

type Props = {
  conversation?: ResponseConversationDto
  user?: ResponseUserDto
}

const isConversationDto = (
  data: ResponseConversationDto | ResponseUserDto
): data is ResponseConversationDto => 'receiver' in data

export const ChatHeader = ({ conversation, user }: Props) => {
  const { t } = useTranslation()
  const onlineUserIds = useOnlineUsersStore((state) => state.onlineUserIds)

  const isTablet = useMaxWidth(Breakpoints.lg)
  const isMobile = useMaxWidth(BreakpointsMax.md)
  const isSmall = useMaxWidth(BreakpointsMax.sm)

  const data = conversation ?? user

  if (!data) {
    return null
  }

  const receiver = isConversationDto(data) ? data.receiver : data

  const isOnline = onlineUserIds.has(receiver.id)

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-3 max-md:gap-2 lg:px-6 lg:py-4">
      <div className="flex min-w-0 items-center gap-3 max-lg:gap-2">
        {isMobile && (
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="-ml-1 self-start"
            aria-label={t('back')}
          >
            <Link to={paths.conversations.root}>
              <ArrowLeft />
            </Link>
          </Button>
        )}

        <Link to={paths.user.byId(Number(receiver.id))} className="min-w-0">
          <div className="flex min-w-0 gap-3 max-lg:gap-2">
            {!isSmall && (
              <UserAvatar
                user={receiver}
                showOnlineBadge
                className={cn('size-12', isTablet && 'size-11')}
                size={isTablet ? 44 : 48}
              />
            )}

            <div className="flex min-w-0 flex-col items-start">
              <UserFullName
                name={receiver.profile.fullName}
                className="text-base max-lg:text-base"
              />

              <UserNickname nickname={receiver.username} />

              {!isOnline && <UserLastActivity user={receiver} />}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {isConversationDto(data) && <ChatHeaderMoreActions />}
      </div>
    </header>
  )
}
