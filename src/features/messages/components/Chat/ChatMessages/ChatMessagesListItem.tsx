import { Link } from 'react-router-dom'

import {
  AvatarWithColorInitials,
  DayLabel,
  TipTapEditorPreview
} from '@/components/shared'

import { paths } from '@/config'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import { ChatMessagesListItemMoreActions } from './ChatMessagesListItemMoreActions'

import type { ResponseConversationDto, ResponseMessageDto } from '@/api'

type Props = {
  conversation: ResponseConversationDto | undefined
  message: ResponseMessageDto
}

export const ChatMessagesListItem = ({ conversation, message }: Props) => {
  const { user } = useAuthStore()

  const isMine = message.senderId === user?.id

  return (
    <div
      key={message.id}
      className={cn(
        'group flex w-full items-end gap-3',
        isMine ? 'justify-end' : 'justify-start'
      )}
    >
      {isMine && <ChatMessagesListItemMoreActions />}

      {!isMine && (
        <Link to={paths.user.byId(Number(conversation?.receiver.id))}>
          <AvatarWithColorInitials user={conversation?.receiver} size={32} />
        </Link>
      )}

      <div
        className={cn(
          'flex max-w-[70%] flex-col items-end gap-1',
          isMine ? 'items-end' : 'items-start'
        )}
      >
        <TipTapEditorPreview
          content={message.content ?? ''}
          className={cn(
            'w-fit rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isMine ? 'bg-primary/80 text-white' : 'bg-muted text-foreground'
          )}
        />
        <DayLabel
          date={message.createdAt}
          showIcon={false}
          className={cn(
            'text-muted-foreground text-xs',
            isMine ? 'text-right' : 'text-left'
          )}
        />
      </div>
    </div>
  )
}
