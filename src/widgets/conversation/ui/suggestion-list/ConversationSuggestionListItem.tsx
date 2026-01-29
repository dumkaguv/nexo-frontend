import { Link } from 'react-router-dom'

import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { paths } from '@/shared/config'

import { cn } from '@/shared/lib'

import type { ResponseUserProfileDto } from '@/shared/api'

type Props = {
  suggestion: ResponseUserProfileDto
}

export const ConversationSuggestionListItem = ({ suggestion }: Props) => {
  return (
    <Link to={`${paths.conversations.new}?receiverId=${suggestion.id}`}>
      <div
        className={cn(
          'hover:bg-card-foreground/10 active:bg-card-foreground/15 flex cursor-pointer gap-1.5 rounded-md p-2 duration-200'
        )}
      >
        <UserAvatar
          user={suggestion}
          size={44}
          showOnlineBadge
          className="size-11"
        />

        <div className="flex flex-col items-start">
          <UserFullName
            name={suggestion.profile.fullName}
            className="text-base"
          />
          <UserNickname nickname={suggestion.username} />
        </div>
      </div>
    </Link>
  )
}
