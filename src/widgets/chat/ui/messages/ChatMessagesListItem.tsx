import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar } from '@/entities/user'
import { paths } from '@/shared/config'
import { cn, isEmptyHTMLEditor } from '@/shared/lib'
import { DayLabel, ImagePreview, TipTapEditorPreview } from '@/shared/ui'

import { ChatMessagesListItemMoreActions } from './ChatMessagesListItemMoreActions'

import type { ResponseConversationDto, ResponseMessageDto } from '@/shared/api'
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
  const totalFiles = fileUrls.length

  return (
    <div
      className={cn(
        'group flex w-full items-start gap-3 max-lg:gap-2',
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
        <Link
          to={paths.user.byId(Number(conversation?.receiver.id))}
          className="mt-1"
        >
          <UserAvatar user={conversation?.receiver} size={32} />
        </Link>
      )}

      <div
        className={cn(
          'flex max-w-[80%] flex-col items-end gap-1 sm:max-w-[45%]',
          isMine ? 'items-end' : 'items-start'
        )}
      >
        {totalFiles > 0 && (
          <ImagePreview
            srcs={fileUrls}
            maxImages={4}
            containerClassName={cn(
              'grid gap-2',
              totalFiles === 1 && 'grid-cols-1',
              totalFiles === 2 && 'grid-cols-2',
              totalFiles === 3 && 'grid-cols-2',
              totalFiles >= 4 && 'grid-cols-2'
            )}
          />
        )}

        {hasContent && (
          <TipTapEditorPreview
            content={message.content ?? ''}
            className={cn(
              'w-fit rounded-2xl px-3 py-2 text-sm leading-relaxed lg:px-4 lg:py-3',
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
