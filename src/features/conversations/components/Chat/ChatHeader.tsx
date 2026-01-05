import { Link } from 'react-router-dom'

import { AvatarWithColorInitials } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import { ChatHeaderMoreActions } from './ChatHeaderMoreActions'

import type { ResponseConversationDto } from '@/api'

type Props = {
  conversation?: ResponseConversationDto
}

export const ChatHeader = ({ conversation }: Props) => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link to={paths.user.byId(Number(conversation?.receiver.id))}>
        <div className="flex items-center gap-3">
          <AvatarWithColorInitials user={conversation?.receiver} size={48} />

          <div className="flex flex-col items-start">
            <User.Name
              name={conversation?.receiver.profile.fullName}
              className="text-base"
            />
            <User.Nickname nickname={conversation?.receiver.username} />
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <ChatHeaderMoreActions />
      </div>
    </header>
  )
}
