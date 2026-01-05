import { ConversationListItem } from './ConversationListItem'

import type { ResponseConversationDto } from '@/api'

type Props = {
  conversations?: ResponseConversationDto[]
}

export const ConversationList = ({ conversations }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-col gap-2">
        {conversations?.map((conversation) => (
          <li key={conversation.id}>
            <ConversationListItem conversation={conversation} />
          </li>
        ))}
      </ul>
    </div>
  )
}
