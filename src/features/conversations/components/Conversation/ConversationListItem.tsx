import { Link, useParams } from 'react-router-dom'

import { AvatarWithColorInitials } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { Badge } from '@/components/ui'
import { paths } from '@/config'

import { useOnlineUsersStore } from '@/stores'
import { cn } from '@/utils'

import type { ResponseConversationDto } from '@/api'

type Props = {
  conversation: ResponseConversationDto
}

export const ConversationListItem = ({ conversation }: Props) => {
  const onlineUsers = useOnlineUsersStore((state) => state.onlineUserIds)

  const { id } = useParams()

  const isOnline = onlineUsers.has(conversation.receiver.id)

  return (
    <Link to={paths.conversations.byId(conversation.id)}>
      <div
        className={cn(
          'hover:bg-card-foreground/10 active:bg-card-foreground/15 flex cursor-pointer gap-1.5 rounded-md p-2 duration-200',
          id && Number(id) === conversation.id && 'bg-card-foreground/5'
        )}
      >
        <div>
          <AvatarWithColorInitials
            user={conversation.receiver}
            size={44}
            showOnlineBadge
            className="size-11"
          />
          <Badge asChild className="tabular-nums">
            {isOnline && '●'}
          </Badge>
        </div>

        <div className="flex flex-col items-start">
          <User.Name
            name={conversation.receiver.profile.fullName}
            className="text-base"
          />
          <User.Nickname nickname={conversation.receiver.username} />
        </div>
      </div>
    </Link>
  )
}
