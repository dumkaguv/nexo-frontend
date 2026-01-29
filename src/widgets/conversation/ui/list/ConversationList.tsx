import { ConversationListItem } from './ConversationListItem'

import type { ResponseConversationDto } from '@/shared/api'

type Props = {
  conversations?: ResponseConversationDto[]
}

export const ConversationList = ({ conversations }: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {conversations?.map((conversation) => (
        <li key={conversation.id}>
          <ConversationListItem conversation={conversation} />
        </li>
      ))}
    </ul>
  )
}
