import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { conversationControllerFindOneOptions } from '@/api'
import { Separator } from '@/components/ui'
import { ChatMessagesList } from '@/features/messages/components/Chat/ChatMessages'
import { useChatForm, useChatWebsocket } from '@/features/messages/hooks'
import { useWebSocket } from '@/hooks'
import { useAuthStore } from '@/stores'

import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'

export const Chat = () => {
  const { user } = useAuthStore()

  const { isConnecting } = useWebSocket()
  const { id } = useParams()

  const { data: conversation, isLoading } = useQuery({
    ...conversationControllerFindOneOptions({ path: { id: String(id) } }),
    enabled: !!id
  })

  const { onSubmit, control, errors } = useChatForm({
    conversation: conversation?.data
  })

  useChatWebsocket({ conversation: conversation?.data })

  if (isLoading || isConnecting || !user?.id) {
    return <div>Loading...</div>
  }

  if (!conversation) {
    return null
  }

  return (
    <section className="bg-card flex min-h-[70vh] flex-1 flex-col rounded-md border">
      <ChatHeader conversation={conversation.data} />

      <Separator />

      <ChatMessagesList conversation={conversation.data} />

      <Separator />

      <form onSubmit={onSubmit}>
        <ChatFooter control={control} errors={errors} />
      </form>
    </section>
  )
}
