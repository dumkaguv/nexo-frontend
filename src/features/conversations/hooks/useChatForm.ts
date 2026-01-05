import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import {
  createSendMessageSchema,
  type CreateSendMessageSchema
} from '@/features/conversations/zodSchemas'

import { useWebSocket } from '@/hooks'

import type { ResponseConversationDto, ResponseMessageDto } from '@/api'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  conversation?: ResponseConversationDto
  editingMessage?: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const useChatForm = ({
  conversation,
  editingMessage,
  setEditingMessage
}: Props) => {
  const { t } = useTranslation()
  const { emit } = useWebSocket()

  const schema = createSendMessageSchema(t)

  const form = useForm<CreateSendMessageSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: '' }
  })

  const onSubmit = ({ content }: CreateSendMessageSchema) => {
    setEditingMessage(undefined)

    if (conversation?.id) {
      if (editingMessage) {
        emit('message:update', {
          id: editingMessage.id,
          content
        })
      } else {
        emit('message:send', {
          receiverId: Number(conversation?.receiver.id),
          conversationId: Number(conversation?.id),
          content
        })
      }
    }

    requestAnimationFrame(() =>
      form.reset(
        { content: '' },
        {
          keepErrors: false,
          keepDirty: false,
          keepTouched: false,
          keepIsSubmitted: false,
          keepDefaultValues: false
        }
      )
    )
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  }
}
