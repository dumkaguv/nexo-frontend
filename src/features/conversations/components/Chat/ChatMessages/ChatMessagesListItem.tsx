import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  AvatarWithColorInitials,
  DayLabel,
  ImagePreview,
  TipTapEditorPreview
} from '@/components/shared'

import { paths } from '@/config'
import { useAuthStore } from '@/stores'
import { cn, isEmptyHTMLEditor } from '@/utils'

import { ChatMessagesListItemMoreActions } from './ChatMessagesListItemMoreActions'

import type { ResponseConversationDto, ResponseMessageDto } from '@/api'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  conversation: ResponseConversationDto | undefined
  message: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const ChatMessagesListItem = ({
  conversation,
  message,
  setEditingMessage
}: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()

  const isMine = message.senderId === user?.id
  const messageDate = message.isEdited ? message.updatedAt : message.createdAt
  const hasContent = !!message.content && !isEmptyHTMLEditor(message.content)
  const fileUrls =
    message.files
      ?.map((file) =>
        'url' in file
          ? file.url
          : (file as { file?: { url?: string } }).file?.url
      )
      .filter((url): url is string => Boolean(url)) ?? []

  return (
    <div
      key={message.id}
      className={cn(
        'group flex w-full items-end gap-3',
        isMine ? 'justify-end' : 'justify-start'
      )}
    >
      {isMine && (
        <ChatMessagesListItemMoreActions
          message={message}
          setEditingMessage={setEditingMessage}
        />
      )}

      {!isMine && (
        <Link to={paths.user.byId(Number(conversation?.receiver.id))}>
          <AvatarWithColorInitials user={conversation?.receiver} size={32} />
        </Link>
      )}

      <div
        className={cn(
          'flex max-w-[80%] flex-col items-end gap-1 sm:max-w-[45%]',
          isMine ? 'items-end' : 'items-start'
        )}
      >
        {fileUrls.length > 0 && (
          <ImagePreview
            srcs={fileUrls}
            maxImages={4}
            containerClassName="grid grid-cols-2 gap-2"
          />
        )}

        {hasContent && (
          <TipTapEditorPreview
            content={message.content ?? ''}
            className={cn(
              'w-fit rounded-2xl px-3 py-2 text-sm leading-relaxed sm:px-4 sm:py-3',
              isMine ? 'bg-primary/80 text-white!' : 'bg-muted text-foreground'
            )}
          />
        )}

        <DayLabel
          date={messageDate}
          text={message.isEdited ? t('editedAt') : t('todayAt')}
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
