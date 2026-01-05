import { ConversationSuggestionListItem } from './ConversationSuggestionListItem'

import type { ResponseUserProfileDto } from '@/api'

type Props = {
  suggestions?: ResponseUserProfileDto[]
}

export const ConversationSuggestionList = ({ suggestions }: Props) => {
  return (
    <div className="flex flex-col gap-5">
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
