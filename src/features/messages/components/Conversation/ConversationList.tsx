import { ConversationListItem } from './ConversationListItem'

import type { ResponseConversationDto } from '@/api'

type Props = {
  conversations?: ResponseConversationDto[]
}

export const ConversationList = ({ conversations }: Props) => (
  <ul className="flex flex-col gap-2">
    {conversations?.map((record) => (
      <li key={record.id}>
        <ConversationListItem record={record} />
      </li>
    ))}
  </ul>
)
