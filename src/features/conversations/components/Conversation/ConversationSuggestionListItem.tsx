import { Link } from 'react-router-dom'

import { AvatarWithColorInitials } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import { cn } from '@/utils'

import type { ResponseUserProfileDto } from '@/api'

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
        <AvatarWithColorInitials
          user={suggestion}
          size={44}
          showOnlineBadge
          className="size-11"
        />

        <div className="flex flex-col items-start">
          <User.Name name={suggestion.profile.fullName} className="text-base" />
          <User.Nickname nickname={suggestion.username} />
        </div>
      </div>
    </Link>
  )
}
