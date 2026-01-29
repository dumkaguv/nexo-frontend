import { Link, useParams } from 'react-router-dom'

import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { paths } from '@/shared/config'

import { cn } from '@/shared/lib'

import type { ResponseConversationDto } from '@/shared/api'

type Props = {
  conversation: ResponseConversationDto
}

export const ConversationListItem = ({ conversation }: Props) => {
  const { id } = useParams()

  return (
    <Link to={paths.conversations.byId(conversation.id)}>
      <div
        className={cn(
          'hover:bg-card-foreground/10 active:bg-card-foreground/15 flex cursor-pointer gap-1.5 rounded-md p-2 duration-200',
          id && Number(id) === conversation.id && 'bg-card-foreground/5'
        )}
      >
        <UserAvatar
          user={conversation.receiver}
          size={44}
          showOnlineBadge
          className="size-11"
        />

        <div className="flex flex-col items-start">
          <UserFullName
            name={conversation.receiver.profile.fullName}
            className="text-base"
          />
          <UserNickname nickname={conversation.receiver.username} />
        </div>
      </div>
    </Link>
  )
}
