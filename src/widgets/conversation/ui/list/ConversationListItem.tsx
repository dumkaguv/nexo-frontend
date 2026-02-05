import { Link, useParams } from 'react-router-dom'

import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { Breakpoints, paths } from '@/shared/config'

import { useMaxWidth } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import type { ResponseConversationDto } from '@/shared/api'

type Props = {
  conversation: ResponseConversationDto
}

export const ConversationListItem = ({ conversation }: Props) => {
  const { id } = useParams()
  const isTablet = useMaxWidth(Breakpoints.lg)

  return (
    <Link to={paths.conversations.byId(conversation.id)}>
      <div
        className={cn(
          'hover:bg-card-foreground/10 active:bg-card-foreground/15 flex cursor-pointer gap-1.5 rounded-md p-2 duration-200 max-md:p-1',
          id && Number(id) === conversation.id && 'bg-card-foreground/5'
        )}
      >
        <UserAvatar
          user={conversation.receiver}
          size={isTablet ? 40 : 44}
          showOnlineBadge
          className="size-11 max-lg:size-10"
        />

        <div className="flex flex-col items-start">
          <UserFullName
            name={conversation.receiver.profile.fullName}
            className="text-base max-lg:text-base"
          />
          <UserNickname nickname={conversation.receiver.username} />
        </div>
      </div>
    </Link>
  )
}
