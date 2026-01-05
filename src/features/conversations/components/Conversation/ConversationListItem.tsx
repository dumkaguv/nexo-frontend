import { Link, useParams } from 'react-router-dom'

import { AvatarWithColorInitials } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import { cn } from '@/utils'

import type { ResponseConversationDto } from '@/api'

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
        <AvatarWithColorInitials
          user={conversation.receiver}
          size={44}
          className="size-11"
        />

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
