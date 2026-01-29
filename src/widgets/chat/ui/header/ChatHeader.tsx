import { Link } from 'react-router-dom'

import {
  useOnlineUsersStore,
  UserAvatar,
  UserFullName,
  UserLastActivity,
  UserNickname
} from '@/entities/user'
import { paths } from '@/shared/config'

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
  const onlineUserIds = useOnlineUsersStore((state) => state.onlineUserIds)

  const data = conversation ?? user

  if (!data) {
    return null
  }

  const receiver = isConversationDto(data) ? data.receiver : data

  const isOnline = onlineUserIds.has(receiver.id)

  return (
    <header className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
      <Link to={paths.user.byId(Number(receiver.id))}>
        <div className="flex items-center gap-3">
          <UserAvatar
            user={receiver}
            showOnlineBadge
            className="size-12"
            size={48}
          />

          <div className="flex flex-col items-start">
            <UserFullName
              name={receiver.profile.fullName}
              className="text-base"
            />

            <UserNickname nickname={receiver.username} />

            {!isOnline && <UserLastActivity user={receiver} />}
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        {isConversationDto(data) && <ChatHeaderMoreActions />}
      </div>
    </header>
  )
}
