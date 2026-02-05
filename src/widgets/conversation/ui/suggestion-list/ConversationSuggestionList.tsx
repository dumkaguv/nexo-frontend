import { cn } from '@/shared/lib'

import { ConversationSuggestionListItem } from './ConversationSuggestionListItem'

import type { ResponseUserProfileDto } from '@/shared/api'
import type { ComponentProps } from 'react'

type Props = {
  suggestions?: ResponseUserProfileDto[]
} & ComponentProps<'div'>

export const ConversationSuggestionList = ({
  suggestions,
  className,
  ...props
}: Props) => {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <ul className="flex flex-col gap-2">
        {suggestions?.map((suggestion) => (
          <li key={suggestion.id}>
            <ConversationSuggestionListItem suggestion={suggestion} />
          </li>
        ))}
      </ul>
    </div>
  )
}
