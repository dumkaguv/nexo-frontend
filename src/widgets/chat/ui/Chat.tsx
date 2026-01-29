import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'sonner'

import { useAuthStore } from '@/entities/session'
import {
  useChatWebsocket,
  useCreateNewConversation
} from '@/features/conversation'
import {
  conversationControllerFindOneOptions,
  userControllerFindOneOptions,
  type ResponseMessageDto
} from '@/shared/api'
import { paths } from '@/shared/config'
import { useQueryUpdate, useWebSocket } from '@/shared/hooks'
import { Separator } from '@/shared/ui/shadcn'

import { ChatEditingMessage } from './ChatEditingMessage'
import { ChatFooter } from './ChatFooter'
import { ChatSkeleton } from './ChatSkeleton'

import { useChatForm } from '../model'
import { ChatHeader } from './header'
import { ChatMessagesList } from './messages'

export const Chat = () => {
  const { user } = useAuthStore()

  const [editingMessage, setEditingMessage] = useState<ResponseMessageDto>()

  const { isConnecting } = useWebSocket()
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { params } = useQueryUpdate()

  const {
    data: conversation,
    isFetching,
    isError
  } = useQuery({
    ...conversationControllerFindOneOptions({ path: { id: String(id) } }),
    enabled: !!id
  })

  const { data: userResponse, isLoading } = useQuery({
    ...userControllerFindOneOptions({
      path: { id: String(params.receiverId) }
    }),
    enabled: !!params.receiverId
  })

  const { isCreatingConversation } = useCreateNewConversation()

  const { onSubmit, isPendingUpload, ...formMethods } = useChatForm({
    conversation: conversation?.data,
    user: userResponse?.data,
    editingMessage,
    setEditingMessage
  })

  useChatWebsocket({ conversation: conversation?.data })

  if (
    isFetching ||
    isConnecting ||
    !user?.id ||
    isLoading ||
    (isCreatingConversation && !conversation?.data?.id)
  ) {
    return <ChatSkeleton />
  }

  if (isError) {
    toast.error(t('notFound'))

    void navigate(paths.conversations.root)
  }

  return (
    <section className="bg-card flex h-full min-h-[85dvh] flex-1 flex-col rounded-md border">
      <ChatHeader conversation={conversation?.data} user={userResponse?.data} />

      <Separator />

      <FormProvider {...formMethods}>
        <ChatMessagesList
          conversation={conversation?.data}
          setEditingMessage={setEditingMessage}
        />

        {editingMessage && (
          <ChatEditingMessage
            editingMessage={editingMessage}
            setEditingMessage={setEditingMessage}
          />
        )}

        <div className="mt-auto flex flex-col">
          <Separator />

          <form onSubmit={onSubmit}>
            <ChatFooter isPendingUpload={isPendingUpload} />
          </form>
        </div>
      </FormProvider>
    </section>
  )
}
