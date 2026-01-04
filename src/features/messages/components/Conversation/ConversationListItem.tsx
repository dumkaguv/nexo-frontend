import { Link } from 'react-router-dom'

import { AvatarWithColorInitials } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import type { ResponseConversationDto } from '@/api'

type Props = {
  record: ResponseConversationDto
}

export const ConversationListItem = ({ record }: Props) => {
  return (
    <Link to={paths.messages.byId(record.id)}>
      <div className="hover:bg-card-foreground/10 active:bg-card-foreground/15 flex cursor-pointer gap-1.5 rounded-md p-2 duration-200">
        <AvatarWithColorInitials
          user={record.receiver}
          size={44}
          className="size-11"
        />

        <div className="flex flex-col items-start">
          <User.Name
            name={record.receiver.profile.fullName}
            className="text-base"
          />
          <User.Nickname nickname={record.receiver.username} />
        </div>
      </div>
    </Link>
  )
}
