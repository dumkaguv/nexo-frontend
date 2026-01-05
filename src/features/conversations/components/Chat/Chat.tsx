import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
  conversationControllerFindOneOptions,
  type ResponseMessageDto
} from '@/api'
import { Separator } from '@/components/ui'
import { ChatMessagesList } from '@/features/conversations/components/Chat/ChatMessages'
import {
  useChatForm,
  useChatWebsocket,
  useCreateNewConversation
} from '@/features/conversations/hooks'
import { useWebSocket } from '@/hooks'
import { useAuthStore } from '@/stores'

import { ChatEditingMessage } from './ChatEditingMessage'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'
import { ChatSkeleton } from './ChatSkeleton'

export const Chat = () => {
  const { user } = useAuthStore()

  const [editingMessage, setEditingMessage] = useState<ResponseMessageDto>()

  const { isConnecting } = useWebSocket()
  const { id } = useParams()

  const { data: conversation, isFetching } = useQuery({
    ...conversationControllerFindOneOptions({ path: { id: String(id) } }),
    enabled: !!id
  })

  const { isCreatingConversation } = useCreateNewConversation({
    conversation: conversation?.data,
    isLoading: isFetching
  })

  const { onSubmit, ...formMethods } = useChatForm({
    conversation: conversation?.data,
    editingMessage,
    setEditingMessage
  })

  useChatWebsocket({ conversation: conversation?.data })

  if (
    isFetching ||
    isConnecting ||
    !user?.id ||
    (isCreatingConversation && !conversation?.data.id)
  ) {
    return <ChatSkeleton />
  }

  return (
    <section className="bg-card flex min-h-[70vh] flex-1 flex-col rounded-md border">
      <ChatHeader conversation={conversation?.data} />

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

        <Separator />

        <form onSubmit={onSubmit}>
          <ChatFooter />
        </form>
      </FormProvider>
    </section>
  )
}
